// src/providers/WalletProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type WalletContextType = {
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  publicKey: string | null;
};

const WalletContext = createContext<WalletContextType>({
  connected: false,
  connect: async () => {},
  disconnect: async () => {},
  publicKey: null,
});

export const useWallet = () => useContext(WalletContext);

type WalletProviderProps = {
  children: ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  
  // Check if Phantom is installed
  const getProvider = () => {
    if ('phantom' in window) {
      const provider = (window as any).phantom?.solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    return null;
  };
  
  const connect = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        const response = await provider.connect();
        setConnected(true);
        setPublicKey(response.publicKey.toString());
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };
  
  const disconnect = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        await provider.disconnect();
        setConnected(false);
        setPublicKey(null);
      } catch (error) {
        console.error('Error disconnecting wallet:', error);
      }
    }
  };
  
  // Check connection on mount
  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      provider.on('connect', (publicKey: any) => {
        setConnected(true);
        setPublicKey(publicKey.toString());
      });
      
      provider.on('disconnect', () => {
        setConnected(false);
        setPublicKey(null);
      });
      
      // Check if already connected
      if (provider.isConnected) {
        setConnected(true);
        setPublicKey(provider.publicKey.toString());
      }
      
      return () => {
        provider.removeAllListeners();
      };
    }
  }, []);
  
  return (
    <WalletContext.Provider value={{ connected, connect, disconnect, publicKey }}>
      {children}
    </WalletContext.Provider>
  );
}
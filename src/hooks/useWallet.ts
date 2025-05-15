'use client';

import { useState, useEffect } from 'react';

export default function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);

  useEffect(() => {
    const checkPhantomWallet = () => {
      if (typeof window !== 'undefined' && 'phantom' in window) {
        const provider = (window as any).phantom?.solana;
        if (provider?.isPhantom) {
          setIsPhantomInstalled(true);
          
          if (provider.isConnected) {
            setIsConnected(true);
            setPublicKey(provider.publicKey.toString());
          }
        }
      }
    };
    
    checkPhantomWallet();
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && 'phantom' in window) {
      const provider = (window as any).phantom?.solana;
      if (provider?.isPhantom) {
        try {
          const { publicKey } = await provider.connect();
          setIsConnected(true);
          setPublicKey(publicKey.toString());
          return true;
        } catch (error) {
          console.error('Error connecting to Phantom wallet:', error);
          return false;
        }
      }
    } else {
      window.open('https://phantom.app/', '_blank');
      return false;
    }
  };

  const disconnectWallet = async () => {
    if (typeof window !== 'undefined' && 'phantom' in window) {
      const provider = (window as any).phantom?.solana;
      if (provider?.isPhantom) {
        try {
          await provider.disconnect();
          setIsConnected(false);
          setPublicKey(null);
          return true;
        } catch (error) {
          console.error('Error disconnecting from Phantom wallet:', error);
          return false;
        }
      }
    }
    return false;
  };

  return {
    isConnected,
    publicKey,
    isPhantomInstalled,
    connectWallet,
    disconnectWallet
  };
}
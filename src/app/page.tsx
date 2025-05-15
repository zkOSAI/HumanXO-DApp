'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const isPhantomInstalled = () => {
    // @ts-ignore
    return typeof window !== 'undefined' && window.phantom?.solana;
  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // @ts-ignore
        const provider = window.phantom?.solana;
        if (provider?.isPhantom) {
          const connected = provider.isConnected;
          setConnected(connected);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    };
    
    checkConnection();
  }, []);

  const connectPhantomWallet = async () => {
    try {
      setConnecting(true);
      
      if (!isPhantomInstalled()) {
        window.open('https://phantom.app/', '_blank');
        setConnecting(false);
        return;
      }
      
      // @ts-ignore
      const provider = window.phantom?.solana;
      
      if (provider?.isPhantom) {
        try {
          if (provider.isConnected) {
            await provider.disconnect();
          }
          
          const response = await provider.connect();
          setConnected(true);
          
        } catch (err) {
          console.error("Connection error:", err);
        }
      }
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
    } finally {
      setConnecting(false);
    }
  };
  
  const disconnectWallet = async () => {
    try {
      // @ts-ignore
      const provider = window.phantom?.solana;
      
      if (provider?.isPhantom) {
        await provider.disconnect();
        
        setConnected(false);
        
        setTimeout(() => {
          if (provider.publicKey) {
            console.log("Wallet still has a public key after disconnect");
          } else {
            console.log("Wallet successfully disconnected");
          }
        }, 500);
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  return (
      <div className="flex flex-col max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-end mr-12">
          {connected ? (
            <button 
              className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </button>
          ) : (
            <button 
              className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              onClick={connectPhantomWallet}
              disabled={connecting}
            >
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
        <div className="h-full flex items-center justify-center p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl w-full">
            {/* Left panel - Orange welcome section */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 rounded-full bg-orange-400 opacity-20 h-64 w-64 -mr-20 -mt-20" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className='mt-18'>
                  <h1 className="text-3xl font-bold">Welcome to</h1>
                  <h2 className="text-3xl font-bold mb-4">HumanXO by zkOS.</h2>
                  <p className="text-sm opacity-90">
                    Connect and start improving your on-chain reputation.
                    By engaging with HumanXO users strengthen their on-chain identity,
                    unlock rewards and contribute to a more Sybil-resistant blockchain.
                  </p>
                </div>
                
                <div className="mt-auto">
                  {connected ? (
                    <button 
                      className="w-full bg-white text-orange-500 font-medium py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors"
                      onClick={disconnectWallet}
                    >
                      Disconnect Wallet
                    </button>
                  ) : (
                    <button 
                      className="w-full bg-white text-orange-500 font-medium py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors"
                      onClick={connectPhantomWallet}
                      disabled={connecting}
                    >
                      {connecting ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-r from-purple-500 to-teal-400 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-2">
                  <img src="/images/Solana-Sol-White-Logo-PNG.png" width={40} height={40} alt="" />            
                </div>
                <p className="text-sm mt-4">
                  Built on Solana,<br />
                  designed to increase<br />
                  on-chain human activity.
                </p>
              </div>
              
              <div className="bg-orange-100 dark:bg-orange-900 rounded-2xl px-6 pb-6 pt-3">
                <div className="flex items-center">
                  <img src="/images/human-logo.png" width={30} height={30} alt="" />
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  Passively verify you're human, build reputation in the HumanXO ecosystem, and earn rewards.
                </p>
                <div className="mt-2">
                  <button className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-orange-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Download Browser Extension
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
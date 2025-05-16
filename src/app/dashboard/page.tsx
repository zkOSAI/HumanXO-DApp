'use client';

import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPhantomInstalled = () => {
    // @ts-expect-error: third-party type issue
    return typeof window !== 'undefined' && window.phantom?.solana;
  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // @ts-expect-error: third-party type issue
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
      // @ts-expect-error: third-party type issue
      const provider = window.phantom?.solana;
      
      if (provider?.isPhantom) {
        try {
          if (provider.isConnected) {
            await provider.disconnect();
          }
          
          //const response = await provider.connect();
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
      // @ts-expect-error: third-party type issue
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
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl flex flex-col mx-auto p-4 md:p-6">
        {!isMobile && (
          <div className="flex justify-end mb-6 md:mb-12">
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
        )}
        {/* Main layout */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Balance/Rewards Card - Full Width */}
          <div className="w-full bg-orange-500 rounded-2xl p-3 md:p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 rounded-full bg-orange-400 opacity-20 h-64 w-64 -mr-20 -mt-20" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <p className="text-sm font-medium">Dashboard</p>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">100 ZKOS</h3>
              
              <button className="bg-white text-orange-500 font-medium py-1 md:py-2 px-4 md:px-6 rounded-lg hover:bg-orange-50 transition-colors mb-2 md:mb-4">
                Claim Rewards
              </button>
              
              <div className="text-xs opacity-80">
                <p className="mb-1">Total Rewards Earned All Time</p>
                <p className="text-lg md:text-xl font-medium">7322 ZKOS</p>
              </div>
            </div>
          </div>
          
          {/* Two cards in row with different widths */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Invite Friends Card - Wider */}
            <div className="w-full md:w-2/3 bg-green-900 rounded-2xl border-1 border-blue-600 overflow-hidden relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-70 bg-forest" />
              
              <div className="relative z-10 p-3 md:p-4 text-white h-full flex flex-col">
                <div>
                  <span className="bg-opacity-20 text-white rounded-full text-sm md:text-md font-bold inline-block">
                    coming <br />soon
                  </span>
                </div>
                
                <div className="mt-auto">
                  <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Invite friends, earn rewards!</h2>
                  <p className="text-xs md:text-sm opacity-90">
                    Invite your friends and get rewarded when they join.
                    The more you share, the more you earn!
                  </p>
                </div>
              </div>
            </div>
            
            {/* Browser Extension Card - Narrower */}
            <div className="w-full md:w-1/3 bg-red-100 dark:bg-red-900 rounded-2xl p-3 md:p-4 text-center">
              <div className="flex flex-col items-center text-black dark:text-white">
                <div className="h-10 md:h-12 w-10 md:w-12 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mb-3 md:mb-4 relative">
                  <div className="h-3 md:h-4 w-3 md:w-4 bg-orange-500 rounded-full" />
                </div>
                
                <h3 className="font-semibold text-xs md:text-sm">Sync Browser Extension</h3>
                <p className="text-xs mb-3 md:mb-4 max-w-3/5">
                  to earn and claim your rewards, import and sync your HumanXO private key.
                </p>
                
                <button className="max-w-3/4 bg-white dark:bg-gray-800 text-orange-500 text-xs md:text-sm border border-gray-200 dark:border-gray-700 font-medium py-1 md:py-2 px-3 md:px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Import Private Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
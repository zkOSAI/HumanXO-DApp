'use client';

import useWallet from '../../hooks/useWallet';

const WalletConnect = () => {
  const { isConnected, connectWallet, disconnectWallet } = useWallet();
  
  const handleClick = async () => {
    if (isConnected) {
      await disconnectWallet();
    } else {
      await connectWallet();
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
    >
      {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </button>
  );
};

export default WalletConnect;
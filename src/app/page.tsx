import Link from 'next/link';
import WalletConnect from '../components/wallet/walletConnect';

export default function Home() {
  return (
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
              <button className="w-full bg-white text-orange-500 font-medium py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
        
        {/* Right panel - Features section */}
        <div className="flex flex-col gap-6">
          {/* Solana section */}
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
          
          {/* Verification section */}
          <div className="bg-orange-100 rounded-2xl px-6 pb-6 pt-3">
            <div className="flex items-center">
              <img src="/images/human-logo.png" width={30} height={30} alt="" />
            </div>
            <p className="text-sm text-gray-800">
              Passively verify you're human, build reputation in the HumanXO ecosystem, and earn rewards.
            </p>
            <div className="mt-2">
              <button className="w-full bg-white border border-gray-200 text-orange-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Download Browser Extension
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
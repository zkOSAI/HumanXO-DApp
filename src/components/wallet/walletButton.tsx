'use client';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function WalletButton() {
    const { setVisible } = useWalletModal();
    const { disconnect, connected, connecting } = useWallet();

    const connectPhantomWallet = async () => {
        console.log("connection wallet");
        setVisible(true);
    };

    const disconnectWallet = async () => {
        disconnect()
    };

    return (
        <div className="flex justify-end mr-0 md:mr-12">
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
    )
}
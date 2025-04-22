import React, { FC, useMemo, PropsWithChildren } from 'react';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {
    WalletAdapterNetwork,
} from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import any wallet adapters you want to use
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

const WalletContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet; // Change to 'mainnet-beta' for production
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            // Add other wallets here
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
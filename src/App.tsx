import React, { useState } from "react";
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  connectorsForWallets,
  RainbowKitProvider,
  Theme,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';

import {
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  omniWallet,
  argentWallet,
  imTokenWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from 'wagmi/providers/public';
import Main from "./pages/main";

const { chains, provider } = configureChains(
  [chain.sepolia],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: 'Blockchain Domains' }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      trustWallet({ chains }),
      argentWallet({ chains }),
      omniWallet({ chains }),
      imTokenWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App() {


  return (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={lightTheme()}>
          <Main/>
        </RainbowKitProvider>
    </WagmiConfig>
  );
}
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
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error404 from "./pages/Error404";
import ErrorChain from "./pages/ErrorChain";
import FakeMeebits from "./pages/FakeMeebits";
import FakeNefturians from "./pages/FakeNefturians";
import FakeBayc from "./pages/FakeBayc";
import ChainInfo from "./pages/ChainID";
import ChainID from "./pages/ChainID";

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

  const [tokenId_Bayc, setTokenId_Bayc] = useState("");
  const [address_Nefturians, setAddress_Nefturians] = useState("");

  window.addEventListener('tokenId_Bayc_Event', (e:any) => {
    setTokenId_Bayc(e.detail.tokenId);
  });

  window.addEventListener('address_Nefturians_Event', (e:any) => {
    setAddress_Nefturians(e.detail.address);
  });

  return (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={lightTheme()}>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/chain-info" element={<ChainID />}/>
                <Route path="/error-chain" element={<ErrorChain />}/>
                <Route path= {`/fakeBayc/${tokenId_Bayc}`} element={<FakeBayc />}/>
                <Route path={`/fakeNefturians/${address_Nefturians}`} element={<FakeNefturians />}/>
                <Route path="/fakeMeebits" element={<FakeMeebits />}/>
                <Route path="*" element={<Error404 />}/>
              </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
    </WagmiConfig>
  );
}
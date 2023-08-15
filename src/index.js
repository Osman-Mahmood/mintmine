import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, polygonMumbai, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import  { SkeletonTheme } from 'react-loading-skeleton';
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    // mainnet,
    polygonMumbai,
    goerli,
    // ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : [goerli]),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
    <SkeletonTheme baseColor="#000" highlightColor="#444">
      <App />
      </SkeletonTheme>
    </RainbowKitProvider>
  </WagmiConfig>
);


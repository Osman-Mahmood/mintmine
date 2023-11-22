import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';
import { SkeletonTheme } from 'react-loading-skeleton';
// import '@rainbow-me/rainbowkit/styles.css';
// import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
// import { configureChains, createConfig, WagmiConfig } from 'wagmi';
// import { goerli, polygonMumbai } from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';
// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [
//     // mainnet,
//     polygonMumbai,
//     goerli,
//     // ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : [goerli]),
//   ],
//   [publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: 'RainbowKit demo',
//   projectId: 'YOUR_PROJECT_ID',
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
//   webSocketPublicClient,
// });
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <WagmiConfig config={wagmiConfig}>
//       <RainbowKitProvider chains={chains} theme={darkTheme()}>
//         <SkeletonTheme baseColor="#000" highlightColor="#444">
//           <App />
//         </SkeletonTheme>
//       </RainbowKitProvider>
//     </WagmiConfig>
//   </Provider>
// );


import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai } from 'viem/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '9a487d505dfa263f3a1eb3f6ad7972de'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [goerli, polygonMumbai]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig config={wagmiConfig}>
    <Provider store={store}>
      <SkeletonTheme baseColor="#000" highlightColor="#444">
        <App />
      </SkeletonTheme>
    </Provider>
  </WagmiConfig>
)

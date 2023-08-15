
import './App.css';

import { useNetwork } from 'wagmi';
import SelfService from './Components/SelfService';
import Crypto from './Components/Crypto';
import Address from './Components/Address';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Router/Route';
import SidebarContent from './Components/SidebarContent';
import Ueth69 from './Components/Ueth69';
import Network from './Components/Network';
import ContractDeployed from './Components/ContractDeployed';
import UethSideMenu from './Components/UethSideMenu';
import Utoken from './Components/Utoken';
import System from './Components/System';
import PublicGoods from './Components/PublicGoods';
import Home from './Components/Home';
import { Toaster } from 'react-hot-toast';
import { useMemo, useRef } from 'react';
import TokenSelect from './Components/Tokens/TokenSelect';
import More from "./Components/More"
import Tokens from "./Components/Tokens"
function App() {
  // const { chain: { id } } = usePublicClient()
  const { chain } = useNetwork()
  console.log("chain", chain);
  const firstRender = useRef(true)
  useMemo(() => {
    if (window.ethereum)
      if (firstRender.current) {
        firstRender.current = false;
        return;
      } else {
        window.location.reload(true)
      }
  }, [chain?.id])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "selfserve",
          element: <SelfService />,
          children: [{
            path: "crypto",
            element: <Crypto />,
          },
          {
            path: "content",
            element: <SidebarContent />,
          },
          {
            path: "adres",
            element: <Address />,
          },
          {
            path: "ueth",
            element: <Ueth69 />,
          },
          {
            path: "network",
            element: <Network />,
          },
          {
            path: "deploy",
            element: <ContractDeployed />,
          },
          {
            path: "uethside",
            element: <UethSideMenu />,
          },
          {
            path: "utoken",
            element: <Utoken />,
          },
          {
            path: "system",
            element: <System />,
          },
          {
            path: "goods",
            element: <PublicGoods />,
          }
          ]
        },
        {
          path: "select",
          element: <TokenSelect />,
        },
        {
          path: "tokens",
          element: <Tokens />,
        },
        {
          path: "more",
          element: <More />,
        },
        {
          path: "more",
          element: <More />,
        },
        {
          path: "crypto",
          element: <Crypto />,
        },
        {
          path: "adres",
          element: <Address />,
        }
      ]


    },
  ]);


  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>

  );
}

export default App;

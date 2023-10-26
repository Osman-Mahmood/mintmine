
import './App.css';

import { useAccount, useNetwork } from 'wagmi';
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
import WithdrawToken from './Components/Tokens/Withdraw';
import TransferToken from './Components/Tokens/TransferToken';
import More from "./Components/More"
import Reward from "./Components/Reward"
import Tokens from './Components/Tokens';
import SwitchNetwork from './Components/SwitchNetwork';
import WhatisCrypto from './Components/WhatisCrypto';
import PublicAdress from './Components/PublicAdress';
import Credit from './Components/Credit';
import Protocol from './Components/Protocol';
import Dashboard from './Components/Dashboard/Dashboard';
import FaqsFinal from './Components/FaqsFinal';
import 'react-loading-skeleton/dist/skeleton.css'
function App() {
  // const { chain: { id } } = usePublicClient()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const firstRender = useRef(true)
  useMemo(() => {
    window.localStorage.setItem("refresh", "false")
    if (window.ethereum)
      if (firstRender.current) {
        firstRender.current = false;
        return;
      } else {
        window.location.reload(true)
      }
  }, [chain?.id, address])


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
            path: "whatis",
            element: <WhatisCrypto />,
          },
          {
            path: "public",
            element: <PublicAdress />,
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
            path: "switch",
            element: <SwitchNetwork />,
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
          path: "/select",
          element: <TokenSelect />,
        },
        {
          path: "credit",
          element: <Credit />,
        },
        {
          path: "/transfer",
          element: <TransferToken />,
        },
        {
          path: "/withdraw",
          element: <WithdrawToken />,
        },
        {
          path: "reward",
          element: <Reward />,
        },
        {
          path: "tokens",
          element: <Tokens />
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
          path: "protocol",
          element: <Protocol />,
        }, {
          path: "faq",
          element: <FaqsFinal />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
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

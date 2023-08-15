
import './App.css';

import { useNetwork } from 'wagmi';
import { useMemo, useRef } from 'react';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tokens from './Components/Tokens';
import More from './Components/More';
import TokenSelect from './Components/Tokens/TokenSelect';
import { Toaster } from 'react-hot-toast';
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
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster/>
      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/select" element={<TokenSelect />} />
        <Route exact path="/tokens" element={<Tokens />} />
        <Route exact path="/more" element={<More />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;

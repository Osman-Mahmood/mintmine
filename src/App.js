
import './App.css';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tokens from './Components/Tokens';
import More from './Components/More';
import TokenSelect from './Components/Tokens/TokenSelect';
function App() {
  return (
    <BrowserRouter>
 <Navbar />
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

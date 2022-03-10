import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Upload from "./pages/Upload";
import Buy from "./pages/Buy";
import Adminhome from "./pages/Adminhome";


function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/buy/:id" element={<Buy />} />
          <Route path="/adminhome" element={<Adminhome />} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;

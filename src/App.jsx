import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import UnidadAdmin from "./pages/UnidadAdmin/UnidadAdmin";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="container">
        <Sidebar />

        <main className="content">
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/unidadadmin" element={<UnidadAdmin />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
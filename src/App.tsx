import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/Signin";
import { LandingPage } from "./components/LandingPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="" element={<LandingPage />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;

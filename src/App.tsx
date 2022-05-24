import "./App.css";
import { Navbar } from "./components/Navbar";
import { Feed } from "./pages/feed";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/Signin";
import { LandingPage } from "./pages/LandingPage";
import { RequireAuth } from "./components/RequireAuth";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="" element={<LandingPage />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route
          path="/feed"
          element={
            <RequireAuth>
              <Feed />
            </RequireAuth>
          }
        ></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;

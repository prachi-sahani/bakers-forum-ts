import { Route, Routes } from "react-router-dom";
import { Feed, SignUp, SignIn, LandingPage } from "./pages/index";
import { RequireAuth } from "./components/index";

export function Router() {
  return (
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
  );
}

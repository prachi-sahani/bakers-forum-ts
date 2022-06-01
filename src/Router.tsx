import { Route, Routes } from "react-router-dom";
import {
  Feed,
  SignUp,
  SignIn,
  LandingPage,
  Profile,
  Explore,
  Bookmark,
} from "./pages/index";
import { RequireAuth } from "./components/index";

export function Router() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/explore" element={<Explore />}></Route>
      <Route
        path="/feed"
        element={
          <RequireAuth>
            <Feed />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/bookmarks"
        element={
          <RequireAuth>
            <Bookmark />
          </RequireAuth>
        }
      ></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
    </Routes>
  );
}

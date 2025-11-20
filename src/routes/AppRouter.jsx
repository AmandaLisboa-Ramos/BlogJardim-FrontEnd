import { Route, Routes } from "react-router-dom";
import Login from "../screens/Login";
import EditPost from "../screens/EditPost";
import PostDetails from "../screens/PostDetails";
import Profile from "../screens/Profile";
import MainLayout from "../layout/MainLayout";
import LoginLayout from "../layout/LoginLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import NewAccount from "../screens/NewAccount";
import Home from "../screens/Home";
import CreatePost from "../screens/CreatePost";

const AppRouter = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <Routes>

      <Route element={<LoginLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/new-account" element={<NewAccount />} />
      </Route>

      <Route element={<MainLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/post-details/:id" element={<PostDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

    </Routes>
  );
};


export default AppRouter;


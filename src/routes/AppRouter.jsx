import { Route, Routes } from "react-router-dom";
import Login from "../screens/Login/Login";
import CreatePost from "../screens/CreatePost/CreatePost";
import EditPost from "../screens/EditPost/EditPost";
import PostDetails from "../screens/PostDetails/PostDetails";
import Profile from "../screens/Profile/Profile";
import MainLayout from "../layout/MainLayout";
import LoginLayout from "../layout/LoginLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import NewAccount from "../screens/NewAccount/NewAccount";
import Home from "../screens/Home/Home";

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


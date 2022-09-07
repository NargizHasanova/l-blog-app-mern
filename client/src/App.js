import { Route, Router, Routes } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Register from "./pages/register/Register";
import SinglePost from './pages/singlePost/SinglePost';

function App() {
  const currentUser = true;
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/write" element={currentUser ? <Write /> : <Login />} />
        <Route path="/login" element={currentUser ? <Homepage /> : <Login />} />
        <Route path="/register" element={currentUser ? <Homepage /> : <Register />} />
      </Routes>
    </>
  );
}

export default App;

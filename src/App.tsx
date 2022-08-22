import React, { useEffect, useState } from "react";
import type { DrawerProps } from "antd";
import { Drawer } from "antd";
import { Routes, Route, Link } from "react-router-dom";

import { Header } from "./components/Header";
import { Blog } from "./pages/Blog";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { useLocation } from "react-router-dom";
import { AddPost } from "./pages/AddPost";
import { UserPage } from "./pages/UserPage";
import { FullPost } from "./pages/FullPost";
import { useAppDispatch } from "./hooks";
import { fetchGetMe } from "./redux/slices/auth/userSlice";
import { fetchComment } from "./redux/slices/comment/commentSlice";

function App() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const location = useLocation();
  const authLayout =
    location.pathname !== "/login" && location.pathname !== "/register";

  const openDrawerHandler = () => setIsOpen(true);

  useEffect(() => {
    dispatch(fetchGetMe());
    dispatch(fetchComment());
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      {authLayout && (
        <>
          <Drawer
            title="Basic Drawer"
            closable={false}
            onClose={() => setIsOpen(false)}
            visible={isOpen}
            placement={placement}
          >
            <Link to={"/"}>Some contents...</Link>
          </Drawer>
          <Header onOpen={openDrawerHandler} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/edit/:id" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;

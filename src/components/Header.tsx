import React, { FC, useState } from "react";
import {
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
  UpCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useIntersection } from "react-use";
import type { MenuProps } from "antd";

import { profileSvg } from "../assets/svg/user";
import avatar from "../assets/img/avatar.svg";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../redux/slices/auth/userSlice";
import { UserDropdownInfo } from "./UserDropdownInfo";

interface HeaderProps {
  onOpen: () => void;
}

export const Header: FC<HeaderProps> = ({ onOpen }) => {
  const { userData } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const [isSearch, setIsSearch] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { pathname } = useLocation();

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "150px",
    threshold: 1,
  });

  const searchToggler = () => {
    setIsSearch(!isSearch);
    setSearchText("");
  };

  const logoutHandler: MenuProps["onClick"] = ({ key }) => {
    if (key === "4") {
      localStorage.removeItem("DToken");
      dispatch(logout());
    }
  };

  const avatarRender = () => {
    if (userData) {
      if (userData?.avatarUrl) {
        return (
          <img
            width={35}
            height={35}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            src={`${process.env.REACT_APP_API_URL}${userData.avatarUrl}`}
            alt="avatar"
          />
        );
      } else {
        return <img width={35} height={35} src={avatar} alt="avatar" />;
      }
    } else {
      return profileSvg;
    }
  };

  return (
    <div id="header" ref={intersectionRef} className="header">
      <div className="burgerMenu">
        <MenuOutlined onClick={onOpen} />
      </div>
      <div className="header__icon">
        {pathname !== "/add-post" && (
          <>
            {isSearch ? (
              <SearchOutlined
                onClick={searchToggler}
                className="header__searchIcon"
              />
            ) : (
              <div className="searchBlock">
                <input
                  className="searchBlock__input"
                  type="text"
                  placeholder="поиск"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <SearchOutlined className="searchBlock__searchIcon" />
                <CloseOutlined
                  onClick={searchToggler}
                  className="searchBlock__closeIcon"
                />
              </div>
            )}
            {userData && (
              <Link to={"/add-post"}>
                <button className="button header__addPost">Написать</button>
              </Link>
            )}
            {userData && (
              <Link to={"/add-post"}>
                <EditOutlined className="header__writePost" />
              </Link>
            )}
          </>
        )}

        {userData ? (
          <div className="header__user">
            {avatarRender()}
            <UserDropdownInfo
              logoutHandler={logoutHandler}
              userName={userData?.fullName}
              id={userData?._id}
            />
          </div>
        ) : (
          <Link to="/login">{profileSvg}</Link>
        )}
      </div>
      {intersection && intersection.intersectionRatio < 1 && (
        <a href="#header">
          <UpCircleOutlined className="onTopArrow" />
        </a>
      )}
    </div>
  );
};

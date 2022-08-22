import React, { FC } from "react";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { Link } from "react-router-dom";

interface UserDropdownInfoProps {
  logoutHandler: MenuClickEventHandler | undefined;
  userName: string;
  id: string;
}

export const UserDropdownInfo: FC<UserDropdownInfoProps> = ({
  logoutHandler,
  userName,
  id,
}) => {
  const menu = (
    <Menu
      onClick={logoutHandler}
      items={[
        {
          label: <Link to={`/user/${id}`}>{userName}</Link>,
          key: "0",
        },
        {
          type: "divider",
        },
        // {
        //   label: <span>Посты</span>,
        //   key: "1",
        // },
        // {
        //   label: <span>Комментарии</span>,
        //   key: "3",
        // },
        // {
        //   type: "divider",
        // },
        {
          label: <span>Выйти</span>,
          key: "4",
        },
      ]}
    />
  );
  return (
    <Dropdown className="userDropDown" overlay={menu} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

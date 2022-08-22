import { Spin } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api";

import avatar from "../../assets/img/userPageAvatar.png";
import { userResponse } from "../../redux/slices/auth/userTypes";
import { renderCommentDate } from "../../utils/helper/getCommentDate";

interface CommentProps {
  title?: string;
  text: string;
  user: userResponse;
  createdAt: string | undefined;
  post: string;
}

export const Comment: FC<CommentProps> = ({ text, user, createdAt, post }) => {
  const [title, setTitle] = useState();

  useEffect(() => {
    axiosInstance.get(`/posts/${post}`).then(({ data }) => {
      setTitle(data.title);
    });
  }, []);

  return (
    <div className="userPage__comments">
      <div className="comments--header">
        <img
          width={20}
          height={20}
          src={
            user.avatarUrl
              ? `${process.env.REACT_APP_API_URL}${user.avatarUrl}`
              : avatar
          }
          alt=""
        />
        <div>
          <span className="comments--header-username">{user.fullName}</span>
          <span className="comments--header-timestamp">
            {renderCommentDate(createdAt as string)}
          </span>
        </div>
      </div>
      <div className="comments--content">
        <Link to={`/posts/${post}`} className="comments--content-title">
          {title}
        </Link>
        <span className="comments--content-body">{text}</span>
      </div>
    </div>
  );
};

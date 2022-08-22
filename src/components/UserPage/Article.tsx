import React, { FC } from "react";
import {
  EyeOutlined,
  CommentOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";

import avatar from "../../assets/img/userPageAvatar.png";
import articleTitlePlaceholder from "../../assets/img/blogTitlePlaceholder.jpg";
import { renderFullPostDate } from "../../utils/helper/renderFullPostDate";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchDeletePosts,
  onDelete,
} from "../../redux/slices/posts/postsSlice";
import { userResponse } from "../../redux/slices/auth/userTypes";

interface ArticleProps {
  title: string;
  tags: string[] | [];
  viewsCount: number;
  id: string;
  createdAt: string;
  userName: string;
  userAvatar?: string | undefined;
  imageUrl: string;
  userId: string;
  userData: userResponse | null;
}

export const Article: FC<ArticleProps> = ({
  title,
  tags,
  viewsCount,
  id,
  createdAt,
  userName,
  userAvatar,
  imageUrl,
  userId,
  userData,
}) => {
  const dispatch = useAppDispatch();

  const removePostHandler = () => {
    dispatch(onDelete(id));
    dispatch(fetchDeletePosts(id));
  };

  const contentPopup = (
    <div className="userPage__article--popup">
      <p onClick={removePostHandler}>Удалить</p>
      <Link to={`/posts/edit/${id}`}>Редактировать</Link>
    </div>
  );

  return (
    <div className="userPage__article">
      <div>
        <div className="userPage__article--left">
          <div className="article--user">
            <div
              className="article--user-avatar"
              style={{
                backgroundImage: userAvatar
                  ? `url(http://localhost:8888${userAvatar})`
                  : `url(${avatar})`,
              }}
            />
            <div className="article--user-info">
              <span className="article--user-username">{userName}</span>
              <span className="article--user-tags">
                {tags.map((tag, index) => (
                  <span className="article--user-tag" key={tag + index}>
                    {tag}
                  </span>
                ))}
                <span>{renderFullPostDate(createdAt)}</span>
              </span>
            </div>
          </div>
          <div className="article--title">
            <Link to={`/posts/${id}`}>{title}</Link>
          </div>
          <div className="smallCard__postAction">
            <div className="view">
              <EyeOutlined className="viewIcon" />
              <span className="count">{viewsCount}</span>
            </div>
            <div className="comment">
              <CommentOutlined className="commentIcon" />
              <span className="count">2</span>
            </div>
            {userId === userData?._id && (
              <Popover
                placement="bottom"
                content={contentPopup}
                trigger="click"
              >
                <EllipsisOutlined className="userPage__article--settings" />
              </Popover>
            )}
          </div>
        </div>
        <div className="userPage__article--right">
          <img
            width={240}
            height={150}
            src={
              imageUrl
                ? `${process.env.REACT_APP_API_URL}${imageUrl}`
                : articleTitlePlaceholder
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

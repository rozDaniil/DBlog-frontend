import React, { FC } from "react";
import { Link } from "react-router-dom";

import titlePlaceholder from "../../assets/img/recentTitlePlaceholder.jpg";
import avatar from "../../assets/img/userPageAvatar.png";
import { renderRecentPostDate } from "../../utils/helper/renderRecentPostDate";

interface RecentPostProps {
  title: string;
  text: string;
  img: string;
  createdAt: string;
  id: string;
  userName: string;
  userImg: string;
  tags: string[];
  userId: string;
}

export const BlogRecentPost: FC<RecentPostProps> = ({
  title,
  text,
  img,
  createdAt,
  userName,
  userImg,
  id,
  userId,
  tags,
}) => {
  return (
    <div
      style={{ backgroundImage: img ? img : `url(${titlePlaceholder})` }}
      className="mediumCard"
    >
      <div className="mediumCard--tagContainer">
        {tags.map((tag, index) => (
          <div key={tag + index} className="mediumCard--tag">
            {tag}
          </div>
        ))}
      </div>

      <div className="mediumCard__content">
        <p className="mediumCard__title">
          <Link to={`/posts/${id}`}>{title}</Link>
        </p>
        <p className="mediumCard__text">{text}</p>
        <div className="mediumCard__footer">
          <div className="mediumCard__userInfo">
            <img
              className="mediumCard__userInfo--avatar"
              src={
                userImg ? `${process.env.REACT_APP_API_URL}${userImg}` : avatar
              }
              alt=""
            />
            <span>
              <Link to={`/user/${userId}`}>{userName}</Link>
            </span>
          </div>
          <span className="mediumCard__timestamp">
            {renderRecentPostDate(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

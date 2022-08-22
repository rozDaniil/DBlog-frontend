import { FC } from "react";
import { EyeOutlined, CommentOutlined } from "@ant-design/icons";

import titlePlaceholder from "../../assets/img/blogTitlePlaceholder.jpg";
import { renderCreatedAt } from "../../utils/helper/renderSmallPostDate";
import { Link } from "react-router-dom";

interface SmallPostProps {
  title: string;
  text: string;
  img: string;
  createdAt: string;
  id: string;
  viewsCount: number;
  commentsCount: number;
}

export const BlogSmallPost: FC<SmallPostProps> = ({
  title,
  text,
  img,
  createdAt,
  id,
  viewsCount,
  commentsCount,
}) => {
  const renderDate = () => renderCreatedAt(createdAt);

  return (
    <div className="smallCard">
      <div
        style={{
          backgroundImage:
            img === ""
              ? `url(${titlePlaceholder})`
              : `url(http://localhost:8888${img})`,
        }}
        className="smallCard__header"
      />
      <div className="smallCard__content">
        <Link to={`/posts/${id}`} className="smallCard--title">
          {title}
        </Link>
        <p className="smallCard--text">
          {text.length > 41 ? text.slice(0, 40) + "..." : text}
        </p>
        <div className="smallCard__divider" />
        <div className="smallCard__footer">
          <div className="smallCard__postAction">
            <div className="view">
              <EyeOutlined className="viewIcon" />
              <span className="count">{viewsCount}</span>
            </div>
            <div className="comment">
              <CommentOutlined className="commentIcon" />
              <span className="count">{commentsCount}</span>
            </div>
          </div>
          <span className="smallCard__timestamp">{renderDate()}</span>
        </div>
      </div>
    </div>
  );
};

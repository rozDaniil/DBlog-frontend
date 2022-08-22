import React, { useState, createElement, FC } from "react";
import moment from "moment";
import { Avatar, Comment, Tooltip } from "antd";
import {
  DislikeOutlined,
  DislikeFilled,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";

import avatar from "../assets/img/userPageAvatar.png";
import { Link } from "react-router-dom";
import { renderCommentDate } from "../utils/helper/getCommentDate";

interface FullPostCommentProps {
  text: string;
  userName?: string;
  userId?: string;
  userAvatar?: string | undefined;
  createdAt: string;
}

export const FullPostComment: FC<FullPostCommentProps> = ({
  text,
  userName,
  userId,
  userAvatar,
  createdAt,
}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Ответить</span>,
  ];
  return (
    <Comment
      actions={actions}
      author={<Link to={`/user/${userId}`}>{userName}</Link>}
      avatar={
        <Avatar
          src={userAvatar ? `http://localhost:8888${userAvatar}` : avatar}
          alt={userName}
        />
      }
      content={<p>{text}</p>}
      datetime={
        <Tooltip>
          <span>{renderCommentDate(createdAt)}</span>
        </Tooltip>
      }
    />
  );
};

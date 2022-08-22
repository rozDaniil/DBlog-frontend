import React, { useEffect, useState } from "react";
import {
  EyeOutlined,
  CommentOutlined,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Tabs, Spin } from "antd";
import ReactMarkdown from "react-markdown";

import { FullPostComment } from "../components/FullPostComment";
import { AddPostComment } from "../components/AddPostComment";
import axios from "../api";
import { useLocation, useParams } from "react-router-dom";
import { renderFullPostDate } from "../utils/helper/renderFullPostDate";
import { PostType } from "../redux/slices/posts/postsTypes";
import { FullPostSkeleton } from "../components/skeleton/FullPostSkeleton";
import { useAppSelector } from "../hooks";
import { SingleComment } from "../redux/slices/comment/commentType";
import { userResponse } from "../redux/slices/auth/userTypes";

const { TabPane } = Tabs;

export const FullPost = () => {
  const { commentData } = useAppSelector(({ comment }) => comment);
  const [comments, setComments] = useState<SingleComment[]>([]);
  const [post, setPost] = useState<PostType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setComments(commentData.filter((comment) => comment.post === id));
  }, [commentData]);

  useEffect(() => {
    axios.get(`/posts/${id}`).then(({ data }) => {
      setPost(data);
      setIsLoading(false);
    });
  }, []);

  const renderDate = () => renderFullPostDate(post?.createdAt as string);

  const onChange = (key: string) => {};

  return (
    <div className="fullPost">
      {isLoading ? (
        <FullPostSkeleton />
      ) : (
        <>
          <div className="fullPost__header-info">
            {post?.tags.map((tag, index) => (
              <span className="fullPost__header-tags" key={tag + index}>
                {tag}
              </span>
            ))}
            <span className="fullPost__header-timestamp">{renderDate()}</span>
            <div className="smallCard__postAction">
              <div className="view">
                <EyeOutlined className="viewIcon" />
                <span className="count">{post?.viewsCount}</span>
              </div>
              <div className="comment">
                <CommentOutlined className="commentIcon" />
                <span className="count">{comments.length}</span>
              </div>
            </div>
          </div>
          <div className="fullPost__content">
            <h1>{post?.title}</h1>
            {post?.imageUrl && (
              <img
                width={920}
                height={430}
                src={`http://localhost:8888${post?.imageUrl}`}
                alt=""
              />
            )}
            <ReactMarkdown children={post?.text as string} />
          </div>
        </>
      )}
      {!isLoading && (
        <div className="fullPost__footer">
          <div>
            <LikeOutlined className="fullPost__footer--icon" />
            <span className="fullPost__footer--rateCount">1</span>
          </div>
          <div>
            <DislikeOutlined className="fullPost__footer--icon" />
            <span className="fullPost__footer--rateCount">1</span>
          </div>
        </div>
      )}
      <div className="fullPost__commentContainer">
        {!isLoading && <AddPostComment />}
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="По дате" key="1">
            {isLoading ? (
              <Spin
                style={{ marginTop: "20px", marginLeft: "100px" }}
                size="large"
              />
            ) : (
              comments.map((comment) => (
                <FullPostComment
                  key={comment._id}
                  text={comment.text}
                  userName={(comment?.user as userResponse).fullName}
                  userId={(comment?.user as userResponse)._id}
                  userAvatar={(comment?.user as userResponse).avatarUrl}
                  createdAt={comment.createdAt as string}
                />
              ))
            )}
          </TabPane>
          <TabPane tab="По популярности" key="2"></TabPane>
        </Tabs>
      </div>
    </div>
  );
};

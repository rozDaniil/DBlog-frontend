import React, { useEffect, useRef, useState } from "react";
import { Tabs, Image, Spin, Modal } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Navigate, useParams } from "react-router-dom";

import avatar from "../assets/img/userPageAvatar.png";
import changeUserAvatar from "../assets/img/changeUserImage.svg";
import axios from "../api";
import { Article } from "../components/UserPage/Article";
import { Comment } from "../components/UserPage/Comment";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getMonth } from "../utils/helper/getMonthName";
import { getNoun } from "../utils/helper/getNoun";
import { PostType } from "../redux/slices/posts/postsTypes";
import {
  fetcUserPosts,
  setUserPostStatus,
} from "../redux/slices/posts/postsSlice";
import { userResponse } from "../redux/slices/auth/userTypes";
import { SingleComment } from "../redux/slices/comment/commentType";

const { TabPane } = Tabs;

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<userResponse>({} as userResponse);
  const [userComments, setUserComments] = useState<SingleComment[]>();
  const [userPosts, setUserPosts] = useState<PostType[]>([] as PostType[]);
  const { commentData } = useAppSelector(({ comment }) => comment);
  const { userData } = useAppSelector(({ user }) => user);
  const { userPostsData, userPostStatus } = useAppSelector(
    ({ posts }) => posts
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userUpdate, setUserUpdate] = useState({
    fullName: userInfo?.fullName,
    avatarUrl: userInfo?.avatarUrl,
  });
  const imageRef = useRef<HTMLInputElement>(null);

  const { id } = useParams();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    axios.patch(`user/${id}`, userUpdate);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    updateModalInfo();
  };

  const viewsCount = userPostsData?.reduce(
    (acc, post) => (acc += post.viewsCount),
    0
  );

  const updateModalInfo = () =>
    setUserUpdate((prev) => ({
      avatarUrl: userInfo?.avatarUrl,
      fullName: userInfo?.fullName,
    }));

  const fullNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdate((prev) => ({ ...prev, fullName: e.target.value }));
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        formData.append("image", file);
        const { data } = await axios.post("/upload", formData);
        setUserUpdate((prev) => ({ ...prev, avatarUrl: data.url }));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const isLoading = userPostStatus === null ? true : false;

  useEffect(() => {
    dispatch(fetcUserPosts(id as string));
    axios.get(`/user/${id}`).then(({ data }) => setUserInfo(data));
    return () => {
      dispatch(setUserPostStatus(null));
    };
  }, [id]);

  useEffect(() => {
    updateModalInfo();
  }, [userInfo]);

  useEffect(() => {
    setUserComments(
      commentData.filter((comment) => (comment.user as userResponse)._id === id)
    );
  }, [commentData, id]);

  useEffect(() => {
    setUserPosts(userPostsData as PostType[]);
  }, [userPostsData, id]);

  if (!localStorage.getItem("DToken") && !userInfo) {
    return <Navigate to="/" />;
  }

  return (
    <div className="userPage">
      <div className="userPage__content">
        <Image
          className="userPage__avatar"
          width={112}
          height={112}
          preview={userInfo?.avatarUrl ? true : false}
          src={
            userInfo?.avatarUrl
              ? `${process.env.REACT_APP_API_URL}${userUpdate.avatarUrl}`
              : avatar
          }
        />
        <div className="userPage__header">
          <span className="userPage__header--username">
            {userUpdate?.fullName}
            {userInfo._id === userData?._id && (
              <SettingOutlined onClick={showModal} />
            )}
          </span>
          <span className="userPage__header--userView">
            <span>Просмотров: </span>
            {viewsCount}
          </span>
          <span className="userPage__header--register">
            На проекте с 17 {getMonth(userInfo?.createdAt as string)} 2022
          </span>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={getNoun(
                userPosts?.length as number,
                "Статья",
                "Статьи",
                "Статей"
              )}
              key="1"
            >
              {isLoading ? (
                <Spin
                  size="large"
                  style={{ margin: "0 auto", width: "100%" }}
                />
              ) : (
                userPosts?.map((post: PostType) => (
                  <Article
                    key={post._id}
                    id={post._id}
                    createdAt={post.createdAt}
                    tags={post.tags}
                    userName={userInfo?.fullName as string}
                    userAvatar={userInfo?.avatarUrl}
                    userId={userInfo._id}
                    title={post.title}
                    imageUrl={post.imageUrl as string}
                    viewsCount={post.viewsCount}
                    userData={userData}
                  />
                ))
              )}
            </TabPane>
            <TabPane tab={`${userComments?.length} Комментария`} key="2">
              {userComments?.map((comment) => (
                <Comment
                  key={comment._id}
                  text={comment.text}
                  user={comment.user as userResponse}
                  createdAt={comment.createdAt}
                  post={comment.post}
                />
              ))}
              {/* ) : (
                <Spin
                  size="large"
                  style={{ margin: "0 auto", width: "100%" }}
                />
              )} */}
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Modal
        style={{ top: 220 }}
        title="Настройка профиля"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Отмена"
        okText="Сохранить"
      >
        <div
          onClick={() => imageRef.current && imageRef.current.click()}
          className="userPage__changeAvatarContainer"
        >
          <img
            className="userPage__changeAvatarContainer--avatarImage"
            width="100"
            height={100}
            src={
              userUpdate.avatarUrl
                ? `${process.env.REACT_APP_API_URL}${userUpdate.avatarUrl}`
                : avatar
            }
            alt="avatar"
          />
          <div className="userPage__changeAvatarContainer--overlay" />
          <img
            className="userPage__changeAvatarContainer--overlayImg"
            src={changeUserAvatar}
            alt=""
          />
        </div>
        <input onChange={handleChangeFile} ref={imageRef} type="file" hidden />
        <div className="auth__inputContainer">
          <label style={{ color: "#768088" }}>Как вас зовут</label>
          <input
            name="email"
            type="text"
            value={userUpdate.fullName}
            onChange={fullNameChangeHandler}
            placeholder="Не указано"
          />
        </div>
      </Modal>
    </div>
  );
};

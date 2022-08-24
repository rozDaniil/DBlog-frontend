import React, { useEffect, useRef, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

import {
  fetchAddPosts,
  fetchUpdatePosts,
} from "../redux/slices/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import axios from "../api";

interface PostType {
  title: string;
  text: string;
  imageUrl: string | null;
  tags: [] | string[];
}

export const AddPost = () => {
  const { userData } = useAppSelector(({ user }) => user);
  const { postsStatus } = useAppSelector(({ posts }) => posts);
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<PostType>({
    title: "",
    text: "",
    imageUrl: null,
    tags: [] as string[],
  });
  const imageRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: post.text + String(Math.random()),
      },
    }),
    []
  );

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        formData.append("image", file);
        const { data } = await axios.post("/upload", formData);
        setPost((prev) => ({ ...prev, imageUrl: data.url }));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onRemoveImage = () => {
    setPost((prev) => ({ ...prev, imageUrl: null }));
  };

  const onTextChange = React.useCallback((value: string) => {
    setPost((prev) => ({ ...prev, text: value }));
  }, []);
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({ ...prev, title: e.target.value }));
  };
  const onTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({ ...prev, tags: e.target.value.split(",") }));
  };

  const onAddPostHandler = () => {
    isEditing
      ? dispatch(fetchUpdatePosts({ id, payload: post }))
      : dispatch(fetchAddPosts(post));
    navigate("/");
  };

  useEffect(() => {
    if (isEditing) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setPost(data);
      });
    }
  }, []);

  useEffect(() => {
    if (postsStatus !== null) {
      postsStatus.map((error) => message.error(error.msg));
    }
  }, [postsStatus]);

  if (!localStorage.getItem("DToken") && !userData) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="addPost">
      <div className="addPost__upload">
        {!post.imageUrl && (
          <button
            className="button btn--type-3"
            onClick={() => imageRef.current && imageRef.current.click()}
          >
            Загрузить превью
          </button>
        )}
        <input onChange={handleChangeFile} ref={imageRef} type="file" hidden />
        {post.imageUrl && (
          <button
            style={{ fontSize: "15px" }}
            className="button btn--type-3 remove"
            onClick={onRemoveImage}
          >
            Удалить изображение
          </button>
        )}
      </div>
      {post.imageUrl && (
        <img
          width={400}
          src={`${process.env.REACT_APP_API_URL}${post.imageUrl}`}
          alt="Uploaded"
        />
      )}
      <div>
        <input
          className="addPost__title"
          type="text"
          placeholder="Заголовок статьи..."
          value={post.title}
          onChange={onTitleChange}
        />
      </div>
      <div>
        <input
          className="addPost__tags"
          type="text"
          placeholder="Тэги..."
          value={post.tags}
          onChange={onTagsChange}
        />
      </div>
      <SimpleMDE
        className="editor"
        value={post.text}
        onChange={onTextChange}
        options={options}
      />
      <div className="addPost__control">
        <button
          style={{ marginRight: "15px" }}
          onClick={onAddPostHandler}
          className="button btn--type-4"
        >
          {isEditing ? "Сохранить" : "Написать"}
        </button>
        <button onClick={onAddPostHandler} className="button btn--type-4">
          <Link style={{ color: "white" }} to={"/"}>
            Отмена
          </Link>
        </button>
      </div>
    </div>
  );
};

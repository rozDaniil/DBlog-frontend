import React, { ReactNode, useEffect, useState } from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import cn from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";

import { LoginSchema } from "../utils/schemes/loginSchema";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUserLogin, setUserStatus } from "../redux/slices/auth/userSlice";

export const Login = () => {
  const dispatch = useAppDispatch();
  const { userData, userStatus } = useAppSelector(({ user }) => user);
  const [passwordVisible, setpasswordVisible] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const form = useForm({
    mode: "all",
    resolver: yupResolver(LoginSchema),
  });

  const passwordVisibleToggler = () => setpasswordVisible(!passwordVisible);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, email: e.target.value }));
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, password: e.target.value }));
  };
  const onSubmit = () => {
    dispatch(fetchUserLogin(loginData));
    dispatch(setUserStatus(""));
  };

  useEffect(() => {
    if (userStatus !== "") {
      message.error(userStatus);
    }
  }, [userStatus]);

  useEffect(() => {
    return () => {
      dispatch(setUserStatus(""));
    };
  }, []);

  if (!!userData) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="auth">
      <div className="formContainer">
        <h1 className="authTitle">Вход в аккаунт</h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="auth__inputContainer">
            <label>{form.formState.errors?.email?.message as ReactNode}</label>
            <input
              {...form.register("email")}
              name="email"
              type="text"
              value={loginData.email}
              onChange={emailHandler}
              placeholder="Введите почту"
              className={cn(
                form.formState.errors.email?.message && "inputWarning"
              )}
            />
          </div>
          <div className="auth__inputContainer auth__inputContainer--password">
            <label>
              {form.formState.errors?.password?.message as ReactNode}
            </label>
            <div>
              <input
                {...form.register("password")}
                name="password"
                type={passwordVisible ? "password" : "text"}
                value={loginData.password}
                onChange={passwordHandler}
                placeholder="Введите пароль"
                className={cn(
                  form.formState.errors.password?.message && "inputWarning"
                )}
              />
              {passwordVisible ? (
                <EyeOutlined
                  onClick={passwordVisibleToggler}
                  className="auth__inputContainer--password-icon"
                />
              ) : (
                <EyeInvisibleOutlined
                  onClick={passwordVisibleToggler}
                  className="auth__inputContainer--password-icon"
                />
              )}
            </div>
          </div>
          <button
            // disabled={!form.formState.isValid}
            type="submit"
            className={cn(
              "button btn--type-2"
              // !form.formState.isValid && "btn--disabled"
            )}
          >
            Войти
          </button>
        </form>

        <div className="auth__changeForm">
          <span>Впервые у нас?</span>
          <Link to="/register">Зарегестрироваться</Link>
        </div>
      </div>
      <div className="auth__backHome">
        <ArrowLeftOutlined className="auth__backHome--icon" />
        <Link to="/" className="auth__backHome--text">
          На главную
        </Link>
      </div>
    </div>
  );
};

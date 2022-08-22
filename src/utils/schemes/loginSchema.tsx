import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup.string().email("Неверная почта").required("Почта обязательна"),
  password: yup
    .string()
    .min(5, "Длина пароля должна быть не менее 5 символов")
    .required("Введите пароль"),
});

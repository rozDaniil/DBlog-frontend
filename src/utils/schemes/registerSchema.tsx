import * as yup from "yup";

export const RegisterSchema = yup.object({
  email: yup.string().email("Неверная почта").required("Почта обязательна"),
  password: yup
    .string()
    .min(5, "Длина пароля должна быть не менее 5 символов")
    .required("Введите пароль"),
  fullName: yup
    .string()
    .min(3, "Минимум 3 символа")
    .required("Имя пользователя обязательно"),
});

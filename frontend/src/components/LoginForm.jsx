import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ setter }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios
      .post("http://localhost/account/login", values)
      .then((r) => {
        const userStr = JSON.stringify(r.data);
        localStorage.setItem("user", userStr);
        setter(r.data);

        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: "Введите почту",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Введите пароль",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
      <NavLink to={"/registration"}>Зарегестрироваться</NavLink>
    </Form>
  );
};
export default LoginForm;

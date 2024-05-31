import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const RegForm = ({ setter }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios
      .post("http://localhost/account/register", values)
      .then((r) => {
        const userStr = JSON.stringify(r.data);
        localStorage.setItem("user", userStr);
        // console.log(r.data);
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
        label="Имя"
        name="username"
        rules={[
          {
            required: true,
            message: "Введите имя пользователя",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
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

      {/*<Form.Item*/}
      {/*  name="remember"*/}
      {/*  valuePropName="checked"*/}
      {/*  wrapperCol={{*/}
      {/*    offset: 8,*/}
      {/*    span: 16,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Checkbox>Запомнить меня</Checkbox>*/}
      {/*</Form.Item>*/}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Зарегестрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegForm;

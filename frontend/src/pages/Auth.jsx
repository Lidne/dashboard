import React from "react";
import LoginForm from "../components/LoginForm";

const Auth = ({setter}) => {
  return (
    <div>
      <LoginForm setter={setter}/>
    </div>
  );
};

export default Auth;

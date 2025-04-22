// LoginComponent.js
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getUserInfo, loginUser } from "../../services/user.service";
import styled from "styled-components";
import LoginLogoImg from "../../assets/images/cock.png";
import Button from "../Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { updatePublicAddress, refresh, updateRefresh } =
    useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();

  const handleMove = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        toast.warning("Some required information is missing ");
        return;
      }
      const response = await loginUser({
        username: username,
        password: password,
      });
      if (response) {
        const { token } = response;
        const data = await getUserInfo({ token: token });
        localStorage.setItem("token", token); // Save token to localStorage
        if (data.publicKeys && data.publicKeys.length > 0) {
          updatePublicAddress(data.publicKeys[0]);
        }
        updateRefresh(!refresh);
        navigate("/");
        toast.success("You’ve successfully signed in.");
      }
    } catch (error) {
      toast.error(
        "We couldn’t sign you in. Please check your credentials and try again"
      );
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LoginWrapper>
      <LoginLogo src={LoginLogoImg} onClick={handleMove} />
      <LoginTitle>Login in</LoginTitle>
      <LoginInput
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <LoginInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        padding={"15px"}
        fsize={"18px"}
        border={""}
        maxwidth={windowSize.width > 570 ? "360px" : "280px"}
        onClick={handleLogin}
      >
        Login
      </Button>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 520px;
  background-color: rgba(152, 3, 18, 0.1);
  border: 1px solid #980312;
  max-width: 520px;
  width: 100%;
  border-radius: 8px;
  gap: 20px;
  user-select: none;
  @media screen and (max-width: 570px) {
    max-width: 350px;
  }
`;
const LoginTitle = styled.div`
  font-size: 32px;
  font-family: "aquire";
`;
const LoginLogo = styled.img`
  width: 70px;
`;
const LoginInput = styled.input`
  border: 1px solid #980312;
  padding: 16px 12px;
  outline: none;
  background-color: transparent;
  border-radius: 12px;
  width: 360px;
  color: white;
  @media screen and (max-width: 570px) {
    width: 280px;
  }
`;

export default Login;

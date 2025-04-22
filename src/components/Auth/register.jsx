// RegisterComponent.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { createNewUser, googleCaptcha } from "../../services/user.service";
import styled from "styled-components";
import RegisterLogoImg from "../../assets/images/cock.png";
import Button from "../Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const { refresh, updateRefresh, open, setOpen } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const recaptcha = useRef();
  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleMove = () => {
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password !== password2) {
        toast.warning("Password does not match");
        return;
      }
      if (!username || !password) {
        toast.warning("Some required information is missing ");
        return;
      }
      const captchaValue = recaptcha.current.getValue();

      if (!captchaValue) {
        toast.warning("Please verify the reCAPTCHA!");
        return;
      }
      const verify = await googleCaptcha({ captchaValue });
      if (verify?.data?.success) {
        const response = await createNewUser({
          username: username,
          password: password,
        });
        if (response) {
          localStorage.setItem("token", response.token); // Save token to localStorage
          updateRefresh(!refresh);
          setOpen(true);
          navigate("/");
          toast.success("Your account has been created.");
        }
      } else {
        toast.warning("reCAPTCHA validation failed!");
      }
    } catch (error) {
      const text = error?.response?.data?.message;
      toast.warning("Register failed:" + text)
      console.error("Register failed:", error);
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
    <RegisterWrapper>
      <RegisterLogo src={RegisterLogoImg} onClick={handleMove} />
      <RegisterTitle>Sign Up</RegisterTitle>
      <RegisterInput
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <RegisterInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <RegisterInput
        type="password"
        placeholder="Comfirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE__APP_SITE_KEY} />
      <Button
        padding={"15px"}
        fsize={"18px"}
        border={""}
        maxwidth={windowSize.width > 570 ? "360px" : "280px"}
        onClick={handleRegister}
      >
        Sign Up
      </Button>
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 620px;
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
const RegisterTitle = styled.div`
  font-size: 32px;
  font-family: "aquire";
`;
const RegisterLogo = styled.img`
  width: 70px;
`;
const RegisterInput = styled.input`
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

export default Register;

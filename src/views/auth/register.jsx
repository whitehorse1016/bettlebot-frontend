import styled from "styled-components";
import Register from "../../components/Auth/register";

const AuthRegisterView = () => {
  return (
    <AuthViewWrapper>
      <Register />
    </AuthViewWrapper>
  );
};

const AuthViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export default AuthRegisterView;

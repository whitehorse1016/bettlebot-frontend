import styled from "styled-components";
import Login from "../../components/Auth";

const AuthView = () => {
  return (
    <AuthViewWrapper>
      <Login />
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

export default AuthView;

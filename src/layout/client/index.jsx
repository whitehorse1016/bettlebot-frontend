import Header from "./header";
import Footer from "./footer";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
`;

export default Layout;

import Header from "./header";
import styled from "styled-components";

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            <Container>{children}</Container>
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

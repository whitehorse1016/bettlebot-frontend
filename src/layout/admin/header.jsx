import styled from "styled-components";
import Admin from "../../assets/images/admin.png";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderTitle>Admin dashboard</HeaderTitle>
        <HeaderBarWrapper>
          <HeaderText>View Users</HeaderText>
          <HeaderText>VOTE</HeaderText>
          <HeaderBarImg src={Admin} />
        </HeaderBarWrapper>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1600px;
  width: 100%;
  margin: auto;
  padding: 20px 0px;
`;

const HeaderTitle = styled.div`
  font-size: 32px;
  font-family: "aquire";
`;

const HeaderBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`;

const HeaderText = styled.div`
  font-size: 18px;
  color: #eeeeee;
`;
const HeaderBarImg = styled.img`
  margin-left: 150px;
`;

export default Header;

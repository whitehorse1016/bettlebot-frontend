import styled from "styled-components";

const Button = (props) => {
  return (
    <ButtonWrapper
      padding={props.padding}
      fsize={props.fsize}
      border={props.border}
      maxwidth={props.maxwidth}
      onClick={props.onClick}
      bgcolor={props.bgcolor}
      color={props.color}
    >
      {props.children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  border-radius: 8px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fsize};
  border: ${(props) => props.border};
  max-width: ${(props) => props.maxwidth};
  background: ${props => props.bgcolor ? props.bgcolor : "linear-gradient(90deg, rgba(152, 3, 18, 1) 0%,rgba(255, 194, 0, 1) 100%);"} ;
  cursor: pointer;
  user-select: none;
  color: ${(props) => props.color};
`;

export default Button;

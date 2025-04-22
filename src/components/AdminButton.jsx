import styled from "styled-components";

const AdminButton = (props) => {
  return (
    <AdminButtonWrapper
      bgcolor={props.bgcolor}
      color={props.color}
      width={props.width}
      padding={props.padding}
      onClick={props.onClick}
      height={props.height}
      disabled={props.disabled}
    >
      {props.icon && props.icon}
      {props.text && (
        <ButtonText fweight={props.fweight}>{props.text}</ButtonText>
      )}
    </AdminButtonWrapper>
  );
};

const AdminButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  border-radius: 8px;
  color: ${(props) => props.color && props.color};
  gap: 5px;
  padding: ${(props) => (props.padding ? props.padding : "10px")};
  width: ${(props) => props.width && props.width};
  height: ${(props) => props.height && props.height};
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
`;
const ButtonText = styled.span`
  margin-left: 5px;
  font-weight: ${(props) => props.fweight && props.fweight};
`;
export default AdminButton;

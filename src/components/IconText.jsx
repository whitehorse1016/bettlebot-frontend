import styled from "styled-components";

const IconText = (props) => {
  return (
    <IconTextWrapper gap={props.gap} padding={props.padding}>
      <IconTextText fweight={props.fweight} fsize={props.fsize} color={props.color}>
        {props.pretext}
      </IconTextText>
      <IconTextIcon
        width={props.width}
        height={props.height}
        iconwidth={props.iconwidth}
        iconheight={props.iconheight}
      >
        {props.img && (
          <IconTextImg
            src={props.img}
            iconwidth={props.iconwidth}
            iconheight={props.iconheight}
          />
        )}
        {props.icon && props.icon}
      </IconTextIcon>
      <IconTextText fweight={props.fweight} fsize={props.fsize} >
        {props.text}
      </IconTextText>
    </IconTextWrapper>
  );
};

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.gap ? props.gap : "5px")};
  padding: ${(props) => props.padding && props.padding};
`;

const IconTextText = styled.div`
  font-size: ${(props) => props.fsize};
  font-weight: ${(props) => props.fweight};
  color: ${(props) => props.color};
`;
const IconTextIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50px;
  background-color: black;
  svg {
    width: ${(props) => props.iconwidth};
    height: ${(props) => props.iconheight};
  }
`;

const IconTextImg = styled.img`
  width: ${(props) => props.iconwidth};
  height: ${(props) => props.iconheight};
`;

export default IconText;

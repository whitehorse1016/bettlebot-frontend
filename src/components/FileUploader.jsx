import { useState } from "react";
import styled from "styled-components";
import { uploadTeamImage } from "../services/bet.service";
import { useBets } from "../context/BetContext";

const FileUploader = ({ setTeamUri, teamIndex, betid }) => {
  const [fileName, setFileName] = useState("No File Chosen");
  const { betRefresh, updateBetRefresh } = useBets();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName("Change Red Team Image");
      const imageUrl = URL.createObjectURL(file);
      setTeamUri(imageUrl);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("betId", betid); // The ID of the bet you want to update
      formData.append("teamIndex", teamIndex); // Index of the team you want to update (0 for the first team)
      await uploadTeamImage(formData);
      updateBetRefresh(!betRefresh);
    }
  };

  return (
    <InputWrapper>
      <StyledLabel>{fileName}</StyledLabel>
      <StyledButton>Choose File</StyledButton>
      <HiddenInput type="file" onChange={handleFileChange} accept="image/*" />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  max-width: 320px;
  position: relative;
`;

const StyledLabel = styled.span`
  color: #fff;
  font-size: 14px;
`;

const StyledButton = styled.div`
  background-color: rgba(255, 194, 0, 0.05);
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ffc200;
`;

const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
`;

export default FileUploader;

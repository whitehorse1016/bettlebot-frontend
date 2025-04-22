import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import clipboardCopy from "clipboard-copy";
import { IoCopy } from "react-icons/io5";
import { TbCopyCheckFilled } from "react-icons/tb";
import { getPrivateKeys } from "../../services/user.service";
import { UserContext } from "../../context/UserContext";
import bs58 from "bs58";
import { toast } from "react-toastify";

const ModalBar = ({ open, setOpen }) => {
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [privatekey, setPrivatekey] = useState("");
  const { publicAddress } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const onCloseModal = () => setOpen(false);
  const handleCopy = (text, flag) => {
    if (flag == 1) {
      setFlag(!flag);
    } else {
      setFlag2(!flag2)
    }

    clipboardCopy(text)
      .then(() => {
        if (flag == 1) {
          toast.info("Private Key copied")
        }
        else if (flag == 2) {
          toast.info("Public Key copied")
        }
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleGetPrivate = async () => {
    try {
      const data = await getPrivateKeys({ token });
      const base58PrivateKey = bs58.encode(
        Uint8Array.from(data.privateKeys[0].split(",").map(Number))
      );
      setPrivatekey(base58PrivateKey);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (open == true) {
      handleGetPrivate();
    }
  }, []);

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
      closeIcon={<HeaderTimes>&times;</HeaderTimes>}
    >
      <ModalWrapper>&nbsp;</ModalWrapper>
      <ModalWrapper>
        <ModalContainer>
          <ModalContentTitle>Private Key</ModalContentTitle>
          <ModalContentWrapper>
            <ModalContentText>{privatekey}</ModalContentText>
            <CopyIconWrapper onClick={() => handleCopy(privatekey, 1)}>
              {flag === false ? (
                <IoCopy />
              ) : (
                <IoCopy />
              )}
            </CopyIconWrapper>
          </ModalContentWrapper>
        </ModalContainer>
        <ModalContainer>
          <ModalContentTitle>Public Key</ModalContentTitle>
          <ModalContentWrapper>
            <ModalContentText>{publicAddress}</ModalContentText>
            <CopyIconWrapper onClick={() => handleCopy(publicAddress, 2)}>
              {flag2 === false ? (
                <IoCopy />
              ) : (
                <IoCopy />
              )}
            </CopyIconWrapper>
          </ModalContentWrapper>
        </ModalContainer>
      </ModalWrapper>
    </Modal>
  );
};
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ModalContentTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const ModalContentText = styled.div`
  max-width: 350px;
  word-wrap: break-word;
`;
const HeaderTimes = styled.div`
  font-size: 36px;
  user-select: none;
  cursor: pointer;
  color: white;
`;

const CopyIconWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 4px;
  justify-content: center;
  padding: 0px 10px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  svg {
    color: white;
  }
`;

export default ModalBar;

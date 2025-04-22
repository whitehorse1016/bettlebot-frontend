import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import AdminButton from "../AdminButton";
import LoadingImg from "../../assets/images/loading.gif";


const ComfirmModalBar = ({ open, setOpen, handlePlaceBet, loading, setLoading, balance, team }) => {
    const onCloseModal = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
                overlay: "customOverlay",
                modal: "customModal",
            }}
            closeIcon={<HeaderTimes></HeaderTimes>}
        >

            <ModalWrapper>

                <HeaderTitle>   {loading == true ? "Your Bet Is Being Processed!" : "Place Your Bet!"} </HeaderTitle>
                <HeaderContent>  {loading == true ? "Hang tight, we're confirming your bet... We're reviewing your bet and making sure everything is set. This will only take a moment." : `Are you sure you want to make this bet in ${team} Team with ${balance} sol?`}
                </HeaderContent>
                {loading == true ? <LoadingImage src={LoadingImg} /> : <ModalContainer>
                    <ButtonGroup>
                        <AdminButton
                            bgcolor="#005BBF"
                            color="white"
                            width="100px"
                            fweight="500"
                            padding="5px 10px"
                            text="Accept"
                            onClick={handlePlaceBet}
                        />
                        <AdminButton
                            bgcolor="#980312"
                            color="white"
                            width="100px"
                            fweight="500"
                            padding="5px 10px"
                            text="Cancel"
                            onClick={onCloseModal}
                        />
                    </ButtonGroup>
                </ModalContainer>}

            </ModalWrapper>
        </Modal>
    );
};
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items:flex-end; 
`;

const HeaderTimes = styled.div`
  font-size: 36px;
  user-select: none;
  cursor: pointer;
  color: white;
`;

const HeaderTitle = styled.div`
    font-size:20px;
    font-weight:500
`
const ButtonGroup = styled.div`
    display:flex;
    gap:20px
`
const HeaderContent = styled.div`
`
const LoadingImage = styled.img`
`
export default ComfirmModalBar;

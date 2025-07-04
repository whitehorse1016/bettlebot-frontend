import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SiSolana } from "react-icons/si";
import { shortenAddress } from "../utills";
import { UserContext } from "../context/UserContext";
import {
  getCurrenSolPrice,
  getPrivateKeys,
  withdrawFund,
} from "../services/user.service";
import { toast } from "react-toastify";
import AdminButton from "./AdminButton";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import bs58 from "bs58";
import { IoCopy } from "react-icons/io5";
import clipboardCopy from "clipboard-copy";
import LogoutComponent from "./Auth/logout";
import { Tooltip } from "react-tooltip";

const WalletButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { publicAddress, withdrawHistory, totalbalance } =
    useContext(UserContext);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [solPrice, setSolPrice] = useState(0);
  const [solPNL, setSolPNL] = useState(0);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(0);
  const [flag2, setFlag2] = useState(false);
  const [privatekey, setPrivatekey] = useState("");
  const token = localStorage.getItem("token");

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      if (!address || amount == 0) {
        toast.warning("Please Enter Correct Info");
        return;
      }
      const token = localStorage.getItem("token");

      const response = await withdrawFund({
        token: token,
        amount: amount,
        recipientAddress: address,
        privateKeyIndex: 0,
      });
      toast.success("Withdraw Success");
      setLoading(false);
    } catch (error) {
      toast.success("Withdraw Failed");
      setLoading(false);
      console.log(error);
    }
  };

  const getCurrentSolPrice = async () => {
    try {
      const response = await getCurrenSolPrice({ token: token });
      if (response) {
        const solanaPrice = response?.data?.solana?.usd;

        const solana24hChange = response?.data?.solana?.usd_24h_change;

        // Set expiration in minutes (e.g., 10 minutes)
        const expirationInMinutes = 10;
        const now = new Date();
        const item = {
          data: response.data.solana,
          expiry: now.getTime() + expirationInMinutes * 60 * 1000, // Convert minutes to milliseconds
        };

        localStorage.setItem("solinfo", JSON.stringify(item));

        console.log(`Solana Price: $${solanaPrice}`);
        setSolPrice(solanaPrice);
        setSolPNL(solana24hChange.toFixed(2));
        console.log(`Solana 24h Change: ${solana24hChange.toFixed(2)}%`);
      }
    } catch (error) {
      console.error("Error fetching Solana data:", error);
    }
  };

  const getSolInfo = () => {
    const itemStr = localStorage.getItem("solinfo");
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();
    // Check if the item has expired
    if (now.getTime() > item?.expiry) {
      localStorage.removeItem("solinfo");
      return null;
    }
    setSolPNL(item?.data?.usd_24h_change);

    return item?.data; // Return the stored data if not expired
  };

  const handleCopy = (text) => {
    clipboardCopy(text)
      .then(() => {
        toast.info("Text Copied");
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
      setFlag2(true);
    } catch (error) {
      setFlag2(false);
      console.log(error);
    }
  };
  const handleRemove = () => {
    try {
      setFlag2(false);
      setPrivatekey("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = getSolInfo();
    if (!data) {
      getCurrentSolPrice();
    }
  }, []);

  return (
    <Container>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <Icon>
          <SiSolana />
        </Icon>
        <WalletAddress>{shortenAddress(publicAddress, 5, 5)}</WalletAddress>
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </Button>
      {isOpen && (
        <DropdownContent>
          {flag == 0 && (
            <>
              <HeaderTitleWrapper>
                <HeaderTitle>my assets</HeaderTitle>
                <HeaderTimes onClick={() => setIsOpen(false)}>
                  &times;
                </HeaderTimes>
              </HeaderTitleWrapper>
              <ContentHeader>
                <Icon2>
                  <SiSolana />
                </Icon2>
                <FullAddress>
                  {shortenAddress(publicAddress, 14, 14)}
                </FullAddress>
              </ContentHeader>
              <BalanceInfo>
                {!flag2 ? (
                  <TitleBar>
                    <Title>Total Balance</Title>{" "}
                    <IoMdEye
                      onClick={handleGetPrivate}
                      className="my-anchor-element"
                    />
                    <Tooltip anchorSelect=".my-anchor-element" place="top">
                      Show Private Key
                    </Tooltip>
                  </TitleBar>
                ) : (
                  <TitleBar>
                    <Title>Private Key</Title>{" "}
                    <IoMdEyeOff
                      onClick={handleRemove}
                      className="my-anchor-element2"
                    />
                    <Tooltip anchorSelect=".my-anchor-element2" place="top">
                      Hide private key
                    </Tooltip>
                  </TitleBar>
                )}
                {!flag2 ? (
                  <Balance>{totalbalance && totalbalance} SOL</Balance>
                ) : (
                  <PrivatekeyBar>{privatekey && privatekey}</PrivatekeyBar>
                )}
                {flag2 && (
                  <AdminButton
                    bgcolor="#980312"
                    color="white"
                    width="100%"
                    text={
                      <CopyBar>
                        <IoCopy />
                        &nbsp;Copy
                      </CopyBar>
                    }
                    fweight="500"
                    onClick={() => handleCopy(privatekey)}
                    disabled={loading}
                  />
                )}

                <PNL color={solPNL > 0 ? " #7dff7d" : "red"}>
                  Today PNL <span> ( {solPNL} % ) </span>
                </PNL>
              </BalanceInfo>
              <ButtonGroup>
                <ActionButton
                  color="#980312"
                  onClick={() => handleCopy(publicAddress)}
                >
                  Deposit
                </ActionButton>
                <ActionButton
                  color="rgba(255, 194, 0, 0.05)"
                  // onClick={handleWithdraw}
                  onClick={() => setFlag(2)}
                  disabled={loading}
                  border={"1px solid #FFFFFF"}
                >
                  Withdraw
                </ActionButton>
              </ButtonGroup>
              <HistoryTitle>HISTORY</HistoryTitle>
              <History onClick={() => setFlag(1)}>
                <HistoryItem>
                  <HistoryType>Withdraw</HistoryType>
                  <HistoryAmount>more...</HistoryAmount>
                </HistoryItem>
              </History>
            </>
          )}
          {flag == 1 && (
            <WithdrawWrapper>
              <HeaderTitleWrapper>
                <HistoryTitle2>HISTORY</HistoryTitle2>
                <HeaderTimes onClick={() => setFlag(0)}>&times;</HeaderTimes>
              </HeaderTitleWrapper>
              {withdrawHistory.length > 0 &&
                withdrawHistory.map((item, key) => (
                  <WithdrawContent
                    key={key}
                    onClick={() => handleCopy("https://solscan.io/tx/" + item)}
                  >
                    {shortenAddress(item, 14, 14)}
                  </WithdrawContent>
                ))}
            </WithdrawWrapper>
          )}
          {flag == 2 && (
            <WithdrawWrapper>
              <HeaderTitleWrapper>
                <HistoryTitle2>WithDraw</HistoryTitle2>
                <HeaderTimes onClick={() => setFlag(0)}>&times;</HeaderTimes>
              </HeaderTitleWrapper>
              <WithdrawInputWrapper>
                <WithdrawInput
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <WithdrawInput
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <AdminButton
                  bgcolor="#980312"
                  color="white"
                  width="100%"
                  text="Withdraw"
                  fweight="500"
                  onClick={handleWithdraw}
                  disabled={loading}
                />
              </WithdrawInputWrapper>
            </WithdrawWrapper>
          )}
          <LogoutComponent />
        </DropdownContent>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-color: #191919;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: #980312;
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  gap: 10px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon2 = styled(Icon)`
  width: 14px;
  height: 14px;
  font-size: 8px;
`;

const WalletAddress = styled.span`
  font-size: 16px;
  margin-right: 8px;
`;

const Arrow = styled.span`
  font-size: 12px;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 100%;
  right: -55px;
  width: 300px;
  background-color: #1a1a1a;
  color: #fff;
  border-radius: 22px;
  padding: 20px;
  margin-top: 8px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "aquire";
  font-size: 20px;
`;

const HeaderTimes = styled.div`
  font-size: 40px;
  user-select: none;
  cursor: pointer;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #980312;
  padding: 8px;
  border-radius: 8px;
`;

const FullAddress = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;

const BalanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #980312;
  background-color: rgba(42, 42, 42, 0.8);
  padding: 14px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.09);
  backdrop-filter: blur(42px);
`;

const Title = styled.div`
  font-size: 16px;
`;

const Balance = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

const PNL = styled.div`
  font-size: 12px;
  color: #888;
  span {
    color: ${(props) => props.color && props.color};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid #980312;
  padding: 5px;
  gap: 10px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
  color: #fff;
  border: ${(props) => (props.border ? props.border : "none")};
  cursor: pointer;
`;

const HistoryTitle = styled.div`
  font-size: 16px;
  font-family: "aquire";
`;
const HistoryTitle2 = styled(HistoryTitle)`
  font-size: 20px;
`;

const History = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(152, 3, 18, 0.18);
  padding: 10px;
  border-radius: 8px;
`;

const HistoryType = styled.div`
  font-size: 14px;
  color: #ffffff;
`;

const HistoryAmount = styled.div`
  font-size: 14px;
  color: #ffc200;
`;

const WithdrawWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WithdrawContent = styled.div`
  max-width: 300px;
  cursor: pointer;
`;

const WithdrawInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WithdrawInput = styled.input`
  border: 1px solid white;
  padding: 16px 12px;
  outline: none;
  background-color: transparent;
  border-radius: 8px;
  width: 280px;
  color: white;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 20px;
    cursor: pointer;
  }
`;

const PrivatekeyBar = styled.div`
  word-wrap: break-word;
`;
const CopyBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default WalletButton;

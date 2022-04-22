import { Button, Badge } from "react-bootstrap";
import React from "react";
import { useWallet } from "use-wallet";

const WalletConnectButton = () => {
  const wallet = useWallet();

  return (
    <>
      {wallet.status === "connected" ? (
        <span>
          <Button>{wallet.account.substring(0, 10) + "..."}</Button>{" "}
          <Button onClick={() => wallet.reset()}>Disconnect</Button>
        </span>
      ) : (
        <Button onClick={() => wallet.connect()}>Connect Wallet</Button>
      )}
    </>
  );
};

export default WalletConnectButton;

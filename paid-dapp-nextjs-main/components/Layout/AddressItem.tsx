import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "reactstrap";
import styles from "./AddressItem.module.scss";
import DisconnectIcon from "./disconnect.svg";
import NetworkWarningIcon from "./network-warning.svg";

interface AddressItemProps {
  networkName: string;
  isOpen: boolean;
  account: string;
  onDisconnect(): void;
}

export function AddressItem({
  networkName,
  isOpen,
  account,
  onDisconnect,
}: AddressItemProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const isBSC = networkName === "bnbt" || networkName === "bnb";
  const listIcon = `/assets/icon/${
    isBSC ? "binanceSmartChain.png" : "ethereum.png"
  }`;

  const wallet = `${account?.slice(0, 4)}...${account?.slice(-4)}`;

  return (
    <li className="menu-item">
      <img src={listIcon} alt="" />
      {isOpen && (
        <div className={styles.account}>
          <span>{wallet}</span>

          {!isBSC && (
            <>
              <Image
                src={NetworkWarningIcon}
                id="network-warning-icon"
                onMouseOver={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              />

              <Tooltip target="network-warning-icon" isOpen={tooltipVisible}>
                For lower fees we highly recommend using BSC network.
              </Tooltip>

              <div className={styles.separator} />
            </>
          )}

          <Image src={DisconnectIcon} onClick={onDisconnect} />
        </div>
      )}
    </li>
  );
}

import React, {
    useState,
    Fragment
} from 'react';
import { Tooltip } from 'reactstrap';
import styles from './AgreementPreviewModal.module.scss';

export const CustomTooltip = ({ children, id, text, ...rest }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div className={styles.iconMargin}>
            {children}
            < Tooltip className={styles["tooltip-inner"]} placement="right" isOpen={tooltipOpen} autohide={false} target={id} toggle={toggle} style={{ opacity: 1, maxWidth: "204px", background: "#ffffff", fontFamily: "Circular Std", fontSize: 11, color: "#110252", padding: "10px" }} >
                {text}
            </Tooltip >
        </div >
    );
};
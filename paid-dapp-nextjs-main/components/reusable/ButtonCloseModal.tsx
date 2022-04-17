import React, { ButtonHTMLAttributes, FC } from 'react';

// eslint-disable-next-line no-undef
const ButtonCloseModal: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="btn-close-modal" onClick={onClick} type="button">
    <img src="/assets/icon/close.svg" alt="" />
  </button>
);

export default ButtonCloseModal;

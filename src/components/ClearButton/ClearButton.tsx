import type { FC } from "react";

import "./ClearButton.scss";

type ClearButtonProps = {
  text?: string;
  handleClick: () => void;
};

const ClearButton: FC<ClearButtonProps> = ({ text, handleClick }) => (
  <button className="clear-btn" onClick={handleClick}>
    {text}
  </button>
);

export default ClearButton;

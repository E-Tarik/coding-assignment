import type { FC, PropsWithChildren } from "react";

import "./Footer.scss";

const Footer: FC<PropsWithChildren> = ({ children }) => {
  return <footer className="footer">{children}</footer>;
};

export default Footer;

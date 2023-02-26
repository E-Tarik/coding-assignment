import type { FC } from "react";

type TitleProps = {
  text: string;
};

const Title: FC<TitleProps> = ({ text }) => <h1 className="header">{text}</h1>;

export default Title;

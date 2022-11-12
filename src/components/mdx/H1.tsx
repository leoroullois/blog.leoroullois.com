import { FC, PropsWithChildren } from "react";
import { getAnchor } from "@lib/utils";

const H1: FC<PropsWithChildren> = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h1 id={anchor}>
      {children}
    </h1>
  );
};

export default H1;

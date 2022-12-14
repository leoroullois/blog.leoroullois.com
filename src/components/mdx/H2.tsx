import { FC, PropsWithChildren } from "react";
import { getAnchor } from "@lib/utils";

const H2: FC<PropsWithChildren> = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h2 id={anchor}>
      {children}
    </h2>
  );
};

export default H2;

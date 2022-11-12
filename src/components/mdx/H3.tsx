import { FC, PropsWithChildren } from "react";
import { getAnchor } from "@lib/utils";

const H3: FC<PropsWithChildren> = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h3 id={anchor}>
      {children}
    </h3>
  );
};

export default H3;

import { FC, PropsWithChildren } from "react";
import { getAnchor } from "@lib/utils";

const H4: FC<PropsWithChildren> = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h4 id={anchor}>
      {children}
    </h4>
  );
};

export default H4;

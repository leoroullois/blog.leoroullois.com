import { FC, PropsWithChildren } from "react";
import { getAnchor } from "@lib/utils";

const H6: FC<PropsWithChildren> = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h6 id={anchor}>
      {children}
    </h6>
  );
};

export default H6;

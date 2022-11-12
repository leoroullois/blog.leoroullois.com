import { FC, PropsWithChildren } from "react";
import { getAnchor } from "@lib/utils";

const H5: FC<PropsWithChildren> = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h5 id={anchor}>
      {children}
    </h5>
  );
};

export default H5;

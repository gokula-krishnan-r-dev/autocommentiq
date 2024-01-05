"use client";

import { usePathname } from "next/navigation";

const DisplayChildrenOnPaths = ({ children, paths }: any) => {
  let pathname = usePathname();

  if (paths.includes(pathname)) {
    return children;
  }

  return <></>;
};

export default DisplayChildrenOnPaths;

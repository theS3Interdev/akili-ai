import React, { ReactNode } from "react";

type Children = {
  children: ReactNode;
};

const AuthenticationLayout = ({ children }: Children) => {
  return (
    <main className="flex h-full items-center justify-center">{children}</main>
  );
};

export default AuthenticationLayout;

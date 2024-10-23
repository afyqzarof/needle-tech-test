import React from "react";
import SignOut from "./Logout";
type HeaderProps = {
  title: string;
};
const Header = ({ title }: HeaderProps) => {
  return (
    <div className="px-8 py-4 bg-blue-500 flex justify-between items-center">
      <h1 className="text-3xl">{title}</h1>
      <SignOut />
    </div>
  );
};

export default Header;

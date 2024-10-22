import React from "react";
import SignOut from "./Logout";
type HeaderProps = {
  title: string;
};
const Header = ({ title }: HeaderProps) => {
  return (
    <div className="p-4 bg-yellow-100 flex justify-between items-center">
      <h1 className="text-3xl">{title}</h1>
      <SignOut />
    </div>
  );
};

export default Header;

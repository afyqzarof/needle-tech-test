import React from "react";
type HeaderProps = {
  title: string;
};
const Header = ({ title }: HeaderProps) => {
  return (
    <div className="p-4 bg-yellow-100">
      <h1 className="text-3xl">{title}</h1>
    </div>
  );
};

export default Header
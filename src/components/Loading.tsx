import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        height={50}
        width={50}
        src="/Hourglass.svg"
        alt="Loading"
        className="animate-spin-slow text-lg"
      />
    </div>
  );
};

export default Loading;

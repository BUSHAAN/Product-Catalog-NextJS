import React from "react";

const Heading = ({ title }: { title: string }) => {
  return <h1 className="text-3xl md:text-4xl font-bold my-8 text-white">{title}</h1>;
};

export default Heading;

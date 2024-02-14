import React from "react";

type Props = {
  mainHeader: string;
  subHeader?: string;
};

const SectionHeader = ({ mainHeader, subHeader }: Props) => {
  return (
    <div>
      <div className="text-center">
        <h3 className="uppercase text-gray-500 font-semibold">{subHeader}</h3>
        <h2 className="text-primary font-bold text-4xl italic capitalize">
          {mainHeader}
        </h2>
      </div>
    </div>
  );
};

export default SectionHeader;

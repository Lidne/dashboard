import React from "react";

const SecCard = ({ secData }) => {
  return (
    <div>
      <div className="flex flex-row rounded-lg bg-slate-300 flex-shrink size-min">
        <div className="m-4 flex flex-row gap-x-2">
          <div className="text-lg font-bold">{secData[2]}</div>
          <div className="text-xs italic">{secData[0]}</div>
        </div>
      </div>
    </div>
  );
};

export default SecCard;

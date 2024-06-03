import React from "react";
import { NavLink } from "react-router-dom";

const Props = () => {};

const MarqueeStock = ({ data }) => {
  const growth = (((data[11] - data[6]) / data[6]) * 100).toFixed(2);

  return (
    <NavLink to={`/security/${data[3]}`} className="flex flex-row space-x-3 mx-10 bg-zinc-200 rounded-full px-5 py-2 items-center mx-2">
      <div>{data[3]}</div>
      <div className="flex flex-col space-y-1 text-sm">
        <div>{data[11]}₽</div>
        {growth >= 0 ? <div className="text-xs text-lime-600">{growth}%</div> : <div className="text-xs text-red-600">{growth}%</div>}
        
      </div>
    </NavLink>
  );
};

export default MarqueeStock;

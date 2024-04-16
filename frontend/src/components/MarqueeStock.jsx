import React from "react";

const MarqueeStock = () => {
  return (
    <div className="flex flex-row space-x-3 mx-10">
      <div>
        <img src="/react.svg" />
      </div>
      <div className="flex flex-col space-y-1">
        <div>Цена: $100</div>
        <div>Рост: 2%</div>
      </div>
    </div>
  );
};

export default MarqueeStock;

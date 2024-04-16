import { useState } from "react";
import Header from "./components/Header.jsx";
import Marquee from "react-fast-marquee";
import MarqueeStock from "./components/MarqueeStock.jsx";

function App() {
  return (
    <>
      <Header />
      <Marquee pauseOnHover={true} speed={10}>
        <MarqueeStock />
        <MarqueeStock />
        <MarqueeStock />
        <MarqueeStock />
        <MarqueeStock />
        <MarqueeStock />
        <MarqueeStock />
      </Marquee>
      <div className="flex flex-row space-x-12 mt-12">
        <div className="flex flex-col space-y-4">
          <div>Инсайдерские сделки</div>
          <div className="flex flex-col space-y-6 border-3 border-solid border-gray rounded divide-y-2 divide-x-0 divide-solid">
            <div className="flex flex-row space-x-8">
              <div>Компания</div>
              <div>Название инсайдера</div>
              <div>Тип сделки</div>
              <div>Дата</div>
              <div>Объем сделки</div>
            </div>
            <div className="flex flex-row space-x-8">
              <img src="/react.svg" />
              <div>MCFARLAND KATHARINA G.</div>
              <div>Продажа</div>
              <div>12 апреля 2024</div>
              <div>95 486,4 $</div>
            </div>
            <div className="flex flex-row space-x-8">
              <img src="/react.svg" />
              <div>MCFARLAND KATHARINA G.</div>
              <div>Продажа</div>
              <div>12 апреля 2024</div>
              <div>95 486,4 $</div>
            </div>
            <div className="flex flex-row space-x-8">
              <img src="/react.svg" />
              <div>MCFARLAND KATHARINA G.</div>
              <div>Продажа</div>
              <div>12 апреля 2024</div>
              <div>95 486,4 $</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>Последние новости</div>
          <div className="flex flex-col space-y-2 divide-x-0 divide-y-2 divide-solid ">
            <div>
              <div>12 апреля 2024</div>
              <div>
                Деньги не спят. Что не страшно держать в портфеле сейчас?
              </div>
            </div>
            <div>
              <div>12 апреля 2024</div>
              <div>
                Деньги не спят. Что не страшно держать в портфеле сейчас?
              </div>
            </div>
            <div>
              <div>12 апреля 2024</div>
              <div>
                Деньги не спят. Что не страшно держать в портфеле сейчас?
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row space-x-10">
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

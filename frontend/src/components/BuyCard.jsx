import React, { useEffect, useState } from "react";
import { InputNumber, notification } from "antd";
import axios from "../utils/axios";

const BuyCard = ({ price, secId, updateBalance }) => {
  const [num, setNum] = useState(1);
  const [numPortfolio, setNumPortfolio] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const [currentPrice, setcurPrice] = useState(0);
  // const today = Date().getDate()
  const openNotification = (placement, descr) => {
    api.info({
      message: `Ошибка`,
      description: descr,
      placement,
      duration: 2,
    });
  };

  const parseDate = (date) => {
    // говнокодик)
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  };

  const today = parseDate(new Date());

  const fetchPortfolio = () => {
    axios
      .get("http://localhost/portfolio/shares", { withCredentials: true })
      .then((r) => {
        if (!r.data[secId]) setNumPortfolio(0);
        else setNumPortfolio(r.data[secId]);
      })
      .catch(() => {
        openNotification();
      });
  };

  const buy = () => {
    axios
      .post(
        `http://localhost/portfolio/${secId}/buy`,
        { amount: num },
        {
          withCredentials: true,
        }
      )
      .then((r) => {
        fetchPortfolio();
        updateBalance();
      })
      .catch((e) => {
        openNotification("Не удалось совершить покупку");
        console.log(e);
      });
  };

  const sell = () => {
    axios
      .post(
        `http://localhost/portfolio/${secId}/sell`,
        { amount: num },
        {
          withCredentials: true,
        }
      )
      .then((r) => {
        fetchPortfolio();
        updateBalance();
      })
      .catch((e) => {
        openNotification();
        console.log(e);
      });
  };

  const fetchPrice = () => {
    axios
      .get(
        `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}/candles.json?iss.reverse=true&candles.columns=end,close&iss.meta=off&till=${today}&from=${today}&interval=1`
      )
      .then((r) => {
        // console.log(r.data.candles.data);
        setcurPrice(r.data.candles.data[0][1]);
      });
  };

  useEffect(() => {
    fetchPortfolio();
    fetchPrice();
    setInterval(() => fetchPrice(), 60000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-y-3">
      {contextHolder}
      <div>Текущая цена {currentPrice}₽</div>
      <div>В портфеле: {numPortfolio}</div>
      <InputNumber
          className="w-32"
          min={1}
          defaultValue={1}
          onChange={(val) => {
            setNum(val);
          }}
        />
      <div className="flex flex-row gap-x-2">
        <button
          className="border border-slate-400 bg-slate-300 rounded-xl justify-center px-2 hover:bg-slate-100 active:bg-slate-500 h-10"
          onClick={buy}
        >
          Купить
        </button>
        <button
          className="border border-slate-400 bg-red-300 rounded-xl justify-center px-2 hover:bg-red-100 active:bg-red-500 h-10"
          onClick={sell}
        >
          Продать
        </button>
      </div>
    </div>
  );
};

export default BuyCard;

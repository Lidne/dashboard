import React, { useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";
import axios from "axios";

const parseDate = (date) => {
  // говнокодик)
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
};

const SecGraph = ({ secId }) => {
  const [fromDate, setFromDate] = useState();
  const [tillDate, setTillDate] = useState();
  const today = new Date();

  const daysToSubtract = 100;
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - daysToSubtract);
  const [tillDateStr, setTillDateStr] = useState(parseDate(today));
  const [fromDateStr, setFromDateStr] = useState(parseDate(pastDate));
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("day");
  const [median, setMedian] = useState(0);
  const [scatter, setScatter] = useState([]);

  const options = [
    { value: "minute", label: "Минута" },
    { value: "hour", label: "Час" },
    { value: "day", label: "День" },
  ];

  const calcMedian = (rawData) => {
    const sortedPrices = [...rawData].sort((a, b) => a - b);
    const median =
      sortedPrices.length % 2 === 0
        ? (sortedPrices[sortedPrices.length / 2 - 1] +
            sortedPrices[sortedPrices.length / 2]) /
          2
        : sortedPrices[Math.floor(sortedPrices.length / 2)];
    setMedian(median);
  };

  const calcScatter = (prices) => {
    const sortedPrices = [...prices].sort((a, b) => a - b);

    const q1 = sortedPrices[Math.floor(sortedPrices.length / 4)];
    const q3 = sortedPrices[Math.ceil(sortedPrices.length * (3 / 4)) - 1];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    const sd = prices.map((d) => {
      if (d.uv >= lowerBound || d.uv <= upperBound) {
        d.sc = d.uv;
      }
    });
    console.log(data);
    console.log(sd);
    setData(sd);
    // const outliers = prices.filter((d) => d >= lowerBound || d <= upperBound);
    // setScatter(outliers);
    // console.log(q1, q3, iqr, lowerBound, upperBound);
    // console.log(outliers);
  };

  const fetchData = (int) => {
    if (int === "day") {
      axios
        .get(
          `https://iss.moex.com/iss/history/engines/stock/markets/shares/securities/${secId}.json?from=${fromDateStr}&till=${tillDateStr}&lang=ru&iss.meta=off&history.columns=TRADEDATE,CLOSE`
        )
        .then((r) => {
          const dt = r.data.history.data.map((item) => ({
            name: item[0],
            uv: item[1],
          }));
          calcScatter(dt);
          const rawData = r.data.history.data.map((item) => item[1]);
          calcMedian(rawData);
          console.log(data);
        });
    } else if (int === "minute") {
      axios
        .get(
          `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}/candles.json?iss.reverse=true&from=${fromDateStr}&till=${tillDateStr}&interval=1&candles.columns=end,close&iss.meta=off`
        )
        .then((r) => {
          setData(
            r.data.candles.data.reverse().map((item) => ({
              name: item[0].slice(11),
              uv: item[1],
            }))
          );
          console.log(r.data.candles.data);
        });
    } else if (int === "hour") {
      axios
        .get(
          `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}/candles.json?from=${fromDateStr}&till=${tillDateStr}&interval=60&candles.columns=end,close&iss.meta=off`
        )
        .then((r) => {
          setData(
            r.data.candles.data.reverse().map((item) => ({
              name: item[0].slice(11),
              uv: item[1],
            }))
          );
          console.log(r.data.candles.data);
        });
    }
  };

  useEffect(() => {
    fetchData(interval);
  }, [fromDateStr, tillDateStr, interval]);

  useEffect(() => {
    fetchData(interval);
  }, []);

  const onDateChange = (date, dateString) => {
    // console.log(date);
    setFromDate(date[0]);
    setTillDate(date[1]);
    setFromDateStr(dateString[0]);
    setTillDateStr(dateString[1]);
  };

  const selectChange = (value) => {
    setInterval(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-300 rounded-xl px-3 py-2">
          <p className="label">{label}</p>
          <p className="desc">{payload[0].value}₽</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-8">
        <Select
          onChange={selectChange}
          options={options}
          defaultValue={"day"}
        />
        <RangePicker onChange={onDateChange} format={"YYYY-MM-DD"} />
      </div>
      <ResponsiveContainer width={"100%"} height={400}>
        <ComposedChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis domain={["auto", "auto"]} />
          <ReferenceLine y={median} stroke="red" />
          <Tooltip content={CustomTooltip} />
          <Line
            data={data}
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            dot={<></>}
          />
          <Scatter data={data} dataKey="sc" fill="green" />
          <Brush data={data.map((item) => item.name)} height={10} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecGraph;

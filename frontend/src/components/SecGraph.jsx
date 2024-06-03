import { useEffect, useState } from "react";
import { DatePicker, Select, Checkbox, Dropdown, Space } from "antd";
const { RangePicker } = DatePicker;
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
  ComposedChart,
} from "recharts";
import axios from "../utils/axios";

const parseDate = (date) => {
  // говнокодик)
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
};

// TODO: сделать колесико настройки граф
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
  const [medianVis, setMedianVis] = useState(false);
  const [smaVis, setSmaVis] = useState(false);
  const [rsiVis, setRsiVis] = useState(false);

  const options = [
    { value: "minute", label: "Минута" },
    { value: "hour", label: "Час" },
    { value: "day", label: "День" },
  ];

  const dropdownOptions = [];

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

  const calculateSMA = (dt, windowSize) => {
    for (let i = 0; i < dt.length; i++) {
      if (i < windowSize - 1) {
        dt[i].sma = dt[i].uv;
      } else {
        let sum = 0;
        for (let j = 0; j < windowSize; j++) {
          sum += dt[i - j].uv;
        }
        let average = sum / windowSize;
        dt[i].sma = average;
      }
    }
    return dt;
  };

  const calculateRSI = (dt, windowSize) => {
    let gains = 0;
    let losses = 0;

    for (let i = 1; i < windowSize; i++) {
      const change = dt[i].uv - dt[i - 1].uv;
      if (change > 0) {
        gains += change;
      } else {
        losses -= change;
      }
    }

    gains /= windowSize;
    losses /= windowSize;
    let rs = gains / losses;
    dt[windowSize - 1].rsi = 100 - 100 / (1 + rs);
    for (let i = windowSize; i < dt.length; i++) {
      const change = dt[i].uv - dt[i - 1].uv;
      if (change > 0) {
        gains = (gains * (windowSize - 1) + change) / windowSize;
        losses = (losses * (windowSize - 1)) / windowSize;
      } else {
        gains = (gains * (windowSize - 1)) / windowSize;
        losses = (losses * (windowSize - 1) - change) / windowSize;
      }
      rs = gains / losses;
      dt[i].rsi = 100 - 100 / (1 + rs);
    }

    return dt;
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
          const dt1 = calculateSMA(dt, 3);
          const dt2 = calculateRSI(dt1, 7);
          setData(dt2);
          const rawData = r.data.history.data.map((item) => item[1]);
          calcMedian(rawData);
        });
    } else if (int === "minute") {
      axios
        .get(
          `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}/candles.json?iss.reverse=true&from=${fromDateStr}&till=${tillDateStr}&interval=1&candles.columns=end,close&iss.meta=off`
        )
        .then((r) => {
          const dt = r.data.candles.data.reverse().map((item) => ({
            name: item[0].slice(11),
            uv: item[1],
          }));
          const dt1 = calculateSMA(dt, 3);
          const dt2 = calculateRSI(dt1, 4);
          setData(dt2);
          const rawData = r.data.candles.data.reverse().map((item) => item[1]);
          calcMedian(rawData);
        });
    } else if (int === "hour") {
      axios
        .get(
          `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secId}/candles.json?from=${fromDateStr}&till=${tillDateStr}&interval=60&candles.columns=end,close&iss.meta=off`
        )
        .then((r) => {
          const dt = r.data.candles.data.reverse().map((item) => ({
            name: item[0].slice(11),
            uv: item[1],
          }));
          const dt1 = calculateSMA(dt, 3);
          const dt2 = calculateRSI(dt1, 4);
          setData(dt2);
          const rawData = r.data.candles.data.reverse().map((item) => item[1]);
          calcMedian(rawData);
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
      <div className="flex flex-row my-2 gap-x-2 items-center bg-slate-300 p-2 rounded-xl">
        <Checkbox
          onChange={(e) => {
            setMedianVis(e.target.checked);
          }}
          className="text-xs"
        >
          Медиана
        </Checkbox>
        <Checkbox
          onChange={(e) => {
            setSmaVis(e.target.checked);
          }}
          className="text-xs"
        >
          Скользящая средняя
        </Checkbox>
        <Checkbox
          onChange={(e) => {
            setRsiVis(e.target.checked);
          }}
          className="text-xs"
        >
          Индекс относительной силы
        </Checkbox>
      </div>
      <ResponsiveContainer width={"100%"} height={400}>
        <ComposedChart
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          data={data}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" domain={["auto", "auto"]} />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={CustomTooltip} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            dot={<></>}
          />
          {medianVis && (
            <ReferenceLine yAxisId="left" y={median} stroke="red" />
          )}
          {smaVis && (
            <Line
              type="monotone"
              yAxisId="left"
              dataKey="sma"
              stroke="green"
              dot={<></>}
              strokeDasharray="5 5"
            />
          )}
          {rsiVis && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rsi"
              stroke="purple"
              dot={<></>}
              strokeDasharray="2 2"
            />
          )}
          <Brush data={data.map((item) => item.name)} height={10} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecGraph;

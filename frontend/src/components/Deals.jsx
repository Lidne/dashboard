import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

const Deals = () => {
  const [deals, setDeals] = useState([]);

  const fetchDeals = () => {
    axios
      .get(
        "https://iss.moex.com/iss/engines/stock/markets/shares/trades.json?reversed=1&limit=10"
      )
      .then((r) => {
        setDeals(r.data.trades.data);
        // setDeals([]);
        // console.log(r.data.trades.data);
      });
    // console.log(1);
  };

  useEffect(() => {
    fetchDeals();
    setInterval(() => fetchDeals(), 5000);
  }, []);

  return (
    <Table
      title={() => "Последние сделки"}
      dataSource={deals.length === 0 ? [["Биржа закрыта"]] : deals.slice(0, 5)}
      pagination={false}
      className="w-[40rem]"
    >
      {deals.length === 0 ? (
        <Column title="" dataIndex="0" />
      ) : (
        <>
          <Column title="Тикер" dataIndex="3" key="0" width={"6rem"} />
          <Column title="Время" dataIndex="1" key="1" width={"6rem"} />
          <Column title="Тип" dataIndex="10" key="2" width={"6rem"} />
          <Column title="Цена" dataIndex="4" key="3" width={"6rem"} />
          <Column title="Объем" dataIndex="5" key="4" width={"6rem"} />
          <Column title="Сумма" dataIndex="6" key="5" width={"6rem"} />{" "}
        </>
      )}
    </Table>
  );
};

export default Deals;

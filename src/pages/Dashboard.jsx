import React, { useState } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import Card from "../component/card/Card";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [picked_Currency, set_Currency] = useState("USD");
  const [search_data, set_Search_data] = useState("");
  const [choose_OrderDetails, setchoose_OrderDetails] = useState({});
  const [order_TimeStamps, setorder_TimeStamps] = useState({});
  const handleOrderDetails = (selectedId) => {
    const selectedDetails = mockData.results.find((order) => {
      return order["&id"] === selectedId;
    });

    const selectedTimeStamp = timestamps.results.find((timestamp) => {
      return timestamp["&id"] === selectedId;
    });

    setchoose_OrderDetails(selectedDetails);
    setorder_TimeStamps(selectedTimeStamp);
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${mockData.results.length} orders`}
        />
        <div className={styles.actionBox}>
          <Search
            value={search_data}
            onChange={(e) => set_Search_data(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => set_Currency(e.target.value)}
            selectedItem={picked_Currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={choose_OrderDetails.executionDetails}
            key={choose_OrderDetails["&key"]}
            title="Selected Order Details"
          />
          <Card
            cardData={order_TimeStamps.timestamps}
            key={choose_OrderDetails["&key"]}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          handleOrderDetails={handleOrderDetails}
          searchText={search_data}
          rows={mockData.results}
          orderDetails={timestamps.results}
          currency={picked_Currency}
        />
      </div>
    </div>
  );
};

export default Dashboard;

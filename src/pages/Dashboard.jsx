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
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const handleOrderDetails = (selectedId) => {
    const selectedDetails = mockData.results.find((order) => {
      return order["&id"] === selectedId;
    });

    const selectedTimeStamp = timestamps.results.find((timestamp) => {
      return timestamp["&id"] === selectedId;
    });

    setSelectedOrderDetails(selectedDetails);
    setSelectedOrderTimeStamps(selectedTimeStamp);
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            selectedItem={selectedCurrency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails.executionDetails}
            key={selectedOrderDetails["&key"]}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps.timestamps}
            key={selectedOrderDetails["&key"]}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          handleOrderDetails={handleOrderDetails}
          searchText={searchText}
          rows={mockData.results}
          orderDetails={timestamps.results}
          currency={selectedCurrency}
        />
      </div>
    </div>
  );
};

export default Dashboard;

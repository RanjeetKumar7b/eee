import React, { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import Card from "../component/card/Card";

// Styles
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  // State variables
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  // Function to handle order details selection
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

  
  const Function = () => {
    
  };

  return (
    <div>
      {/* Header section */}
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${mockData.results.length} orders`}
        />
        <div className={styles.actionBox}>
          {/* Search bar */}
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* Dropdown for currency selection */}
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            selectedItem={selectedCurrency}
          />
        </div>
      </div>

      {/* Content section */}
      <div className={styles.content}>
        <div className={styles.section}>
          {/* Card displaying selected order details */}
          <Card
            cardData={selectedOrderDetails.executionDetails}
            key={selectedOrderDetails["&key"]}
            title="Selected Order Details"
          />

          {/* Card displaying selected order timestamps */}
          <Card
            cardData={selectedOrderTimeStamps.timestamps}
            key={selectedOrderDetails["&key"]}
            title="Selected Order Timestamps"
          />
        </div>

        {/* List of orders */}
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

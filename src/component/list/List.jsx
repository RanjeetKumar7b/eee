// Importing necessary components and styles
import React from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import styles from "./List.module.css";

// A functional component to render a table-based list
const List = ({ rows, searchText, orderDetails, handleOrderDetails, currency }) => {
  // Filter rows based on searchText if provided
  const filteredRows = searchText === '' ? rows : rows.filter((row) => row["&id"] === searchText);

  // Function to handle row click and show order details
  const handleClick = (selectedId) => {
    console.log("Row clicked with ID:", selectedId);
    handleOrderDetails(selectedId);
  };
  
  return (
    // Render the table element with ListHeader and ListRow components
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {`${currency}`}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {/* Map through filtered rows and render ListRow components */}
        {filteredRows.map((row) => (
          <ListRow key={row["&id"]} onClick={() => handleClick(row["&id"])}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            {/* Retrieve orderSubmitted value from orderDetails using row ID */}
            <ListRowCell>{orderDetails.find((order) => order["&id"] === row["&id"]).timestamps.orderSubmitted}</ListRowCell>
            {/* Display order volume based on the selected currency */}
            <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;

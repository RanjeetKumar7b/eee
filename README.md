# Instructions about the problem fixing
Q.1->In the title of the header, it displays 5 orders but there are 6 orders in the table. We want to display the total number of orders in the header title
solution:-in this problem we have to fix the size of order whose order size are showing 5 but in actual it was 6.
so the by following some steps below i have fix this problem.
by changing the code from {secondaryTitle="5 orders"} to secondaryTitle={`${mockData.results.length} orders`}; 
because it will update the value dynamically whatever will be size.

Q.2->In the table order submitted date is missing, we have timestamp data included in the src\assets\timeStamps.json with the corresponding ids, please combine that with the order data and make sure the order submitted date is being displayed in the table

solution:- int this problem we have to fix the date missing of the table because in data.json file it has not stored the timestamps value 
which was stored in timestaps.json file and we have to fetch the data from both the file according to id and show on the table.
so by passing the rows={mockData.results} and orderDetails={timestamps.results},rows and orderdetails which is taking a value from our data and timestamps file and diplaying through map on table with filtering the data which has same id like:-
filtering:--
{`const List = ({ rows, searchText, orderDetails, handleOrderDetails, currency }) => {
  const data_filter = searchText === '' ? rows : rows.filter((row) => row["&id"] === searchText);
  const handleClick = (selectedId) => {
    console.log("Row clicked with ID:", selectedId);
    handleOrderDetails(selectedId);
  };
  `}
  displaying by map:--
  {`{data_filter.map((row) => (
          <ListRow key={row["&id"]} onClick={() => handleClick(row["&id"])}>
            <ListRowCell>{orderDetails.find((order) => order["&id"] === row["&id"]).timestamps.orderSubmitted}</ListRowCell>
        ))}
        `}

        
Q.3->Order Volume cell is displaying USD values, can you please make it display the currency value selected on the dropdown located in the header of the dashboard


soluion:-in this problem we have to display the currency according to dropdown option
so here is the my strategy to solve this problem :-
by using usestate hooks to manage the current and set cuurentstate and with help of map in table calling the cuurency data from data.json and disaplying on the table to update the selected currency from the dropdown 
by using the use state hook we will we able to update the value however its state will be changed:-
{` const [picked_Currency, set_Currency] = useState("USD");`}
 getting the response of user whatever they want to see result:-
{`options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => set_Currency(e.target.value)}
            selectedItem={picked_Currency}
            `}
passing updated currency to list updte in the table :-
{`currency={picked_Currency}`}
displaying the picked currency by map in table:
{`
{data_filter.map((row) => (
          <ListRow key={row["&id"]} onClick={() => handleClick(row["&id"])}>
    <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
     </ListRow>
        ))}
`}

        

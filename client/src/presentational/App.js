import React from "react";
import StockChart from "../containers/StockChart";
import StockForm from "../containers/StockForm";
import StockList from "../containers/StockList";
import ErrorMessage from "../containers/ErrorMessage";
import Footer from "./Footer";

const App = ({ errorMsg }) => {
  return (
    <div>
      <div className="container">
        <h1><i className="fa fa-line-chart" aria-hidden="true"></i> Stock Chart</h1>
        <ErrorMessage />
        <StockChart />
        <StockForm />
        <StockList />
      </div>
      <Footer />
    </div>
  );
}

export default App;

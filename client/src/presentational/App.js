import React from "react";
import StockChart from "../containers/StockChart";
import StockForm from "../containers/StockForm";
import StockList from "../containers/StockList";
import ErrorMessage from "../containers/ErrorMessage";
import Footer from "./Footer";

const App = () => {
  return (
    <div>
      <div className="container">
        <header>
          <h1><i className="fa fa-line-chart" aria-hidden="true"></i> Stock Chart</h1>
        </header>
        <main>
          <ErrorMessage />
          <StockChart />
          <StockForm />
          <StockList />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;

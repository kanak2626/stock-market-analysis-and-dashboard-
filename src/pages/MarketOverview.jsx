 import React, { useEffect, useState } from "react";


function MarketOverview() {

  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    // temporary demo market data
    const data = [
      {
        symbol: "AAPL",
        price: "195.20",
        change: "+1.5%"
      },
      {
        symbol: "TSLA",
        price: "245.80",
        change: "-0.8%"
      },
      {
        symbol: "MSFT",
        price: "420.50",
        change: "+2.1%"
      }
    ];


    setMarketData(data);
    setLoading(false);


  }, []);



  return (

    <div className="container-fluid mt-4">

      <h2 className="mb-4">
        Market Overview
      </h2>


      {loading ? (

        <div className="text-center">
          <div className="spinner-border"></div>
          <p>Loading market data...</p>
        </div>

      ) : (

        <div className="row">

          {marketData.map((stock, index) => (

            <div 
              className="col-md-4 mb-3"
              key={index}
            >

              <div className="card shadow p-3">

                <h4>
                  {stock.symbol}
                </h4>

                <p>
                  Price: ${stock.price}
                </p>

                <p>
                  Change: {stock.change}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}


export default MarketOverview;

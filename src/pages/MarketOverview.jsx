 import React, { useEffect, useState, useCallback } from "react";
import { getMarketData } from "../services/api";


function MarketOverview() {

  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const loadMarketData = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getMarketData();

      setMarketData(data);

    } catch (err) {

      console.log(err);
      setError("Failed to load market data");

    } finally {

      setLoading(false);

    }

  }, []);



  useEffect(() => {

    loadMarketData();

  }, [loadMarketData]);



  return (

    <div className="container-fluid mt-4">

      <h2 className="mb-4">
        Market Overview
      </h2>


      {loading && (

        <div className="text-center mt-5">

          <div className="spinner-border"></div>

          <p className="mt-2">
            Loading market data...
          </p>

        </div>

      )}



      {error && (

        <div className="alert alert-danger">
          {error}
        </div>

      )}



      {!loading && !error && (

        <div className="row">

          {marketData.length > 0 ? (

            marketData.map((stock, index) => (

              <div 
                className="col-md-4 mb-3" 
                key={index}
              >

                <div className="card shadow p-3">

                  <h5>
                    {stock.symbol || stock.name || "Stock"}
                  </h5>

                  <p>
                    Price: {stock.price || "N/A"}
                  </p>

                  <p>
                    Change: {stock.change || "N/A"}
                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="alert alert-warning">
              No market data available
            </div>

          )}

        </div>

      )}

    </div>

  );

}


export default MarketOverview;

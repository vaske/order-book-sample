import React, { useState, useEffect } from "react";
import { useCentrifuge } from "../hooks/useCentrifuge";
import { OrderbookData } from "../models/orderBook";

const OrderbookComponent: React.FC = () => {
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);
  const { centrifuge, orderBookSubscription } = useCentrifuge();

  useEffect(() => {
    orderBookSubscription.subscribe();
    orderBookSubscription.on("publication", (message) => {
      const data: OrderbookData = message.data;
      if (data.asks.length > 0) {
        const newAsks = [...asks, ...data.asks];
        setAsks(newAsks.slice(Math.max(newAsks.length - 10, 0)));
      }
      if (data.bids.length > 0) {
        const newBids = [...bids, ...data.bids];
        setBids(newBids.slice(Math.max(newBids.length - 10, 0)));
      }
    });
    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
    };
  }, [bids, asks, centrifuge, orderBookSubscription]);

  const sortedBids = [...bids].sort(
    (a, b) => parseFloat(b[1]) - parseFloat(a[1])
  );
  const sortedAsks = [...asks].sort(
    (a, b) => parseFloat(a[1]) - parseFloat(b[1])
  );

  return (
    <div>
      <h2>Orderbook</h2>
      <div>
        <h3>Bids</h3>
        <table>
          <thead>
            <tr>
              <th>Price (USD)</th>
              <th>Amount (BTC)</th>
              <th>Total (BTC)</th>
            </tr>
          </thead>
          <tbody>
            {sortedBids.map((bid, index) => (
              <tr key={index}>
                <td>${bid[0]}</td>
                <td>{bid[1]} BTC</td>
                <td>
                  {(parseFloat(bid[0]) * parseFloat(bid[1])).toFixed(8)} BTC
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Asks</h3>
        <table>
          <thead>
            <tr>
              <th>Price (USD)</th>
              <th>Amount (BTC)</th>
              <th>Total (BTC)</th>
            </tr>
          </thead>
          <tbody>
            {sortedAsks.map((ask, index) => (
              <tr key={index}>
                <td>${ask[0]}</td>
                <td>{ask[1]} BTC</td>
                <td>
                  {(parseFloat(ask[0]) * parseFloat(ask[1])).toFixed(8)} BTC
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderbookComponent;

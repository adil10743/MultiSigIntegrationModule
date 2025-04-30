import React from "react";

type Hop = {
  tokenIn: string;
  tokenOut: string;
  amount: string;
};

type SorRoute = {
  tokenIn: string;
  tokenInAmount: string;
  tokenOut: string;
  tokenOutAmount: string;
  hops: Hop[];
};

type Props = {
  returnAmount: string;
  minReturnAmount: string;
  priceImpact: number;
  routes: SorRoute[];
};

const SwapSummary: React.FC<Props> = ({
  returnAmount,
  minReturnAmount,
  priceImpact,
  routes,
}) => {
  // Sum up total input amount
  const totalInput = routes.reduce(
    (sum, route) => sum + parseFloat(route.tokenInAmount),
    0
  );

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><strong>Estimated Output:</strong></td>
            <td>{returnAmount}</td>
          </tr>
          <tr>
            <td><strong>Minimum Guaranteed:</strong></td>
            <td>{minReturnAmount}</td>
          </tr>
          <tr>
            <td><strong>Price Impact:</strong></td>
            <td>{(priceImpact * 100).toFixed(2)}%</td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Routes:</strong></td>
          </tr>
          {routes.map((route, i) => {
            const routePercentage = ((parseFloat(route.tokenInAmount) / totalInput) * 100).toFixed(2);
            return (
              <tr key={i}>
                <td colSpan={2}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <strong>Route {i + 1} ({routePercentage}%)</strong>
                    <div style={{ paddingLeft: "1rem" }}>
                      {route.hops.map((hop, j) => (
                        <div key={j}>
                          {hop.tokenIn} → {hop.tokenOut} {hop.amount ? `| ${hop.amount}` : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SwapSummary;

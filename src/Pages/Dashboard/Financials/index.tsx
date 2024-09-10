import { Fragment, memo, useMemo } from "react";
import { AreaChart } from "Components/AreaChart";
import { HiddenSVG } from "Components/HiddenSVG";
import { StatisticsTile } from "Components/StatisticsTile";
import { useTileBackground } from "Hooks/useTileBackground";
import { selectFinancials, useDashboard } from "State/Dashboard";
import { Colors } from "Tools/Colors";
import { Progress } from "Tools/Progress";
import "./styles.scss";

const REVENUE_COLOR = Colors.alphaHex(Progress.HIGH_GRADIENT[1], 0.65);
const EXPENSE_COLOR = Colors.alphaHex(Progress.LOW_GRADIENT[1], 0.65);

export const Financials = memo(
  function Financials() {
    const tileBackground = useTileBackground();
    const [income, expenses] = useDashboard(selectFinancials);
    const data = useMemo(
      () => [
        income.map(i => ({ x: i.date, y: i.value })),
        expenses.map(i => ({ x: i.date, y: i.value })),
      ],
      [income, expenses],
    );
    const options = useMemo(() => ({ data, strokeWidth: 3 }), [data]);
    return (
      <StatisticsTile
        className="financials"
        title={
          <Fragment>
            <h2>Financials</h2>
            <p>Revenue to Expense Ratio</p>
          </Fragment>
        }>
        <AreaChart options={options} />
        <HiddenSVG
          x1={0}
          y1={0}
          x2={0}
          y2={1}
          id="revenueGradient"
          colors={[REVENUE_COLOR, tileBackground]}
        />
        <HiddenSVG
          x1={0}
          y1={0}
          x2={0}
          y2={1}
          id="expenseGradient"
          colors={[EXPENSE_COLOR, tileBackground]}
        />
      </StatisticsTile>
    );
  },
  () => true,
);

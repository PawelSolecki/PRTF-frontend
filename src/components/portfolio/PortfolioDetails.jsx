import Frame from "../UI/Frame";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function PortfolioDetails({ allocations, isLoading }) {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  return (
    <section className="max-w-6xl mx-auto mt-8 px-6">
      <h2 className="text-4xl font-bold mb-4">Analiza</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
        <Frame label="Portfel modelowy" isLoading={isLoading}>
          <div style={{ width: "100%", height: "100%" }}>
            <PieChart
              series={[
                {
                  data: (allocations || []).map((item, index) => ({
                    id: index,
                    value: item.percentage,
                    label: item.assetType.toUpperCase(),
                  })),
                  innerRadius: 20,
                  paddingAngle: 0,
                  cornerRadius: 2.5,
                  startAngle: -45,

                  cx: 100,
                  //   cy: 150,
                },
              ]}
            />
          </div>
        </Frame>
      </div>
    </section>
  );
}

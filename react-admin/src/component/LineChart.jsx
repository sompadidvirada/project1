import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData } from "../data/mockData";
import useBakeryStore from "../zustand/storage";

const LineChart = ({ isDashboard = false, dataLine }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataLine2 = useBakeryStore((state) => state.dataLine) || [];
  const maxValue = dataLine?.length
    ? Math.max(...dataLine.flatMap((d) => d.data?.map((p) => p.y) || []))
    : "auto";

  return (
    <div style={{ width: "98%", height: isDashboard ? "250px" : "600px" }}>
      <ResponsiveLine
        data={Array.isArray(dataLine2) ? dataLine2 : mockLineData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
              fontSize: 12,
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={{ scheme: "nivo" }} // added
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={11}
        pointColor={{ theme: "background" }}
        pointBorderWidth={3}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel={(d) => d.yFormatted}
        pointLabelYOffset={-18}
        enableTouchCrosshair={true}
        crosshairType="bottom-right"
        useMesh={true}
        legends={[
          {
            anchor: "top-right",
            direction: "column",
            justify: false,
            translateX: 94,
            translateY: 1,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 83,
            itemHeight: 21,
            itemOpacity: 0.75,
            symbolSize: 14,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineChart;

import { Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import useBakeryStore from "../zustand/storage";

const BarChart = ({ isDashboard = false, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { products = [], data: dataBar } = useBakeryStore();
  const productNames = Array.isArray(products)
  ? products.map((product) => product.name)
  : [];

  const productSecon = [" "];

  // Ensure data is an array
  const chartData = Array.isArray(data) ? data || dataBar : [];



  return (
    <ResponsiveBar
      data={chartData} // <-- use the pre-processed data
      maxValue={800} // <-- dynamic max
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
              fontSize: isDashboard ? 12 : 30,
              fontFamily: '"Noto Serif Lao", serif', // Custom font for axis labels
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fontSize: isDashboard ? 10 : 15,
              fill: colors.grey[100],
              fontFamily: '"Noto Serif Lao", serif', // Custom font for tick labels
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            fontSize: isDashboard ? 10 : 15,
            fontFamily: '"Noto Serif Lao", serif', // Custom font for legend text
          },
        },
        tooltip: {
          container: {
            background: colors.grey[100],
            color: colors.grey[900],
            fontFamily: '"Noto Serif Lao", serif', // Custom font for tooltip
            fontSize: 15,
          },
        },
        text: {
          fontSize: 15,
          fill: colors.grey[100],
          fontWeight: "bold",
          fontFamily: '"Noto Serif Lao", serif', // Custom font for other chart texts
        },
      }}
      keys={productNames ? productNames : productSecon}
      indexBy="country"
      margin={{ top: 20, right: 180, bottom: 50, left: 60 }}
      padding={0.6}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.5"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 9,
        tickPadding: 5,
        tickRotation: 1,
        legend: "BAKERY",
        legendPosition: "middle",
        legendOffset: 15,
        truncateTickAt: 0,
      }}
      enableTotals={true}
      totalsOffset={28}
      labelSkipHeight={isDashboard ? 90 : 0}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", "6"]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: isDashboard ? 90 : 118,
          translateY: 20,
          itemsSpacing: 2,
          itemWidth: isDashboard ? 80 : 83,
          itemHeight: isDashboard ? 14 : 41,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 19,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
          // Add custom style here for text
          itemTextColor: colors.grey[100], // Default text color
          itemText: (label) => (
            <Typography
              variant="laoText"
              fontWeight="600"
              sx={{
                padding: "30px 30px 0 30px",
                mb: "5px",
                mt: "0",
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Break long words if necessary
                overflowWrap: "break-word", // Ensure long text fits inside the container
              }}
            >
              {label}
            </Typography>
          ),
        },
      ]}
      motionConfig={{
        mass: 13,
        tension: 95,
        friction: 36,
        clamp: false,
        precision: 0.01,
        velocity: 0,
      }}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default BarChart;

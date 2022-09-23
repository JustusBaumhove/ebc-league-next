import {
  Box,
  Card,
  Grid,
  SvgIconProps,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ScriptableContext } from "chart.js";
import { styled } from "@mui/system";
import Image from "next/image";
import Wedges from "/public/wedges.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type Props = {
  title: string;
  data: number[];
  labels: string[];
  icon: React.ReactElement<SvgIconProps>;
  isLoading: boolean;
  color: string;
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scaleShowLabels: false,
  layout: {
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 3,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    filler: {
      propagate: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

const ChartContainer = styled("div")(() => ({
  marginLeft: -5,
  marginRight: -5,
  marginBottom: -5,
  minWidth: 50,
  minHeight: 50,
}));

const LineChartCard = ({
  title,
  labels,
  data,
  icon,
  isLoading,
  color,
}: Props) => {
  const theme = useTheme();

  return (
    <Card component="div" sx={{ maxHeight: "300px" }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        sx={{ marginLeft: "-8px", marginTop: "-8px" }}
      >
        <Grid
          container
          item
          xs="auto"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Card
              sx={{
                aspectRatio: "1 / 1",
                padding: 0.5,
                backgroundColor: `${color}`,
              }}
            >
              <Typography
                component="div"
                variant="h2"
                sx={{ height: "fit-content" }}
              >
                {icon}
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs="auto"
        >
          <Grid item>
            <Typography component="div" variant="h6" fontWeight="bold">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {labels.length > 0 ? (
        <ChartContainer>
          <Line
            options={chartOptions}
            data={{
              labels: labels,
              datasets: [
                {
                  data: data,
                  borderColor: color,
                  backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 150);
                    gradient.addColorStop(0, color);
                    gradient.addColorStop(1, theme.palette.background.default);
                    return gradient;
                  },
                  fill: "start",
                },
              ],
            }}
          />
        </ChartContainer>
      ) : isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: 2,
          }}
        >
          <Image src={Wedges} alt="Is loading..." width={100} height={100} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            No data available
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default LineChartCard;

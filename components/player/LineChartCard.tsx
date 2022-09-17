import {
  Box,
  Card,
  CircularProgress,
  Grid,
  SvgIconProps,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import { ScriptableContext } from "chart.js";
import "chart.js/auto";
import { styled } from "@mui/system";

type Props = {
  title: string;
  data: number[];
  labels: string[];
  icon: React.ReactElement<SvgIconProps>;
  isLoading: boolean;
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scaleShowLabels: false,
  layout: {
    padding: {
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
}));

const LineChartCard = ({ title, labels, data, icon, isLoading }: Props) => {
  const theme = useTheme();

  return (
    <Card component="div" sx={{ maxHeight: "300px" }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        sx={{ m: "-8px" }}
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
                backgroundColor: "custom.pro",
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
            <Typography component="div" variant="h6">
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
                  fill: true,
                  data: data,
                  borderColor: theme.palette.error.dark,
                  backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, theme.palette.custom.pro);
                    gradient.addColorStop(1, theme.palette.background.default);
                    return gradient;
                  },
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
          <CircularProgress color="error" />
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

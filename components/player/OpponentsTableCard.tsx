import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Groups3,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from "@mui/icons-material";
import React, { useEffect } from "react";

const trendIcon = (value: number, threshold: number) =>
  (value > threshold && <TrendingUp fontSize="inherit" color="success" />) ||
  (value < threshold && <TrendingDown fontSize="inherit" color="error" />) || (
    <TrendingFlat fontSize="inherit" />
  );

const OpponentsTableCard = ({ id }: { id: number }) => {
  const [data, setData] = React.useState<any>([]);

  useEffect(() => {
    fetch(`/api/league/player/${id}/opponents`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.length > 0 && setData(data));
  }, [id]);

  return (
    <Card sx={{ padding: 1 }}>
      <Grid container spacing={2} direction="row" justifyContent="flex-start">
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
                backgroundColor: `custom.pro`,
              }}
            >
              <Typography
                component="div"
                variant="h2"
                sx={{ height: "fit-content" }}
              >
                <Groups3 fontSize="inherit" />
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
              Opponents
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {data.length === 0 ? (
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
      ) : (
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Win rate</TableCell>
                  <TableCell align="right">Confrontations</TableCell>
                  <TableCell align="right">Skill</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row["opponent_name"]}</TableCell>
                    <TableCell align="right">
                      <Typography component="div" variant="body2">
                        {(row["win_rate"] * 100).toFixed(0)}%{" "}
                        {trendIcon(row["win_rate"], 0.5)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack>
                        <Typography>{row["confrontations"]}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Kills: {row["kills"]} Deaths: {row["deaths"]}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{row["opponent_skill"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      )}
    </Card>
  );
};

export default OpponentsTableCard;

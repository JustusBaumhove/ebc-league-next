import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MultilineChart } from "@mui/icons-material";
import React, { useEffect } from "react";

const convertWeaponName = (name: string) => {
  const split = name.split("_");
  return split[0].charAt(0).toUpperCase() + split[0].slice(1);
};

const WeaponstatsTableCard = ({ id }: { id: number }) => {
  const [data, setData] = React.useState<any>([]);

  useEffect(() => {
    fetch(`/api/league/player/${id}/weaponstats`, {
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
                backgroundColor: `primary.dark`,
              }}
            >
              <Typography
                component="div"
                variant="h2"
                sx={{ height: "fit-content" }}
              >
                <MultilineChart fontSize="inherit" />
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
              Weapon usage
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
                  <TableCell align="right">Kills</TableCell>
                  <TableCell align="right">Deaths</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{convertWeaponName(row["name"])}</TableCell>
                    <TableCell align="right">{row["kills"]}</TableCell>
                    <TableCell align="right">{row["deaths"]}</TableCell>
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

export default WeaponstatsTableCard;

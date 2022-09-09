import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowForwardOutlined, Star } from "@mui/icons-material";
import { useRouter } from "next/router";

const ProLeagueCard = () => {
  const router = useRouter();
  const [data, setData] = React.useState<any>([]);

  const handleRedirect = () => {
    router.push(`/pro`).then(null);
  };

  useEffect(() => {
    fetch(`/api/league/pro/0`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.length > 0 && setData(data.slice(0, 5)));
  }, []);

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
                backgroundColor: "custom.pro",
                aspectRatio: "1 / 1",
                padding: 0.5,
              }}
            >
              <Typography
                component="div"
                variant="h2"
                sx={{ height: "fit-content" }}
              >
                <Star fontSize="inherit" />
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          item
          spacing={0}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          xs="auto"
        >
          <Grid item>
            <Typography component="div" variant="h6">
              Pro League
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="view league"
              size={"small"}
              onClick={handleRedirect}
              sx={{ aspectRatio: "1 / 1" }}
            >
              <ArrowForwardOutlined fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <CardContent>
        {data.length === 0 ? (
          <Typography component="div" variant="body2">
            No data available
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell align="right">Skill</TableCell>
                  <TableCell align="right">Ratio</TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: { xs: "none", lg: "table-cell" } }}
                  >
                    Kills
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: { xs: "none", lg: "table-cell" } }}
                  >
                    Deaths
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: { xs: "none", lg: "table-cell" } }}
                  >
                    Prestige
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row["name"]}</TableCell>
                    <TableCell align="right">{row["skill"]}</TableCell>
                    <TableCell align="right">
                      {row["ratio"].toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ display: { xs: "none", lg: "table-cell" } }}
                    >
                      {row["kills"]}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ display: { xs: "none", lg: "table-cell" } }}
                    >
                      {row["deaths"]}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ display: { xs: "none", lg: "table-cell" } }}
                    >
                      {row["prestige"]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ProLeagueCard;

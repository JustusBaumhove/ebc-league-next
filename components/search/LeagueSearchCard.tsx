import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link as MUILink,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Box } from "@mui/system";

type LeagueRows = Array<{
  id: number;
  name: string;
  skill: number;
  ratio: number;
  kills: number;
  deaths: number;
  prestige: number;
}>;

type Bounds = {
  [key: string]: { [key: string]: number };
};

const leagueBounds: Bounds = {
  bronze: {
    lower: 0,
    upper: 1100,
  },
  silver: {
    lower: 1100,
    upper: 1300,
  },
  gold: {
    lower: 1300,
    upper: 1500,
  },
  pro: {
    lower: 1500,
    upper: 3000,
  },
};

function determineLeague(rating: number): string {
  let league = "bronze";
  for (const [key, value] of Object.entries(leagueBounds)) {
    if (rating >= value.lower && rating < value.upper) {
      league = key.charAt(0).toUpperCase() + key.slice(1);
    }
  }
  return league;
}

const LeagueSearchCard = ({ name }: { name: string }) => {
  const [data, setData] = useState<LeagueRows>([]);
  const [page, setPage] = useState(0);
  const [nameS, setNameS] = useState("");
  const [loading, setLoading] = useState(true);

  const incrementPage = () => {
    setPage(page + 1);
  };
  const decrementPage = () => {
    page > 0 && setPage(page - 1);
  };

  useEffect(() => {
    setLoading(true);
    if (name !== nameS) {
      setNameS(name);
      setPage(0);
    }
    fetch(`/api/league/search/${encodeURIComponent(name)}/${page}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [page, name]);

  const color = "error";

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
                backgroundColor: "custom.pro",
              }}
            >
              <Typography
                component="div"
                variant="h2"
                sx={{ height: "fit-content" }}
              >
                <Search fontSize="inherit" />
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
          spacing={4}
        >
          <Grid item>
            <Typography component="div" variant="h6">
              {name}
            </Typography>
          </Grid>
          {loading && (
            <Grid item>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <CircularProgress color={color} size={20} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
      <CardContent>
        {data.length == 0 ? (
          <Typography component="div" variant="body1">
            No results found.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell align="right">League</TableCell>
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
                {data.map((row: any, index: number) => {
                  const league = determineLeague(row.skill);

                  return (
                    <TableRow key={index}>
                      <TableCell>{page * 25 + index + 1}</TableCell>
                      <TableCell>{row["name"]}</TableCell>
                      <TableCell align="right">
                        <MUILink
                          href={"/" + encodeURIComponent(league.toLowerCase())}
                          underline="hover"
                        >
                          {league}
                        </MUILink>
                      </TableCell>
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
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          aria-label="previous page"
          variant="contained"
          onClick={decrementPage}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          aria-label="next-page"
          variant="contained"
          onClick={incrementPage}
          disabled={data.length < 25}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
};

export default LeagueSearchCard;

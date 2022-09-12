import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { Box } from "@mui/system";

type LeagueRow = {
  id: number;
  name: string;
  skill: number;
  ratio: number;
  kills: number;
  deaths: number;
  prestige: number;
};

type LeagueRows = Array<LeagueRow>;

const ProLeagueCard = ({
  league,
  maxPlayers,
}: {
  league: string;
  maxPlayers: number;
}) => {
  const [data, setData] = useState<LeagueRows>([]);
  const [leagueS, setLeagueS] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemCount = 25;

  const incrementPage = () => {
    setPage(page + 1);
  };
  const decrementPage = () => {
    page > 0 && setPage(page - 1);
  };

  useEffect(() => {
    setLoading(true);
    if (league !== leagueS) {
      setLeagueS(league);
      setPage(0);
    }
    fetch(`/api/league/${league}/${page}`, {
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
  }, [page, league]);

  const color = "custom." + league.toLowerCase();

  return (
    <Card sx={{ padding: 1 }} aria-label="LeagueTableCard">
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
                backgroundColor: `${color}`,
              }}
            >
              <Typography
                aria-label="Icon"
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
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          xs="auto"
          spacing={4}
          aria-label="LeagueName"
        >
          <Grid item>
            <Typography component="div" variant="h6">
              {league.charAt(0).toUpperCase() +
                league.slice(1).toLowerCase() +
                " League"}
            </Typography>
          </Grid>
          {loading && (
            <Grid item>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <CircularProgress color={`error`} size={20} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
      <CardContent>
        {data.length === 0 ? (
          <Typography component="div" variant="body2">
            No data available.
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
                    <TableCell>{page * itemCount + index + 1}</TableCell>
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
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          aria-label="Previous Page"
          variant="contained"
          onClick={decrementPage}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          aria-label="Next page"
          variant="contained"
          onClick={incrementPage}
          disabled={(page + 1) * itemCount >= maxPlayers}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProLeagueCard;

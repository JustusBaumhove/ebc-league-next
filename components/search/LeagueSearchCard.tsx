import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TableContainer,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Box } from "@mui/system";
import SearchTable from "./SearchTable";
import Wedges from "/public/wedges.svg";

type SearchRow = {
  id: number;
  name: string;
  lrank: number;
  skill: number;
  ratio: number;
  kills: number;
  deaths: number;
  prestige: number;
};

const LeagueSearchCard = ({ name }: { name: string }) => {
  const [data, setData] = useState<SearchRow[]>([]);
  const [page, setPage] = useState(0);
  const prevName = useRef(name);
  const [loading, setLoading] = useState(true);

  const incrementPage = () => {
    setPage(page + 1);
  };
  const decrementPage = () => {
    page > 0 && setPage(page - 1);
  };

  useEffect(() => {
    setLoading(true);

    if (name !== prevName.current) {
      setPage(0);
      setData([]);
      prevName.current = name;
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

  return (
    <Card sx={{ padding: 1 }} aria-label="LeagueSearchCard">
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
          {loading && data.length > 0 && (
            <Grid item>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Image src={Wedges} alt="Wedges" width={20} height={20} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
      <CardContent>
        {data.length == 0 ? (
          loading ? (
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Image src={Wedges} alt="Wedges" width={200} height={200} />
            </Box>
          ) : (
            <Typography component="div" variant="h6">
              No results found
            </Typography>
          )
        ) : (
          <TableContainer>
            <SearchTable rows={data} page={page} />
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

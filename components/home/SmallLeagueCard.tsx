import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowForwardOutlined, Star } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Wedges from "/public/wedges.svg";

const SmallLeagueCard = ({ league }: { league: string }) => {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const handleRedirect = () => {
    router.push(`/${encodeURIComponent(league)}`).then(null);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/league/${league}/0`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.length > 0 && setData(data.slice(0, 5));
        setLoading(false);
      });
  }, [league]);

  const color = "custom." + league.toLowerCase();

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
                backgroundColor: `${color}`,
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
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs="auto"
        >
          <Grid item>
            <Typography component="div" variant="h6">
              {league.charAt(0).toUpperCase() +
                league.slice(1).toLowerCase() +
                " League"}
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
          loading ? (
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Image src={Wedges} alt="Wedges" width={100} height={100} />
            </Box>
          ) : (
            <Typography component="div" variant="body2">
              No data available.
            </Typography>
          )
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell align="right">Skill</TableCell>
                  <TableCell align="right">Ratio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link href={`/player/${row["id"]}`} underline="hover">
                        {row["name"]}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row["skill"]}</TableCell>
                    <TableCell align="right">
                      {row["ratio"].toFixed(2)}
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

export default SmallLeagueCard;

import React, { useEffect, useState } from "react";
import {
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
import { useRouter } from "next/router";
import Image from "next/image";
import Wedges from "/public/wedges.svg";
import SkeletonTableRows from "../placeholders/SkeletonTableRows";

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

const ProLeagueCard = () => {
  const router = useRouter();
  const [data, setData] = useState<LeagueRows>([]);
  const [loading, setLoading] = useState(true);

  const handleRedirect = () => {
    router.push(`/pro`).then(null);
  };

  useEffect(() => {
    setLoading(true);
    setData([]);
    fetch(`/api/league/pro/0`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.length > 0 && setData(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Card sx={{ padding: 1 }} aria-label="ProLeagueCard">
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
          spacing={2}
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
          {loading && (
            <Grid item>
              <Image src={Wedges} alt="Wedges" width={30} height={30} />
            </Grid>
          )}
        </Grid>
      </Grid>
      <CardContent>
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
              {data.length === 0 ? (
                <SkeletonTableRows rows={5} columns={7} hideOnSmall={3} />
              ) : (
                data.map((row, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link href={`/player/${row.id}`} underline="hover">
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.skill}</TableCell>
                    <TableCell align="right">{row.ratio.toFixed(2)}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ display: { xs: "none", lg: "table-cell" } }}
                    >
                      {row.kills}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ display: { xs: "none", lg: "table-cell" } }}
                    >
                      {row.deaths}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ display: { xs: "none", lg: "table-cell" } }}
                    >
                      {row.prestige}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ProLeagueCard;

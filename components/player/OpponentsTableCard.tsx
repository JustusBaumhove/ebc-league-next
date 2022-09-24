import {
  Card,
  CardContent,
  Grid,
  Link,
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
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Wedges from "/public/wedges.svg";
import SkeletonTableRows from "../placeholders/SkeletonTableRows";

type OpponentRow = {
  opponent_client_id: number;
  opponent_name: string;
  opponent_skill: number;
  kills: number;
  deaths: number;
  win_rate: string;
  confrontations: number;
};

type OpponentRows = Array<OpponentRow>;

const trendIcon = (value: number, threshold: number) =>
  (value > threshold && <TrendingUp fontSize="inherit" color="success" />) ||
  (value < threshold && <TrendingDown fontSize="inherit" color="error" />) || (
    <TrendingFlat fontSize="inherit" />
  );

const OpponentsTableCard = ({ id }: { id: number }) => {
  const [data, setData] = useState<OpponentRows>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/league/player/${id}/opponents`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.length > 0 && setData(data);
        setLoading(false);
      });
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
          spacing={2}
        >
          <Grid item>
            <Typography component="div" variant="h6" fontWeight="bold">
              Opponents
            </Typography>
          </Grid>
          {loading && (
            <Grid item>
              <Image src={Wedges} alt="Loading..." width={30} height={30} />
            </Grid>
          )}
        </Grid>
      </Grid>
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
              {data.length === 0 ? (
                <SkeletonTableRows rows={7} columns={5} hideOnSmall={0} />
              ) : (
                data.map((row, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link
                        href={`/player/${row.opponent_client_id}`}
                        underline="hover"
                      >
                        {row.opponent_name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Typography component="div" variant="body2">
                        {(parseFloat(row.win_rate) * 100).toFixed(0)}%{" "}
                        {trendIcon(parseFloat(row.win_rate), 0.5)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack>
                        <Typography>{row.confrontations}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Kills: {row.kills} Deaths: {row.deaths}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{row.opponent_skill}</TableCell>
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

export default OpponentsTableCard;

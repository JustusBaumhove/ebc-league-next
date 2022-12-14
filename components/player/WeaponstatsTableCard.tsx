import {
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
import {
  MultilineChart,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import Image from "next/image";
import Wedges from "/public/wedges.svg";
import SkeletonTableRows from "../placeholders/SkeletonTableRows";

type WeaponstatsRow = {
  weapon_id: number;
  name: string;
  kills: number;
  deaths: number;
};

type WeaponstatsRows = Array<WeaponstatsRow>;

const convertWeaponName = (name: string) => {
  const split = name.split("_");
  return split[0].charAt(0).toUpperCase() + split[0].slice(1);
};

const trendIcon = (value: number, threshold: number) =>
  (value > threshold && <TrendingUp fontSize="inherit" color="success" />) ||
  (value < threshold && <TrendingDown fontSize="inherit" color="error" />) || (
    <TrendingFlat fontSize="inherit" />
  );

const WeaponstatsTableCard = ({ id }: { id: number }) => {
  const [data, setData] = React.useState<WeaponstatsRows>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/league/player/${id}/weaponstats`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
          spacing={2}
        >
          <Grid item>
            <Typography component="div" variant="h6" fontWeight="bold">
              Weapon usage
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
                <TableCell align="right">Gun efficacy</TableCell>
                <TableCell align="right">Kills</TableCell>
                <TableCell align="right">Deaths</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <SkeletonTableRows rows={10} columns={5} hideOnSmall={0} />
              ) : (
                data.map((row, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{convertWeaponName(row.name)}</TableCell>
                    <TableCell align="right">
                      {((row.kills / row.deaths) * 100).toFixed()}%{" "}
                      {trendIcon(row.kills / row.deaths, 1)}
                    </TableCell>
                    <TableCell align="right">{row.kills}</TableCell>
                    <TableCell align="right">{row.deaths}</TableCell>
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

export default WeaponstatsTableCard;

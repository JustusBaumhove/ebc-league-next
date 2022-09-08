import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  EmojiEvents,
  Groups,
  Person,
  SportsEsports,
} from "@mui/icons-material";
import Navbar from "../../components/navbar/Navbar";
import { Box, Grid } from "@mui/material";
import SingleInfoCard from "../../components/cards/SingleInfoCard";
import LeagueTableCard from "../../components/league/LeagueTableCard";
import Header from "../../components/common/Header";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.name;

  if (
    typeof name !== "string" ||
    !["bronze", "silver", "gold", "pro"].includes(name)
  ) {
    return {
      redirect: {
        destination: "/league/bronze",
        permanent: false,
      },
    };
  }

  return {
    props: {
      league: name,
    },
  };
};

const LeaguePage: NextPage<{ league: string }> = ({ league }) => {
  const [averages, setAverages] = useState({
    players: 0,
    ratio: 0,
    kills: "0",
    deaths: "0",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/league/averages/${league}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.length > 0 && setAverages(data[0]));
  }, [league]);

  const color = "custom." + league.toLowerCase();

  return (
    <div>
      <Header />

      <main>
        <Navbar />
        <Box sx={{ flexGrow: 1, p: 2 }} alignItems="center">
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <SingleInfoCard
                  title={"Players"}
                  content={averages.players.toString()}
                  color={color}
                  icon={<Groups fontSize="inherit" />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <SingleInfoCard
                  title={"Average ratio"}
                  content={averages.ratio.toString()}
                  color={color}
                  icon={<EmojiEvents fontSize="inherit" />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <SingleInfoCard
                  title={"Average kills"}
                  content={averages.kills}
                  color={color}
                  icon={<SportsEsports fontSize="inherit" />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <SingleInfoCard
                  title={"Average deaths"}
                  content={averages.deaths}
                  color={color}
                  icon={<Person fontSize="inherit" />}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <LeagueTableCard league={league} maxPlayers={averages.players} />
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default LeaguePage;

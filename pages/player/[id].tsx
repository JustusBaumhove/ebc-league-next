import { GetServerSideProps, NextPage } from "next";
import Header from "../../components/common/Header";
import Navbar from "../../components/navbar/Navbar";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleInfoCard from "../../components/cards/SingleInfoCard";
import { HourglassBottom, Person } from "@mui/icons-material";

type Overview = {
  name: string;
  time_add: number;
  kills: number;
  deaths: number;
  ratio: number;
  skill: number;
  rounds: number;
  winstreak: number;
  curstreak: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    id: await context.query.id,
  },
});

const PlayerPage: NextPage<{ id: number }> = ({ id }) => {
  const [overviewData, setOverviewData] = useState<Overview>();

  useEffect(() => {
    fetch(`/api/league/player/${id}/overview`)
      .then((res) => res.json())
      .then((data) => data.length > 0 && setOverviewData(data[0]));
  }, [id]);

  return (
    <div>
      <Header />

      <main>
        <Navbar />

        <Box sx={{ flexGrow: 1, p: 2 }} alignItems="center">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <Typography variant="h2" textAlign="center">
                  {overviewData?.name || <CircularProgress />}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
              >
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="First seen"
                    content={new Date(
                      (overviewData?.time_add || 0) * 1000
                    ).toLocaleString()}
                    color="custom.pro"
                    icon={<HourglassBottom fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Kills"
                    content={overviewData?.kills.toString() || "0"}
                    color="custom.pro"
                    icon={<Person fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Deaths"
                    content={overviewData?.deaths.toString() || "0"}
                    color="custom.pro"
                    icon={<Person fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Ratio"
                    content={overviewData?.ratio.toFixed(2) || "1.00"}
                    color="custom.pro"
                    icon={<Person fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Skill"
                    content={overviewData?.skill.toString() || "0"}
                    color="custom.pro"
                    icon={<Person fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Win streak"
                    content={overviewData?.winstreak.toString() || "0"}
                    color="custom.pro"
                    icon={<Person fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Current Streak"
                    content={overviewData?.curstreak.toString() || "0"}
                    color="custom.pro"
                    icon={<Person fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Rounds"
                    content={overviewData?.rounds.toString() || "0"}
                    color="custom.pro"
                    icon={<Person fontSize="inherit" />}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              Playtime Graph
            </Grid>
            <Grid item xs={12} md={6}>
              Kill Death Ratio Graph
            </Grid>
            <Grid item xs={12} md={6}>
              Weapon stats
            </Grid>
            <Grid item xs={12} md={6}>
              Opponents
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default PlayerPage;

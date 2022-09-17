import { GetServerSideProps, NextPage } from "next";
import Header from "../../components/common/Header";
import Navbar from "../../components/navbar/Navbar";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleInfoCard from "../../components/cards/SingleInfoCard";
import { HourglassBottom, Insights, Person } from "@mui/icons-material";
import LineChartCard from "../../components/player/LineChartCard";

type Props = {
  id: number;
};

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

type WeekData = {
  rounds: number[];
  kills: number[];
  skill: number[];
  ratio: number[];
};

const formatStreak = (streak: number) => {
  if (streak > 0) {
    return `${streak} win${streak > 1 ? "s" : ""}`;
  } else if (streak < 0) {
    return `${-streak} loss${streak < -1 ? "es" : ""}`;
  } else {
    return "0";
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    id: await context.query.id,
  },
});

const PlayerPage: NextPage<Props> = ({ id }) => {
  const [overviewData, setOverviewData] = useState<Overview>();

  const [isLoading, setIsLoading] = useState(true);
  const [weekLabels, setWeekLabels] = useState<string[]>([]);
  const [weekData, setWeekData] = useState<WeekData>({
    rounds: [],
    kills: [],
    skill: [],
    ratio: [],
  });

  useEffect(() => {
    setIsLoading(true);

    fetch(`/api/league/player/${id}/overview`)
      .then((res) => res.json())
      .then((data) => data.length > 0 && setOverviewData(data[0]));

    fetch(`/api/league/player/${id}/weeklystats`)
      .then((res) => res.json())
      .then((data) => {
        setWeekLabels(data.labels);
        setWeekData({
          rounds: data.rounds,
          kills: data.kills,
          skill: data.skill,
          ratio: data.ratio,
        });
      });

    setIsLoading(false);
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
                  {overviewData?.name ||
                    (isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Typography variant="h2">Player has no stats</Typography>
                    ))}
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
                    ).toLocaleString("en-GB")}
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
                    content={
                      overviewData ? formatStreak(overviewData.curstreak) : "0"
                    }
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
              <LineChartCard
                icon={<Insights fontSize="inherit" />}
                title="Rounds"
                data={weekData.rounds}
                labels={weekLabels}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartCard
                icon={<Insights fontSize="inherit" />}
                title="Kill death ratio"
                data={weekData.ratio}
                labels={weekLabels}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartCard
                icon={<Insights fontSize="inherit" />}
                title="Skill"
                data={weekData.skill}
                labels={weekLabels}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartCard
                icon={<Insights fontSize="inherit" />}
                title="Kills"
                data={weekData.kills}
                labels={weekLabels}
                isLoading={isLoading}
              />
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

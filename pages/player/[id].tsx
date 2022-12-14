import { GetServerSideProps, NextPage } from "next";
import Header from "../../components/common/Header";
import Navbar from "../../components/navbar/Navbar";
import { Box, Card, Grid, Skeleton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleInfoCard from "../../components/cards/SingleInfoCard";
import {
  EmojiEvents,
  HourglassBottom,
  LinearScale,
  Person,
  Poll,
  Replay,
  SportsEsports,
} from "@mui/icons-material";
import LineChartCard from "../../components/player/LineChartCard";
import WeaponstatsTableCard from "../../components/player/WeaponstatsTableCard";
import OpponentsTableCard from "../../components/player/OpponentsTableCard";

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
  const theme = useTheme();

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
      .then((data) => data.length > 0 && setOverviewData(data[0]))
      .catch(() => console.error("Oops, something went wrong"));

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

        setIsLoading(false);
      })
      .catch(() => console.error("Oops, something went wrong"));
  }, [id]);

  return (
    <div>
      <Header />

      <main>
        <Navbar />

        <Box sx={{ flexGrow: 1, p: 2 }} alignItems="center">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ padding: 1 }}>
                {overviewData ? (
                  <Typography variant="h2" textAlign="center" fontWeight="bold">
                    {overviewData.name}
                  </Typography>
                ) : (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      variant="h2"
                      textAlign="center"
                      fontWeight="bold"
                    >
                      <Skeleton variant="text" width={"30rem"} />
                    </Typography>
                  </Box>
                )}
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
                    content={
                      overviewData
                        ? new Date(overviewData.time_add * 1000).toLocaleString(
                            "en-GB"
                          )
                        : "..."
                    }
                    color="custom.pro"
                    icon={<HourglassBottom fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Kills"
                    content={overviewData?.kills.toString() || "..."}
                    color="custom.pro"
                    icon={<SportsEsports fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Deaths"
                    content={overviewData?.deaths.toString() || "..."}
                    color="custom.pro"
                    icon={<Person fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Ratio"
                    content={overviewData?.ratio.toFixed(2) || "..."}
                    color="custom.pro"
                    icon={<EmojiEvents fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Skill"
                    content={overviewData?.skill.toString() || "..."}
                    color="custom.pro"
                    icon={<Poll fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Win streak"
                    content={overviewData?.winstreak.toString() || "..."}
                    color="custom.pro"
                    icon={<EmojiEvents fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Current Streak"
                    content={
                      overviewData
                        ? formatStreak(overviewData.curstreak)
                        : "..."
                    }
                    color="custom.pro"
                    icon={<LinearScale fontSize="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <SingleInfoCard
                    title="Rounds"
                    content={overviewData?.rounds.toString() || "..."}
                    color="custom.pro"
                    icon={<Replay fontSize="inherit" />}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartCard
                icon={<Replay fontSize="inherit" />}
                title="Rounds"
                data={weekData.rounds}
                labels={weekLabels}
                isLoading={isLoading}
                color={theme.palette.warning.dark}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartCard
                icon={<EmojiEvents fontSize="inherit" />}
                title="Kill death ratio"
                data={weekData.ratio}
                labels={weekLabels}
                isLoading={isLoading}
                color={theme.palette.warning.dark}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartCard
                icon={<Poll fontSize="inherit" />}
                title="Skill"
                data={weekData.skill}
                labels={weekLabels}
                isLoading={isLoading}
                color={theme.palette.warning.dark}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartCard
                icon={<SportsEsports fontSize="inherit" />}
                title="Kills"
                data={weekData.kills}
                labels={weekLabels}
                isLoading={isLoading}
                color={theme.palette.warning.dark}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <WeaponstatsTableCard id={id} />
            </Grid>
            <Grid item xs={12} md={6}>
              <OpponentsTableCard id={id} />
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default PlayerPage;

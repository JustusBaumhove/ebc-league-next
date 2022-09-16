import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import Header from "../../components/common/Header";
import Navbar from "../../components/navbar/Navbar";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type Overview = {
  name: string;
  time_add: number;
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
  }, []);

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
              General Stats
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

import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Navbar from "../../components/navbar/Navbar";
import SingleInfoCard from "../../components/cards/SingleInfoCard";
import { Box, Grid, Typography } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import {
  EmojiEvents,
  Groups,
  Map,
  Person,
  SafetyCheck,
  SportsEsports,
} from "@mui/icons-material";
import ProLeagueCard from "../../components/home/ProLeagueCard";
import SmallLeagueCard from "../../components/home/SmallLeagueCard";
import Header from "../../components/common/Header";

type ServerInfo = {
  [key: string]: {
    content: string;
    icon: React.ReactElement;
  };
};

const serverInfoData: ServerInfo = {
  "server ip": {
    content: "...",
    icon: <PublicIcon fontSize="inherit" />,
  },
  "current map": {
    content: "...",
    icon: <Map fontSize="inherit" />,
  },
  "current players": {
    content: "...",
    icon: <Groups fontSize="inherit" />,
  },
  round: {
    content: "...",
    icon: <SportsEsports fontSize="inherit" />,
  },
  "total competing players": {
    content: "...",
    icon: <Person fontSize="inherit" />,
  },
  uptime: {
    content: "...",
    icon: <SafetyCheck fontSize="inherit" />,
  },
  "favourite map": {
    content: "...",
    icon: <EmojiEvents fontSize="inherit" />,
  },
  "favourite weapon": {
    content: "...",
    icon: <EmojiEvents fontSize="inherit" />,
  },
};

const Home: NextPage = () => {
  const [serverInfo, setServerInfo] = useState<ServerInfo>(serverInfoData);

  useEffect(() => {
    fetch("/api/league/server/info")
      .then((res) => res.json())
      .then((data) => {
        let newData = { ...serverInfo };
        for (const key in data) {
          newData[key].content = data[key];
        }
        setServerInfo(newData);
      });
  }, []);

  return (
    <div>
      <Header />

      <main>
        <Navbar />
        <Box sx={{ flexGrow: 1, p: 2 }} alignItems="center">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                textAlign="center"
              >
                Explicit Bouncers Promod League
              </Typography>
            </Grid>
            {Object.keys(serverInfo).map((key, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <SingleInfoCard
                  title={key}
                  content={serverInfo[key].content}
                  color="custom.pro"
                  icon={serverInfo[key].icon}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={6} lg={12}>
              <ProLeagueCard />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SmallLeagueCard league="gold" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SmallLeagueCard league="silver" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SmallLeagueCard league="bronze" />
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default Home;

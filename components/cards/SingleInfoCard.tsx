import { Card, Grid, SvgIconProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

type Props = {
  title: string;
  content: string;
  color: string;
  icon: React.ReactElement<SvgIconProps>;
};

const SingleInfoCard = ({ title, content, color, icon }: Props) => (
  <Card aria-label="InfoCard" sx={{ padding: 1 }}>
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
              backgroundColor: `${color}`,
              aspectRatio: "1 / 1",
              padding: 0.5,
            }}
          >
            <Typography
              aria-label="Icon"
              component="div"
              variant="h2"
              sx={{ height: "fit-content" }}
            >
              {icon}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        xs="auto"
      >
        <Grid item>
          <Typography component="div" variant="h6" aria-label="content">
            {content.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="div" variant="subtitle1" aria-label="title">
            {title.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Card>
);

export default SingleInfoCard;

import {
  Divider,
  Link as MUILink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

type SearchRow = {
  id: number;
  name: string;
  lrank: number;
  skill: number;
  ratio: number;
  kills: number;
  deaths: number;
  prestige: number;
};

type Bounds = {
  [key: string]: { [key: string]: number };
};

const leagueBounds: Bounds = {
  bronze: {
    lower: 0,
    upper: 1100,
  },
  silver: {
    lower: 1100,
    upper: 1300,
  },
  gold: {
    lower: 1300,
    upper: 1500,
  },
  pro: {
    lower: 1500,
    upper: 3000,
  },
};

function determineLeague(rating: number): string {
  let league = "bronze";
  for (const [key, value] of Object.entries(leagueBounds)) {
    if (rating >= value.lower && rating < value.upper) {
      league = key.charAt(0).toUpperCase() + key.slice(1);
    }
  }
  return league;
}

const SearchTable = ({ rows, page }: { rows: SearchRow[]; page: number }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell>Player</TableCell>
        <TableCell align="right">League</TableCell>
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
      {rows.map((row: SearchRow, index: number) => {
        const league = determineLeague(row.skill);

        return (
          <TableRow key={index}>
            <TableCell>{page * 25 + index + 1}</TableCell>
            <TableCell>{row["name"]}</TableCell>
            <TableCell align="right">
              <Stack
                component={"div"}
                direction="row"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
                justifyContent="flex-end"
              >
                <MUILink
                  href={"/" + encodeURIComponent(league.toLowerCase())}
                  underline="hover"
                >
                  {league}
                </MUILink>
                <Typography marginLeft={1} fontSize="inherit">
                  #{row["lrank"]}
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="right">{row["skill"]}</TableCell>
            <TableCell align="right">{row["ratio"].toFixed(2)}</TableCell>
            <TableCell
              align="right"
              sx={{ display: { xs: "none", lg: "table-cell" } }}
            >
              {row["kills"]}
            </TableCell>
            <TableCell
              align="right"
              sx={{ display: { xs: "none", lg: "table-cell" } }}
            >
              {row["deaths"]}
            </TableCell>
            <TableCell
              align="right"
              sx={{ display: { xs: "none", lg: "table-cell" } }}
            >
              {row["prestige"]}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export default SearchTable;

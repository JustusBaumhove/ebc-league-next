import type { GetServerSideProps, NextPage } from "next";
import { Box, Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import LeagueSearchCard from "../../components/search/LeagueSearchCard";
import Header from "../../components/common/Header";

type Props = {
  name: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.name;

  return { props: { name } };
};

const SearchPage: NextPage<Props> = ({ name }) => {
  return (
    <div>
      <Header />

      <main>
        <Navbar />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <LeagueSearchCard name={name} />
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default SearchPage;

import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../db");

type Row = {
  year: number;
  week: number;
  rounds: number;
  ratio: number;
  skill: number;
  kills: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(<string>req.query.id);

  const data = await db.execute(
    `SELECT x.rounds, x.ratio, x.skill, x.kills, x.year, x.week 
         FROM xlr_history_weekly AS x
         WHERE x.client_id = ?
         ORDER BY x.id`,
    [id]
  );

  const exportdata = {
    labels: data.map((row: Row) => row.year + " - " + row.week),
    rounds: data.map((row: Row) => row.rounds),
    ratio: data.map((row: Row) => row.ratio),
    skill: data.map((row: Row) => row.skill),
    kills: data.map((row: Row) => row.kills),
  };

  res.status(200).json(exportdata);
}

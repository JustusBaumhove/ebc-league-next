import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../db");

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(<string>req.query.id);

  const data = await db.execute(
    `SELECT c.name, c.time_add, x.kills, x.deaths, x.ratio, x.skill, x.rounds, x.winstreak, x.curstreak
         FROM clients AS c
         JOIN xlr_playerstats AS x ON x.client_id = c.id
         WHERE id = ?`,
    [id]
  );

  res.status(200).json(data);
}

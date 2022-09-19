import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../db");

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
  if (!["bronze", "silver", "gold", "pro"].includes(<string>req.query.name)) {
    res.status(400).json("Bad league name.");
  }

  const league = <string>req.query.name;
  const itemCount = parseInt(<string>process.env.ITEMS_PER_PAGE);
  const offset = itemCount * parseInt(<string>req.query.id);

  const data = await db.execute(
    `SELECT c.id, c.name, x.skill, x.ratio, x.kills, x.deaths, p.prestige
         FROM clients AS c
                  JOIN xlr_playerstats AS x ON x.client_id = c.id
                  JOIN player_core AS p ON p.guid = c.guid
         WHERE x.skill > ?
           AND x.skill <= ?
         ORDER BY x.skill DESC
         LIMIT ?, ${itemCount};`,
    [leagueBounds[league]["lower"], leagueBounds[league]["upper"], offset]
  );

  res.status(200).json(data);
}

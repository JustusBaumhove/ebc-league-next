import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../db");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(<string>req.query.id);

  const data = await db.execute(
    `SELECT c.name, c.time_add, x.kills, x.deaths, x.ratio, x.skill, x.rounds, x.winstreak, x.curstreak
         FROM clients AS c
         JOIN xlr_playerstats AS x ON x.client_id = c.id
         WHERE c.id = ?`,
    [id]
  );

  res.status(200).json(data);
}

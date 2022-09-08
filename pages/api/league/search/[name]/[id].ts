import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../db");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = "%" + <string>req.query.name + "%";
  const itemCount = parseInt(<string>process.env.ITEMS_PER_PAGE);
  const offset = itemCount * parseInt(<string>req.query.id);

  const data = await db.execute(
    `SELECT c.id, c.name, x.skill, x.ratio, x.kills, x.deaths, p.prestige
                                FROM clients AS c
                                JOIN xlr_playerstats AS x ON x.client_id = c.id
                                JOIN player_core AS p ON p.guid = c.guid
                                WHERE c.name LIKE ?
                                ORDER BY c.time_edit DESC
                                LIMIT ?, ${itemCount};`,
    [name, offset]
  );

  res.status(200).json(data);
}

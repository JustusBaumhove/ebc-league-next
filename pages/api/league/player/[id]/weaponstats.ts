import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../db");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(<string>req.query.id);

  const data = await db.execute(
    `SELECT xwu.weapon_id, xws.\`name\`, xwu.kills, xwu.deaths
         FROM xlr_playerstats AS x
                  JOIN xlr_weaponusage AS xwu ON xwu.player_id = x.id
                  JOIN xlr_weaponstats AS xws ON xws.id = xwu.weapon_id
         WHERE x.client_id = ?
         ORDER BY kills DESC
         LIMIT 7`,
    [id]
  );

  res.status(200).json(data);
}

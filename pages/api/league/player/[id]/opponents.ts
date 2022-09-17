import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../db");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(<string>req.query.id);

  const data = await db.execute(
    `SELECT xt.client_id         as 'opponent_client_id',
            ct.\`name\`          as 'opponent_name',
            xt.skill             as 'opponent_skill',
            xo.kills,
            xo.retals            as 'deaths',
            xo.kills / xo.retals as 'win_rate',
            xo.kills + xo.retals as 'confrontations'
     FROM xlr_opponents AS xo
            JOIN xlr_playerstats AS xt ON xt.id = xo.killer_id
            JOIN clients AS ct ON ct.id = xt.client_id
     WHERE xo.target_id = (SELECT id FROM xlr_playerstats WHERE client_id = ?)
       AND xo.kills > 10
     ORDER BY confrontations DESC
     LIMIT 7
    `,
    [id]
  );

  res.status(200).json(data);
}

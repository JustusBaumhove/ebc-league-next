import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../../db");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = "%" + <string>req.query.name + "%";
  const itemCount = parseInt(<string>process.env.ITEMS_PER_PAGE);
  const offset = itemCount * parseInt(<string>req.query.id);

  let data = await db.execute(
    `SELECT c.id, c.name, x.skill, x.ratio, x.kills, x.deaths, p.prestige,
            (SELECT (COUNT(xi.id) + 1)
                FROM xlr_playerstats AS xi
                WHERE xi.skill > x.skill
                AND xi.skill < 
                    CASE 
                        WHEN x.skill <= 1100 THEN 1100
                        WHEN x.skill <= 1300 THEN 1300
                        WHEN x.skill <= 1500 THEN 1500
                        ELSE 3000
                    END) AS \`lrank\`
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

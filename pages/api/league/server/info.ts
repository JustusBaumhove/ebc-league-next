import type { NextApiRequest, NextApiResponse } from "next";

const db = require("../../db");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await db.execute(`SELECT * FROM current_svars_28950`, []);
  const mapData = await db
    .execute("SELECT name FROM xlr_mapstats ORDER BY rounds DESC LIMIT 1", [])
    .catch((err: any) => {
      console.error(err);
      res.status(500).json("Internal server error.");
    });
  const playersData = await db
    .execute("SELECT COUNT(id) AS 'players' FROM xlr_playerstats;", [])
    .catch((err: any) => {
      console.error(err);
      res.status(500).json("Internal server error.");
    });
  const weaponsData = await db
    .execute("SELECT name FROM xlr_weaponstats ORDER BY kills DESC LIMIT 1", [])
    .catch((err: any) => {
      console.error(err);
      res.status(500).json("Internal server error.");
    });

  const formattedData = {
    "server ip": data[0].value + ":" + data[1].value,
    "current map": data[19].value.split("_")[1],
    "current players": data[11].value + "/" + data[35].value,
    gametype: data[3].value === "sr" ? "Search & Rescue" : "Search & Destroy",
    uptime: data[21].value,
    "total competing players": playersData[0].players.toString(),
    "favourite map": mapData[0].name.split("_")[1],
    "favourite weapon": weaponsData[0].name.split("_")[0],
  };

  res.status(200).json(formattedData);
}

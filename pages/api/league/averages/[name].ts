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

    const data = await db.execute(
        `SELECT COUNT(x.id) AS "players", 
                    ROUND(AVG(x.ratio), 2) AS "ratio", 
                    ROUND(AVG(x.kills)) AS "kills", 
                    ROUND(AVG(x.deaths)) AS "deaths"
                                FROM clients AS c
                                JOIN xlr_playerstats AS x ON x.client_id = c.id
                                JOIN player_core AS p ON p.guid = c.guid
                                WHERE x.skill > ?
                                AND x.skill <= ?`,
        [leagueBounds[league]["lower"], leagueBounds[league]["upper"]]
    );

    res.status(200).json(data);
}

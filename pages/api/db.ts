import { createConnection } from "mysql2";

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

export const execute = async (query: string, params: string[] | Object) => {
    const connection = await createConnection(config);

    try {
        return new Promise((resolve, reject) => {
            connection.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    } finally {
        await connection.end();
    }
};
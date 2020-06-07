import {ConfigRepository} from "./ConfigRepository";
import {Client, ClientConfig, QueryResult} from 'pg';
import fs from 'fs';

export class DataBase {
    public static configRepository = new ConfigRepository();
    private static config: ClientConfig = {
        user: 'app',
        host: 'postgres',
        database: 'db',
        password: 'app',
        port: 5432
    }

    static async query(query: string, args: Array<string | number> = []): Promise<QueryResult> {
        const client: Client = new Client(DataBase.config);

        return new Promise(async (resolve, reject) => {
            await client.connect();
            client.query(query, args,async(err, result) => {
                if (err) reject(err)
                else resolve(result)
                await client.end();
            })
        })
    }

    static async queryFile(fileName: string) : Promise<void> {
        const fileContent: string = fs.readFileSync(fileName, {'encoding': "utf8"});

        await DataBase.query(fileContent)
    }
}
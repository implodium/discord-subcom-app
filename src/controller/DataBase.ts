import {ConfigRepository} from "./ConfigRepository";
import {Client} from 'pg'

export class DataBase {
    public static configRepository = new ConfigRepository();
    private static host = 'postgres';
    private static database = 'db';
    private static user = 'app';
    private static password ='app';
    private static port = 5432;
    public static client = new Client({
        user: DataBase.user,
        host: DataBase.host,
        database: DataBase.database,
        password: DataBase.password,
        port: DataBase.port
    });
}
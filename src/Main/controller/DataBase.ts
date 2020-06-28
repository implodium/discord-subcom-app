import {GuildConfigRepository} from "./GuildConfigRepository";
import {Client, QueryResult} from 'pg';
import fs from 'fs';
import {PermissionRepository} from "./PermissionRepository";
import {MemberRepository} from "./MemberRepository";
import {SubComRepository} from "./SubComRepository";
import {SubComMemberAssoziationRepository} from "./SubComMemberAssoziationRepository";

export class DataBase {
    public static guildConfigRepository = new GuildConfigRepository();
    public static permissionRepository = new PermissionRepository();
    public static memberRepository = new MemberRepository();
    public static subComRepository = new SubComRepository();
    public static subComMemberAssoziationRepository = new SubComMemberAssoziationRepository();

    static async query(query: string, args: Array<string | number> = []): Promise<QueryResult> {
        const client: Client = new Client();

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
import {Repository} from "./Repository";
import {GuildMember} from "../model/GuildMember";
import {DataBase} from "./DataBase";
import {QueryResult} from "pg";

export class MemberRepository extends Repository<GuildMember>{
    async delete(id: string): Promise<void> {
        await DataBase.query(
            "DELETE FROM member WHERE id = $1",
            [id]
        )
    }

    async get(id: string): Promise<GuildMember> {
        const result: QueryResult = await DataBase.query(
            "SELECT * FROM member WHERE id = $1",
            [id]
        )

        return new GuildMember(
            result.rows[0].id,
            result.rows[0].count
        )
    }

    async insert(object: GuildMember): Promise<string> {
        await DataBase.query(
            'INSERT INTO member (id, count) VALUES ($1, $2)',
            [object.id, object.count]
        ).catch(console.log)

        return object.id
    }

    async update(object: GuildMember): Promise<number> {
        const result: QueryResult = await DataBase.query(
            "UPDATE member SET count = $1 WHERE id = $2",
            [object.count, object.id]
        )

        return result.rows.length;
    }

}
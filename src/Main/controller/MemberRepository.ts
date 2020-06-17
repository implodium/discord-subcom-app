import {Repository} from "./Repository";
import {Member} from "../model/Member";
import {DataBase} from "./DataBase";
import {QueryResult} from "pg";

export class MemberRepository extends Repository<Member>{
    async delete(id: string): Promise<void> {
        await DataBase.query(
            "DELETE FROM member WHERE id = $1",
            [id]
        )
    }

    async get(id: string): Promise<Member> {
        const result: QueryResult = await DataBase.query(
            "SELECT * FROM member WHERE id = $1",
            [id]
        )

        return new Member(
            result.rows[0].id,
            result.rows[0].count
        )
    }

    async insert(object: Member): Promise<string> {
        await DataBase.query(
            'INSERT INTO member (id, count) VALUES ($1, $2)',
            [object.id, object.count]
        );

        return object.id
    }

    async update(object: Member): Promise<number> {
        const result: QueryResult = await DataBase.query(
            "UPDATE member SET count = $1 WHERE id = $2",
            [object.count, object.id]
        )

        return result.rows.length;
    }

}
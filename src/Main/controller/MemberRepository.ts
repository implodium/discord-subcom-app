import {Repository} from "./Repository";
import {Member} from "../model/Member";
import {DataBase} from "./DataBase";

export class MemberRepository extends Repository<Member>{
    async delete(id: string): Promise<void> {
        await DataBase.query(
            "DELETE FROM member WHERE id = $1",
            [id]
        )
    }

    async get(id: string): Promise<Member> {
        return Promise.resolve(new Member('x', 5));
    }

    async insert(object: Member): Promise<string> {
        await DataBase.query(
            'INSERT INTO member (id, count) VALUES ($1, $2)',
            [object.id, object.count]
        );

        return object.id
    }

    async update(object: Member): Promise<number> {
        return Promise.resolve(0);
    }

}
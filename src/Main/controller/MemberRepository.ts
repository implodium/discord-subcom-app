import {Repository} from "./Repository";
import {Member} from "../model/Member";

export class MemberRepository extends Repository<Member>{
    async delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(id: string): Promise<Member> {
        return Promise.resolve(new Member())
    }

    async insert(object: Member): Promise<string> {
        return Promise.resolve("");
    }

    async update(object: Member): Promise<number> {
        return Promise.resolve(0);
    }

}
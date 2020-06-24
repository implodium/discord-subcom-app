import {Repository} from "./Repository";
import {SubCom} from "../model/SubCom";

export class SubComRepository extends Repository<SubCom>{
    async delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(id: string): Promise<SubCom> {
        return Promise.resolve(new SubCom('', ''));
    }

    async insert(object: SubCom): Promise<string> {
        return Promise.resolve("");
    }

    async update(object: SubCom): Promise<number> {
        return Promise.resolve(0);
    }

}
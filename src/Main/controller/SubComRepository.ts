import {Repository} from "./Repository";
import {SubCom} from "../model/SubCom";
import {DataBase} from "./DataBase";

export class SubComRepository extends Repository<SubCom>{
    async delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(id: string): Promise<SubCom> {
        return Promise.resolve(new SubCom('', '', ''));
    }

    async insert(object: SubCom): Promise<string> {
        await DataBase.query(
            'INSERT INTO subcom (categoryid, name, ownerid) VALUES ($1, $2, $3)',
            [object.id, object.name, object.ownerId]
        )

        return object.id
    }

    async update(object: SubCom): Promise<number> {
        return Promise.resolve(0);
    }

}
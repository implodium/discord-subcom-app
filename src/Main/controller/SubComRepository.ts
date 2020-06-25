import {Repository} from "./Repository";
import {SubCom} from "../model/SubCom";
import {DataBase} from "./DataBase";
import {QueryResult} from "pg";

export class SubComRepository extends Repository<SubCom>{
    async delete(id: string): Promise<void> {
        await DataBase.query(
            'DELETE FROM subcom WHERE categoryid = $1',
            [id]
        )
    }

    async get(id: string): Promise<SubCom> {
        const result: QueryResult = await DataBase.query(
            "SELECT * FROM subcom WHERE categoryid = $1",
            [id]
        );

        return new SubCom(
            result.rows[0].categoryid,
            result.rows[0].name,
            result.rows[0].ownerid
        )
    }

    async insert(object: SubCom): Promise<string> {
        await DataBase.query(
            'INSERT INTO subcom (categoryid, name, ownerid) VALUES ($1, $2, $3)',
            [object.id, object.name, object.ownerId]
        )

        return object.id
    }

    async update(object: SubCom): Promise<number> {
        const result: QueryResult = await DataBase.query(
            'UPDATE subcom SET name = $1, ownerid = $2 WHERE categoryid = $3',
            [object.name, object.ownerId, object.id]
        )

        return result.rowCount;
    }

    async getAllByOwner(ownerId: string): Promise<Array<SubCom>> {
        const subcoms: Array<SubCom> = []

        const result: QueryResult = await DataBase.query(
            'SELECT * FROM subcom WHERE ownerid = $1',
            [ownerId]
        )

        result.rows.forEach(row => {
            subcoms.push(new SubCom(
                row.categoryid,
                row.name,
                row.ownerid
            ))
        })

        return subcoms;
    }

}
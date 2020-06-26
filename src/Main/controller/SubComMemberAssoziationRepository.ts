import {AssoziationRepository} from "./AssoziationRepository";
import {SubComMemberAssoziation} from "../model/SubComMemberAssoziation";
import {QueryResult} from "pg";
import {DataBase} from "./DataBase";

export class SubComMemberAssoziationRepository extends AssoziationRepository<SubComMemberAssoziation>{
    async delete(id1: string, id2: string): Promise<void> {

    }

    async get(id1: string, id2: string): Promise<SubComMemberAssoziation> {
        const result: QueryResult = await DataBase.query(
            'SELECT * FROM subcom_member_assoziation WHERE memberid = $1 AND subcomid = $2',
            [id1, id2]
        )

        return new SubComMemberAssoziation(
            await DataBase.subComRepository.get(result.rows[0].subcomid),
            result.rows[0].memberid
        )
    }

    async insert(object: SubComMemberAssoziation): Promise<Array<string>> {
        await DataBase.query(
            "INSERT INTO subcom_member_assoziation (subcomid, memberid) VALUES ($1, $2)",
            [object.subCom.id, object.memberId]
        )

        return [object.subCom.id, object.memberId]
    }
}
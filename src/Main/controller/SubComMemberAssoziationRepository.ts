import {AssoziationRepository} from "./AssoziationRepository";
import {SubComMemberAssoziation} from "../model/SubComMemberAssoziation";
import {QueryResult} from "pg";
import {DataBase} from "./DataBase";

export class SubComMemberAssoziationRepository extends AssoziationRepository<SubComMemberAssoziation>{
    async delete(subcomid: string, memberid: string): Promise<void> {
        await DataBase.query(
            "DELETE FROM subcom_member_assoziation WHERE subcomid = $1 AND memberid = $2",
            [subcomid, memberid]
        )
    }

    async get(subcomid: string, memberid: string): Promise<SubComMemberAssoziation> {
        const result: QueryResult = await DataBase.query(
            'SELECT * FROM subcom_member_assoziation WHERE memberid = $1 AND subcomid = $2',
            [memberid, subcomid]
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
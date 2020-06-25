import {AssoziationRepository} from "./AssoziationRepository";
import {SubComMemberAssoziation} from "../model/SubComMemberAssoziation";
import {SubCom} from "../model/SubCom";

export class SubComMemberAssoziationRepository extends AssoziationRepository<SubComMemberAssoziation>{
    async delete(id1: string, id2: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(id1: string, id2: string): Promise<SubComMemberAssoziation> {
        return Promise.resolve(new SubComMemberAssoziation(new SubCom('', '', ''), ''));
    }

    async insert(object: SubComMemberAssoziation): Promise<string> {
        return Promise.resolve("");
    }

    async update(object: SubComMemberAssoziation): Promise<number> {
        return Promise.resolve(0);
    }

}
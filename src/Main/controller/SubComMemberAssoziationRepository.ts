import {AssoziationRepository} from "./AssoziationRepository";
import {SubComAssoziation} from "../model/SubComAssoziation";
import {SubCom} from "../model/SubCom";

export class SubComMemberAssoziationRepository extends AssoziationRepository<SubComAssoziation>{
    async delete(id1: string, id2: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(id1: string, id2: string): Promise<SubComAssoziation> {
        return Promise.resolve(new SubComAssoziation(new SubCom('', '', ''), ''));
    }

    async insert(object: SubComAssoziation): Promise<string> {
        return Promise.resolve("");
    }

    async update(object: SubComAssoziation): Promise<number> {
        return Promise.resolve(0);
    }

}
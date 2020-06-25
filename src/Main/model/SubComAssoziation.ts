import {SubCom} from "./SubCom";

export class SubComAssoziation {
    public readonly subCom: SubCom;
    public readonly memberId: string;

    constructor(subCom: SubCom, memberId: string) {
        this.subCom = subCom;
        this.memberId = memberId;
    }
}
export class SubCom {
    public readonly name: string;
    public members: Array<string>;

    constructor(name: string) {
        this.name = name;
        this.members = new Array<string>();
    }

    public addMember(id: string) {
        this.members.push(id)
    }

    public removeMember(id: string) {
        const index = this.members.indexOf(id);
        this.members.slice(index, index);
    }
}
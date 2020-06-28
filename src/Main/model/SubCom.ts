export class SubCom {
    public readonly id: string;
    public readonly name: string;
    public members: Array<string>;
    public readonly ownerId: string;

    constructor(
        id: string,
        name: string,
        ownerId: string,
        members: Array<string> = new Array<string>()
    ) {
        this.id = id;
        this.name = name;
        this.members = members;
        this.ownerId = ownerId;
    }

    public addMember(id: string) {
        this.members.push(id)
    }

    public removeMember(id: string) {
        const index = this.members.indexOf(id);
        this.members.splice(index, 1);
    }
}
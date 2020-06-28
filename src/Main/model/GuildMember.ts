export class GuildMember {
    public readonly id: string;
    public count: number;

    constructor(id: string, count: number) {
        this.id = id;
        this.count = count;
    }
}
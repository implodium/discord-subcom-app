export class Member {
    public readonly id: string;
    public countLeft: number;

    constructor(id: string, countLeft: number) {
        this.id = id;
        this.countLeft = countLeft;
    }
}
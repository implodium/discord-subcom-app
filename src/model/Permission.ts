export class Permission {
    public roleId: string;
    public count: number;

    constructor(roleId: string, count: number) {
        this.roleId = roleId;
        this.count = count;
    }
}
export class BotError extends Error {
    public readonly toUser: boolean;

    constructor(message: string) {
        super(message);
        this.toUser = true;
    }
}
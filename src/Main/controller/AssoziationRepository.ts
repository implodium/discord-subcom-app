export abstract class AssoziationRepository<T> {
    abstract async delete(id1: string, id2: string): Promise<void>;
    abstract async insert(object: T): Promise<Array<string>>;
    abstract async get(id1: string, id2: string): Promise<T>;
}
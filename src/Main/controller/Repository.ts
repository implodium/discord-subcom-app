export abstract class Repository<T> {
    abstract async update(object: T): Promise<number>;
    abstract async delete(id: string): Promise<void>;
    abstract async insert(object: T): Promise<string>;
    abstract async get(id: string): Promise<T>;
}
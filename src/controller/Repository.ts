export abstract class Repository<T> {
    abstract async update(object: T): Promise<number>;
    abstract async delete(id: number): Promise<void>;
    abstract async insert(object: T): Promise<number>;
    abstract async get(id: number): Promise<T>;
}
export interface Repository<T> {
    update(object: T): number;
    delete(id: number): void;
    insert(object: T): void;
    get(id: number): T;
}
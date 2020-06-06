import {Repository} from "./Repository";
import {ServerConfig} from "../ServerConfig";

export class ConfigRepository extends Repository<ServerConfig> {
    async delete(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async insert(object: ServerConfig): Promise<number> {
        return Promise.resolve(0);
    }

    async get(id: number): Promise<ServerConfig> {
        return Promise.resolve(new ServerConfig(1, ";"));
    }

    async update(object: ServerConfig): Promise<number> {
        return Promise.resolve(0);
    }

}
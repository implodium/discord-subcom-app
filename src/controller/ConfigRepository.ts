import {Repository} from "./Repository";
import {ServerConfig} from "../ServerConfig";

export class ConfigRepository implements Repository<ServerConfig> {
    delete(id: number): void {
    }

    get(id: number): ServerConfig {
        return new ServerConfig(";");
    }

    insert(object: ServerConfig): void {
    }

    update(object: ServerConfig): number {
        return -1;
    }
}
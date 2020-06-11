import {Repository} from "./Repository";
import {Permission} from "../model/Permission";
import {DataBase} from "./DataBase";
import {QueryResult} from "pg";

export class PermissionRepository extends Repository<Permission>{
    async delete(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(roleId: string): Promise<Permission> {
        return new Promise(() => new Permission('', 3));
    }

    async insert(object: Permission): Promise<string> {
        return Promise.resolve("");
    }

    async update(object: Permission): Promise<number> {
        return Promise.resolve(0);
    }

    async getAll(guildConfigId: string): Promise<Map<string, Permission>> {
        const permissions: Map<string,Permission> = new Map();

        const result: QueryResult = await DataBase.query(
            "SELECT * FROM permission WHERE guildid = $1",
            [guildConfigId]
        );

        result.rows.forEach(row => {
            const permission: Permission = new Permission(row.roleid, row.count)
            permissions.set(permission.roleId, permission);
        })

        return permissions

    }
}
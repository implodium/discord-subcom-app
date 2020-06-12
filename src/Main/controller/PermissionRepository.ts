import {Repository} from "./Repository";
import {Permission} from "../model/Permission";
import {DataBase} from "./DataBase";
import {QueryResult} from "pg";

export class PermissionRepository extends Repository<Permission>{
    async delete(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(roleId: string): Promise<Permission> {
        const result: QueryResult = await DataBase.query(
            'SELECT * FROM PERMISSION WHERE roleid = $1',
            [roleId]
        );

        if (result.rows.length === 1) {
            return new Permission(
                result.rows[0].roleid,
                result.rows[0].count,
                await DataBase.guildConfigRepository.get(result.rows[0].guildid)
            );
        }

        return new Promise(() => null);
    }

    async insert(object: Permission): Promise<string> {
        await DataBase.query(
            "INSERT INTO permission (roleid, count, guildid) VALUES ($1, $2, $3)",
            [object.roleId, object.count, object.guildConfig.guildId]
        )

        return object.roleId;
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

        for (const row of result.rows) {

            const permission: Permission = new Permission(
                row.roleid,
                row.count,
                await DataBase.guildConfigRepository.get(row.guildid)
            );

            permissions.set(permission.roleId, permission);
        }

        return permissions

    }
}
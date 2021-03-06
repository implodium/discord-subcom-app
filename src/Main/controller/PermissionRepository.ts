import {Repository} from "./Repository";
import {Permission} from "../model/Permission";
import {DataBase} from "./DataBase";
import {QueryResult} from "pg";

export class PermissionRepository extends Repository<Permission>{
    async delete(roleId: string): Promise<void> {
        await DataBase.query(
            "DELETE FROM permission WHERE roleid = $1",
            [roleId]
        );
    }

    async get(roleId: string): Promise<Permission> {
        const result: QueryResult = await DataBase.query(
            'SELECT * FROM PERMISSION WHERE roleid = $1',
            [roleId]
        );

        return new Permission(
            result.rows[0].roleid,
            result.rows[0].count,
            await DataBase.guildConfigRepository.get(result.rows[0].guildid)
        );
    }

    async insert(object: Permission): Promise<string> {
        await DataBase.query(
            "INSERT INTO permission (roleid, count, guildid) VALUES ($1, $2, $3)",
            [object.roleId, object.count, object.guildConfig.guildId]
        )

        return object.roleId;
    }

    async update(object: Permission): Promise<number> {
        const result: QueryResult = await DataBase.query(
            "UPDATE permission SET count = $1, guildid = $2 WHERE roleid = $3",
            [object.count, object.guildConfig.guildId, object.roleId]
        )

        return result.rowCount;
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
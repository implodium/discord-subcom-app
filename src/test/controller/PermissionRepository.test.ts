import {DataBase} from "../../Main/controller/DataBase";
import {Permission} from "../../Main/model/Permission";
import {QueryResult} from "pg";
import {GuildConfig} from "../../Main/model/GuildConfig";

beforeEach(async(done) => {
    await DataBase.queryFile('./sql/drop.sql')
    await DataBase.queryFile('./sql/create.sql')
    await DataBase.queryFile('./sql/insert.sql')
    done();
})

test('get all', async done => {
    const permissions: Map<string, Permission> = await DataBase.permissionRepository.getAll('-3');
    expect(permissions.size).toBe(2);
    expect(permissions.get('-1')).toBeTruthy();
    expect(permissions.get('-2')).toBeTruthy();
    expect(permissions.get('-15')).toBeUndefined();
    expect((permissions.get('-1') as Permission).count).toBe(1);
    expect((permissions.get('-2') as Permission).count).toBe(2);

    done();
})

test('get', async done => {
    const permission1: Permission = await DataBase.permissionRepository.get('-1');
    expect(permission1.roleId).toBe('-1');
    expect(permission1.count).toBe(1);
    const permission2: Permission = await DataBase.permissionRepository.get('-2');
    expect(permission2.roleId).toBe('-2');
    expect(permission2.count).toBe(2);
    done();
})

test('insert', async done => {
    await DataBase.permissionRepository.insert(new Permission(
        '-3',
        3,
        new GuildConfig('-3', '.')
    ));

    const result: QueryResult = await DataBase.query(
        'SELECT * FROM permission WHERE roleid = $1',
        ['-3']
    );

    expect(result.rows[0].roleid).toBe('-3');
    expect(result.rows[0].count).toBe(3);
    done();
})

test('update', async done => {
    await DataBase.permissionRepository.update(new Permission(
        '-1',
        1,
        new GuildConfig('-1', ';')
    ))

    const result: QueryResult = await DataBase.query(
        "SELECT * FROM permission WHERE roleid = $1",
        [-1]
    )

    expect(result.rows[0].count).toBe(1);
    expect(result.rows[0].roleid).toBe('-1');
    expect(result.rows[0].guildid).toBe('-1');
    done();
})
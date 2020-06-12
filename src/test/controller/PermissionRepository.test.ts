import {DataBase} from "../../Main/controller/DataBase";
import {Permission} from "../../Main/model/Permission";

beforeEach(async(done) => {
    await DataBase.queryFile('./sql/drop.sql')
    await DataBase.queryFile('./sql/create.sql')
    await DataBase.queryFile('./sql/insert.sql')
    done();
})

test('get all', async done => {
    const permissions: Map<string, Permission> = await DataBase.permissionRepository.getAll('-3');
    expect(permissions.size).toBe(2);
    expect(permissions.get('-1')).not.toBeUndefined();
    expect(permissions.get('-2')).not.toBeUndefined();
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
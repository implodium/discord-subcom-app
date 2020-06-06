import {DataBase} from "../../controller/DataBase";
import {ServerConfig} from "../../ServerConfig";
import {QueryResult} from "pg";

jest.setTimeout(30000);


beforeEach(async(done) => {
    await DataBase.query('DELETE FROM config where guildid < 0')
    await DataBase.query(
        'INSERT INTO config (guildid, prefix) values ($1, $2)',
        [-1, ';']
    )
    done();
})

test('update',  async (done) => {
    const serverConfig: ServerConfig = new ServerConfig(-1, '.');

    await DataBase.configRepository.update(serverConfig);
    const result: QueryResult = await DataBase.query(
        'SELECT prefix FROM config WHERE guildid = -1'
    )

    expect(result.rows[0].prefix).toBe('.')

    done();
})

test('insert', async done => {
    const serverConfig: ServerConfig = new ServerConfig(-2, '.');
    await DataBase.configRepository.insert(serverConfig);
    const result: QueryResult = await DataBase.query(
        'SELECT prefix FROM config WHERE guildid = -2'
    )

    expect(result.rows[0].prefix).toBe('.')

    done();
})

test('get', async done => {
    const serverConfig: ServerConfig = await DataBase.configRepository.get(-1);
    expect(serverConfig).toBeInstanceOf(ServerConfig);
    expect(serverConfig.prefix).toBe(';')
    expect(serverConfig.guildId).toBe(-1)
    done();
})
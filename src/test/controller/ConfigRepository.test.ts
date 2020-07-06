import {DataBase} from "../../Main/controller/DataBase";
import {GuildConfig} from "../../Main/model/GuildConfig";
import {QueryResult} from "pg";

jest.setTimeout(30000);

beforeEach(async(done) => {
    await DataBase.queryFile('./sql/drop.sql')
        .catch(console.log)
    await DataBase.queryFile('./sql/create.sql')
        .catch(console.log)
    await DataBase.queryFile('./sql/insert.sql')
        .catch(console.log)
    done();
})

test('update',  async (done) => {
    const serverConfig: GuildConfig = new GuildConfig('-1', '.', '-1');

    await DataBase.guildConfigRepository.update(serverConfig);
    const result: QueryResult = await DataBase.query(
        "SELECT prefix FROM guild_config WHERE guildid = '-1'"
    )

    expect(result.rows[0].prefix).toBe('.')

    done();
})

test('insert', async done => {
    const serverConfig: GuildConfig = new GuildConfig('-2', '.', '-1');
    await DataBase.guildConfigRepository.insert(serverConfig);
    const result: QueryResult = await DataBase.query(
        "SELECT prefix FROM guild_config WHERE guildid = '-2'"
    )

    expect(result.rows[0].prefix).toBe('.')

    done();
})

test('get', async done => {
    const serverConfig: GuildConfig = await DataBase.guildConfigRepository.get('-1');
    expect(serverConfig).toBeInstanceOf(GuildConfig);
    expect(serverConfig.prefix).toBe(';')
    expect(serverConfig.guildId).toBe('-1')
    done();
})

test('delete', async done => {
    await DataBase.guildConfigRepository.delete('-1');

    const result: QueryResult = await DataBase.query(
        "SELECT * FROM guild_config WHERE guildid = '-1'"
    );

    expect(result.rows.length).toBe(0);
    done();
})
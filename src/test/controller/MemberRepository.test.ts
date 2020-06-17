import {DataBase} from "../../Main/controller/DataBase";
import {QueryResult} from "pg";
import {GuildMember} from "../../Main/model/GuildMember";

beforeEach(async done => {
    await DataBase.queryFile('./sql/drop.sql')
        .catch(console.log)
    await DataBase.queryFile('./sql/create.sql')
    await DataBase.queryFile('./sql/insert.sql')
    done();
})

test('insert', async done => {
    await DataBase.memberRepository.insert(new GuildMember(
        '-3',
        5
    ));

    const result: QueryResult = await DataBase.query(
        'SELECT * FROM member WHERE id = $1',
        ['-3']
    );

    expect(result.rows[0].id).toBe('-3');
    expect(result.rows[0].count).toBe(5);
    done();
})

test('delete', async done => {
    await DataBase.memberRepository.delete('-1');

    const result: QueryResult = await DataBase.query(
        "SELECT * FROM member WHERE id = '-1'"
    );

    expect(result.rows.length).toBe(0);
    done();
})

test('update', async done => {
    await DataBase.memberRepository.update(new GuildMember(
        '-1',
        5
    ));

    const result: QueryResult = await DataBase.query(
        "SELECT * FROM member WHERE id = $1",
        ['-1']
    );

    expect(result.rows[0].count).toBe(5);
    expect(result.rows[0].id).toBe('-1');

    done();
})

test('get', async done => {
    const member: GuildMember = await DataBase.memberRepository.get('-1');

    expect(member).toBeInstanceOf(GuildMember);
    expect(member.id).toBe('-1');
    expect(member.count).toBe(3);

    done();
})
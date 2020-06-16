import {DataBase} from "../../Main/controller/DataBase";
import {QueryResult} from "pg";
import {Member} from "../../Main/model/Member";

beforeEach(async done => {
    await DataBase.queryFile('./sql/drop.sql')
    await DataBase.queryFile('./sql/create.sql')
    await DataBase.queryFile('./sql/insert.sql')
    done();
})

test('insert', async done => {
    await DataBase.memberRepository.insert(new Member(
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
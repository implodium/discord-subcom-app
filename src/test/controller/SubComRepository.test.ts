import {DataBase} from "../../Main/controller/DataBase";
import {QueryResult} from "pg";
import {SubCom} from "../../Main/model/SubCom";

beforeEach(async done => {
    await DataBase.queryFile('./sql/drop.sql')
        .catch(console.log)
    await DataBase.queryFile('./sql/create.sql')
        .catch(console.log)
    await DataBase.queryFile('./sql/insert.sql')
        .catch(console.log)
    done();
})

test('insert', async done => {
    await DataBase.subComRepository.insert(new SubCom(
        '-3',
        'some name',
        '-3'
    ));

    const result: QueryResult = await DataBase.query(
        'SELECT * FROM subcom WHERE categoryid = $1',
        ['-3']
    );

    expect(result.rows[0].name).toBe('some name');
    expect(result.rows[0].categoryid).toBe('-3');
    expect(result.rows[0].ownerid).toBe('-3')
    done();
})
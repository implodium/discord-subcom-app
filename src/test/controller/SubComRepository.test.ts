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

test('get', async done => {
    const subCom1: SubCom = await DataBase.subComRepository.get('-1');
    expect(subCom1.id).toBe('-1');
    expect(subCom1.ownerId).toBe('-1');
    expect(subCom1.name).toBe('some name 1')
    const subCom2: SubCom = await DataBase.subComRepository.get('-2');
    expect(subCom2.id).toBe('-2');
    expect(subCom2.ownerId).toBe('-2');
    expect(subCom2.name).toBe('some name 2')
    done();
})

test('update', async done => {
    await DataBase.subComRepository.update(new SubCom(
        '-1',
        'some name 3',
        '-50'
    ));

    const result: QueryResult = await DataBase.query(
        "SELECT * FROM subcom WHERE categoryid = $1",
        ['-1']
    );

    expect(result.rows[0].name).toBe('some name 3');
    expect(result.rows[0].ownerid).toBe('-50');

    done();
})

test('delete', async done => {
    await DataBase.subComRepository.delete('-1');

    const result: QueryResult = await DataBase.query(
        "SELECT * FROM subcom WHERE categoryid  = '-1'"
    );

    expect(result.rows.length).toBe(0);
    done();
})

test('getAllByOwner', async done => {
    let subcoms: Array<SubCom> = await DataBase.subComRepository.getAllByOwner('-1');

    expect(subcoms.length).toBe(2);
    expect(subcoms[0]).toBeInstanceOf(SubCom);
    expect(subcoms[1]).toBeInstanceOf(SubCom);
    expect(subcoms[0]).toBeTruthy();
    expect(subcoms[1]).toBeTruthy();

    subcoms = subcoms.sort((a: SubCom, b: SubCom) => {
        return a.id.localeCompare(b.id)
    })

    expect(subcoms[0].id).toBe('-1')
    expect(subcoms[1].id).toBe('-4')
    expect(subcoms[0].name).toBe('some name 1')
    expect(subcoms[1].name).toBe('some name 1')
    expect(subcoms[0].ownerId).toBe('-1')
    expect(subcoms[1].ownerId).toBe('-1')

    done();
})
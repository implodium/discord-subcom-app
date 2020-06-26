import {DataBase} from "../../Main/controller/DataBase";
import {SubComMemberAssoziation} from "../../Main/model/SubComMemberAssoziation";

beforeEach(async done => {
    await DataBase.queryFile('./sql/drop.sql')
        .catch(console.log)
    await DataBase.queryFile('./sql/create.sql')
        .catch(console.log)
    await DataBase.queryFile('./sql/insert.sql')
        .catch(console.log)
    done();
})

test('get', async done => {
    const subComMemberAssoziation1: SubComMemberAssoziation = await DataBase.subComMemberAssoziationRepository.get('-1', '-1');
    expect(subComMemberAssoziation1.subCom.id).toBe('-1');
    expect(subComMemberAssoziation1.memberId).toBe('-1');
    const subComMemberAssoziation2: SubComMemberAssoziation = await DataBase.subComMemberAssoziationRepository.get('-2', '-2');
    expect(subComMemberAssoziation2.subCom.id).toBe('-2');
    expect(subComMemberAssoziation2.memberId).toBe('-2');
    const subComMemberAssoziation3: SubComMemberAssoziation = await DataBase.subComMemberAssoziationRepository.get('-3', '-3');
    expect(subComMemberAssoziation3.subCom.id).toBe('-2');
    expect(subComMemberAssoziation3.memberId).toBe('-2');
    done();
})
import {DataBase} from "../../controller/DataBase";

jest.setTimeout(30000);


beforeEach(async(done) => {
    await DataBase.query('DELETE FROM config where guildid = -1')
    await DataBase.query(
        'INSERT INTO config (guildid, prefix) values ($1, $2)',
        [-1, ';']
    )
    done();
})

test('update',  async (done) => {
    done();
})
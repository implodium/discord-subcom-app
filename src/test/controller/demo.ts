import {DataBase} from "../../controller/DataBase";
const func = async () => {
    await DataBase.client.connect();
    console.log(await DataBase.client.query('SELECT * FROM config'));
}


func()
    .catch(console.log)

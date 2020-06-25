import {SubCom} from "../../Main/model/SubCom";

let subcom: SubCom;

beforeEach(() => {
    //subcom = new SubCom('testName');
})

test('add Member', () => {
    expect(subcom.members.length).toBe(0)
    subcom.addMember('something')
    expect(subcom.members[0]).toBe('something')
    expect(subcom.members.length).toBe(1)
})

test('remove Member', () => {
    subcom.members.push('something')
    expect(subcom.members.length).toBe(1)
    subcom.removeMember('something')
    expect(subcom.members.length).toBe(0)
})
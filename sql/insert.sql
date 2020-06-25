insert into guild_config(guildId, prefix) values (-1, ';');
insert into guild_config(guildId, prefix) values (-3, ';');
insert into permission(roleid, count, guildid) values (-1, 1, -3);
insert into permission(roleid, count, guildid) values (-2, 2, -3);
insert into member(id, count) values (-1, 3);
insert into member(id, count) values (-2, 5);
insert into subcom(categoryid, name, ownerid) values (-1, 'some name', -1);
insert into subcom(categoryid, name, ownerid) values (-2, 'some name', -2);
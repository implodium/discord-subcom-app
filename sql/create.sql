CREATE TABLE CONFIG (
    guildId varchar(18),
    prefix varchar(30),
    CONSTRAINT PK_CONFIG PRIMARY KEY (guildId)
);

CREATE TABLE PERMISSION (
    roleId varchar(18),
    count int,
    guildId varchar(18),
    CONSTRAINT PK_PERMISSION PRIMARY KEY (roleId),
    CONSTRAINT FK_PERMISSION_CONFIG
        FOREIGN KEY (guildId) REFERENCES CONFIG (guildId)
);
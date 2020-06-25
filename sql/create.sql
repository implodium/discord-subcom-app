CREATE TABLE GUILD_CONFIG (
    guildId varchar(18),
    prefix varchar(30),
    CONSTRAINT PK_GUILD_CONFIG PRIMARY KEY (guildId)
);

CREATE TABLE PERMISSION (
    roleId varchar(18),
    count int,
    guildId varchar(18),
    CONSTRAINT PK_PERMISSION PRIMARY KEY (roleId),
    CONSTRAINT FK_PERMISSION_GUILD_CONFIG
        FOREIGN KEY (guildId) REFERENCES GUILD_CONFIG (guildId)
);

CREATE TABLE MEMBER (
    id varchar(18),
    count int,
    CONSTRAINT PK_MEMBER PRIMARY KEY (id)
);

CREATE TABLE SUBCOM(
    categoryId varchar(18),
    name varchar(20),
    ownerId varchar(18),
    CONSTRAINT PK_SUBCOM PRIMARY KEY (categoryId)
);

CREATE TABLE SUBCOM_MEMBER_ASSOZIATION(
    subcomId varchar(18),
    memberId varchar(18),
    CONSTRAINT PK_SUBCOM_MEMBER_ASSOCIATION PRIMARY KEY (subcomId, memberId)
);
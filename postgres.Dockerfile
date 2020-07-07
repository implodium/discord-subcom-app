FROM library/postgres
COPY ./sql_setup/create.sql /docker-entrypoint-initdb.d/
// Config that is common to more than one part of the app.

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { Supervisor, Category } from "./models";

const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "db.postgres",
    port: 5432,
    username: "typeormcasino",
    password: "123456",
    database: "typeormcasino",
    synchronize: true,
    logging: false,
    entities: [
        Category,
        Supervisor
    ]
};

export { typeOrmConfig };
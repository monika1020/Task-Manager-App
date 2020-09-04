const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_CONFIG = {
    host: "localhost",
    user: "root",
    password: "mona1020",
    database: "taskmanager",
};

const addUser = async (input) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();

    let sql =
        "INSERT INTO USER (USERNAME, EMAIL, PASSWORD) VALUES (?, ?, ?)";
    await connection.queryAsync(sql, [
        input.username,
        input.email,
        input.password,


    ]);

    await connection.endAsync();
};



let authenticateUser = async (input) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();

    let sql = "SELECT * FROM USER WHERE EMAIL=? AND PASSWORD=?";
    const results = await connection.queryAsync(sql, [
        input.email,
        input.password,
    ]);

    await connection.endAsync();

    if (results.length === 0) {
        throw new Error("Invalid Credentials");
    }
};


////
const addTask = async (input) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();

    let sql =
        "INSERT INTO TASK (TASK) VALUES (?)";
    await connection.queryAsync(sql, [
        input.task,
    ]);

    await connection.endAsync();
};

///
const deleteTask = async (input) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();

    let sql =
        "DELETE FROM TASK WHERE taskid=?";
    await connection.queryAsync(sql, [
        input.taskid,
    ]);

    await connection.endAsync();
};




module.exports = { addUser, authenticateUser, addTask, deleteTask };
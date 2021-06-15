const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sqlite.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, comment TEXT, admin int)');
    db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, admin int)');
});

function getUser(username, password) {
    return new Promise(((resolve, reject) => {
        db.all(`SELECT username, admin FROM users WHERE username = '${username}' AND password = '${password}'`, function(err, rows) {
            if (err) {
                reject(err);
            } else if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        });
    }));
}

function getPosts() {
    return new Promise(((resolve, reject) => {
        db.all(`SELECT username, comment, admin FROM posts ORDER BY id DESC`, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }));
}

async function addPost({username, comment, admin}) {
    username = username.replace(/'/g, "''");
    comment = comment.replace(/'/g, "''");

    return new Promise(((resolve, reject) => {
        db.all(`INSERT INTO posts(username, comment, admin) VALUES('${username}', '${comment}', ${admin})`, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}

module.exports = {
    addPost,
    getPosts,
    getUser
};

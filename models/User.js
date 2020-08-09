const db = require('../db/config');

class User {
    constructor({ id, username, email, password_digest }) {
        this.id = id;
        this.username = username;
        this.email = emaill
        this.password_digest = password_digest;
    }

    static findByUserName(username) {
        return db
            .oneOrNone('SELECT * FROM users WHERE username = $1', username);
    }

    save() {
        return db
            .one(
                `INSERT INTO users (username, email, password_digest)
                VALUES ($/username/, $/email/, $/password_digest/)
                RETURNING *`, this
            )
            .then((savedUser) => Object.assign(this, savedUser));
    }
}

module.exports = User;
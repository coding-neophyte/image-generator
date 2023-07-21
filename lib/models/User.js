const pool = require('../utils/pool');

module.exports = class User {
  id;
  name;
  username;
  #passwordHash;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.username = row.username;
    this.#passwordHash = row.password;
  }
  static async insert({ name, username, password }){
    const { rows } = await pool.query(`
        INSERT INTO users (name, username, password)
        VALUES ($1, $2)
        RETURNING *`, [name, username, password]);

    return new User(rows[0]);
  }
  static async getByUsername({ username }){
    const { rows } = await pool.query(`
        SELECT * FROM users
        WHERE username = $1`, [username]);

    if(!rows[0]) return null;
    return new User(rows[0]);
  }
  get password_hash(){
    return this.#passwordHash;
  }
};

const pool = require('../utils/pool');

module.exports = class User {
  id;
  name;
  username;
  email;
  #password;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.username = row.username;
    this.#password = row.password;
  }
  static async insert({ name, username, password }){
    const { rows } = await pool.query(`
        INSERT INTO users (name, username, password)
        VALUES ($1, $2, $3)
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
  static async getByEmail({ email }){
    const { rows } = await pool.query(`
    SELECT * FROM users
    WHERE email = $1
    `, [email]);

    if(!rows[0]) return null;
    return new User(rows[0]);
  }
  get password(){
    return this.#password;
  }
};

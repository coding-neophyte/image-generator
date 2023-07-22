import pool from '../utils/pool';

module.exports = class Post {
  id;
  name;
  prompt;
  photo;
  userId;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.prompt = row.prompt;
    this.photo = row.photo;
    this.userId = row.userId;
  }

  static async insertPost({ name, prompt, photo, userId }){
    const { rows } = await pool.query(`
        INSERT INTO posts(name, prompt, photo, userId)
        VALUES ($1, $2, $3, $4)
        RETURNING *`, [name, prompt, photo, userId]);

    return new Post(rows[0]);
  }
  static async getAllPost(){
    const { rows } = await pool.query(`
        SELECT * FROM posts`);

    return rows.map((row) => new Post(row));
  }

};

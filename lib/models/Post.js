const pool = require('../utils/pool');

module.exports = class Post {
  id;
  name;
  prompt;
  photo;
  user_id;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.prompt = row.prompt;
    this.photo = row.photo;
    this.userid = row.user_id;
  }

  static async insertPost({ name, prompt, photo, user_id }){
    const { rows } = await pool.query(`
        INSERT INTO posts(name, prompt, photo, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *`, [name, prompt, photo, user_id]);

    return new Post(rows[0]);
  }
  static async getAllPost(){
    const { rows } = await pool.query(`
        SELECT * FROM posts`);

    return rows.map((row) => new Post(row));
  }
  static async getPostById({ id }){
    const { rows } = await pool.query(`
        SELECT * FROM posts
        WHERE id=$1`, [id]);

    if(!rows[0]) return null;
    return new Post(rows[0]);
  }
  static async getUserPost({ id }){
    const { rows } = await pool.query(`
      SELECT * FROM posts
      WHERE posts.user_id = $1`, [id]);

    return rows.map((row) => new Post(row));
  }
};

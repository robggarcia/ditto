const client = require(".");

const fetchUsers = async () => {
  console.log("Fetching Users...");
  try {
    const response = await client.query(`
            SELECT * FROM users
        `);
    return response.rows;
  } catch (error) {
    console.error(error);
  }
};

const createUser = async ({ username, password, email }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (username, password, email)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [username, password, email]
    );
    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchUsers,
  createUser,
};

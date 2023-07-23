const { ModuleResolutionKind } = require("typescript");
const client = require(".");

const fetchShirts = async () => {
  console.log("Fetching shirts");
  try {
    const { rows } = await client.query(`
            SELECT * FROM shirts;
        `);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const createShirt = async ({ design, inStock, color, price }) => {
  try {
    const {
      rows: [shirt],
    } = await client.query(
      `
            INSERT INTO shirts (design, inStock, color, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      [design, inStock, color, price]
    );
    return shirt;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchShirts,
  createShirt,
};

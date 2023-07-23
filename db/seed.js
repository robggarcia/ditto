const client = require(".");
const { createUser } = require("./users");

const dropTables = async () => {
  console.log("...Dropping Tables...");
  await client.query(`
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS shirts;
      DROP TABLE IF EXISTS users;
    `);
};

const createTables = async () => {
  console.log("...Creating all tables...");
  try {
    await client.query(`
          CREATE TABLE users (
              id SERIAL PRIMARY KEY,
              username VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              admin BOOLEAN DEFAULT false
          );
          CREATE TABLE shirts (
            id SERIAL PRIMARY KEY,
            design VARCHAR(255) NOT NULL,
            inStock INT,
            color VARCHAR(255),
            price DECIMAL(10,2) NOT NULL
          );
          CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "userId" INT REFERENCES users(id),
            "shirtId" INT REFERENCES shirts(id),
            quantity INT NOT NULL,
            purchased BOOLEAN
          )
      `);
  } catch (error) {
    console.error("Error building tables");
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log("...Creating Initial Users...");
  try {
    const usersToCreate = [
      {
        username: "tilly",
        password: "tilly123",
        email: "tilly@gmail.com",
      },
      {
        username: "oscar",
        password: "oscar123",
        email: "oscar@gmail.com",
      },
      {
        username: "stanley",
        password: "stanley123",
        email: "stanley@gmail.com",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("...Users created...");
    console.log(users);
  } catch (error) {
    console.error(error);
  }
};

const createInitialShirts = async () => {
  console.log("...Creating initial shirts...");
  try {
    const shirtsToCreate = [
      {
        design: "Kinks",
        inStock: "30",
        color: "cream",
        price: 25.5,
      },
      {
        design: "Smashing Pumpkins",
        inStock: "30",
        color: "purple",
        price: 28.99,
      },
      {
        design: "Urinals",
        inStock: "30",
        color: "green",
        price: 24.99,
      },
      {
        design: "Ditto Sicko",
        inStock: "30",
        color: "red",
        price: 22.99,
      },
    ];
  } catch (error) {
    console.error(error);
  }
};

const seedDB = async () => {
  console.log("Seeding Database...");
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    console.log("...DB Seeded");
  } catch (error) {
    console.error(error);
  }
};
//test
seedDB();

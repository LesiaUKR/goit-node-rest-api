import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   dialect: process.env.DATABASE_DIALECT,
   username: process.env.DATABASE_USERNAME,
   password: process.env.DATABASE_PASSWORD,
   host: process.env.DATABASE_HOST,
   database: process.env.DATABASE_NAME,
   port: process.env.DATABASE_PORT,
   dialectOptions: {
      ssl: true,
   },
   logging: console.log,
});

try {
  await sequelize.authenticate();
  console.log("Database connection successful");
  
//  await sequelize.sync({ force: true });
//   console.log("All models were synchronized successfully");
} catch (error) {
  console.log(`Error connection to database ${error.message}`);
  process.exit(1);
}


export default sequelize;

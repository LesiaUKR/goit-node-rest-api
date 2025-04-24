// import sequelize from "./Sequelize.js";
// import User from "./models/User.js";
// import Contact from "./models/Contact.js";

// User.hasMany(Contact, { foreignKey: 'owner' });
// Contact.belongsTo(User, { foreignKey: 'owner' });

// export const initDB = async () => {
//   try {
//     await sequelize.sync({ force: true }); // Видалить і створить заново всі таблиці
//     console.log("All models were synchronized successfully");
//   } catch (error) {
//     console.error("Error synchronizing models:", error);
//     process.exit(1);
//   }
// };

// export { User, Contact };
import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";
import { emailRegexp } from "../../constants/auth.js";

const User = sequelize.define("User", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
     unique: true,
     validate: {
       is: emailRegexp,
    }
  },
  subscription: {
    type: DataTypes.ENUM("starter", "pro", "business"),
    defaultValue: "starter"
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
   },
  avatarURL: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
},
{
  tableName: 'users'
});

// User.sync({alter: true});

export default User;
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
      email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    }

  });

  return User;
};

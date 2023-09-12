const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config"); // the configuration you defined above

function createModelFromSheet(sheet) {
  // Define columns based on the sheet headers
  const columns = {};

  const headers = sheet.headerValues; // Assuming you've loaded headers using `await sheet.loadHeaderRow()`
  for (const header of headers) {
    columns[header] = {
      type: DataTypes.STRING, // Defaulting to STRING. You can add more logic to deduce column types.
      allowNull: true,
    };
  }

  // Dynamically create a model using the sheet title
  const model = sequelize.define(sheet.title, columns, {
    timestamps: true,
  });

  return model;
}

module.exports = createModelFromSheet;

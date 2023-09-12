const loadGoogleSheet = require("./loadGoogleSheet");
const createModelFromSheet = require("./createModelFromSheet");

async function syncDatabaseWithSheets() {
  const sheets = await loadGoogleSheet(); // This function returns all sheets

  for (const sheet of sheets) {
    const model = createModelFromSheet(sheet);

    // This drops the table if it exists and then re-creates it
    await model.sync({ force: true });

    // Populate the table with data from the sheet
    const rows = await sheet.getRows();
    const records = rows.map((row) => {
      const record = {};
      for (const key of sheet.headerValues) {
        record[key] = row[key];
      }
      return record;
    });

    // Insert the records into the table
    await model.bulkCreate(records);
  }
}

exports.handler = async (event) => {
  // TODO implement
  await syncDatabaseWithSheets();
  const response = {
    statusCode: 200,
    body: JSON.stringify("All sheets synced!"),
  };
  return response;
};

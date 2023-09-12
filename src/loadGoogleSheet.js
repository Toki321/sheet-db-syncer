const { GoogleSpreadsheet } = require("google-spreadsheet");
// const sequelize = require("./dbConfig"); // Assuming this is your Sequelize database configuration
// const createModelFromSheet = require("./createModelFromSheet"); // The function to dynamically create models from sheets
require("dotenv").config();

async function loadGoogleSheet() {
  const GSHEET_ID = process.env.GSHEET_ID;
  const GSHEET_EMAIL = process.env.GSHEET_EMAIL;
  const GS_API_KEY = process.env.GS_API_KEY;

  const doc = new GoogleSpreadsheet(GSHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: GSHEET_EMAIL,
    private_key: GS_API_KEY.replace(/\\n/g, "\n"),
  });

  await doc.loadInfo();

  for (const sheet of doc.sheetsByIndex) {
    await sheet.loadHeaderRow();
  }

  return doc.sheetsByIndex;
}

module.exports = loadGoogleSheet;

// loadGoogleSheet()
//   .then()
//   .catch((err) => console.log(err));

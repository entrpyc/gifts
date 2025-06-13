const { getSheet } = require('../service/sheetsAuth');

async function dataController (req, res) {
  try {
    const sheets = await getSheet();
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1",
    });
    const rows = result.data.values;

    console.log(`Seding ${rows}`)
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch data");
  }
}

module.exports = {
  dataController
}
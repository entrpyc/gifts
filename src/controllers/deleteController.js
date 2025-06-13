const { getSheet } = require("../service/sheetsAuth");

async function deleteController(req, res) {
  const { value } = req.body;
  if (!value) return res.status(400).send("Missing value");

  try {
    const sheets = await getSheet();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1",
    });

    const rows = response.data.values;
    const rowIndex = rows.findIndex((row) => row.includes(value));

    if (rowIndex === -1) return res.status(404).send("Value not found");

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // Sheet1 typically has ID 0
                dimension: "ROWS",
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    });

    console.log(`${value} deleted`)

    res.send("Row deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete row");
  }
}

module.exports = {
  deleteController
}
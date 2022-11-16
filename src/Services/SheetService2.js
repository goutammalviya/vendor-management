import { GoogleSpreadsheet } from "google-spreadsheet";

import creds from "../cred/credentials.json";

const getSheetRows = async (sheet) => {
  if(sheet === null){
    console.log("sheets is null");
    sheet = await sheetService("vendors")
  }
  return await sheet.getRows();
};
const addRow = async (sheet,data) => {
  return await sheet.addRow(data)
};

const sheetService = async (sheetName) => {
  const doc = new GoogleSpreadsheet(creds.sheet_id);
  const gSheetInit = async () => {
    try {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
    } catch (e) {
      console.error("Error LoadDocInfo: ", e);
    }
  };

  await gSheetInit();
  return doc.sheetsByTitle[sheetName];
};

export default sheetService;
export { getSheetRows ,addRow};

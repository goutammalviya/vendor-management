import React, { useEffect, useMemo,useState } from "react";
import BasicTable from "./../Components/Table/CommonTable";
import { VendorsColumns } from "../Components/Table/TableColumns";
import { useNavigate } from "react-router-dom";
import sheetService, { getSheetRows } from "../Services/SheetService2";
const VendorTable = () => {
  const columns = useMemo(() => VendorsColumns);
  let sheet = null;
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const asyncFn = async () => {
      const sheets = await sheetService("vendors");
      sheet = sheets;
      let data = await getSheetRows(sheet);
      setVendors(data);
    };
    asyncFn();
  }, []);
  console.log(vendors);
  return (
    <div>
      <BasicTable
      headingCenter = {[]}
      itemsCenter = {[]}
        data={vendors}
        columns={columns}
      />
    </div>
  );
};

export default VendorTable;

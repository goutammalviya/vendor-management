import React, { useEffect, useMemo,useState } from "react";
import BasicTable from "./../Components/Table/CommonTable";
import { VendorsColumns } from "../Components/Table/TableColumns";
import { useNavigate } from "react-router-dom";
import sheetService, { getSheetRows } from "../Services/SheetService2";
const VendorTable = () => {
  const columns = useMemo(() => VendorsColumns);
  const [loading , setLoading] = useState(false)
  let sheet = null;
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true)
    const asyncFn = async () => {
      const sheets = await sheetService("vendors");
      sheet = sheets;
      let data = await getSheetRows(sheet);
      setVendors(data);
      setLoading(false)
    };
    asyncFn();
  }, []);

  useEffect(() => {
    setLoading(true)
    const asyncFn = async () => {
      const sheets = await sheetService("vendors");
      sheet = sheets;
      let data = await getSheetRows(sheet);
      setVendors(data);
      setLoading(false)
    };
    asyncFn();
  }, [columns , ]);
  
  console.log(vendors);
  if(loading){
    return (
      <><h1>Loading....</h1></>
    )
  }
  return (
    <div>
      <div className="text-center"><div className="h2 pt-3">Vendors List</div></div>
    <div className="card border-0 p-2 m-2 m-md-4 box-shadow">
      <BasicTable
      headingCenter = {[]}
      itemsCenter = {[]}
        data={vendors}
        columns={columns}
        />
    </div>
        </div>
  );
};

export default VendorTable;

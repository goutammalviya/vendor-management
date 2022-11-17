import React, { useEffect, useMemo,useState } from "react";
import BasicTable from "./../Components/Table/CommonTable";
import { VendorsColumns } from "../Components/Table/TableColumns";
import { useNavigate } from "react-router-dom";
import sheetService, { getSheetRows } from "../Services/SheetService2";
const VendorTable = () => {
  
  const [loading , setLoading] = useState(false)
  let sheet = null;
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    reFetchData(true)
  }, []);

 
  const reFetchData = async (showLoader) => {
    showLoader && setLoading(true);
    const sheets = await sheetService("vendors");
    sheet = sheets;
    let data = await getSheetRows(sheet);
    setVendors(data);
    showLoader && setLoading(false);   
    };

const deleteRow = async row =>{

  await row.delete();
  await reFetchData(false)


}
  const columns = useMemo(() =>  [
    {
        Header: 'address',
        accessor: 'address'
    },
    {
        Header: 'company name',
        accessor: 'company name'
    },
    {
        Header: 'contact no',
        accessor: 'contact no'
    },
    {
        Header: 'contact person name',
        accessor: 'contact person name'
    },
    {
        Header: 'email',
        accessor: 'email'
    },
    {
        Header: 'email address',
        accessor: 'email address'
    },
    {
        Header: 'linkedIn url',
        accessor: 'linkedIn url'
    },
    {
        Header: 'location',
        accessor: 'location'
    },
    {
        Header: 'profile name',
        accessor: 'profile name'
    },
    {
        Header: 'vendor list category',
        accessor: 'vendor list category'
    },
    {
        Header: 'website url',
        accessor: 'website url'
    },
    {
        Header: 'CRUD',
        accessor: 'CRUD',
        Cell: ({ row: { original } }) => {
            console.log(original);
			return (
				<>
					<span className='' onClick={()=>deleteRow(original)}>
						delete
					</span>
					<span className='px-1'>
						000
					</span>
					<span className=''>
						000
					</span>
				</>
			)
		}
    },
]

);
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

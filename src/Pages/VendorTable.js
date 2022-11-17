import React, { useEffect, useMemo, useState } from "react";
import BasicTable from "./../Components/Table/CommonTable";
import { VendorsColumns } from "../Components/Table/TableColumns";
import { useNavigate } from "react-router-dom";
import sheetService, { getSheetRows } from "../Services/SheetService2";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFolderView,
} from "react-icons/ai";
import Swal from "sweetalert2";
import Loader from "../Components/loader/Loader";
const VendorTable = () => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  let sheet = null;
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    reFetchData(true);
  }, []);

  const reFetchData = async showLoader => {
    showLoader ? setLoading(true) : setLoading2(true);
    const sheets = await sheetService("vendors");
    sheet = sheets;
    let data = await getSheetRows(sheet);
    setVendors(data);
    showLoader ? setLoading(false):setLoading2(false);
  };

  const deleteRow = async row => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
      if (result.isConfirmed) {
        await row.delete();
        await reFetchData(false);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const columns = useMemo(() => [
    {
      Header: "address",
      accessor: "address",
    },
    {
      Header: "company name",
      accessor: "company name",
    },
    {
      Header: "contact no",
      accessor: "contact no",
    },
    {
      Header: "contact person name",
      accessor: "contact person name",
    },
    {
      Header: "email",
      accessor: "email",
    },
    {
      Header: "email address",
      accessor: "email address",
    },
    {
      Header: "linkedIn url",
      accessor: "linkedIn url",
    },
    {
      Header: "location",
      accessor: "location",
    },
    {
      Header: "profile name",
      accessor: "profile name",
    },
    {
      Header: "vendor list category",
      accessor: "vendor list category",
    },
    {
      Header: "website url",
      accessor: "website url",
    },
    {
      Header: "CRUD",
      accessor: "CRUD",
      Cell: ({ row: { original } }) => {
        console.log(original);
        return (
          <div className="d-flex">
            <span className="center-xy" onClick={() => deleteRow(original)}>
              <div className="br-50 bg-light-red d-flex p-2 cursor-pointer">
                <AiOutlineDelete />
              </div>
            </span>
            <span
              className="center-xy px-1"
              onClick={() => deleteRow(original)}>
              <div className="br-50 bg-light-green d-flex p-2 cursor-pointer">
                <AiOutlineEdit />
              </div>
            </span>
            <span className="center-xy" onClick={() => deleteRow(original)}>
              <div className="br-50 bg-light-green d-flex p-2 cursor-pointer">
                <AiOutlineFolderView />
              </div>
            </span>
          </div>
        );
      },
    },
  ]);
  console.log(vendors);
  if (loading) {
    return (
      <>
      <Loader />
      </>
    );
  }
  return (
    <div>
{loading2 &&  <Loader />}
     
      <div className="text-center">
        <div className="h2 pt-3">Vendors List</div>
      </div>
      <div className="card border-0 p-2 m-2 m-md-4 box-shadow">
        <BasicTable
          headingCenter={[]}
          itemsCenter={[]}
          data={vendors}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default VendorTable;

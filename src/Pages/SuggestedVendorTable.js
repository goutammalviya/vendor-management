import React, { useEffect, useMemo, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFolderView
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Components/loader/Loader";
import BasicTable from "../Components/Table/CommonTable";
import sheetService, { getSheetRows } from "../Services/SheetService2";
import ModalFormSuggestedVendors from "./ModalFormSuggestedVendors";
const SuggestedVendorTable = () => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  let sheet = null;
  const [vendors, setVendors] = useState([]);
  const [orgVendors, setOrgVendors] = useState([]);
  const [row, setRow] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    reFetchData(true);
  }, []);

  const reFetchData = async (showLoader) => {
    showLoader ? setLoading(true) : setLoading2(true);
    const sheets = await sheetService("suggestedVendors");
    const orgSheets = await sheetService("vendors");
    sheet = sheets;
    let data = await getSheetRows(sheet);
    setVendors(data);
    let orgData = await getSheetRows(orgSheets);
    setOrgVendors(orgData);
    showLoader ? setLoading(false) : setLoading2(false);
  };

  const deleteRow = async (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
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
      accessor: "address"
    },
    {
      Header: "company name",
      accessor: "company name"
    },
    {
      Header: "contact no",
      accessor: "contact no"
    },
    {
      Header: "contact person name",
      accessor: "contact person name"
    },
    {
      Header: "email",
      accessor: "email"
    },
    {
      Header: "email address",
      accessor: "email address"
    },
    {
      Header: "linkedIn url",
      accessor: "linkedIn url"
    },
    {
      Header: "location",
      accessor: "location"
    },
    {
      Header: "profile name",
      accessor: "profile name"
    },
    {
      Header: "vendor list category",
      accessor: "vendor list category"
    },
    {
      Header: "website url",
      accessor: "website url"
    },
    {
      Header: "projects",
      accessor: "project name"
    },
    {
      Header: "CRUD",
      accessor: "CRUD",
      Cell: ({ row: { original } }) => {
        return (
          <div className="d-flex">
            <span className="center-xy" onClick={() =>deleteRow(original)}>
              <div className="br-50 bg-light-red d-flex p-2 cursor-pointer">
                <AiOutlineDelete />
              </div>
            </span>
            <span className="center-xy px-1">
              <div className="br-50 bg-light-green d-flex p-2 cursor-pointer">
                <AiOutlineEdit  onClick={()=>{ setRow(original); setRenderModal(true); setTimeout(() => {
                  document.getElementById('modal-btn-click').click();
                }, (100));}}
              />
                <button
                  type="button"
                  data-bs-toggle="modal"
                  style={{display: "none"}}
                  data-bs-target="#rowmodal"
                  id='modal-btn-click'
                   >
                </button>
              </div>
            </span>
            <span className="center-xy" >
              <div className="br-50 bg-light-green d-flex p-2 cursor-pointer">
                <AiOutlineFolderView />
              </div>
            </span>
          </div>
        );
      }
    }
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
      {loading2 && <Loader />}

      <div className="text-center">
        <div className="h2 pt-3">Vendors List</div>
      </div>
      <div className="card border-0 p-2 m-2 m-md-4 box-shadow">

       {renderModal && <ModalFormSuggestedVendors setRenderModal={setRenderModal} reFetchData={reFetchData} orgData={orgVendors} data={row} modalId={`rowmodal`} /> }
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

export default SuggestedVendorTable;

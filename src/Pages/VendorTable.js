import React, { useMemo } from 'react'
import BasicTable from './../Components/Table/CommonTable';
import { VendorsColumns } from '../Components/Table/TableColumns';
const VendorTable = () => {
    const columns = useMemo(() => VendorsColumns);
  return (
    <div><BasicTable data={[{goutam: "goutam"} , {kuldeep: "kuldeep"}]} columns={columns}/></div>
  )
}

export default VendorTable
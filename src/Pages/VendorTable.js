import React, { useMemo } from "react";
import BasicTable from "./../Components/Table/CommonTable";
import { VendorsColumns } from "../Components/Table/TableColumns";
const VendorTable = () => {
  const columns = useMemo(() => VendorsColumns);
  return (
    <div>
      <BasicTable
      headingCenter = {[]}
      itemsCenter = {[]}
        data={[
          { name: "goutam", ok: "kuldeep" },
          { name: "goutamok", ok: "kuldeepok" },
        ]}
        columns={columns}
      />
    </div>
  );
};

export default VendorTable;

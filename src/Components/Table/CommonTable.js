import React from 'react';
import { useRowSelect, useTable } from 'react-table';
import Checkbox from './Checkbox';

//importing custum components
import './Table.css'
//importing custum components
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const BasicTable = ({
  data,
  columns,
  headingCenter,
  itemsCenter,
  ...props
}) => {

  const dispatch = useDispatch()
  let location = useLocation();
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
          },
          ...columns
        ];
      });
    }
  );
  // eslint-disable-next-line
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    // eslint-disable-next-line
    state: { selectedRowIds }
  } = tableInstance;

//   var exportData = [];
//   // eslint-disable-next-line
//   const checkboxData = JSON.stringify(
//     {
//       selectedFlatRows: selectedFlatRows.forEach((row) => {
//         if (location.pathname === "/admin/inventory-table") {
//           let data = Object.assign({}, row.original);
//           exportData.push(data.item.item_id);
//         }
//       }),
//     },
//     null,
//     2
//   );

//   React.useEffect(() => {
//     dispatch(productSelected(exportData))
//     // eslint-disable-next-line
//   }, [selectedFlatRows])

  return (
    <>
      <div className='table-responsive p-0 p-sm-2 mt-1'>
        <table {...getTableProps()} className='myTable table'>
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <>
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <>
                        {headingCenter.includes(column.Header) ? (
                          <th className=' text-center table-heading' {...column.getHeaderProps()}>

                            {(column.id !== "selection") ?
                              column.render('Header') :
                              <span className="p-5">
                                {column.render('Header')}
                                {/* <img src={sort} className="ml-2" alt="^" /> */}
                              </span>
                            }
                          </th>
                        ) : (
                          <th className='table-heading' {...column.getHeaderProps()}>
                            {(column.id !== "selection") ?
                              (
                                <>
                                  {column.render('Header')}
                                  {/* <img src={sort} className="ml-2" alt="^" /> */}
                                </>
                              )
                              :
                              column.render('Header')
                            }
                          </th>
                        )}
                      </>
                    ))}
                  </tr>
                </>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className='table_data_common'>
                  {row.cells.map((cell) => {
                    return (
                      <>
                        {itemsCenter.includes(cell.column.Header) ? (
                          <td {...cell.getCellProps()} className='text-center table-data-row'>
                            {cell.render('Cell')}
                          </td>
                        ) : (
                          <td {...cell.getCellProps()} className='fs-12 table-data-row'>
                            {cell.render('Cell')}
                          </td>
                        )}
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {
          props.pagination &&
          < Pagination  {...props} />
        } */}
      </div>
    </>
  )
}

export default BasicTable;

import React from 'react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
    <div className="" style={{}}>
    <input
      style={{border: "1px solid grey" , borderRadius: "3px" , maxWidth: "5rem" , maxHeight: "20px"}}
        value={filterValue || ''}
        placeholder="Search.."
        onChange={e => setFilter(e.target.value)}
      />
    </div>
    </span>
  )
}
import React, { useState, useRef } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { CSVLink } from 'react-csv';

function Table({ columns, data, setLoading }) {

  const [dataToDownload, setDataToDownload] = useState([]);
  const reactTable = useRef();
  const csvLink = useRef();

  function getTrProps(state, rowInfo, instance) {
    if (rowInfo) {
      return {
        style: {
          textAlign: 'center'
        }
      }
    }
    return {};
  }

  function download() {
    // set loading
    setLoading(true);

   const currentRecords = reactTable.current.getResolvedState().sortedData;
   const keys = Object.keys(currentRecords[0]._original);

    let downloadData = [[...keys]];

    for (let i of currentRecords) {
      downloadData.push(Object.values(i._original));
    }

    setDataToDownload([...dataToDownload, ...downloadData]);

    setTimeout(() => {
      csvLink.current.link.click();
      setLoading(false);
    }, 5000);
  }

  return (
    <>
      <ReactTable
      ref={reactTable}
      filterable
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
      columns={columns}
      data={data}
      defaultPageSize={10}
      className="-striped -highlight"
      getTrProps={getTrProps}
      />
      <CSVLink
        data={dataToDownload}
        filename="data.csv"
        className="hidden"
        ref={csvLink}
        target="_blank"/>
      <div className="wrapper">
        <button className="button-secondary button-large" onClick={download}> Download CSV </button>
      </div>
    </>
  )
}

export default Table;

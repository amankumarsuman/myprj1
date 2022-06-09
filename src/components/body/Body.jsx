import { Paper } from "@mui/material";
import React, { useRef, useState } from "react";


import * as XLSX from "xlsx/xlsx.mjs";
import CustomizedTables from "../table/Table";
import FootBallDataTable from "../table/Table";
function Body() {
  // const { CSVReader } = useCSVReader();
  const [data, setData] = useState();
  const [column, setColumn] = useState();

  const convertDataToJsonData = (header, data) => {
    const rows = [];
    //here first for each loop will give me row
    // and second foreach loop will give me data
    data.forEach((row) => {
      const rowData = {};
      row.forEach((el, i) => {
        rowData[header[i]] = el;
      });
      var fileDatas = JSON.parse(
        JSON.stringify(rowData).replace(/\s(?=\w+":)/g, "")
      );
      rows.push(fileDatas);
    });
    return rows;
  };
  const importExcelData = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const allData = XLSX.read(binaryString, { type: "binary" });

      //get first sheet from csv file
      const sheetName = allData.SheetNames[0];
      const sheet = allData.Sheets[sheetName];
      // console.log(sheet.v.trim());
      //converting into array
      var fileData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // console.log(fileDatas);
      //Extracting headers data

      const headers = fileData[0];

      const head = headers.map((head) => ({
        title: head.split(" ").join("_"),
        field: head.split(" ").join("_"),
      }));
      setColumn(head);
      console.log(headers);
      // deleting header so that in our data array only data should remain
      //  so that I can use them in table

      fileData.splice(0, 1);
      setData(convertDataToJsonData(headers, fileData));
    };

    reader.readAsBinaryString(file);
  };

  // const buttonRef = useRef(null);
  // const handleFileLoading = (data) => {
  //   console.log(data);
  // };
  // const handleError = (err) => {
  //   console.log(err);
  // };
  // const handleFileRemove = (data) => {
  //   console.log(data);
  // };

  // const handleUploadCsv = (e) => {
  //   alert("lkfjndk");
  //   // console.log(data);
  //   if (buttonRef.current) {
  //     buttonRef.current.open(e);
  //   }
  // };
  console.log(data);
  return (
    <>
      <div>Body</div>
      <input type="file" onChange={importExcelData} />
<CustomizedTables data={data}/>
      {/* <FootBallDataTable data={data} /> */}
      {/* <CSVReader
        ref={buttonRef}
        onUploadAccepted={handleFileLoading}
        // onFileLoad={handleFileLoading}
        onError={handleError}
        onClick
        noDrag
        onRemoveFile={handleFileRemove}
      > */}
      {/* {({ file }) => (
          <div>
            <button onClick={handleUploadCsv}>Upload CSV File</button>
            <Paper>{file && file.name}</Paper>
          </div>
        )} */}
      {/* </CSVReader> */}
    </>
  );
}

export default Body;

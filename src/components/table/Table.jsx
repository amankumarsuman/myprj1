import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableColumn } from "./tableColumn";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";

import * as XLSX from "xlsx/xlsx.mjs";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledActionTableCell = styled(TableCell)({
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    width: "30%",
    marginLeft: "5%",
    // justifyContent: "space-between",
  });
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {
    const [isLoading,setIsLoading]=React.useState(true)
    const [edit,setEdit]=React.useState(null)
    // const [tableData,setTableData]=React.useState(data)
 

    const [data, setData] = React.useState();
    const [column, setColumn] = React.useState();
  
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
  


  return (
     <>
      <input type="file" onChange={importExcelData} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
        <TableRow>
                      {TableColumn.map((item) => (
                        <React.Fragment key={item.id}>
                          <StyledTableCell key={item.id}>
                            {item.label}
                          </StyledTableCell>
                        </React.Fragment>
                      ))}
                      <StyledTableCell style={{ textAlign: "center" }}>
                        Actions
                      </StyledTableCell>
                    </TableRow>
        </TableHead>
        <TableBody>
                    <React.Fragment>
                      {isLoading && data?.length == 0 ? (
                        <React.Fragment>
                          {/* <LoadingContainer
                              className={classes.loadingContainer}
                            >
                              <ProgressWithLabel />
                            </LoadingContainer> */}
                        </React.Fragment>
                      ) : data?.length >= 1 ? (
                        data?.map((row) => {
                          return (
                            <React.Fragment key={row.JerseyNumber}>
                              <StyledTableRow
                                hover
                                tabIndex={-1}
                                key={row.JerseyNumber}
                              >
                                <TableCell>{row.PlayerName}</TableCell>
                                <TableCell>{row.JerseyNumber}</TableCell>
                                <TableCell>{row.Starter}</TableCell>
                                <TableCell>{row.Position}</TableCell>
                                <TableCell>{row.Height}</TableCell>
                                <TableCell>{row.Weight}</TableCell>
                                <TableCell>{row.Nationality}</TableCell>
                                <TableCell>{row.Appearances}</TableCell>
                                <TableCell>{row.MinutesPlayed}</TableCell>

                                <StyledActionTableCell>
                                  {/* {edit.JerseyNumber === row.JerseyNumber ? ( */}
                                    <EditIcon
                                      className="icon"
                                    //   onClick={() =>
                                    //     handleEditAble(row.JerseyNumber)
                                    //   }
                                    />
                                  {/* ) : ( */}
                                    {/* <SaveIcon /> */}
                                  {/* )} */}

                                  <DeleteIcon
                                    // onClick={() => dialogConfirmation(row)}
                                    className="icon"
                                  />
                                </StyledActionTableCell>
                              </StyledTableRow>
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <React.Fragment>
                          <StyledTableRow
                            hover
                            tabIndex={-1}
                            style={{ border: "1px solid red" }}
                          >
                            <TableCell></TableCell>

                            <TableCell></TableCell>
                            <TableCell></TableCell>

                            <TableCell></TableCell>
                          </StyledTableRow>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  </TableBody>
      </Table>
    </TableContainer>
     </> 
  );
}

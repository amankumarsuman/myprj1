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


export default function CustomizedTables({data}) {
    const [isLoading,setIsLoading]=React.useState(true)
    const [edit,setEdit]=React.useState(null)
    const [tableData,setTableData]=React.useState(data)
 

  return (
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
  );
}

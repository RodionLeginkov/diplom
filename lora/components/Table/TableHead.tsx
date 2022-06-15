import React from 'react';
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const CustomTableHeader = () => {

  return (
    <TableHead>
    <TableRow>
      <TableCell align="right"><Typography>#</Typography></TableCell>
      <TableCell><Typography>Symbol</Typography></TableCell>
      <TableCell align="right"><Typography>Price</Typography></TableCell>
      <TableCell align="right"><Typography>24H Change</Typography></TableCell>
      <TableCell align="right"><Typography>7D Change</Typography></TableCell>
      <TableCell align="right"><Typography>30D Change</Typography></TableCell>
      <TableCell align="right"><Typography>Market cap</Typography></TableCell>
    </TableRow>
  </TableHead>
  )
}

export default CustomTableHeader;
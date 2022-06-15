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
import { styled } from '@mui/system';
const RaitingContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}))

const EchangesTableHeader = () => {

  return (
    <TableHead>
    <TableRow>
      <TableCell align="right"><Typography>#</Typography></TableCell>
      <TableCell><Typography>Name</Typography></TableCell>
      <TableCell align="right"><RaitingContainer><Typography>Trust Score</Typography></RaitingContainer></TableCell>
      <TableCell align="right"><Typography>Year Established</Typography></TableCell>
      <TableCell align="right"><Typography>Country</Typography></TableCell>
      <TableCell align="right"><Typography>Trade Volume 24h btc</Typography></TableCell>
    </TableRow>
  </TableHead>
  )
}

export default EchangesTableHeader;
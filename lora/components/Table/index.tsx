import React from 'react';
import {
  TableContainer,
  Table,
} from "@mui/material";

import CustomTableHeader from './TableHead'
import CustomTableBody from './TableBody';

const CustomTable = (props) => {
  const { data } = props;

  return (
    <TableContainer>
      <Table>
        <CustomTableHeader />
        <CustomTableBody data={data} />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;

import React from 'react'
import {
  TableContainer,
  Table,
} from "@mui/material";

import EchangesTableHeader from './EchangesTableHeader'
import EchangesTableBody from './EchangesTableBody'

const ExchangesTable = (props) => {
  const { data } = props;

  return (
    <TableContainer>
      <Table>
        <EchangesTableHeader />
        <EchangesTableBody data={data} />
      </Table>
    </TableContainer>
  )
}

export default ExchangesTable
import React from 'react';
import {
  TableRow,
  TableBody,
} from "@mui/material";
import { styled } from '@mui/system';
import { useRouter } from 'next/router'
import CustomBodyRow from './TableBodyRow'

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    background: theme.palette.table.hover,
    cursor: 'pointer',
  } 
}))

const CustomTableBody = (props) => {
  const {data} = props;
  const router = useRouter()

  const clickHandler = (e, coin) => {
    e.preventDefault()
    router.push(`/cryptocurrencies/${coin.id}`)
  }

  return (
    <TableBody>
      {data.map((coin) => (
        <CustomTableRow 
          key={coin.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={(e) => clickHandler(e, coin)}
        >
          <CustomBodyRow data={coin} />
        </CustomTableRow>
      ))}
    </TableBody>
  )
}

export default CustomTableBody;

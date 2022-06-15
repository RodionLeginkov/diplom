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
  Rating,
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router'
import EchangesBodyRow from './EchangesBodyRow'

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    background: theme.palette.table.hover,
    cursor: 'pointer',
  } 
}))

const EchangesTableBody = (props) => {
  const {data} = props;
  const router = useRouter()

  const clickHandler = (e, exchanges) => {
    e.preventDefault()
    window.open(exchanges.url);
    // router.push(`/cryptocurrencies/${coin.id}`)
  }

  return (
    <TableBody>
      {data.map((exchange) => (
        <CustomTableRow 
          key={exchange.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={(e) => clickHandler(e, exchange)}
        >
          <EchangesBodyRow data={exchange} />
        
        </CustomTableRow>
      ))}
    </TableBody>
  )
}

export default EchangesTableBody;
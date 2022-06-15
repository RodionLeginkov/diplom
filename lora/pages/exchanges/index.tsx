import React, { useState } from 'react'
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
import axios from 'axios';

import { ExchangesInfo } from '../../config/api'
import ExchangesTable from '../../components/ExchangesTable';

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

export const getServerSideProps = async() => {
  const res = await axios.get(ExchangesInfo());
  return {
    props: {
      exchanges: res.data
    }
  }
}

const Exchanges = (props) => {
  const { exchanges } = props;
  const [exchangesList, setExchangesList] = useState(exchanges)
  console.log('exchangesList', exchangesList)
  return (
    <Container maxWidth="xl">
    <Wrapper>
      <h1>Top Cryptocurrency Exchanges Ranking by Trust Score</h1>
      <ExchangesTable data={exchangesList} />
    </Wrapper>
  </Container>
  )
}

export default Exchanges;

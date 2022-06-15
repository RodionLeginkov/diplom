import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import CoinGecko from 'coingecko-api';
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

import CustomTable from '../../components/Table'
import axios from 'axios';
import { CoinsInfo, GlobalInfo } from '../../config/api';

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

export default function Cryptocurrencies(props) {
  const { coins, globalInfo } = props;
  return (
    <Container maxWidth="xl">
      <Wrapper>
        <h1>Today's Cryptocurrency Prices by Lora</h1>
        <CustomTable data={coins} />
      </Wrapper>
    </Container>
  )
}

export const getServerSideProps = async(context) => {
  const res = await axios.get(CoinsInfo())
  const cryptoGlobalInfo = await axios.get(GlobalInfo())
  return {
    props: {
      coins: res.data,
      globalInfo: cryptoGlobalInfo.data
    }
  };
} 
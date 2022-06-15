import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  makeStyles,
  useTheme,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { styled } from '@mui/system';
import Chart from '../../components/Chart'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets' 

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

const ChartContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '650px !important'
}))

const Tradingview: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Wrapper>
      <h1>TradingView</h1>
      <ChartContainer>
       <Chart autosize={true} />
      </ChartContainer>
      </Wrapper>
    </Container>
  )
}

export default Tradingview;
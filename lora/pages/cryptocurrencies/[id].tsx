import React, { useState } from 'react';
import CoinGecko from 'coingecko-api';
import {
  Container,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { styled } from '@mui/system';
import Image from 'next/image';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { chartDays } from '../../config/data';
import { CustomButton } from '../../components/CustomButton';
import { SingleCoin, HistoricalChart } from '../../config/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
  // Tooltip,
  // Legend
);


const coinGecoClient = new CoinGecko();

export const getStaticPaths = async () => {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const cryptoGlobalInfo = await axios.get('https://api.coingecko.com/api/v3/global')
  const res = await coinGecoClient.coins.markets({ params });

  const paths = res.data.map((item) => {
    return {
      params: { id: item.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}


export const getStaticProps = async (context) => {
  const id = context.params.id;

  const coinData = await axios.get(HistoricalChart(id))
  const coinInfo = await axios.get(SingleCoin(id))

  return {
    props: {
      coinData: coinData.data,
      coinInfo: coinInfo.data,
      id
    }
  }
}

const CryptoDetails = (props) => {
  const { coinData, coinInfo, id } = props;
  const [historicData, setHistoricData] = useState(coinData)
  const [days, setDays] = useState(1);
  const loadMore = async (days) => {
    setDays(days)
    const res = await axios.get(HistoricalChart(id, days))

    setHistoricData(res.data);
  };

  return (
    <Container maxWidth="xl">
      <Wrapper>
        <HeaderContainer>
          <Image src={coinInfo.image.small} alt="coin" width={50} height={50} />
          <Typography variant='h3' sx={{ p: "20px" }}>{coinInfo.name}</Typography>
          <CoinIcon>
          </CoinIcon>
        </HeaderContainer>
        <ButtonGroup color="secondary">
          {chartDays.map((day) => (
            <CustomButton
              key={day.value}
              color="secondary"
              onClick={() => { loadMore(day.value) }}
            >
              {day.label}
            </CustomButton>
          ))}
        </ButtonGroup>
        <Line
          data={{
            labels: historicData.prices.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData.prices.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days )`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
        <div>
          <TitleBody>Description</TitleBody>
          <Typography dangerouslySetInnerHTML={{ __html: coinInfo.description.en }} />
        </div>
        {/* </div> */}
        {/* <Line data={data} options={options} /> */}
        {/* <Discription dangerouslySetInnerHTML={{ __html: coin.description.en }} /> */}
      </Wrapper>
    </Container>
  )
}

export default CryptoDetails;

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

const Discription = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "16px",
}))

const TitleBody = styled('div')(({ theme }) => ({
  color: theme.palette.text.title,
  fontSize: "24px",
  fontWeight: "700"
}))

const HeaderContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
}))

const CoinIcon = styled('div')(({ theme }) => ({
  marginLeft: '15px'
}))
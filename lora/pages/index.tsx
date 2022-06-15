import Image from 'next/image';
import {
  Container,
  Box,
  Card,
  Typography,
} from '@mui/material';

import { styled } from '@mui/system';
import axios from 'axios';

import ToggleButton from "../components/ToggleButton";
import CustomSlider from '../components/Slider';
import { CustomButton } from '../components/CustomButton';

import { CoinsInfo, GlobalInfo } from '../config/api';
import { getColorPrice, formatPercent, formatDollar } from '../utils/formator';


const Wrapper = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: "200px",
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: "auto",
}))
const CardPrice = styled('div')(() => ({
  fontWeight: '700'
}))

const CardBody = styled('div')(() => ({
  display: 'flex',
  flexDirection: "column",
  alignItems: 'center'
}))

const CardHeader = styled('div')(() => ({
  display: 'flex',
  flexDirection: "column",
  alignItems: 'center'
}))

const ColoredPercent = styled('span')(({ isprofitable }) => ({
  color: isprofitable ? '#1BB67A' : '#B9333C',
}))


export default function IndexPage(props) {
  const { coins, globalInfo } = props;

  const SendEthHanlder = () => {
    window.open("http://localhost:3001/");
  }

  const SendTelegramHanlder = () => {
    window.open("http://t.me/lora_token_price_bot");
  }

  const items = coins.map((coin) => {
    return (
      <CustomCard key={coin.id}>
        <Box p={2}>
        <CardHeader>
          <Image src={`${coin.image.small}`} width={50} height={50} alt="coin" key={coin.id + coin.symbol} />
        </CardHeader>
        <CardBody>
            <div>
              <span>{coin.symbol.toUpperCase()}</span>
              <ColoredPercent  style={{marginLeft: "10px"}} isprofitable={getColorPrice(coin.market_data.price_change_percentage_24h)}>
                {formatPercent(coin.market_data.price_change_percentage_24h)}%
              </ColoredPercent>
            </div>
          <CardPrice> {formatDollar(coin.market_data.current_price.usd, 20)}</CardPrice>
        </CardBody>
        </Box>
      </CustomCard>
    )
  })

  return (
    <Container maxWidth="xl">
      <Wrapper>
        <h1 variant="h4">Welcome to Lora</h1>
        <CustomSlider items={items} />
        <Box sx={{p: 5}}>
          <Typography variant="h4">
            Lora is the best aggregator of cryptocurrencies, here you can find out the latest news, analyze the market and use the latest technologies.
          </Typography>
        </Box>
        <Box sx={{p: 5, display: 'flex', gap: 2}}>
        <CustomButton variant="outlined" color="secondary" onClick={SendEthHanlder}>
          <Box>
            <Typography>
              Send Ethereum
            </Typography>
          </Box>
        </CustomButton>
        <CustomButton variant="outlined" color="secondary" onClick={SendTelegramHanlder}>
          <Box>
            <Typography>
              Crypto currency bot
            </Typography>
          </Box>
        </CustomButton>
        </Box>
      </Wrapper>
    </Container>
  );
}

export const getServerSideProps = async () => {
  const coinsInfo = await axios.get(CoinsInfo());
  const cryptoGlobalInfo = await axios.get(GlobalInfo())
  return {
    props: {
      coins: coinsInfo.data,
      globalInfo: cryptoGlobalInfo.data
    }
  };
}
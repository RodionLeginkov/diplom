import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Select,
  MenuItem,
} from '@mui/material';
import Link from 'next/link'
import Image from 'next/image';
import { styled } from '@mui/system';
import moment from 'moment';
import { NewsInfo, CoinsInfo } from '../../config/api'

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';


export const getServerSideProps = async(context) => {
  const config  = {
    headers: {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-key': process.env.NEXT_APP_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.NEXT_APP_NEWS_RAPIDAPI_HOST,
  }};
  const result = await axios.get(NewsInfo('Ethereum'), config)
  const coins = await axios.get(CoinsInfo())
  return {
    props: {
      cryptoNews: result.data,
      coins: coins.data,
      config
    }
  }
}

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

const CardHeader = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
}))

const NewsTitle = styled(Typography)(({ theme }) => ({
  width: '70%',
  fontWeight: '700'
}));
const NewsImageContainer = styled('div')(() => ({
  width: '100px',
  height: '100px',
}))
const NewsDescription = styled(Typography)(() => ({
  margin: '10px 0px'
}))
const NewsFooter = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))
const NewsAvatarContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center'
}))
const LinkItem = styled('a')(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}))

const News: React.FC = (props) => {
  const { cryptoNews, coins, config } = props;
  const [news, setNews] = useState(cryptoNews.value)
  const [newsType, setNewsType] = useState('Cryptocurrency')

  const newsTypeHandler = async(e) => {
    try {
      setNewsType(e.target.value as string);
      const res = await axios.get(NewsInfo(e.target.value), config)
      setNews(res.data.value);
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <Container maxWidth="xl">
      <Wrapper>
      <h1>Today's Cryptocurrency News</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{p: '10px'}}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newsType}
            label={newsType}
            onChange={newsTypeHandler}
          >
            <MenuItem value={'Cryptocurrency'}>Cryptocurrency</MenuItem>
            {coins.map((coin) => <MenuItem key={coin.id} value={coin.name}>{coin.name}</MenuItem>)}
          </Select>
          </Box>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {news.map((news, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Card>
                  <CardActionArea>
                    <Link href={news.url} passHref={true} target="_blank">
                    <LinkItem target="_blank">
                    <CardContent>
                    <Box sx={{ p: 2 }}>
                    <CardHeader>
                      <NewsTitle>{news.name}</NewsTitle>
                      <NewsImageContainer>
                        <Image src={news.image ? news?.image?.thumbnail?.contentUrl : demoImage} width={100} height={100} alt="" />
                      </NewsImageContainer>
                    </CardHeader>
                  
                  <NewsDescription>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</NewsDescription>
                  <NewsFooter className="provider-container">
                    <NewsAvatarContainer>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                      <Typography className="provider-name" style={{marginLeft: '15px'}}>{news.provider[0]?.name}</Typography>
                    </NewsAvatarContainer>
                    <Typography>{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
                  </NewsFooter>
                  </Box>
                  </CardContent>
                  </LinkItem>
                  </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Wrapper>
    </Container>
  )
}

export default News
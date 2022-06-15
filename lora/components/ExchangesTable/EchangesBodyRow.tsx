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
  Box,
} from "@mui/material";
import { styled } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';

const btcIcon = 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579'

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const labels = {
  0: 'Very Useless',
  0.5: 'Very Useless+',
  1: 'Useless',
  1.5: 'Useless+',
  2: 'Poor',
  2.5: 'Poor+',
  3: 'Ok',
  3.5: 'Ok+',
  4: 'Good',
  4.5: 'Good+',
  5: 'Excellent',
};

const NameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}))
const VolumeContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}))
const RaitingContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}))

const ColoredPercent = styled('span')(({isprofitable}) =>({
  color: isprofitable ? '#1BB67A' : '#B9333C',
}))

const EchangesBodyRow = (props) => {
  const {data} = props;
  
  const getColorPrice = (price) => {
    return price >= 0 ? 'true' : '' 
  }

  const formatPercent = number => {
    return `${new Number(number).toFixed(2)}`
  }

  const formatDollar = (number, maximumSignificantDigits) => {
    return new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'usd',
        maximumSignificantDigits
      }
    ).format(number)
  }
  return (
    <>
      <TableCell align="right">
        <Typography>
          {data.trust_score_rank}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <NameContainer>
          <Image src={`${data.image}`} width={30} height={30} alt="coin" />
          <Typography style={{marginLeft: "10px"}}>
            {data.name}
          </Typography>
        </NameContainer>
      </TableCell>

      <TableCell align="right">
      <RaitingContainer>
        <Rating
          name="hover-feedback"
          value={data.trust_score / 2}
          precision={0.5}
          getLabelText={getLabelText}
          readOnly
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Typography style={{paddingLeft: "10px"}}>
          {labels[data.trust_score / 2]}
        </Typography>
      </RaitingContainer>
      </TableCell>
      <TableCell align="right">
        <Typography>
          {data.year_established}
        </Typography>
      </TableCell>
      <TableCell align="right">
          <Typography>
            {data.country}
          </Typography>
      </TableCell>
      <TableCell align="right">
        <VolumeContainer>
          <Typography style={{paddingRight: "10px"}}>
            {data.trade_volume_24h_btc}
          </Typography>
          <Image src={btcIcon} width={30} height={30} alt="coin" />
        </VolumeContainer>
      </TableCell>
    </>
  )
}
export default EchangesBodyRow;

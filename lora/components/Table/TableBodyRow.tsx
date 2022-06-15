import React from 'react';
import {
  TableCell,
  Typography,
} from "@mui/material";
import { styled } from '@mui/system';
import Image from 'next/image';

const NameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}))

const ColoredPercent = styled('span')(({isprofitable}) =>({
  color: isprofitable ? '#1BB67A' : '#B9333C',
}))

const CustomBodyRow = (props) => {
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
          {data.market_data.market_cap_rank}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <NameContainer>
          <Image src={`${data.image.thumb}`} width={30} height={30} alt="coin" />
          <Typography style={{marginLeft: "10px"}}>
            {data.symbol.toUpperCase()}
          </Typography>
        </NameContainer>
      </TableCell>

      <TableCell align="right">
        <Typography>
          {formatDollar(data.market_data.current_price.usd, 20)}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <ColoredPercent isprofitable={getColorPrice(data.market_data.price_change_percentage_24h)}>
          <Typography>
            {formatPercent(data.market_data.price_change_percentage_24h)}%
          </Typography>
        </ColoredPercent>
      </TableCell>
      <TableCell align="right">
        <ColoredPercent isprofitable={getColorPrice(data.market_data.price_change_percentage_7d)}>
          <Typography>
            {formatPercent(data.market_data.price_change_percentage_7d)}%
          </Typography>
        </ColoredPercent>
      </TableCell>
      <TableCell align="right">
        <ColoredPercent isprofitable={getColorPrice(data.market_data.price_change_percentage_30d)}>
          <Typography>
            {formatPercent(data.market_data.price_change_percentage_30d)}%
          </Typography>
        </ColoredPercent>
      </TableCell>
      <TableCell align="right">
        <Typography>
          {formatDollar(data.market_data.market_cap.usd, 12)}
        </Typography>
      </TableCell>
    </>
  )
}
export default CustomBodyRow;

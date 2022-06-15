import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Typography from "@mui/material/Typography";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
  Box,
} from "@mui/material";
import { styled } from '@mui/system';
import DrawerComponent from "./Drawer";
import ToggleButton from "./ToggleButton";

const StyledAppBar = styled(Toolbar)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}))
const Wrapper = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
}))

const Logo = styled('span')(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.text.primary,
  fontSize: "30px",
  fontWeight: '700',
  textDecoration: "none",
}))
const Navlinks = styled('div')(({ theme }) => ({
     marginLeft: theme.spacing(5),
     display: "flex",
     alignItems: "center"
}))

const LinkItem = styled('a')(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.text.primary,
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: theme.palette.text.secondary,
    },
}))



const Navbar: React.FC  = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box>
      <AppBar position="static">
        <StyledAppBar>
      <Wrapper maxWidth="xl">
      <Link href="/" passHref={true}>
        <Logo>
          Lora
        </Logo>
        </Link>
         {isMobile ? (
          <DrawerComponent />
        ) : (
          <Navlinks>
            <Link href="/cryptocurrencies" passHref={true}>
              <LinkItem>Cryptocurrencies</LinkItem>
            </Link>
            <Link href="/exchanges" passHref={true}>
              <LinkItem>Exchanges</LinkItem>
            </Link>
            <Link href="/tradingview" passHref={true}>
              <LinkItem>TradingView</LinkItem>
            </Link>
            <Link href="/news" passHref={true}>
              <LinkItem>News</LinkItem>
            </Link>
            <ToggleButton />
          </Navlinks>
        )}
        </Wrapper>
        </StyledAppBar>
      </AppBar>
    </Box>
  );
}
 
export default Navbar;

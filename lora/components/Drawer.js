import React, { useState } from "react";
import {
    Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Paper } from '@mui/material';
import Link  from "next/link";
import { styled } from '@mui/system';
import MenuIcon from "@material-ui/icons/Menu";


const StyledDrawer = styled(Drawer)(({ theme }) => {
  return({
  height: '100%',
})})

const StyledList = styled(List)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  height: '100%'
}))

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <StyledList>
        <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link href="/">Home</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link href="/about">About</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link href="/about">Contact</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link href="/about">Faq</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
        </StyledList>
      </StyledDrawer>
      <IconButton color="inherit" onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </div>
  );
}
export default DrawerComponent;
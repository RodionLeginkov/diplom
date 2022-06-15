import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { styled } from '@mui/system';
import { Container } from '@mui/material'

const Wrapper = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

const Content = styled('div')(({ theme }) => ({
  flex: '1 1 auto'
}))

const Layout = ({ children }) => {
  return (
    <Wrapper >
      <Navbar />
      <Content>
        { children }
      </Content>
      <Footer />
    </Wrapper>
  );
}
 
export default Layout;
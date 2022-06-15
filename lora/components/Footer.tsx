import { Container } from '@mui/material'
import { styled } from '@mui/system';

const Wrapper = styled('footer')(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}))

const Footer = () => {
  return ( 
    <Wrapper>
      <Container maxWidth="xl">

      </Container>
    </Wrapper>
   );
}
 
export default Footer;
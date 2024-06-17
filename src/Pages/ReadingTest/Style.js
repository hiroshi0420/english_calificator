import { styled } from "@mui/material/styles";
import SendIcon from '@mui/icons-material/Send';
import { Box, Typography } from '@mui/material';


export const ContainerNavbar = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    width: '100%'
  }
})

export const SectionPageTitle = styled('section')(() => {
  return {
    display: 'flex',
    height: 'auto',
    width: '100%',
  }
})


export const ContainerQuestion = styled('div')(() => {
  return {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '16px',
    maxHeight: '100px',
  }
})

export const ContainerContent = styled(Box)(({ theme, numberQuestion }) => {
  return {
    display: numberQuestion && 'flex',
    alignItems: numberQuestion && 'center',
    justifyContent: numberQuestion && 'center',
    width: numberQuestion ? '10%' : '90%',
    borderRadius: numberQuestion ? '4px 0 0 4px' : '0 4px 4px 0',
    maxHeight: '150px',
    overflow: 'hidden',
    padding: '16px',
    background: numberQuestion ? theme.palette.customGray.main : theme.palette.background.default,
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main,
    },
  }
})

export const ContainerText = styled(Box)(({theme}) => {
  return {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    background: theme.palette.background.default,
  }
})

export const CustomTyphography = styled(Typography)(() => {
  return {
    fontWeight: 'bold',
    fontSize: '1rem'
  }
})

export const CustomSendIcon = styled(SendIcon)(({theme}) => {
  return {
    [theme.breakpoints.down('lg')]:{
      fontSize: '16px !important'
    }
  }
})

export const Container = styled('div')(() => {
  return {
    height: '100%',
    width: '100%',
  }
})


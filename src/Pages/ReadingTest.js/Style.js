import { styled } from "@mui/material/styles";
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
    flexDirection: 'row',
    width: '100%',
    padding: '16px',
    borderRadius: '20px',
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
    overflow: 'auto',
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

export const CustomTyphography = styled(Typography)(() => {
  return {
    fontWeight: 'bold',
    fontSize: '2rem'
  }
})
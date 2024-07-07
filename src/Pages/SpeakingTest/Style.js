import { styled } from "@mui/material/styles";
import PublishIcon from '@mui/icons-material/Publish';
import { Box, Typography } from '@mui/material';


export const Container = styled('div')(() => {
  return {
    height: '100%',
    width: '100%',
  }
})

export const SectionPageTitle = styled('section')(() => {
  return {
    display: 'flex',
    height: '10%',
    width: '100%',
  }
})

export const ContainerQuestion = styled('div')(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '16px',
    borderRadius: '20px',
  }
})

export const ContainerContent = styled(Box)(({ theme, numberQuestion }) => {
  return {
    display: numberQuestion && 'flex',
    alignItems: numberQuestion && 'center',
    justifyContent: numberQuestion && 'center',
    height: numberQuestion && '40px',
    width: numberQuestion && '40px',
    borderRadius: numberQuestion ? '50%' : '0 4px 4px 0',
    background: numberQuestion && theme.palette.primary.main,
    flexGrow: !numberQuestion  && 1,
    maxHeight: '150px',
    overflow: 'hidden',
    padding: '16px',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main,
    },
  }
})

export const CustomTyphography = styled(Typography)(({theme}) => {
  return {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1rem'
  }
})

export const CustomSendIcon = styled(PublishIcon)(({theme}) => {
  return {
    [theme.breakpoints.down('lg')]:{
      fontSize: '16px !important'
    }
  }
})


export const ContainerRecording = styled('div')(() => {
    return {
        padding: '16px',
    }
})
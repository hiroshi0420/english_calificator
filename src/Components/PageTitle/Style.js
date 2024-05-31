import { styled } from "@mui/material/styles";
import { Box } from '@mui/material';


export const Container = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginBottom: '10px'
}));


export const ContainerGroup = styled('div')(() => {
    return {
        display: 'flex',
        flexDirection: 'row',
        gap: '0.50rem',
        width: '100%',
        height: '100%',
    }
})


export const IconContainer = styled("div")(({ theme }) => {
    return {
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        cursor: "default",
    };
});

export const ContainerPageTitle = styled('div')(() => {
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export const Title = styled('p')(({ theme }) => {
    return {
      color: theme.palette.primary.main,
      textAlign: "center",
      fontWeight: "600",
      textTransform: "uppercase",
      fontSize: '1rem',
      [theme.breakpoints.down('lg')]: {
        fontSize: '0.75rem',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '0.75rem',
      },
    };
  });
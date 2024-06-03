import { styled } from "@mui/material/styles";
import { Box, Paper } from '@mui/material';


export const ContainerHeader = styled('div')(() => {
    return {
        padding: '16px 24px',
        backgroundColor: '#fff',
    }
})

export const ContainerLeft = styled('div')(() => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '80%'
    }
})

export const ContainerRight = styled('div')(({theme}) => {
    return {
        display: 'flex',
        padding: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        borderRadius: '0 4px 4px 0',
        background: theme.palette.customGray.main
    }
})

export const SectionLeft = styled('div')(() => {
    return {
        display: 'flex',
        gap: '0.20rem',
        flexDirection: 'column',
    }
})

export const SectionRight = styled('div')(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginRight: '16px'
    }
});

export const GroupItems = styled('div')(() => {
    return {
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        alignItems: 'flex-end',
    }
});

import { styled } from "@mui/material/styles";


export const Container = styled('div')(({ theme, disabled }) => {
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        width: '130px',
        height: '130px',
        borderRadius: '50%',
        background: disabled ? '#d3d3d3' : '#99b5cc',
        transition: 'filter 0.3s',
    }
});
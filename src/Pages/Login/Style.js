import { styled } from "@mui/material/styles";


export const Container = styled('div')(() => {
    return {
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        height: '100vh',
    }
})

export const ContainerLeft = styled('div')(() => {
    return {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '40%',
        height: '100%',
    }
})

export const CustomImg = styled('img')(() => {
    return {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
    }
})

export const ContainerRight = styled('div')(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%',
        height: '100%',
    }
})

export const ContainerLogo = styled('div')(() => {
    return {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '70px',
        width: '150px',
        display: 'flex',
        alignItems: 'center',
    }
})

export const Figure = styled('figure')(() => {
    return {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    }
});

export const Icon = styled('img')(() => {
    return {
        width: '100px',
    }
})
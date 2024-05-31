
import Inbox from '@mui/icons-material/Inbox';

import {Container,ContainerGroup, IconContainer, ContainerPageTitle, Title,  } from './Style';

export const PageTitle = ({ title, icon }) => {
  return (
    <Container>
        <ContainerGroup>
            <IconContainer>
                { icon ? icon : <Inbox/> } 
            </IconContainer>

            <ContainerPageTitle>
                <Title>{ title }</Title>
            </ContainerPageTitle>
        </ContainerGroup>
    </Container>
  )
}

import { ComponentIcon } from '../IconComponent/ComponentIcon';
import { Typography } from '@mui/material';
import { Container, CustomTitle, Content } from './Style';


export const ComponentCardMenu = ({ components, completedTests, handleNavigation, enabledTests }) => {
    return (
      <>
        {components.map((el) => (
          <Container 
            key={`${el.id} - ${el.type}`} 
            onClick={() => handleNavigation(el.router, el.name2, el.type)}
            disabled={completedTests?.[el.type] || !enabledTests}
          >
            <ComponentIcon type={el.type} disabled={completedTests?.[el.type] || !enabledTests}/>
            <CustomTitle variant='h5'>{el.name}</CustomTitle>
            <Content className='content-card'>
                <Typography variant='caption' sx={{ color: '#ffffff'}}>
                    {`${el.name} Proficiency Test`}
                </Typography>
            </Content>
          </Container>
        ))}
      </>
    );
  };
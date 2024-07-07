// Images
import ImgLogin from '../../../public/login-img.png'
import EnglishLogo from '../../../public/CompanyLogo.png';

// Components
import { LoginFormComponent } from '../../Components/LoginForm/LoginFormComponent';

// Styles
import { Container, ContainerLeft, CustomImg, ContainerRight, ContainerLogo, Figure, Icon, } from './Style';

export const Login = () => {
  
  return (
    <Container>
      <ContainerLeft>
        <CustomImg src={ImgLogin}/>
        <ContainerLogo>
          <Figure>
            <Icon src={EnglishLogo} alt='English Logo'/>
          </Figure>
        </ContainerLogo>
      </ContainerLeft>

      <ContainerRight>
        <LoginFormComponent/>
      </ContainerRight>
    </Container>
  );
};


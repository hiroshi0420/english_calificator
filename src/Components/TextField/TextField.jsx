import { useTheme, useMediaQuery } from '@mui/material';
import { Container, Textfield } from './Style';


export const CustomTextField = ({currentQuestion, handleChange}) => {
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Container>
            <Textfield
                variant="outlined"
                rows={isLgUp ? 10 : 5}
                multiline={true}
                value={currentQuestion.response}
                onChange={(e) => handleChange(e.target.value, 'response')}
                placeholder="Write your response here..."
            />
        </Container>
    )
}
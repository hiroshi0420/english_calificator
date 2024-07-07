import React from 'react'
import {Container} from './Style';
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; // Reading
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'; // Listening
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode'; // Speaking
import ArticleIcon from '@mui/icons-material/Article'; // Writing

const iconMap = {
    reading: <AutoStoriesIcon sx={{ color: '#ffffff', width: '60px', height: '60px' }} />,
    listening: <HeadsetMicIcon sx={{ color: '#ffffff', width: '60px', height: '60px' }} />,
    speaking: <InterpreterModeIcon sx={{ color: '#ffffff', width: '60px', height: '60px' }} />,
    writing: <ArticleIcon sx={{ color: '#ffffff', width: '60px', height: '60px' }} />,
  };


export const ComponentIcon = ({ type, disabled })  => {
  return (
    <Container className="icon-container" disabled={disabled}>
        {iconMap[type] || null}    
    </Container>

  )
}

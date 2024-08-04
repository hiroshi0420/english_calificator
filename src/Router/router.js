const Router = {
    
    //APP
    appLogin: '/login',
    appInstructions: '/instructions',
    appMenu: '/menu',
    appWritingTest: '/writingTest',
    appReadingTest: '/readingTest',
    appSpeakingTest: '/speakingTest',
    applisteningTest: '/listeningTest',
    appResults: '/results',
    
    // API
    apiBaseUrl:  import.meta.env.VITE_API_URL,
    apiWritingTest: '/api/Writing/questions',
    apiReadingTest: '/api/Reading/questions',
    apiListeningTest: '/api/Listening/questions',
    apiSpeakingTest: '/api/Speaking/questions',

    apiSendWritingTest: '/api/Writing/answers',
    apiSendReadingTest: '/api/Reading/answers',
    apiSendListeningTest: '/api/Listening/answers',
    apiSendSpeakingTest: '/api/Speaking/answers',

    apiGetTest: '/api/Tests/user/:id/testId',
    apiGetTestByCompanyComplete: '/api/Tests/company/:id/completed',

    apiResultsTest: '/api/FinalResult',

    apiLogin: '/api/Auth',

}


export default Router;
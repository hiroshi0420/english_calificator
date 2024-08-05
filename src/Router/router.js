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
    appUserDetails: '/user-details/:userId/:testId',
    
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

    //API's para obtener los resultados por TestID en la pagina UserDetails
    apiWritingTestById: '/api/Writing/answers/test/:testId',
    apiReadingTestById: '/api/Reading/answers/test/:testId',
    //apiListeningTestById: '/api/Listening/answers/test/:testId',
    apiSpeakingTestById: '/api/Speaking/answers/test/:testId',

    apiGetTest: '/api/Tests/user/:id/testId',
    apiGetTestByCompanyComplete: '/api/Tests/company/:id/completed',

    apiResultsTest: '/api/FinalResult',

    apiLogin: '/api/Auth',

}


export default Router;
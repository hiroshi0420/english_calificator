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
    apiWritingTest: '/api/Writing',
    apiReadingTest: '/api/Reading',
    apiListeningTest: '/api/Listening',
    apiSpeakingTest: '/api/Speaking',
    apiResultsTest: '/api/FinalResult',

    apiLogin: '/api/Auth',

}


export default Router;
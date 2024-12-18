export const queryLoadTemplate = "https://rios-api.malloc.fun:31080/getTemplate";
export const queryLoadHDFSList = "https://rios-api.malloc.fun:31080/getHDFSTableList";
export const querySubmitTask = "https://rios-api.malloc.fun:31080/submitTask";
export const queryRunTask = "https://rios-api.malloc.fun:31080/runTask";
export const queryTaskStatus =       "https://rios-api.malloc.fun:31080/taskStatus";
export const queryGetTaskData = "https://rios-api.malloc.fun:31080/getTaskData";
export const queryDownloadTaskData = "https://rios-api.malloc.fun:31080/downloadTaskData";
export const querySearchPatent = "https://rios-api.malloc.fun:31080/patentSearch";
export const queryPostLLMChat = "https://rios-api.malloc.fun:31080/postLLMChat";
export const queryLLMChatStatus = "https://rios-api.malloc.fun:31080/getLLMChatStatus";
export const queryExecSQL = "https://rios-api.malloc.fun:31080/execSQL";
export const queryHiveExecStatus = "https://rios-api.malloc.fun:31080/queryHiveExecStatus";
export const queryPostRecommend =    process.env.VUE_APP_FRONTEND_ROUTER + "/postRecommend";
export const queryGetRecommend =     process.env.VUE_APP_FRONTEND_ROUTER + "/getRecommend";
export const queryPostRecommendInv = process.env.VUE_APP_FRONTEND_ROUTER + "/postRecommendInv";
export const queryGetRecommendInv =  process.env.VUE_APP_FRONTEND_ROUTER + "/getRecommendInv";
export const queryTranslateText =    process.env.VUE_APP_FRONTEND_ROUTER + "/translateText";
export const queryRetrainModel =     process.env.VUE_APP_FRONTEND_ROUTER + "/retrainModel";
export const queryLoadModel =        process.env.VUE_APP_FRONTEND_ROUTER + "/loadModel";
export const querySaveModel =        process.env.VUE_APP_FRONTEND_ROUTER + "/saveModel";
export const queryTranslatorLogin =  process.env.VUE_APP_FRONTEND_ROUTER + "/translatorLogin";
export const queryTranslatorLogout = process.env.VUE_APP_FRONTEND_ROUTER + "/translatorLogout";
export const queryTranslateFile =    process.env.VUE_APP_FRONTEND_ROUTER + "/translateFile";
export const queryCollectData =      process.env.VUE_APP_FRONTEND_ROUTER + "/collectData";
export const queryVectorSearch =     process.env.VUE_APP_FRONTEND_ROUTER + "/vectorSearch";
export const queryScalarUpload =     process.env.VUE_APP_FRONTEND_ROUTER + "/scalarUpload";
export const queryVectorUpload =     process.env.VUE_APP_FRONTEND_ROUTER + "/vectorUpload";
export const queryFilename =         process.env.VUE_APP_FRONTEND_ROUTER + "/filename";
export const queryFiledata =         process.env.VUE_APP_FRONTEND_ROUTER + "/filedata";
export const querySaveFeedback =     process.env.VUE_APP_FRONTEND_ROUTER + "/saveFeedback";
export const queryGetFeedback =      process.env.VUE_APP_FRONTEND_ROUTER + "/getFeedback";
export const queryGetSummary =       process.env.VUE_APP_FRONTEND_ROUTER + "/getSummary";
export const queryPollSummary =      process.env.VUE_APP_FRONTEND_ROUTER + "/pollSummary";
export const queryPatentTranslate =  process.env.VUE_APP_FRONTEND_ROUTER + "/translatePatent";

export const queryTaskStatusGap = 1000
export const defaultShowResultNum = 10

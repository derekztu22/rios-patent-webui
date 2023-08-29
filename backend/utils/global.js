const port = 23457;
const submitTaskRouter = "http://localhost:19527/patent/publications/submit?"
const runTaskRouter = "http://localhost:19527/patent/publications/run?"
const getTaskDataRouter = "http://localhost:19527/patent/publications/query"
const patentSearchRouter = "http://localhost:19527/patent/publications/"
const llmChatPostRouterllama65 = "http://macs.nekololi.cn:8065/v1/chat/completions"
const llmChatPostRouterllama2_70 = "http://macs.nekololi.cn:8070/v1/chat/completions"
const llmChatPostRouterllama13Tuned = "http://10.8.102.14:8001/text2sql/"

module.exports = {
    port,
    submitTaskRouter,
    runTaskRouter,
    getTaskDataRouter,
    patentSearchRouter,
    llmChatPostRouterllama65,
    llmChatPostRouterllama2_70,
    llmChatPostRouterllama13Tuned
}
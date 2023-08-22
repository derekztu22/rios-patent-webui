const port = 23457;
const submitTaskRouter = "http://localhost:19527/patent/publications/submit?"
const runTaskRouter = "http://localhost:19527/patent/publications/run?"
const getTaskDataRouter = "http://localhost:19527/patent/publications/query"
const patentSearchRouter = "http://localhost:19527/patent/publications/"
const llmChatPostRouter1 = "http://macs.nekololi.cn:8000/v1/chat/completions"
const llmChatPostRouter2 = "http://10.8.102.14:8001/text2sql/"

module.exports = {
    port,
    submitTaskRouter,
    runTaskRouter,
    getTaskDataRouter,
    patentSearchRouter,
    llmChatPostRouter1,
    llmChatPostRouter2
}
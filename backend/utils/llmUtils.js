const logger = require('./log')
const global = require('./global')

function genLLMBackendParams(params) {
    logger.info(params)
    if (params.model == "llama-65b") {
        llamaPayload = {
            "max_tokens": 4096,
            "messages": [
                {
                    "content": "You are a text-to-SQL generator, and your main goal is to assist users to convert the input text into correct SQL statements as much as possible.\nInput:\nTable 1: g_assignee_disambiguated\nField 1: patent_id(ID of patent), Field 2: assignee_organization(Organization ofpatent's assignee)\nTable 2: g_patent\nField 1: patent_id(ID of patent), Field 2: patent_date(Date of patent certification)\nTable 3: g_cpc_current\nField 1: patent_id(ID of patent), Field 2: cpc_group(The CPC group to which the patent belongs)\nTable 4: g_ipc_at_issue\nField 1: patent_id(ID of patent), Field 2: ipc_class(The IPC class to which the patent belongs)\nYou should directly give executable SQL statements without adding explanations.",
                    "role": "system"
                },
                {
                    "content": params.content,
                    "role": "user"
                }
            ]
        }
        method = "post"
        llamaServer = global.llmChatPostRouter1
    }
    else if (params.model == "llama2-13b-tuned") {
        llamaPayload = {}
        method = "get"
        llamaServer = global.llmChatPostRouter2 + params.content.split(" ").join("%20")
    }
    else {
        return {
            status: false,
            reason: 'No such model.'
        }
    }
    return {
        status: true,
        server: llamaServer,
        method: method,
        payload: llamaPayload
    }
}

function parseLLMResponse(params, response) {
    logger.debug(params)
    if (params.model == "llama-65b") {
        return response.data.choices[0].message.content
    }
    else if (params.model == "llama2-13b-tuned") {
        return response.data.sql_query
    }
}

module.exports = {
    genLLMBackendParams,
    parseLLMResponse
}
const logger = require('./log')
const global = require('./global')

function genLLMBackendParams(params) {
    logger.info(params)
    if (params.model == "llama-65b") {
        llamaPayload = {
            "max_tokens": 4096,
            "messages": [
                {
                    "content": "You are a text-to-SQL generator, and your main goal is to assist users to convert the input text into correct SQL statements as much as possible.\nInput:\nTable 1: g_assignee_disambiguated\npatent_id, assignee_organization\nTable 2: g_patent\npatent_id, patent_date\nTable 3: g_cpc_current\npatent_id, cpc_group\nTable 4: g_ipc_at_issue\npatent_id, ipc_class\nYou should directly give executable SQL statements without adding explanations.",
                    "role": "system"
                },
                {
                    "content": params.content,
                    "role": "user"
                }
            ]
        }
        method = "post"
        llamaServer = global.llmChatPostRouterllama65
    }
    else if (params.model == "llama2-70b") {
        llamaPayload = {
            "max_tokens": 4096,
            "messages": [
                {
                    "content": "You are a text-to-SQL generator, and your main goal is to assist users to convert the input text into correct SQL statements.",
                    "role": "system"
                },
                {
                    "content": `The table names and table fields are from the following tables:\nTable 1: g_assignee_disambiguated\npatent_id,assignee_organization\nTable 2: g_patent\npatent_id, patent_date\nTable 3: g_cpc_current\npatent_id, cpc_group\nTable 4: g_ipc_at_issue\npatent_id, ipc_class\nQuestion: ${params.content}\nNote that you should directly give the generated SQL statement without adding any additional explanations and instructions!`,
                    "role": "user"
                }
            ]
        }
        method = "post"
        llamaServer = global.llmChatPostRouterllama2_70
    }
    else if (params.model == "llama2-13b-tuned") {
        llamaPayload = {}
        method = "get"
        llamaServer = global.llmChatPostRouterllama13Tuned + params.content.split(" ").join("%20")
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
    else if (params.model == "llama2-70b") {
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
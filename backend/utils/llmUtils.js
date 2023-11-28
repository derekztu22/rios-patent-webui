const logger = require('./log')
const global = require('./global')

function genLLMBackendParams(params) {
    logger.info(params)
    if (params.model == "llama-65b") {
        llamaPayload = {
            "max_tokens": 4096,
            "messages": [
                {
                    "content": "You are a SQL generator, and your main goal is to assist users to convert the input text into executable SQL statements. Your language of choice is SQL. Don't explain the code, just generate the code block itself.\nIn the database is one table google_full with these fields:\n```\npublication_number\napplication_number\ncountry_code\nkind_code\napplication_kind\napplication_number_formatted\npct_number\nfamily_id\nspif_publication_number\nspif_application_number\ninventor\nassignee\ngrant_date\npublication_date\nfiling_date\npriority_date\npriority_claim\nprimary_cpc\ncpc\nprimary_ipc\nipc\ncitation\ntitle_localized\nabstract_localized\nclaims_localized\ndescription_localized\nfi\nfterm\nlocarno\nuspc\n```\nBecause the user's input may have incorrect capitalization, you should use like instead of = when matching in the generated SQL.",
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
                    "content": "You are a SQL generator, and your main goal is to assist users to convert the input text into executable SQL statements. Your language of choice is SQL. Don't explain the code, just generate the code block itself.\nIn the database is one table google_full with these fields:\n```\npublication_number\napplication_number\ncountry_code\nkind_code\napplication_kind\napplication_number_formatted\npct_number\nfamily_id\nspif_publication_number\nspif_application_number\ninventor\nassignee\ngrant_date\npublication_date\nfiling_date\npriority_date\npriority_claim\nprimary_cpc\ncpc\nprimary_ipc\nipc\ncitation\ntitle_localized\nabstract_localized\nclaims_localized\ndescription_localized\nfi\nfterm\nlocarno\nuspc\n```\nBecause the user's input may have incorrect capitalization, you should use like instead of = when matching in the generated SQL.",
                    "role": "system"
                },
                {
                    "content": params.content,
                    "role": "user"
                }
            ]
        }
        method = "post"
        llamaServer = global.llmChatPostRouterllama2_70
    }
    else if (params.model == "llama2-13b-tuned") {
        llamaPayload = {
            "nl_question": params.content
        }
        method = "post"
        llamaServer = global.llmChatPostRouterllama13Tuned
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
    var input
    if (params.model == "llama-65b") {
        input = response.data.choices[0].message.content
    }
    else if (params.model == "llama2-70b") {
        input = response.data.choices[0].message.content
    }
    else if (params.model == "llama2-13b-tuned") {
        input = response.data.sql_query
    }
    var regex = /```sql([\s\S]*?)```/g;
    var match;
    if ((match = regex.exec(input)) !== null) {
        var codeBlock = match[1];
        return codeBlock
    }
    else return input
}

module.exports = {
    genLLMBackendParams,
    parseLLMResponse
}
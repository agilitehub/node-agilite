'use strict'

const Axios = require('axios')
const Enums = require('../utils/enums')

const executeRequest = (config) => {
  return Axios.request(config)
}

const executeCRUDRequest = (apiServerUrl = '', apiKey = '', teamId = null, appName = '', method = '', data = {}, headers = {}) => {
  let config = {
    url: `${apiServerUrl}/${appName}/${Enums.STRING_DATA}`,
    method,
    headers,
    data
  }

  if(apiKey !== undefined && apiKey !== null) {
    config.headers[Enums.HEADER_API_KEY] = apiKey
  }

  if (teamId !== undefined && teamId !== null) {
    config.headers[Enums.HEADER_TEAM_NAME] = teamId
  }

  switch (method) {
    case Enums.METHOD_POST:
    case Enums.METHOD_PUT:
      config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

      break

  }
  
  return executeRequest(config)
}

// EXPORTS
exports.executeRequest = executeRequest
exports.executeCRUDRequest = executeCRUDRequest

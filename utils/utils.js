'use strict'

const Axios = require('axios')
const Enums = require('../utils/enums')

const executeRequest = (config) => {
  return Axios.request(config)
}

const executeCRUDRequest = (apiServerUrl = '', apiKey = '', teamId, appName = '', reqType = '', data = {}, recordId = '', profileKeys = [], recordIds = [], slimResult = true, publish = false, resetService = false) => {
  let config = {
    url: `${apiServerUrl}/${appName}/${Enums.STRING_DATA}`,
    method: reqType,
    headers: {},
    data
  }

  config.headers[Enums.HEADER_API_KEY] = apiKey

  if (teamId !== undefined && teamId !== null) {
    config.headers[Enums.HEADER_TEAM_NAME] = teamId
  }

  switch (reqType) {
    case Enums.METHOD_GET:
      config.headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
      config.headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
      config.headers[Enums.HEADER_SLIM_RESULT] = slimResult

      break
    case Enums.METHOD_POST:
      config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

      if (publish !== undefined && publish !== null) {
        config.headers[Enums.HEADER_PUBLISH] = publish
      }

      break
    case Enums.METHOD_PUT:
      config.headers[Enums.HEADER_RECORD_ID] = recordId
      config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

      if (publish !== undefined && publish !== null) {
        config.headers[Enums.HEADER_PUBLISH] = publish
      }

      if (resetService !== undefined && resetService !== null) {
        config.headers[Enums.HEADER_RESET_SERVICE] = resetService
      }

      break
    case Enums.METHOD_DELETE:
      config.headers[Enums.HEADER_RECORD_ID] = recordId
      break
  }

  return executeRequest(config)
}

// EXPORTS
exports.executeRequest = executeRequest
exports.executeCRUDRequest = executeCRUDRequest

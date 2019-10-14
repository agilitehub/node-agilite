import axios from 'axios'
import * as Enums from './enums'

let executeRequest = (config: any) => {
  return axios.request(config)
}

let executeCRUDRequest = (apiServerUrl = '', apiKey = '', teamId = null, appName = '', method = '', data: any = {}, headers = {}) => {
  let config: any = {
    url: `${apiServerUrl}/${appName}/${Enums.STRING_DATA}`,
    method,
    headers,
    data
  }

  if (apiKey !== undefined && apiKey !== null) {
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
export = {executeRequest, executeCRUDRequest}


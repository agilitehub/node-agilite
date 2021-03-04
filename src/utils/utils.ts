'use strict'

import Axios from 'axios'
import { Enums, AxiosConfig } from './enums'

export const executeRequest = (config: any) => {
  config.maxContentLength = 99999999
  return Axios.request(config)
}

export const executeCRUDRequest = (apiServerUrl: string = '', apiKey: string = '', teamId: string = '', appName: string = '', method: string = '', data: any = {}, headers: any = {}) => {
  const config: AxiosConfig = {
    url: `${apiServerUrl}/${appName}/${Enums.STRING_DATA}`,
    method,
    headers,
    data
  }

  if (apiKey) config.headers[Enums.HEADER_API_KEY] = apiKey
  if (teamId) config.headers[Enums.HEADER_TEAM_NAME] = teamId

  switch (method) {
    case Enums.METHOD_POST:
    case Enums.METHOD_PUT:
      config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON
      break
  }

  return executeRequest(config)
}

export const authenticateToken = (apiServerUrl: string = '', apiKey: string = '') => {
  const config: any = {
    url: `${apiServerUrl}`,
    method: Enums.METHOD_GET,
    headers: {}
  }

  if (apiKey) config.headers[Enums.HEADER_API_KEY] = apiKey

  return executeRequest(config)
}

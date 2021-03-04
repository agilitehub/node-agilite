'use strict'

import { Enums, AxiosConfig } from '../utils/enums'
import { executeRequest, executeCRUDRequest } from '../utils/utils.js'
import { Config } from './agilite'

class NodeRED {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''

  constructor (config: Config) {
    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  getFlows () {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getFlows`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey

    return executeRequest(config)
  }

  saveFlows (data: any) {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/saveFlows`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getCredentials () {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getCredentials`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  saveCredentials (data: any) {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/saveCredentials`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getSettings () {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getSettings`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  saveSettings (data: any) {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/saveSettings`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getSessions () {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getSessions`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  saveSessions (data: any) {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/saveSessions`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getFlowData (profileKey: string) {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getFlowData`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey

    return executeRequest(config)
  }
}

export default NodeRED

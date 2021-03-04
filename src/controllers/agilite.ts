'use strict'

import { Enums } from '../utils/enums'
import ApiKeys from './api-keys'
import Keywords from './keywords'
import Numbering from './numbering'
import Connectors from './connectors'
import DataMappings from './datamappings'
import Templates from './templates'
import BPM from './bpm'
import Roles from './roles'
import Files from './files'
import Utils from './utils'
import TierStructures from './tierstructures'
import BatchActions from './batchactions'
import Events from './events'
import BatchLogging from './batchlogging'
import NodeRed from './nodered'
import AdminSolutions from './admin-solutions'

import { executeCRUDRequest, authenticateToken } from '../utils/utils'

export interface Config {
  apiServerUrl: string
  apiKey: string
  teamId: string
}

interface AppName {
  MODULE_KEY_API_KEYS: string
  MODULE_KEY_KEYWORDS: string
  MODULE_KEY_NUMBERING: string
  MODULE_KEY_CONNECTORS: string
  MODULE_KEY_DATA_MAPPING: string
  MODULE_KEY_TEMPLATES: string
  MODULE_KEY_BPM: string
  MODULE_KEY_ROLES: string
  MODULE_KEY_BOT_BUILDER: string
  MODULE_KEY_FILES: string
  MODULE_KEY_UTILS: string
  MODULE_KEY_TIER_STRUCTURES: string
  MODULE_KEY_BATCH_ACTIONS: string
  MODULE_KEY_EVENTS: string
  MODULE_KEY_BATCH_LOGGING: string
  MODULE_KEY_NODE_RED: string
  MODULE_KEY_ADMIN_SOLUTIONS: string
}

interface ReqType {
  GET: string
  POST: string
  PUT: string
  DELETE: string
}

class Agilite {
  config: Config
  ApiKeys: ApiKeys
  Keywords: Keywords
  Numbering: Numbering
  Connectors: Connectors
  DataMappings: DataMappings
  Templates: Templates
  BPM: BPM
  Roles: Roles
  Files: Files
  Utils: Utils
  TierStructures: TierStructures
  BatchActions: BatchActions
  Events: Events
  BatchLogging: BatchLogging
  NodeRed: NodeRed
  AdminSolutions: AdminSolutions

  appName: AppName
  reqType: ReqType

  constructor (config: Config) {
    this.config = {
      apiServerUrl: config.apiServerUrl || Enums.URL_API_SERVER,
      apiKey: config.apiKey || Enums.STRING_EMPTY,
      teamId: config.teamId
    }

    this.ApiKeys = new ApiKeys(config)
    this.Keywords = new Keywords(config)
    this.Numbering = new Numbering(config)
    this.Connectors = new Connectors(config)
    this.DataMappings = new DataMappings(config)
    this.Templates = new Templates(config)
    this.BPM = new BPM(config)
    this.Roles = new Roles(config)
    this.Files = new Files(config)
    this.Utils = new Utils(config)
    this.TierStructures = new TierStructures(config)
    this.BatchActions = new BatchActions(config)
    this.Events = new Events(config)
    this.BatchLogging = new BatchLogging(config)
    this.NodeRed = new NodeRed(config)
    this.AdminSolutions = new AdminSolutions(config)

    this.appName = {
      MODULE_KEY_API_KEYS: 'apikeys',
      MODULE_KEY_KEYWORDS: 'keywords',
      MODULE_KEY_NUMBERING: 'numbering',
      MODULE_KEY_CONNECTORS: 'connectors',
      MODULE_KEY_DATA_MAPPING: 'datamappings',
      MODULE_KEY_TEMPLATES: 'templates',
      MODULE_KEY_BPM: 'bpm',
      MODULE_KEY_ROLES: 'roles',
      MODULE_KEY_BOT_BUILDER: 'botbuilder',
      MODULE_KEY_FILES: 'files',
      MODULE_KEY_UTILS: 'utils',
      MODULE_KEY_TIER_STRUCTURES: 'tierstructures',
      MODULE_KEY_BATCH_ACTIONS: 'batchactions',
      MODULE_KEY_EVENTS: 'events',
      MODULE_KEY_BATCH_LOGGING: 'batchlogging',
      MODULE_KEY_NODE_RED: 'nodered',
      MODULE_KEY_ADMIN_SOLUTIONS: 'solutions'
    }

    this.reqType = {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'delete'
    }
  }

  getConfig () {
    return this.config
  }

  executeCRUDRequest (appName: string = '', reqType: string = '', data: any = {}, headers: any = {}) {
    return executeCRUDRequest(this.config.apiServerUrl, this.config.apiKey, this.config.teamId, appName, reqType, data, headers)
  }

  authenticateToken (apiKey: string = '') {
    return authenticateToken(this.config.apiServerUrl, apiKey)
  }
}

module.exports = Agilite

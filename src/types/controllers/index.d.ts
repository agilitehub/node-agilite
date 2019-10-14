declare namespace Agilite {
  export class Agilite {
    constructor(config: any)
  
    apiServerUrl: string
    apiKey: string
    teamId: string
  
    config: {
      apiServerUrl: string
      apiKey: string
      teamId: string
    }
  
    ApiKeys: import('ApiKeys')
    // Keywords: import('./api-keys')
    // Numbering:  import('./api-keys')
    // Connectors: import('./api-keys')
    // DataMappings: import('./api-keys')
    // Templates: import('./api-keys')
    // BPM: import('./api-keys')
    // Roles: import('./api-keys')
    // Files: import('./api-keys')
    // Utils: import('./api-keys')
    // TierStructures: import('./api-keys')
  
    appName: any
    regType: any
  
    getConfig(): config.configOptions
  
    executeCRUDRequest(appName: string, reqType: string, data: object, headers: any): any
  }
  
  export namespace config {
    export interface configOptions {
      apiServerUrl: string
      apiKey: string
      teamId: string
    }
  }
}

declare module 'Agilite' {
  import AgiliteClass = Agilite.Agilite
  export = AgiliteClass
}
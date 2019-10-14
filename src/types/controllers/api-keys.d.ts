declare namespace ApiKeys {
  export class ApiKeys {
    constructor(config: any)

    apiServerUrl: string
    apiKey: string
    teamId: string

    postData(data: object): any
    getData(profileKeys: string[], recordIds: string[], slimResult: boolean): any
    putData(recordId: string, data: object): any
    deleteData(recordId: string): any
    generateApiKey(recordId: string): any
    resetApiKeys(recordId: string): any
    disableApiKey(recordId: string): any
    enableApiKey(recordId: string): any
  }
}

declare module 'ApiKeys' {
  import ApiKeysClass = ApiKeys.ApiKeys
  export = ApiKeysClass
}
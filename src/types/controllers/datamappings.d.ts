declare class DataMappings {
  constructor(config: any)

  apiServerUrl: string
  apiKey: string
  teamId: string

  postData(data: object): any
  getData(profileKeys: string[], recordIds: string[], slimResult: boolean): any
  putData(recordId: string, data: object): any
  deleteData(recordId: string): any
  execute(profileKey: string, data: any): any
}

export = DataMappings
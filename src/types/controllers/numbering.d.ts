declare class Numbering {
  constructor(config: any)

  apiServerUrl: string
  apiKey: string
  teamId: string

  postData(data: object): any
  getData(profileKeys: string[], recordIds: string[], slimResult: boolean): any
  putData(recordId: string, data: object): any
  deleteData(recordId: string): any
  generate(profileKey: string, outputFormat: string, data: any): any
  resetCounters (recordId: string): any
}

export = Numbering
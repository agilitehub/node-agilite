declare class Utils {
  constructor(config: any)

  apiServerUrl: string
  apiKey: string
  teamId: string

  postData(data: object): any
  getData(profileKeys: string[], recordIds: string[], slimResult: boolean): any
  putData(recordId: string, data: object): any
  deleteData(recordId: string): any
}

export = Utils
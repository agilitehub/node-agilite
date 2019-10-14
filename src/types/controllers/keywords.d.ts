declare class Keywords {
  constructor(config: any)

  apiServerUrl: string
  apiKey: string
  teamId: string

  postData(data: object): any
  getData(profileKeys: string[], recordIds: string[], slimResult: boolean): any
  putData(recordId: string, data: object): any
  deleteData(recordId: string): any
  getByProfileKey(profileKey: string, sort: string, outputFormat: string): any
  getProfileKeysByGroup(groupName: string, sort: string): any
  getLabelByValue(profileKey: string, value: string, outputFormat: string): any
  getValueByLabel (profileKey: string, label: string, outputFormat: string): any
}

export = Keywords
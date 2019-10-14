declare class BPM {
  constructor(config: any)

  apiServerUrl: string
  apiKey: string
  teamId: string

  postData(data: object): any
  getData(profileKeys: string[], recordIds: string[], slimResult: boolean): any
  putData(recordId: string, data: object): any
  deleteData(recordId: string): any
  registerBPMRecord(processKey: string, currentUser: string): any
  execute(processKey: string, bpmRecordId: string, optionSelected: string, currentUser: string, comments: string, data: any): any
  getRecordState(processKeys: string[], bpmRecordIds: string[], stepNames: string[], responsibleUsers: string[], relevantUsers: string[], includeHistory: boolean, includeStepOptions: boolean, includeVisibleObjects: boolean, page: any, pageLimit: any): any
  getByProfileKey(profileKey: string): any
  clearHistoryData(profileKey: string): any
  getActiveSteps(processKey: string): any
  getActiveUsers(processKey: string): any
}

export = BPM
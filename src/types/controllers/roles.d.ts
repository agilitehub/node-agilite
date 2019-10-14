declare class Roles {
  constructor(config: any)

  apiServerUrl: string
  apiKey: string
  teamId: string

  postData(data: object): any
  getData(profileKeys: string[], recordIds: string[], slimResult: boolean): any
  putData(recordId: string, data: object): any
  deleteData(recordId: string): any
  getRole(roleNames: string[], conditionalLevels: string[], data: any): any
  assignRole(processKey: string, bpmRecordId: string, roleName: string, currentUser: string, responsibleUsers: any[]): any
  getAssignedRoles(processKey: string, bpmRecordId: string, roleNames: any[]): any
  changeConditionalLevels(recordId: string, conditionalLevels: any[]): any
  reAssignResponsibleUser(recordId: string, responsibleUser: string): any
}

export = Roles
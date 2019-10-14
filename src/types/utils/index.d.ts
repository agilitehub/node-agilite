declare module "utils"{
  interface executeRequestInterface{
    (config: any): any
  }
  
  interface executeCRUDRequestInterface{
    (apiServerUrl: string, apiKey: string, teamId: any, appName: string, method: string, data: any, headers?: any): any
  }
  
  export var executeRequest: executeRequestInterface;
  export var executeCRUDRequest: executeCRUDRequestInterface;
}
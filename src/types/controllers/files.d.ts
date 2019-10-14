declare class Files {
  constructor(config: any)

  apiServerUrl: string
  apiKey: string
  teamId: string

  getFile(recordId: string, responseType: any): any
  uploadFile(fileName: string, contentType: string, data: any): any
  deleteFile(recordId: string): any
  getFileName(recordId: string): any
}

export = Files
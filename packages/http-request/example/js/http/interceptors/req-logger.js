export class ReqLogger {
  onRequest(config) {
    console.info("REQ LOG: ===> ", JSON.stringify(config))

    return config
  }
}

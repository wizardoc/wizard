export class ResErrorCatcher {
  catchRes(err) {
    console.info("Error: ", err)

    throw err
  }
}

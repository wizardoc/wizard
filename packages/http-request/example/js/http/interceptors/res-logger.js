export class ResLogger {
  onResponse(res){
    // The res is an raw Axios response, so if u wanna get data when u using it,
    // u need to return data of res from res interceptor
    return res.data
  }
}

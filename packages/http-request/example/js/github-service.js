import {http} from './http/http-service'

export class GitHubService {
  getUserDetail(name) {
    return http.get(`/users/${name}`)
  }

  // Request to an incorrect addr
  async getWhatever() {
    const res = await http.get('/foo')

    res.expect(() => "This addr cannot be reached!").success(() => "impossible!")
  }
}

import {GitHubService} from "./github-service"

const githubService = new GitHubService()

async function main(){
  const MOCK_USERNAME = "youncccat"
  const res = await githubService.getUserDetail(MOCK_USERNAME)

  const {data:avatarURL} = res.expect(() => `Cannot access ${MOCK_USERNAME} information`).pipe(data => data?.avatar_url)

  console.info(`${MOCK_USERNAME}'s avatar is ${avatarURL}`)
}

main();

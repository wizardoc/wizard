import {GitHubService} from './github-service';

const MOCK_USERNAME = 'youncccat';

async function main() {
  // The service might inject in class as well as bound a certain variable using
  // DI lib that implemented by metadata in particular condition
  const githubService = new GitHubService();
  const res = await githubService.getUserDetail(MOCK_USERNAME);

  const {data: avatarURL} = res
    .expect(() => `Cannot access ${MOCK_USERNAME} information`)
    .pipe(data => data?.avatar_url);

  console.info(`${MOCK_USERNAME}'s avatar is ${avatarURL}`);
}

main();

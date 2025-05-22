import { UserSchema, RepositorieSchema } from './schema/UserSchema';

let users = [];

async function getUserGitHub(userName): Promise<UserSchema> {
  const res = await fetch(`https://api.github.com/users/${userName}`);
  const user = await res.json();

  if (!user) throw new Error('Not found');

  const userObj = {
    id: user.id,
    login: user.login,
    name: user.name,
    bio: user.bio,
    public_repos: user.public_repos,
    repos_url: user.repos_url,
  };

  users.push(userObj);
  console.log('\n--- Usuário ---');
  console.log(users);
  return userObj;
}

async function getRepositories(userLogin: string): Promise<void> {
  const user = users.find((u) => u.login === userLogin);

  if (!user) {
    throw new Error('User not found');
  }

  const res = await fetch(user.repos_url);
  const repositories = await res.json();

  if (!repositories) {
    throw new Error('Repositorie Not found');
  }

  console.log('\n--- Repositórios públicos ---');
  repositories.forEach((repo: any, index: number) => {
    console.log(`\n[${index + 1}] ${repo.name}`);
    console.log(`Descrição: ${repo.description ?? 'Sem descrição'}`);
    console.log(`fork: ${repo.fork}`);
    console.log(`Stars: ${repo.stargazers_count}`);
  });
}

async function sumRepositories(): Promise<void> {
  const sumRepo = users.reduce((soma, user) => {
    return soma + user.public_repos;
  }, 0);

  console.log(`Total de repositórios: ${sumRepo}`);
}

async function allUsers(): Promise<void> {
  const allUsers = users.map((user) => {
    return `${user.name}`;
  });

  console.table(allUsers);
}

async function topFive(): Promise<void> {
  const top5 = users
    .sort((a, b) => b.public_repos - a.public_repos)
    .slice(0, 5);

  console.log(top5);
}

async function run() {
  try {
    await getUserGitHub('juliohtm08');
    await getUserGitHub('RoblesQA');

    await getRepositories('juliohtm08');
    await sumRepositories();
    await allUsers();
    await topFive();
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

run();

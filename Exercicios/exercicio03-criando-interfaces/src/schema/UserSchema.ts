export interface UserSchema {
  id: number;
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  repos_url: string;
}

export interface RepositorieSchema {
  name: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
}

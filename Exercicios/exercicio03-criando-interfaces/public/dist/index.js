var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let users = [];
function getUserGitHub(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.github.com/users/${userName}`);
        const user = yield res.json();
        if (!user)
            throw new Error('Not found');
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
    });
}
function getRepositories(userLogin) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = users.find((u) => u.login === userLogin);
        if (!user) {
            throw new Error('User not found');
        }
        const res = yield fetch(user.repos_url);
        const repositories = yield res.json();
        if (!repositories) {
            throw new Error('Repositorie Not found');
        }
        console.log('\n--- Repositórios públicos ---');
        repositories.forEach((repo, index) => {
            var _a;
            console.log(`\n[${index + 1}] ${repo.name}`);
            console.log(`Descrição: ${(_a = repo.description) !== null && _a !== void 0 ? _a : 'Sem descrição'}`);
            console.log(`fork: ${repo.fork}`);
            console.log(`Stars: ${repo.stargazers_count}`);
        });
    });
}
function sumRepositories() {
    return __awaiter(this, void 0, void 0, function* () {
        const sumRepo = users.reduce((soma, user) => {
            return soma + user.public_repos;
        }, 0);
        console.log(`Total de repositórios: ${sumRepo}`);
    });
}
function allUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = users.map((user) => {
            return `${user.name}`;
        });
        console.table(allUsers);
    });
}
function topFive() {
    return __awaiter(this, void 0, void 0, function* () {
        const top5 = users
            .sort((a, b) => b.public_repos - a.public_repos)
            .slice(0, 5);
        console.log(top5);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield getUserGitHub('juliohtm08');
            yield getUserGitHub('RoblesQA');
            yield getRepositories('juliohtm08');
            yield sumRepositories();
            yield allUsers();
            yield topFive();
        }
        catch (error) {
            console.error('Erro:', error.message);
        }
    });
}
run();
export {};

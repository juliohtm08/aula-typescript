/*

1. Uma função que recebe um **nome de usuários do GitHub** e realiza uma **requisição GET** para obter os dados dele através da API pública do GitHub
    1. a requisição deve ser feita através da seguinte url: [**https://api.github.com/users/](https://api.github.com/users/juliohtm08)<nome_do_usuario>**
    2. Dica: utiliza a própria **API fetch** do javascript
    3. Dica: ao usar **o fetch o retorno será  uma Response**(pode ser percebido com a ajuda do TypeScript) que ainda **precisa ser convertida para json**. Isso pode ser obtido com a ajuda do **método .json()**, que retorna uma Promise
    4. De todos os dados retornados nós utilizaremos apenas os seguintes: **id(numer), login(string), name(string), bio(string), public_repos(number), repost_url(string)**
    5. Dica: para validação, caso o usuário não seja encontrado no github o retorna da api será um objeto { message: ‘Not Found’}
    6. O usuário retornado **deverá ser salvo em uma lista** que conterá todos os usuários

*/
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield getUserGitHub('juliohtm08');
            yield getRepositories('juliohtm08');
        }
        catch (error) {
            console.error('Erro:', error.message);
        }
    });
}
run();
export {};

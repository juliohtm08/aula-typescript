const users = [];
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    if (user.message) {
        console.log('Usuário não encontrado');
    }
    users.push(user);
    console.log(`O usuário ${user.login} foi salvo.\n` +
        `\nid: ${user.id}` +
        `\nlogin: ${user.login}` +
        `\nNome: ${user.name}` +
        `\nBio: ${user.bio}` +
        `\nRepositórios públicos: ${user.public_repos}`);
}
async function showUser(username) {
    const user = users.find((user) => user.login === username);
    if (typeof user === 'undefined') {
        console.log('usuário não encontrado');
    }
    const response = await fetch(user.repos_url);
    const repos = await response.json();
    let message = `id: ${user.id}\n` +
        `\nlogin: ${user.login}` +
        `\nNome: ${user.name}` +
        `\nBio: ${user.bio}` +
        `\nRepositórios públicos: ${user.public_repos}`;
    repos.forEach((repo) => {
        message +=
            `\nNome: ${repo.name}` +
                `\nDescrição: ${repo.description}` +
                `\nEstrelas: ${repo.stargazers_count}` +
                `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`;
    });
    console.log(message);
}
function showAllUsers() {
    let message = 'Usuaários \n';
    users.forEach((user) => {
        message += `\n-  ${user.login}`;
    });
    console.log(message);
}
function showReposTotal() {
    const reposTotal = users.reduce((acc, user) => acc + user.public_repos, 0);
    console.log(`O grupo possui um total de ${reposTotal} repositórios públicos!`);
}
function showTopFive() {
    const topFive = users
        .slice()
        .sort((a, b) => b.public_repos - a.public_repos)
        .slice(0, 5);
    let message = 'Top 5 usuários com mais repositórios públicos:\n';
    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios`;
    });
    console.log(message);
}
async function run() {
    try {
        await fetchUser('juliohtm08');
        await fetchUser('jpsilvaterra');
        await fetchUser('RoblesQA');
        await fetchUser('guilhermebergamo');
        await fetchUser('FelipeCavichiolliSilvestre');
        await showUser('juliohtm08');
        await showUser('jpsilvaterra');
        await showUser('RoblesQA');
        await showUser('guilhermebergamo');
        await showUser('FelipeCavichiolliSilvestre');
        showAllUsers();
        showReposTotal();
        showTopFive();
    }
    catch (error) {
        throw new Error(error);
    }
}
run();

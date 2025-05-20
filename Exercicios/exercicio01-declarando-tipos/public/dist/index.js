const spaceships = [];
function addSpaceship(name, pilot, crewLimit) {
    const spaceShip = {
        name,
        pilot,
        crewLimit,
        crew: [],
        inMission: false,
    };
    spaceships.push(spaceShip);
    alert(`A nave ${spaceShip.name} foi registrada`);
}
function findSpaceship(name) {
    let spaceShip;
    spaceShip = spaceships.find((ship) => ship.name === name);
    return spaceShip;
}
function addCrewMember(member, spaceShip) {
    if (spaceShip.crew.length >= spaceShip.crewLimit) {
        alert(`${member} não pode ser adicionado. Limite atingido`);
    }
    spaceShip.crew.push(member);
    alert(`${member} foi adicionado a tripulação de ${spaceShip.name}`);
}
function sendInMission(spaceShip) {
    if (spaceShip.inMission) {
        alert(`${spaceShip.name} já está em uma missão`);
    }
    else if (spaceShip.crew.length < Math.floor(spaceShip.crewLimit / 3)) {
        alert(`${spaceShip.name} não pode ser enviada. Tripulação insuficiente`);
    }
    spaceShip.inMission = true;
    alert(`${spaceShip.name} enviada para a missão`);
}
function firstMenuOption() {
    const name = prompt('Qual é o nome da nave a ser registrada?');
    const pilot = prompt(`Qual é o nome do piloto da ${name}`);
    const crewLimit = Number.parseInt(prompt(`Quantos tripulantes a ${name} suporta?`));
    const confirmation = confirm(`Confirma o registro da nave ${name}?\nPiloto: ${pilot}\nTamanho da Tripulação: ${crewLimit}`);
    if (confirmation) {
        addSpaceship(name, pilot, crewLimit);
    }
}
function secondMenuOption() {
    const member = prompt('Qual é o nome do tripulante?');
    const spaceshipName = prompt(`Para qual nave ${member} deverá ser designado?`);
    const spaceship = findSpaceship(spaceshipName);
    if (spaceship) {
        const confirmation = confirm(`Confirma a inclusão de ${member} na tripulação da ${spaceship.name}?`);
        if (confirmation) {
            addCrewMember(member, spaceship);
        }
    }
}
function thirdMenuOption() {
    const spaceshipName = prompt('Qual é o nome da nave a ser enviada?');
    const spaceship = findSpaceship(spaceshipName);
    if (spaceship) {
        const confirmation = confirm(`Confirma e envio da ${spaceship.name} na missão?`);
        if (confirmation) {
            sendInMission(spaceship);
        }
    }
}
function fourthMenuOption() {
    let list = 'Naves Registradas:\n';
    spaceships.forEach((spaceship) => {
        list += `
      Nave: ${spaceship.name}
      Piloto: ${spaceship.pilot}
      Em missão? ${spaceship.inMission ? 'Sim' : 'Não'}
      Tamanho Máximo da Triuplação: ${spaceship.crewLimit}
      Tripulantes: ${spaceship.crew.length}
    `;
        spaceship.crew.forEach((member) => {
            list += `    - ${member}\n`;
        });
    });
    alert(list);
}
/**
 * Menu
 */
let userOption = 0;
while (userOption !== 5) {
    const menu = `Painel Principal
    1 - Registrar uma nova nave
    2 - Adicionar membro da tripulação
    3 - Enviar nave em missão
    4 - Listar naves registradas
    5 - Encerrar
  `;
    userOption = Number.parseInt(prompt(menu));
    switch (userOption) {
        case 1:
            firstMenuOption();
            break;
        case 2:
            secondMenuOption();
            break;
        case 3:
            thirdMenuOption();
            break;
        case 4:
            fourthMenuOption();
            break;
        case 5:
            alert('Encerrando o sistema...');
            break;
        default:
            alert('Opção inválida! Retornando ao painel principal...');
            break;
    }
}

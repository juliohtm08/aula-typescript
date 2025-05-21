// Lista que armazena todos os planetas registrados
const planets = [];
// Enum que define os possíveis status de um planeta
var planetStatus;
(function (planetStatus) {
    planetStatus["habitado"] = "habitado";
    planetStatus["habitavel"] = "habitavel";
    planetStatus["inabitavel"] = "inabitavel";
    planetStatus["inexplorado"] = "inexplorado";
})(planetStatus || (planetStatus = {}));
// Busca um planeta pelo nome na lista `planets`
function findPlanet(name) {
    const planet = planets.find((p) => p.name === name);
    return planet;
}
// Salva um planeta novo na lista `planets`
function savePlanet(planet) {
    var _a;
    const planetObj = {
        name: planet.name,
        coordinates: planet.coordinates,
        status: planet.status,
        satellites: (_a = planet.satellites) !== null && _a !== void 0 ? _a : [], // Garante que sempre será um array
    };
    planets.push(planetObj);
    console.log(`O planeta ${planetObj.name} foi salvo com sucesso!`);
}
// Atualiza o status de um planeta, caso ele seja encontrado
function updateStatus(name, status) {
    const planet = findPlanet(name);
    if (!planet) {
        alert('Planeta não encontrado');
        return;
    }
    planet.status = planetStatus[status];
    alert(`status do planeta ${name} atualizado para ${planet.status}`);
}
// Adiciona um satélite a um planeta, caso ele exista
function addSatellite(name, satellite) {
    const planet = findPlanet(name);
    if (!planet) {
        alert('Planeta não encontrado');
        return;
    }
    planet.satellites.push(satellite); // Adiciona o novo satélite
    alert(`O planeta ${name} teve um novo satélite ${satellite}`);
}
// Remove um satélite específico de um planeta, caso ele exista
function removeSatellite(name, satellite) {
    const planet = findPlanet(name);
    if (!planet) {
        alert('Planeta não encontrado');
        return;
    }
    const index = planet.satellites.indexOf(satellite);
    if (index !== -1) {
        planet.satellites.splice(index, 1); // Remove o satélite pelo índice
        alert(`Satélite ${satellite} removido`);
    }
    else {
        alert(`Satélite ${satellite} não encontrado no planeta ${name}`);
    }
}
// Exibe uma lista de todos os planetas registrados e seus dados
function listPlanets() {
    let list = 'Planetas registrados: \n';
    planets.forEach((planet) => {
        list += `
      Planeta: ${planet.name}
      Coordenadas: ${planet.coordinates}
      status: ${planet.status}
      satellites: ${planet.satellites.length}
    `;
        planet.satellites.forEach((satellite) => {
            list += `    - ${satellite}\n`; // Lista individual de satélites
        });
    });
    alert(list);
}
// Primeira opção do menu: registrar um novo planeta
function firstMenuOption() {
    const name = prompt('Qual é o nome do planeta?');
    const coordInput = prompt('Quais são suas coordenadas? formato: w,x,y,z');
    // Converte a string de coordenadas para array de números
    const coordinates = coordInput.split(',').map(Number);
    const status = prompt('Qual seu status? (habitado, habitavel, inabitavel ou inexplorado)');
    // Confirma os dados com o usuário antes de salvar
    const confirmation = confirm(`Confirme os dados:
    Planeta: ${name},
    coordenadas: ${coordinates.join(', ')},
    status: ${status}
    `);
    if (confirmation) {
        savePlanet({ name, coordinates, status: planetStatus[status] });
    }
}
// Segunda opção do menu: atualizar status de um planeta
function secondMenuOption() {
    const name = prompt('Qual o nome do planeta que deseja atualizar o status?');
    const status = prompt('Qual o novo status do planeta? (habitado, habitavel, inabitavel ou inexplorado)');
    const confirmation = confirm(`Confirma as alterações?
    Planeta: ${name},
    status: ${status}
    `);
    if (confirmation) {
        updateStatus(name, status);
    }
}
// Terceira opção do menu: adicionar satélite a um planeta
function thirdMenuOption() {
    const name = prompt('Qual o nome do planeta que deseja adicionar um satélite?');
    const satellite = prompt('Qual o nome do satélite?');
    const confirmation = confirm(`confirma os seguintes dados?
    planeta: ${name}
    satélite: ${satellite}
    `);
    if (confirmation) {
        addSatellite(name, satellite);
    }
    console.log(planets); // Log de debug (pode ser removido em produção)
}
// Quarta opção do menu: remover satélite de um planeta
function fourthMenuOption() {
    const name = prompt('Qual o nome do planeta que deseja remover um satélite?');
    const satellite = prompt('Qual o nome do satélite?');
    const confirmation = confirm(`confirma os seguintes dados?
    planeta: ${name}
    remover satélite: ${satellite}
    `);
    if (confirmation) {
        removeSatellite(name, satellite);
    }
}
// Quinta opção do menu: listar todos os planetas
function fifthMenuOption() {
    listPlanets();
}
/**
 * Menu principal com laço de repetição até o usuário escolher encerrar
 */
let userOption = 0;
while (userOption !== 5) {
    const menu = `Painel Principal
    1 - Registrar um novo planeta
    2 - Atualizar status do planeta
    3 - Adicionar satélite
    4 - Remover satélite
    5 - Listar planetas
    6 - Encerrar
  `;
    userOption = Number.parseInt(prompt(menu));
    // Redireciona o usuário para a função correspondente com base na opção
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
            fifthMenuOption();
            break;
        case 6:
            alert('Encerrando o sistema...');
            break;
        default:
            alert('Opção inválida! Retornando ao painel principal...');
            break;
    }
}

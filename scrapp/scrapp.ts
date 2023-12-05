let dataMatrix: any[][];

dataMatrix = [
  ["0", "1442", "4614", "4725", "4532", "1567", "1508", "4611", "4531", "0535", "4405", "3480", "1156"],
  ["Rua da pedra", "Avenida General Osório", "Rua Brigadeiro Faria Lima", "Rua Pedro Noveleto", "Avenida Washington", "Avenida Sabugo de Milho"],
  ["Campinas", "Sumaré", "Hortolândia", "Americana", "Nova Odessa", "Caraguatatuba", "Mauá"],
  ["São Paulo", "Rio de Janeiro", "Mato Grosso do Sul", "Minas Gerais", "Paraiba"],
  ["000340645", "000179872", "000439386", "000514657", "000993181", "000633740"],
  [60, 70, 80, 90, 100, 110, 120, 300],
  [1, 2, 3, 4],
  [1, 2, 3],
  ["Casa incrível", "Antiga casa do Luciano Huck", "Casa das primas", "Casa de rico", "Casa de pobre", "Casa grande", "Casa bonita", "Casa do Caio"]
];

function scrapp(): string[] {
  let addr: string[] = [];
  dataMatrix.forEach((element) => {
    var ret = getRandomElement(element);
    addr.push(ret.toString());
  });
  return addr;
}

function getRandomAddress(): string {
  return dataMatrix.map(getRandomElement).join("");
}

function getRandomElement(array: any[]): any {
  return array[Math.floor(Math.random() * array.length)];
}

const result = scrapp();
console.log(result);

export { scrapp };

var Numero = ["0", "1442", "4614", "4725", "4532", "1567", "1508", "4611", "4531", "0535", "4405", "3480", "1156"];
var Nome = ["Rua da pedra", "Avenida General Osório", "Rua Brigadeiro Faria Lima", "Rua Pedro Noveleto", "Avenida Washington", "Avenida Sabugo de Milho"];
var Cidade = ["Campinas", "Sumaré", "Hortolândia", "Americana", "Nova Odessa", "Caraguatatuba", "Mauá"];
var Estado = ["São Paulo", "Rio de Janeiro", "Mato Grosso do Sul", "Minas Gerais", "Paraiba"];
var Cep = ["000340645", "000179872", "000439386", "000514657", "000993181", "000633740"];

var template = [Numero, " ", Nome, ", ", Cidade, " ", Estado, ", ", Cep];

 function getRandomAddress() {
  return template.map(getRandomElement).join("");
}

 function getRandomElement(array) {
  if (array instanceof Array) return array[Math.floor(Math.random() * array.length)];
  else return array;
}

console.log(getRandomAddress())
window.addEventListener("load", function(event) {

  //Declarando e inicializando variáveis.
  
  let listaTotal = [];
  let limite = 0;
  let peso = 0;
  let idAnterior = '';

  //Coletando todos os elementos com as respectivas classes 'graves','medio' e 'leve'

  const sintomasGraves = document.getElementsByClassName('grave');
  const sintomasMedio = document.getElementsByClassName('medio');
  const sintomasLeves = document.getElementsByClassName('leve')

  //Criando uma lista com os elementos coletados para cada grau de sintoma

  const listaGraves = [...sintomasGraves];
  const listaMedio = [...sintomasMedio];
  const listaLeves = [...sintomasLeves];

  //Agrupando as 3 listas coletadas em uma só para facilitar a adição do evento de click

  listaTotal.push(listaGraves,listaMedio,listaLeves);

  //Varrendo cada posição da lista total que contém as 3 listas, varrendo elas também, para adicionar o evento de click em todos os elementos de uma só  vez.

  listaTotal.forEach(sintomas => sintomas.forEach(sintoma => sintoma.onclick = (e) => incrementarLimite(e)))

  const incrementarLimite = (e) => {
    //Pegando o id do elemento clicado.
    const idAtual = e.target.id;

    //Pegando a classe do elemento clicado.
    const classeAtual = e.target.classList[1];

    //Passando a classe do elemento  como parâmetro para a função.
    adicionandoPesoDoElemento(classeAtual);

    //Passando o ID do elemento clicado atualmente para a função.    
    adicionaOuRetiraIncremento(idAtual);

    //Função que realiza o diagnóstico.
    diagnosticoFinal();
  }

  const adicionandoPesoDoElemento = (classeAtual) => {
    switch(classeAtual){
      case 'grave':
        peso = 3;
        break;
      case 'medio':
        peso = 2;
        break;
      case 'leve':
        peso = 1;
        break;
      default: null;

    }
    
  }

  const alteraCorDeFundo = (classeAtual) => {
    switch(classeAtual){
      case 'grave':
        peso = 3;
        break;
      case 'medio':
        peso = 2;
        break;
      case 'leve':
        peso = 1;
        break;
      default: null;

    }
  }

  const adicionaOuRetiraIncremento = (idAtual) => {

    if(idAnterior !== idAtual){
      limite = limite + peso;
      idAnterior = idAtual;
    }else {
      limite = limite - peso;
      idAnterior = '';
    }
  }

  const diagnosticoFinal = () => {

    if(limite >= 3 ){
      alert('COVID-19 DETECTED, RUN BRO');
      reiniciar();
      
    }
  }

  const reiniciar = () => {
    limite = 0;
    idAnterior = '';
  }

});
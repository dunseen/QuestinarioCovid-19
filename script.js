window.addEventListener("load", function(event) {

  //Declarando e inicializando variáveis.
  
  let listaTotal = [];
  let limite = 0;
  let peso = 0;
  let idAnterior = '';
  let titulo = '';
  let texto ='';
  let texto2 = '';
  let texto3 = '';

  //Coletando todos os elementos com as respectivas classes 'graves','medio' e 'leve'

  const sintomasGraves = document.getElementsByClassName('grave');
  const sintomasMedio = document.getElementsByClassName('medio');
  const sintomasLeves = document.getElementsByClassName('leve');


  const modalDiagnostico = document.getElementById('diagnostico-modal');
  const tituloDoModal = document.getElementById('diagnostico-titulo');
  const textoDoModal = document.getElementById('diagnostico-paragrafo');
  const texto2DoModal = document.getElementById('diagnostico-paragrafo2');
  const texto3DoModal = document.getElementById('diagnostico-paragrafo3');
  const iconeDoHeader = document.getElementById('icon');

  const botaoReiniciar = document.getElementById('reiniciar');
  const botaoFinalizar = document.getElementById('finalizar');



  

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
    adicionandoPesoDoElemento(classeAtual,idAtual);

    //Passando o ID do elemento clicado atualmente para a função.    
    adicionaOuRetiraIncremento(idAtual);

    alteraCorDeFundoETexto(classeAtual,idAtual)

    //Função que realiza o diagnóstico.
    
   diagnosticoFinal(classeAtual);
  }

  const adicionandoPesoDoElemento = (classeAtual,idAtual) => {

    if(classeAtual === 'grave'){
      peso = 3;
    }else if(classeAtual === 'medio' || idAtual === 'falta-de-ar'){
      peso = 2;
    }else {
      peso = 1;
    }
  
    
  }

  const alteraCorDeFundoETexto = (classeAtual,idAtual) => {
    let elementoAtual = document.getElementById(idAtual);
    elementoAtual.style.color = '#fff';

    if(classeAtual === 'grave'){
      elementoAtual.style.background = "#c93030";
    }else if(classeAtual === 'medio' || idAtual === 'falta-de-ar'){
      elementoAtual.style.background = "burlywood";
    }else {
      elementoAtual.style.background = "#00ace6";
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

  const diagnosticoFinal = (classeAtual) => {
   
    if(limite >= 3 ){
      titulo = 'DIAGNÓSTICO DE COVID-19';
      texto = 'rtPCR não é necessário para diagnóstico';
      texto2 = 'Iniciar tratamento';

      adicionaTexto(titulo,texto,texto2,texto3);
      modalDiagnostico.style.display = "block";
      iconeDoHeader.className = "fas fa-virus"
    }
  }
   
  const diagnosticoFinalOnClick = () => {
    if(limite === 2){
      titulo = 'COVID-19 PROVÁVEL';
      texto = 'rtPCR é necessário em todos os casos';
      texto2 = 'Iniciar tratamento sem rtPCR se alto risco';
      texto3 = 'Repetir rtPCR após 03 dias se negativo';

      iconeDoHeader.className = "fas fa-frown"
    }else {
      titulo = 'COVID-19 POSSÍVEL';
      texto = 'rtPCR é necessário para alto risco';
      texto2 = 'Esperar pelo rtPCR para inicar tratamento';
      texto3 = 'rtPCR negative = COVID-19 excluído (caso não ocorram novos sintomas)';

      iconeDoHeader.className = "fas fa-user-md"
    }
    adicionaTexto(titulo,texto,texto2,texto3);
    modalDiagnostico.style.display = "block";
  }
  


  const adicionaTexto = (titulo,texto,texto2,texto3) => {
    tituloDoModal.innerHTML = titulo;
    textoDoModal.innerHTML = texto;
    texto2DoModal.innerHTML = texto2;
    texto3DoModal.innerHTML = texto3;

  }


  botaoFinalizar.onclick = () => {
    if(limite !== 0){
      diagnosticoFinalOnClick()
    }else {
      alert('Selecione ao menos um sintoma.')
    }
  }
 

  botaoReiniciar.onclick = () => {
    window.location.reload();
  }

});
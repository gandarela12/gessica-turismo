/**
 * ============================================================
 * GESSICA TURISMO - SCRIPT PRINCIPAL
 *
 * Este arquivo controla 3 funcionalidades:
 * 1. Menu hambúrguer (abrir/fechar no mobile)
 * 2. Envio do formulário de orçamento via WhatsApp
 * 3. Scroll suave ao clicar em links de âncora (#)
 * ============================================================
 */

// Aguarda o carregamento completo do HTML antes de executar o código
document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. MENU HAMBÚRGUER (MOBILE)
     Ao clicar no botão de 3 barras, o menu abre/fecha
     ============================================================ */

  // Seleciona o botão hambúrguer e o menu de navegação
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.header nav');

  // Verifica se os elementos existem na página
  if (menuToggle && nav) {

    // Ao clicar no botão hambúrguer, alterna as classes:
    // - "active" no botão: transforma as 3 barras em um X (via CSS)
    // - "open" no nav: mostra o menu dropdown (via CSS)
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Ao clicar em qualquer link do menu, fecha o menu automaticamente
    // Isso é importante no mobile para que o menu não fique aberto após navegar
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');  // Remove o X do botão
        nav.classList.remove('open');            // Esconde o menu
      });
    });
  }

  /* ============================================================
     2. FORMULÁRIO DE ORÇAMENTO → WHATSAPP
     Ao enviar o formulário, monta uma mensagem e abre o WhatsApp
     ============================================================ */

  // Seleciona o formulário de orçamento pelo ID
  var form = document.getElementById('orcamento-form');

  // Verifica se o formulário existe na página
  if (form) {

    // Intercepta o envio do formulário
    form.addEventListener('submit', function (e) {
      // Previne o comportamento padrão (recarregar a página)
      e.preventDefault();

      // Captura e limpa espaços em branco dos campos obrigatórios
      var nome = document.getElementById('nome').value.trim();
      var telefone = document.getElementById('telefone').value.trim();

      // Validação: nome e telefone são obrigatórios
      if (!nome || !telefone) {
        alert('Por favor, preencha seu nome e telefone.');
        return; // Interrompe o envio se faltar dados
      }

      // Captura os valores dos demais campos do formulário
      var passeio = document.getElementById('passeio-select');
      var ida = document.getElementById('ida').value;
      var volta = document.getElementById('volta').value;
      var adulto = document.getElementById('adulto').value;
      var crianca = document.getElementById('crianca').value;
      var observacoes = document.getElementById('observacoes').value.trim();

      // Monta a mensagem que será enviada pelo WhatsApp
      var msg = 'Olá! Gostaria de fazer um orçamento.\n\n';
      msg += 'Nome: ' + nome + '\n';
      msg += 'Telefone: ' + telefone + '\n';
      // Pega o texto visível da opção selecionada (não o value)
      msg += 'Passeio: ' + passeio.options[passeio.selectedIndex].text + '\n';
      // Adiciona datas apenas se foram preenchidas
      if (ida) msg += 'Ida: ' + ida + '\n';
      if (volta) msg += 'Volta: ' + volta + '\n';
      msg += 'Adultos: ' + adulto + '\n';
      msg += 'Crianças: ' + crianca + '\n';
      // Adiciona observações apenas se foram preenchidas
      if (observacoes) msg += 'Observações: ' + observacoes + '\n';

      // Monta a URL do WhatsApp com o número da Gessica Turismo
      // encodeURIComponent() codifica caracteres especiais para a URL
      var whatsappUrl = 'https://wa.me/5573981473188?text=' + encodeURIComponent(msg);

      // Abre o WhatsApp em uma nova aba do navegador
      window.open(whatsappUrl, '_blank');
    });
  }

  /* ============================================================
     3. SCROLL SUAVE
     Ao clicar em links com âncora (#), a página rola suavemente
     até a seção correspondente ao invés de pular instantaneamente
     ============================================================ */

  // Seleciona todos os links que começam com "#" (âncoras internas)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

    // Adiciona um evento de clique em cada link de âncora
    anchor.addEventListener('click', function (e) {
      // Busca o elemento alvo pelo ID contido no href (ex: "#sobre" → elemento com id="sobre")
      var target = document.querySelector(this.getAttribute('href'));

      // Se o elemento alvo existir na página, faz o scroll suave
      if (target) {
        e.preventDefault(); // Previne o comportamento padrão de pular direto
        target.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até o elemento
      }
    });
  });
});

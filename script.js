document.addEventListener('DOMContentLoaded', function () {
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.header nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  var form = document.getElementById('orcamento-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome = document.getElementById('nome').value.trim();
      var telefone = document.getElementById('telefone').value.trim();

      if (!nome || !telefone) {
        alert('Por favor, preencha seu nome e telefone.');
        return;
      }

      var passeio = document.getElementById('passeio-select');
      var ida = document.getElementById('ida').value;
      var volta = document.getElementById('volta').value;
      var adulto = document.getElementById('adulto').value;
      var crianca = document.getElementById('crianca').value;
      var observacoes = document.getElementById('observacoes').value.trim();

      var msg = 'Olá! Gostaria de fazer um orçamento.\n\n';
      msg += 'Nome: ' + nome + '\n';
      msg += 'Telefone: ' + telefone + '\n';
      msg += 'Passeio: ' + passeio.options[passeio.selectedIndex].text + '\n';
      if (ida) msg += 'Ida: ' + ida + '\n';
      if (volta) msg += 'Volta: ' + volta + '\n';
      msg += 'Adultos: ' + adulto + '\n';
      msg += 'Crianças: ' + crianca + '\n';
      if (observacoes) msg += 'Observações: ' + observacoes + '\n';

      var whatsappUrl = 'https://wa.me/5573981473188?text=' + encodeURIComponent(msg);
      window.open(whatsappUrl, '_blank');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

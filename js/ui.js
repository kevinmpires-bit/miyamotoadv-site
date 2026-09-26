/* Miyamoto Advocacia — interações compartilhadas */
(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mensagem pronta no WhatsApp, conforme o contexto do link ou da página
  var article = document.querySelector('.artigo-hero__title');
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
    if (a.href.indexOf('text=') !== -1) return;
    var topic = a.getAttribute('data-wa');
    var msg;
    if (topic) {
      msg = 'Olá, Dr. Kevin. Vim pelo site e gostaria de falar sobre um caso de ' + topic + '.';
    } else if (article) {
      msg = 'Olá, Dr. Kevin. Li o artigo "' + article.textContent.trim() + '" no site e gostaria de conversar sobre o meu caso.';
    } else {
      msg = 'Olá, Dr. Kevin. Vim pelo site e gostaria de falar sobre um caso.';
    }
    a.href = a.href.split('?')[0] + '?text=' + encodeURIComponent(msg);
  });

  // Barra de progresso de leitura nos artigos
  var content = document.querySelector('.artigo-content');
  if (content && !reduced) {
    var bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var ticking = false;
    var update = function () {
      var r = content.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var p = Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1)));
      bar.style.transform = 'scaleX(' + p + ')';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // Botão flutuante some quando a seção de contato já está na tela
  var fab = document.querySelector('.wa, .whatsapp-fab');
  var contato = document.getElementById('contato');
  if (fab && contato && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      fab.classList.toggle('fab-hidden', es[0].isIntersecting);
    }, { threshold: 0.35 }).observe(contato);
  }

  // Ano atual no rodapé
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

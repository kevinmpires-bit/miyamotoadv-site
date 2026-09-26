function filterBlog(btn, category) {
  document.querySelectorAll('.blog-filter').forEach(function (b) {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');

  var shown = 0;
  document.querySelectorAll('#blog-grid .blog-card').forEach(function (card) {
    var match = category === 'todos' || card.getAttribute('data-category') === category;
    card.style.display = match ? '' : 'none';
    card.classList.remove('is-entering');
    if (match) {
      shown++;
      void card.offsetWidth;
      card.classList.add('is-entering');
    }
  });

  var count = document.getElementById('blog-count');
  if (count) count.textContent = shown + (shown === 1 ? ' artigo' : ' artigos');
}

// Dulces Momentos - Alfajores de Autor
// Plan Estándar: menú para celulares y año del pie de página.

(function () {
  // Menú en celulares
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('main-nav');

  if (btn && nav) {
    var icon = btn.querySelector('i');

    function setMenu(open) {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-xmark', open);
      }
    }

    btn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  // Año del pie de página
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
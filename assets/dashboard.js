document.querySelectorAll('nav.nav a.nav-item').forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('nav.nav a.nav-item').forEach(function (i) { i.classList.remove('active'); });
    item.classList.add('active');
    var frame = document.querySelector('main.app-frame iframe.content-frame');
    if (frame.getAttribute('src') !== item.getAttribute('data-page')) {
      frame.setAttribute('src', item.getAttribute('data-page'));
    }
  });
});

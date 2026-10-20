// Click any evidence thumbnail to view it full size.
(function () {
  var dlg = document.createElement('dialog');
  dlg.className = 'lb';
  dlg.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt=""><p></p>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector('img'), cap = dlg.querySelector('p');
  dlg.querySelector('button').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  document.querySelectorAll('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      img.src = t.dataset.full;
      img.alt = t.dataset.caption;
      cap.textContent = t.dataset.caption;
      if (dlg.showModal) dlg.showModal(); else window.open(t.dataset.full);
    });
  });
})();

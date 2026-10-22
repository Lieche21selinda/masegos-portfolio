// Click any evidence thumbnail to view it full size (images and videos).
(function () {
  var dlg = document.createElement('dialog');
  dlg.className = 'lb';
  dlg.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt=""><video controls playsinline hidden></video><p></p>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector('img'), vid = dlg.querySelector('video'), cap = dlg.querySelector('p');
  function close() { dlg.close(); }
  dlg.addEventListener('close', function () { vid.pause(); vid.removeAttribute('src'); vid.load(); });
  dlg.querySelector('button').addEventListener('click', close);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
  document.querySelectorAll('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      var isVideo = !!t.dataset.video;
      img.hidden = isVideo; vid.hidden = !isVideo;
      if (isVideo) { vid.src = t.dataset.video; img.removeAttribute('src'); }
      else { img.src = t.dataset.full; img.alt = t.dataset.caption; }
      cap.textContent = t.dataset.caption;
      if (dlg.showModal) { dlg.showModal(); if (isVideo) vid.play().catch(function () {}); }
      else window.open(isVideo ? t.dataset.video : t.dataset.full);
    });
  });
})();

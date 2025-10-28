// Demo JS: handles theme toggle and fake tracking responses
document.addEventListener('DOMContentLoaded', ()=> {
  const themeToggle = document.getElementById('themeToggle');
  const trackBtn = document.getElementById('trackBtn');
  const trackingInput = document.getElementById('trackingInput');
  const previewArea = document.getElementById('previewArea');
  const multiTrack = document.getElementById('multiTrack');
  const multiInput = document.getElementById('multiInput');
  const results = document.getElementById('results');
  const clearBtn = document.getElementById('clearBtn');

  // restore theme
  if(localStorage.getItem('theme') === 'light') document.body.classList.add('light');

  if(themeToggle){
    themeToggle.addEventListener('click', ()=> {
      document.body.classList.toggle('light');
      localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    });
  }

  function fakeApiResponse(tracking){
    // deterministic pseudo-random status using tracking string
    const statuses = ['Belgede onay', 'Gümrük işlemleri', 'Dağıtıma çıktı', 'Teslim edildi', 'Hedef ülkeye ulaştı'];
    const idx = (tracking.split('').reduce((s,c)=>s+c.charCodeAt(0),0) % statuses.length);
    return {
      id: tracking,
      status: statuses[idx],
      lastUpdate: new Date().toLocaleString('tr-TR'),
      history: [
        {where: 'Gönderici', when: '2025-10-01', state: 'Alındı'},
        {where: 'Merkez', when: '2025-10-03', state: 'Yolda'},
        {where: 'Gümrük', when: '2025-10-10', state: 'İşlemde'}
      ]
    };
  }

  function renderCard(data, container){
    const card = document.createElement('article');
    card.className = 'track-card card';
    card.innerHTML = `
      <h4>${data.id}</h4>
      <div class="meta">${data.status} · Son: ${data.lastUpdate}</div>
      <details style="margin-top:10px">
        <summary>Geçmişi göster</summary>
        <ul>
          ${data.history.map(h => `<li>${h.when} — ${h.where} — ${h.state}</li>`).join('')}
        </ul>
      </details>
    `;
    container.appendChild(card);
  }

  if(trackBtn){
    trackBtn.addEventListener('click', ()=> {
      const val = trackingInput.value.trim();
      if(!val) return alert('Lütfen bir kargo numarası girin.');
      previewArea.innerHTML = '';
      const data = fakeApiResponse(val);
      renderCard(data, previewArea);
    });
  }

  if(multiTrack){
    multiTrack.addEventListener('click', ()=> {
      const raw = multiInput.value.trim();
      if(!raw) return alert('Lütfen en az bir kargo numarası girin.');
      results.innerHTML = '';
      const list = raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
      list.forEach(id => {
        const d = fakeApiResponse(id);
        renderCard(d, results);
      });
    });
  }

  if(clearBtn){
    clearBtn.addEventListener('click', ()=> {
      if(multiInput) multiInput.value = '';
      if(results) results.innerHTML = '';
    });
  }
});

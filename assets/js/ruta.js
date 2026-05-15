    const slides = Array.from(document.querySelectorAll('.slide'));
    let currentSlide = 0;
    let mapInitialized = false;
    const locations = [
{name:"Centro Comercial Puerta del Norte - Bello",lat:6.3386,lng:-75.5446},
{name:"Centro Comercial Fabricato - Bello",lat:6.337,lng:-75.5603},
{name:"Estación Metro Niquía - Bello",lat:6.3376,lng:-75.5440},
{name:"Florida Parque Comercial - Medellín",lat:6.2766,lng:-75.57},
{name:"Centro Comercial La Central - Medellín",lat:6.2473,lng:-75.5515},
{name:"Centro Comercial Los Molinos - Medellín",lat:6.2311,lng:-75.6044},
{name:"Centro Comercial Premium Plaza - Medellín",lat:6.2315,lng:-75.5746},
{name:"Centro Comercial Aventura - Medellín",lat:6.2712,lng:-75.5654},
{name:"Estación Metro Acevedo - Medellín",lat:6.3006,lng:-75.5585},
{name:"Estación Metro San Antonio - Medellín",lat:6.2471,lng:-75.5689},
{name:"Centro Comercial Mayorca - Itagüí",lat:6.1652,lng:-75.6057},
{name:"Centro Comercial San Nicolás - Rionegro",lat:6.151,lng:-75.3741}
];

    function updateSlide() {
      slides.forEach((slide, index) => slide.classList.toggle('active', index === currentSlide));
      document.getElementById('prevBtn').disabled = currentSlide === 0;
      document.getElementById('nextBtn').disabled = currentSlide === slides.length - 1;
      document.getElementById('progressBar').style.width = ((currentSlide + 1) / slides.length) * 100 + '%';
      document.getElementById('slideCounter').textContent = `${currentSlide + 1} / ${slides.length}`;
      const activeTitle = slides[currentSlide].dataset.title || '';
      if (activeTitle === 'Ruta DOOH') setTimeout(initMap, 250);
    }
    function changeSlide(dir) {
      const next = currentSlide + dir;
      if (next >= 0 && next < slides.length) { currentSlide = next; updateSlide(); }
    }
    function goToSlide(index) { currentSlide = index; updateSlide(); toggleIndex(false); }
    function toggleIndex(force) {
      const modal = document.getElementById('indexModal');
      const open = typeof force === 'boolean' ? force : !modal.classList.contains('open');
      modal.classList.toggle('open', open);
    }
    function buildIndex() {
      const list = document.getElementById('indexList');
      slides.forEach((slide, i) => {
        const li = document.createElement('li');
        li.textContent = `${String(i+1).padStart(2,'0')} · ${slide.dataset.title}`;
        li.onclick = () => goToSlide(i);
        list.appendChild(li);
      });
    }
    function showMix(id, btn) {
      document.querySelectorAll('.mix-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.mix-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('mix-' + id).classList.add('active');
    }
    function toggleAcc(header) {
      const item = header.parentElement;
      item.classList.toggle('open');
      header.querySelector('.acc-icon').textContent = item.classList.contains('open') ? 'âˆ’' : '+';
    }

    function filterPrograms(priority, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      document.querySelectorAll('tr[data-priority]').forEach(row => {
        row.style.display = (priority === 'all' || row.dataset.priority === priority) ? '' : 'none';
      });
    }
    function initMap() {
      if (mapInitialized || typeof L === 'undefined') return;
      mapInitialized = true;
      const map = L.map('doohMap').setView([6.235, -75.56], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);
      const bounds = [];
      locations.forEach((loc, idx) => {
        const marker = L.marker([loc.lat, loc.lng]).addTo(map);
        marker.bindPopup(`<strong>${idx+1}. ${loc.name}</strong><br><a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name)}">Abrir en Google Maps</a>`);
        bounds.push([loc.lat, loc.lng]);
      });
      map.fitBounds(bounds, {padding:[30,30]});
    }

    const flowData = [
  {
    "sede": "Bello",
    "programa": "Técnico Laboral en Asistente Administrativo",
    "prioridad": "P2",
    "meta": 120,
    "inversion": 8.43,
    "cpl": 11703,
    "leads": 720,
    "metaAds": 5.77,
    "google": 1.18,
    "tiktok": 1.48,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Bello",
    "programa": "Técnico Laboral en Asistente en Desarrollo de Software",
    "prioridad": "P2",
    "meta": 90,
    "inversion": 2.88,
    "cpl": 5333,
    "leads": 540,
    "metaAds": 1.97,
    "google": 0.4,
    "tiktok": 0.51,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Bello",
    "programa": "Técnico Laboral en Asistente en Diseño Gráfico",
    "prioridad": "P3",
    "meta": 60,
    "inversion": 2.77,
    "cpl": 7686,
    "leads": 360,
    "metaAds": 1.89,
    "google": 0.39,
    "tiktok": 0.49,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Bello",
    "programa": "Técnico Laboral en Auxiliar de Seguridad Laboral",
    "prioridad": "P3",
    "meta": 60,
    "inversion": 2.91,
    "cpl": 8095,
    "leads": 360,
    "metaAds": 1.99,
    "google": 0.41,
    "tiktok": 0.51,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente Administrativo",
    "prioridad": "P1",
    "meta": 210,
    "inversion": 6.4,
    "cpl": 5082,
    "leads": 1260,
    "metaAds": 4.38,
    "google": 0.9,
    "tiktok": 1.12,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente como Desarrollo de Software",
    "prioridad": "P1",
    "meta": 315,
    "inversion": 10.84,
    "cpl": 5733,
    "leads": 1890,
    "metaAds": 7.41,
    "google": 1.52,
    "tiktok": 1.9,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente Administrativo-Fast Track",
    "prioridad": "P3",
    "meta": 70,
    "inversion": 2.13,
    "cpl": 5082,
    "leads": 420,
    "metaAds": 1.46,
    "google": 0.3,
    "tiktok": 0.37,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente como Desarrollo de Software- Fast Track",
    "prioridad": "P3",
    "meta": 70,
    "inversion": 2.41,
    "cpl": 5733,
    "leads": 420,
    "metaAds": 1.65,
    "google": 0.34,
    "tiktok": 0.42,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Comercio Internacional",
    "prioridad": "P2",
    "meta": 120,
    "inversion": 6.51,
    "cpl": 9034,
    "leads": 720,
    "metaAds": 4.45,
    "google": 0.91,
    "tiktok": 1.14,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Contaduría",
    "prioridad": "P1",
    "meta": 175,
    "inversion": 4.69,
    "cpl": 4464,
    "leads": 1050,
    "metaAds": 3.21,
    "google": 0.66,
    "tiktok": 0.82,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Desarrollo de Software (D)",
    "prioridad": "P3",
    "meta": 35,
    "inversion": 0.97,
    "cpl": 4615,
    "leads": 210,
    "metaAds": 0.66,
    "google": 0.14,
    "tiktok": 0.17,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Diseño de Modas",
    "prioridad": "P3",
    "meta": 50,
    "inversion": 1.2,
    "cpl": 4000,
    "leads": 300,
    "metaAds": 0.82,
    "google": 0.17,
    "tiktok": 0.21,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Diseño Gráfico",
    "prioridad": "P1",
    "meta": 210,
    "inversion": 7.49,
    "cpl": 5942,
    "leads": 1260,
    "metaAds": 5.12,
    "google": 1.05,
    "tiktok": 1.31,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Electromecánica",
    "prioridad": "P3",
    "meta": 75,
    "inversion": 2.47,
    "cpl": 5495,
    "leads": 450,
    "metaAds": 1.69,
    "google": 0.35,
    "tiktok": 0.43,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Logística de Centros de Distribución",
    "prioridad": "P3",
    "meta": 35,
    "inversion": 1.68,
    "cpl": 8000,
    "leads": 210,
    "metaAds": 1.15,
    "google": 0.24,
    "tiktok": 0.29,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Mercadeo",
    "prioridad": "P2",
    "meta": 105,
    "inversion": 3.76,
    "cpl": 5974,
    "leads": 630,
    "metaAds": 2.58,
    "google": 0.53,
    "tiktok": 0.66,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Producción Audiovisual",
    "prioridad": "P2",
    "meta": 90,
    "inversion": 2.97,
    "cpl": 5507,
    "leads": 540,
    "metaAds": 2.03,
    "google": 0.42,
    "tiktok": 0.52,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Producción Fotográfica",
    "prioridad": "P3",
    "meta": 50,
    "inversion": 0.9,
    "cpl": 3002,
    "leads": 300,
    "metaAds": 0.62,
    "google": 0.13,
    "tiktok": 0.16,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Auxiliar en Publicación de Contenidos Digitales",
    "prioridad": "P2",
    "meta": 90,
    "inversion": 4.31,
    "cpl": 7983,
    "leads": 540,
    "metaAds": 2.95,
    "google": 0.61,
    "tiktok": 0.76,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Arte Culinario",
    "prioridad": "P1",
    "meta": 208,
    "inversion": 5.23,
    "cpl": 4190,
    "leads": 1248,
    "metaAds": 3.58,
    "google": 0.73,
    "tiktok": 0.92,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Auxiliar Administrativo en Salud",
    "prioridad": "P2",
    "meta": 105,
    "inversion": 2.63,
    "cpl": 4170,
    "leads": 630,
    "metaAds": 1.8,
    "google": 0.37,
    "tiktok": 0.46,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Auxiliar de Talento Humano",
    "prioridad": "P1",
    "meta": 140,
    "inversion": 4.2,
    "cpl": 5000,
    "leads": 840,
    "metaAds": 2.87,
    "google": 0.59,
    "tiktok": 0.74,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Auxiliar en Enfermería",
    "prioridad": "P1",
    "meta": 150,
    "inversion": 3.6,
    "cpl": 4000,
    "leads": 900,
    "metaAds": 2.46,
    "google": 0.51,
    "tiktok": 0.63,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Auxiliar en Servicios Farmacéuticos",
    "prioridad": "P2",
    "meta": 105,
    "inversion": 2.83,
    "cpl": 4492,
    "leads": 630,
    "metaAds": 1.94,
    "google": 0.4,
    "tiktok": 0.5,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Pastelería y Arte Dulce",
    "prioridad": "P1",
    "meta": 182,
    "inversion": 3.28,
    "cpl": 3000,
    "leads": 1092,
    "metaAds": 2.24,
    "google": 0.46,
    "tiktok": 0.57,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Soporte de Sistemas Informáticos",
    "prioridad": "P3",
    "meta": 70,
    "inversion": 3.35,
    "cpl": 7981,
    "leads": 420,
    "metaAds": 2.29,
    "google": 0.47,
    "tiktok": 0.59,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Rionegro",
    "programa": "Técnico Laboral como Auxiliar Administrativo",
    "prioridad": "P2",
    "meta": 90,
    "inversion": 5.4,
    "cpl": 10000,
    "leads": 540,
    "metaAds": 3.7,
    "google": 0.76,
    "tiktok": 0.95,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Rionegro",
    "programa": "Técnico Laboral como Auxiliar en Diseño Gráfico",
    "prioridad": "P3",
    "meta": 75,
    "inversion": 2.99,
    "cpl": 6643,
    "leads": 450,
    "metaAds": 2.05,
    "google": 0.42,
    "tiktok": 0.52,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Rionegro",
    "programa": "Técnico Laboral en Auxiliar en Análisis y Desarrollo de Software",
    "prioridad": "P3",
    "meta": 75,
    "inversion": 3.29,
    "cpl": 7299,
    "leads": 450,
    "metaAds": 2.25,
    "google": 0.46,
    "tiktok": 0.58,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "Rionegro",
    "programa": "Técnico Laboral en Auxiliar en Comercio Internacional",
    "prioridad": "P3",
    "meta": 30,
    "inversion": 1.48,
    "cpl": 8215,
    "leads": 180,
    "metaAds": 1.01,
    "google": 0.21,
    "tiktok": 0.26,
    "split": {
      "Meta": 68,
      "Google": 14,
      "TikTok": 18
    }
  },
  {
    "sede": "General",
    "programa": "Campaña general de demanda",
    "prioridad": "P1",
    "meta": 0,
    "inversion": 24,
    "cpl": 4696,
    "leads": 5111,
    "metaAds": 0,
    "google": 14,
    "tiktok": 10,
    "split": {
      "Meta": 0,
      "Google": 58,
      "TikTok": 42
    }
  }
];
    function moneyM(value) {
      return '$' + value.toLocaleString('es-CO', {minimumFractionDigits: value >= 10 ? 1 : 2, maximumFractionDigits: value >= 10 ? 1 : 2}) + 'M';
    }
    function moneyCOP(value) { return '$' + Math.round(value).toLocaleString('es-CO'); }
    function dominantMedia(item) {
      const vals = {Meta:item.metaAds, Google:item.google, TikTok:item.tiktok};
      return Object.keys(vals).sort((a,b)=>vals[b]-vals[a])[0];
    }
    function populateFlowFilters() {
      const select = document.getElementById('flowSede');
      if (!select || select.dataset.ready) return;
      [...new Set(flowData.map(i => i.sede))].sort().forEach(sede => {
        const option = document.createElement('option'); option.value = sede; option.textContent = sede; select.appendChild(option);
      });
      select.dataset.ready = 'true';
    }
    function renderFlow() {
      populateFlowFilters();
      const container = document.getElementById('flowRows');
      if (!container) return;
      const q = (document.getElementById('flowSearch')?.value || '').toLowerCase().trim();
      const priority = document.getElementById('flowPriority')?.value || 'all';
      const sede = document.getElementById('flowSede')?.value || 'all';
      const dominant = document.getElementById('flowDominant')?.value || 'all';
      const filtered = flowData.filter(item => {
        const matchesQ = !q || (item.programa + ' ' + item.sede).toLowerCase().includes(q);
        const matchesP = priority === 'all' || item.prioridad === priority;
        const matchesS = sede === 'all' || item.sede === sede;
        const matchesD = dominant === 'all' || dominantMedia(item) === dominant;
        return matchesQ && matchesP && matchesS && matchesD;
      }).sort((a,b) => {
        const order = {P1:1,P2:2,P3:3};
        return order[a.prioridad] - order[b.prioridad] || b.inversion - a.inversion;
      });
      const totalInv = filtered.reduce((s,i)=>s+i.inversion,0);
      const totalLeads = filtered.reduce((s,i)=>s+i.leads,0);
      document.getElementById('flowTotalInv').textContent = moneyM(totalInv);
      document.getElementById('flowTotalLeads').textContent = totalLeads.toLocaleString('es-CO');
      document.getElementById('flowAvgCpl').textContent = totalLeads ? moneyCOP((totalInv*1000000)/totalLeads) : '$0';
      document.getElementById('flowCount').textContent = filtered.length;
      if (!filtered.length) { container.innerHTML = '<div class="flow-empty">No hay programas con esos filtros.</div>'; return; }
      container.innerHTML = filtered.map(item => {
        const max = Math.max(item.metaAds, item.google, item.tiktok, .01);
        const tagClass = item.prioridad === 'P1' ? 'green' : item.prioridad === 'P2' ? 'light' : 'gray';
        const mediaLine = (label, value) => `<div class="media-line"><span>${label}</span><div class="media-track"><div class="media-fill" style="width:${Math.max(4,(value/max)*100)}%"></div></div><span class="media-value">${moneyM(value)}</span></div>`;
        return `<div class="flow-row" data-flow-priority="${item.prioridad}">
          <div class="flow-program"><strong>${item.programa}</strong><small>${item.sede} · <span class="tag ${tagClass}">${item.prioridad}</span></small></div>
          <div class="flow-invest">${moneyM(item.inversion)}</div>
          <div class="media-stack">${mediaLine('Meta', item.metaAds)}${mediaLine('Google', item.google)}${mediaLine('TikTok', item.tiktok)}</div>
          <div class="flow-leads">${item.leads.toLocaleString('es-CO')}</div>
          <div class="flow-cpl">${moneyCOP(item.cpl)}</div>
        </div>`;
      }).join('');
    }



    const brandMonths = [
      {mes:'Abril', total:0, dooh:0, display:0, spotify:0, rol:'Sin pauta'},
      {mes:'Mayo', total:12.7, dooh:7.8, display:3.4, spotify:1.5, rol:'Arranque'},
      {mes:'Junio', total:12.7, dooh:7.8, display:3.4, spotify:1.5, rol:'Pico'},
      {mes:'Julio', total:4.4, dooh:3.1, display:1.3, spotify:0, rol:'Sostenimiento'},
      {mes:'Agosto', total:1.2, dooh:0.9, display:0.3, spotify:0, rol:'Cierre'}
    ];
    const brandScreensData = [
      {zona:'Bello', pantalla:'Centro Comercial Puerta del Norte', peso:2.5},
      {zona:'Bello', pantalla:'Centro Comercial Fabricato', peso:2.5},
      {zona:'Bello', pantalla:'Estación Metro Niquía', peso:2.5},
      {zona:'Medellín', pantalla:'Florida Parque Comercial', peso:2.2},
      {zona:'Medellín', pantalla:'Centro Comercial La Central', peso:2.2},
      {zona:'Medellín', pantalla:'Centro Comercial Los Molinos', peso:2.2},
      {zona:'Medellín', pantalla:'Centro Comercial Premium Plaza', peso:2.2},
      {zona:'Medellín', pantalla:'Centro Comercial Aventura', peso:2.2},
      {zona:'Medellín', pantalla:'Estación Metro Acevedo', peso:2.2},
      {zona:'Medellín', pantalla:'Estación Metro San Antonio', peso:2.2},
      {zona:'Itagüí', pantalla:'Centro Comercial Mayorca', peso:2.4},
      {zona:'Rionegro', pantalla:'Centro Comercial San Nicolás', peso:2.4}
    ];
    function renderBrandFlow() {
      const monthFilter = document.getElementById('brandMonth')?.value || 'all';
      const formatFilter = document.getElementById('brandFormat')?.value || 'all';
      const zoneFilter = document.getElementById('brandZone')?.value || 'all';
      const months = brandMonths.filter(m => monthFilter === 'all' || m.mes === monthFilter);
      const total = months.reduce((s,m)=>s+m.total,0);
      const dooh = months.reduce((s,m)=>s+m.dooh,0);
      const display = months.reduce((s,m)=>s+m.display,0);
      const spotify = months.reduce((s,m)=>s+m.spotify,0);
      const screens = brandScreensData.filter(i => zoneFilter === 'all' || i.zona === zoneFilter);
      const filteredTotal = formatFilter === 'DOOH' ? dooh : formatFilter === 'Display' ? display : formatFilter === 'Spotify' ? spotify : total;
      document.getElementById('brandTotal') && (document.getElementById('brandTotal').textContent = moneyM(filteredTotal));
      document.getElementById('brandDooh') && (document.getElementById('brandDooh').textContent = formatFilter === 'Display' || formatFilter === 'Spotify' ? '$0,0M' : moneyM(dooh));
      document.getElementById('brandDisplay') && (document.getElementById('brandDisplay').textContent = formatFilter === 'DOOH' || formatFilter === 'Spotify' ? '$0,0M' : moneyM(display));
      document.getElementById('brandSpotify') && (document.getElementById('brandSpotify').textContent = formatFilter === 'DOOH' || formatFilter === 'Display' ? '$0,0M' : moneyM(spotify));
      const monthContainer = document.getElementById('brandMonthRows');
      if (monthContainer) {
        monthContainer.innerHTML = months.map(m => {
          const baseTotal = m.total || 1;
          const doohW = formatFilter === 'Display' || formatFilter === 'Spotify' ? 0 : (m.dooh / baseTotal) * 100;
          const displayW = formatFilter === 'DOOH' || formatFilter === 'Spotify' ? 0 : (m.display / baseTotal) * 100;
          const spotifyW = formatFilter === 'DOOH' || formatFilter === 'Display' ? 0 : (m.spotify / baseTotal) * 100;
          const shownTotal = formatFilter === 'DOOH' ? m.dooh : formatFilter === 'Display' ? m.display : formatFilter === 'Spotify' ? m.spotify : m.total;
          return `<div class="brand-month-row"><strong>${m.mes}<br><span class="tag ${m.rol === 'Pico' ? 'light' : 'gray'}">${m.rol}</span></strong><div class="brand-month-track"><span class="dooh" style="width:${doohW}%"></span><span class="display" style="width:${displayW}%"></span><span class="spotify" style="width:${spotifyW}%"></span></div><small>${moneyM(shownTotal)}</small></div>`;
        }).join('') || '<div class="flow-empty">Sin datos para este filtro.</div>';
      }
      const screenContainer = document.getElementById('brandScreenRows');
      if (screenContainer) {
        if (formatFilter === 'Spotify') {
          screenContainer.innerHTML = '<div class="brandflow-item"><div><strong>Spotify Ads</strong><small>Audio + banner companion para audiencias jóvenes y apoyadores</small></div><div class="num">Mayo<br>$1,50M</div><div class="num">Junio<br>$1,50M</div><div class="num">$3,0M</div></div>';
          return;
        }
        screenContainer.innerHTML = screens.map((i, idx) => {
          const visible = formatFilter === 'Display' ? 0 : i.peso;
          const displaySupport = formatFilter === 'DOOH' ? 0 : Math.max(.3, i.peso*.3);
          return `<div class="brandflow-item"><div><strong>${i.pantalla}</strong><small>${i.zona} · Punto DOOH + refuerzo digital</small></div><div class="num">DOOH<br>${moneyM(visible)}</div><div class="num">Display<br>${moneyM(displaySupport)}</div><div class="num">${idx+1}</div></div>`;
        }).join('') || '<div class="flow-empty">No hay pantallas con esos filtros.</div>';
      }
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') changeSlide(1);
      if (e.key === 'ArrowLeft') changeSlide(-1);
      if (e.key === 'Escape') toggleIndex(false);
    });
    buildIndex();
    renderFlow();
    renderBrandFlow();
    updateSlide();

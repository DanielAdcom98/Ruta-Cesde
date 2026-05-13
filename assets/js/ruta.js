    const slides = Array.from(document.querySelectorAll('.slide'));
    let currentSlide = 0;
    let mapInitialized = false;
    const locations = [
{name:"Centro Comercial Puerta del Norte - Bello",lat:6.3386,lng:-75.5446},
{name:"Centro Comercial Fabricato - Bello",lat:6.337,lng:-75.5603},
{name:"EstaciÃ³n Metro NiquÃ­a - Bello",lat:6.3376,lng:-75.5440},
{name:"Florida Parque Comercial - MedellÃ­n",lat:6.2766,lng:-75.57},
{name:"Centro Comercial La Central - MedellÃ­n",lat:6.2473,lng:-75.5515},
{name:"Centro Comercial Los Molinos - MedellÃ­n",lat:6.2311,lng:-75.6044},
{name:"Centro Comercial Premium Plaza - MedellÃ­n",lat:6.2315,lng:-75.5746},
{name:"Centro Comercial Aventura - MedellÃ­n",lat:6.2712,lng:-75.5654},
{name:"EstaciÃ³n Metro Acevedo - MedellÃ­n",lat:6.3006,lng:-75.5585},
{name:"EstaciÃ³n Metro San Antonio - MedellÃ­n",lat:6.2471,lng:-75.5689},
{name:"Centro Comercial Mayorca - ItagÃ¼Ã­",lat:6.1652,lng:-75.6057},
{name:"Centro Comercial San NicolÃ¡s - Rionegro",lat:6.151,lng:-75.3741}
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
        li.textContent = `${String(i+1).padStart(2,'0')} Â· ${slide.dataset.title}`;
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

    const flowData = [{"sede": "Bello", "programa": "TÃ©c. Lab. Asistente Administrativo", "prioridad": "P2", "meta": 120, "inversion": 4.8, "cpl": 15900, "leads": 302, "metaAds": 2.64, "google": 1.44, "tiktok": 0.72, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "Bello", "programa": "TÃ©c. Lab. Asistente Desarrollo de Software", "prioridad": "P2", "meta": 90, "inversion": 3.6, "cpl": 15900, "leads": 226, "metaAds": 1.98, "google": 1.08, "tiktok": 0.54, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "Bello", "programa": "TÃ©c. Lab. Asistente en DiseÃ±o GrÃ¡fico", "prioridad": "P3", "meta": 60, "inversion": 1.4, "cpl": 18800, "leads": 74, "metaAds": 0.49, "google": 0.7, "tiktok": 0.21, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Asistente Administrativo", "prioridad": "P1", "meta": 210, "inversion": 11.7, "cpl": 14900, "leads": 785, "metaAds": 6.08, "google": 2.69, "tiktok": 2.92, "split": {"Meta": 52, "Google": 23, "TikTok": 25}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Desarrollo de Software", "prioridad": "P1", "meta": 315, "inversion": 17.5, "cpl": 14900, "leads": 1174, "metaAds": 9.1, "google": 4.03, "tiktok": 4.38, "split": {"Meta": 52, "Google": 23, "TikTok": 25}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Asistente Administrativo - Fast Track", "prioridad": "P3", "meta": 70, "inversion": 1.7, "cpl": 18800, "leads": 90, "metaAds": 0.59, "google": 0.85, "tiktok": 0.26, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Desarrollo de Software - Fast Track", "prioridad": "P3", "meta": 70, "inversion": 1.7, "cpl": 18800, "leads": 90, "metaAds": 0.59, "google": 0.85, "tiktok": 0.26, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Comercio Internacional", "prioridad": "P2", "meta": 120, "inversion": 4.8, "cpl": 15900, "leads": 302, "metaAds": 2.64, "google": 1.44, "tiktok": 0.72, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "ContadurÃ­a", "prioridad": "P1", "meta": 175, "inversion": 9.7, "cpl": 14900, "leads": 651, "metaAds": 5.04, "google": 2.23, "tiktok": 2.42, "split": {"Meta": 52, "Google": 23, "TikTok": 25}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Desarrollo de Software (D)", "prioridad": "P3", "meta": 35, "inversion": 0.8, "cpl": 18800, "leads": 43, "metaAds": 0.28, "google": 0.4, "tiktok": 0.12, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "Industrias Creativas", "programa": "DiseÃ±o de Modas", "prioridad": "P3", "meta": 50, "inversion": 1.2, "cpl": 18800, "leads": 64, "metaAds": 0.42, "google": 0.6, "tiktok": 0.18, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "Industrias Creativas", "programa": "DiseÃ±o GrÃ¡fico", "prioridad": "P1", "meta": 210, "inversion": 11.7, "cpl": 14900, "leads": 785, "metaAds": 6.08, "google": 2.69, "tiktok": 2.92, "split": {"Meta": 52, "Google": 23, "TikTok": 25}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "ElectromecÃ¡nica", "prioridad": "P3", "meta": 75, "inversion": 1.8, "cpl": 18800, "leads": 96, "metaAds": 0.63, "google": 0.9, "tiktok": 0.27, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "LogÃ­stica Centros de DistribuciÃ³n", "prioridad": "P3", "meta": 35, "inversion": 0.8, "cpl": 18800, "leads": 43, "metaAds": 0.28, "google": 0.4, "tiktok": 0.12, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Mercadeo", "prioridad": "P2", "meta": 105, "inversion": 4.2, "cpl": 15900, "leads": 264, "metaAds": 2.31, "google": 1.26, "tiktok": 0.63, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "Industrias Creativas", "programa": "ProducciÃ³n Audiovisual", "prioridad": "P2", "meta": 90, "inversion": 3.6, "cpl": 15900, "leads": 226, "metaAds": 1.98, "google": 1.08, "tiktok": 0.54, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "Industrias Creativas", "programa": "ProducciÃ³n FotogrÃ¡fica", "prioridad": "P3", "meta": 50, "inversion": 1.2, "cpl": 18800, "leads": 64, "metaAds": 0.42, "google": 0.6, "tiktok": 0.18, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "Industrias Creativas", "programa": "Aux. PublicaciÃ³n Contenidos Digitales", "prioridad": "P2", "meta": 90, "inversion": 3.6, "cpl": 15900, "leads": 226, "metaAds": 1.98, "google": 1.08, "tiktok": 0.54, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "GastronomÃ­a y Turismo", "programa": "Arte Culinario", "prioridad": "P1", "meta": 208, "inversion": 11.5, "cpl": 14900, "leads": 772, "metaAds": 5.98, "google": 2.65, "tiktok": 2.88, "split": {"Meta": 52, "Google": 23, "TikTok": 25}}, {"sede": "Salud y Cuidado", "programa": "Aux. Administrativo en Salud", "prioridad": "P2", "meta": 105, "inversion": 4.2, "cpl": 15900, "leads": 264, "metaAds": 2.31, "google": 1.26, "tiktok": 0.63, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Auxiliar de Talento Humano", "prioridad": "P1", "meta": 140, "inversion": 7.8, "cpl": 14900, "leads": 523, "metaAds": 4.06, "google": 1.79, "tiktok": 1.95, "split": {"Meta": 52, "Google": 23, "TikTok": 25}}, {"sede": "Salud y Cuidado", "programa": "Auxiliar en EnfermerÃ­a", "prioridad": "P1", "meta": 150, "inversion": 8.3, "cpl": 14900, "leads": 557, "metaAds": 4.32, "google": 1.91, "tiktok": 2.08, "split": {"Meta": 52, "Google": 23, "TikTok": 25}}, {"sede": "Salud y Cuidado", "programa": "Auxiliar Servicios FarmacÃ©uticos", "prioridad": "P2", "meta": 105, "inversion": 4.2, "cpl": 15900, "leads": 264, "metaAds": 2.31, "google": 1.26, "tiktok": 0.63, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "GastronomÃ­a y Turismo", "programa": "PastelerÃ­a y Arte Dulce", "prioridad": "P1", "meta": 182, "inversion": 10.1, "cpl": 14900, "leads": 678, "metaAds": 5.25, "google": 2.32, "tiktok": 2.52, "split": {"Meta": 52, "Google": 23, "TikTok": 25}}, {"sede": "TecnologÃ­a y AdministraciÃ³n", "programa": "Soporte de Sistemas InformÃ¡ticos", "prioridad": "P3", "meta": 70, "inversion": 1.7, "cpl": 18800, "leads": 90, "metaAds": 0.59, "google": 0.85, "tiktok": 0.26, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "Rionegro", "programa": "Auxiliar Administrativo", "prioridad": "P2", "meta": 90, "inversion": 3.6, "cpl": 15900, "leads": 226, "metaAds": 1.98, "google": 1.08, "tiktok": 0.54, "split": {"Meta": 55, "Google": 30, "TikTok": 15}}, {"sede": "Rionegro", "programa": "Auxiliar DiseÃ±o GrÃ¡fico", "prioridad": "P3", "meta": 75, "inversion": 1.8, "cpl": 18800, "leads": 96, "metaAds": 0.63, "google": 0.9, "tiktok": 0.27, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "Rionegro", "programa": "Auxiliar AnÃ¡lisis y Desarrollo de Software", "prioridad": "P3", "meta": 75, "inversion": 1.8, "cpl": 18800, "leads": 96, "metaAds": 0.63, "google": 0.9, "tiktok": 0.27, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}, {"sede": "Rionegro", "programa": "Auxiliar Comercio Internacional", "prioridad": "P3", "meta": 30, "inversion": 0.7, "cpl": 18800, "leads": 37, "metaAds": 0.24, "google": 0.35, "tiktok": 0.1, "split": {"Meta": 35, "Google": 50, "TikTok": 15}}];
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
          <div class="flow-program"><strong>${item.programa}</strong><small>${item.sede} Â· <span class="tag ${tagClass}">${item.prioridad}</span></small></div>
          <div class="flow-invest">${moneyM(item.inversion)}</div>
          <div class="media-stack">${mediaLine('Meta', item.metaAds)}${mediaLine('Google', item.google)}${mediaLine('TikTok', item.tiktok)}</div>
          <div class="flow-leads">${item.leads.toLocaleString('es-CO')}</div>
          <div class="flow-cpl">${moneyCOP(item.cpl)}</div>
        </div>`;
      }).join('');
    }



    const brandMonths = [
      {mes:'Abril', total:3, dooh:2.1, display:0.9, rol:'Arranque'},
      {mes:'Mayo', total:10, dooh:7, display:3, rol:'Pico'},
      {mes:'Junio', total:10, dooh:7, display:3, rol:'Pico'},
      {mes:'Julio', total:4, dooh:2.8, display:1.2, rol:'Sostenimiento'},
      {mes:'Agosto', total:1, dooh:0.7, display:0.3, rol:'Cierre'}
    ];
    const brandScreensData = [
      {zona:'Bello', pantalla:'Centro Comercial Puerta del Norte', peso:2.5},
      {zona:'Bello', pantalla:'Centro Comercial Fabricato', peso:2.5},
      {zona:'Bello', pantalla:'EstaciÃ³n Metro NiquÃ­a', peso:2.5},
      {zona:'MedellÃ­n', pantalla:'Florida Parque Comercial', peso:2.2},
      {zona:'MedellÃ­n', pantalla:'Centro Comercial La Central', peso:2.2},
      {zona:'MedellÃ­n', pantalla:'Centro Comercial Los Molinos', peso:2.2},
      {zona:'MedellÃ­n', pantalla:'Centro Comercial Premium Plaza', peso:2.2},
      {zona:'MedellÃ­n', pantalla:'Centro Comercial Aventura', peso:2.2},
      {zona:'MedellÃ­n', pantalla:'EstaciÃ³n Metro Acevedo', peso:2.2},
      {zona:'MedellÃ­n', pantalla:'EstaciÃ³n Metro San Antonio', peso:2.2},
      {zona:'ItagÃ¼Ã­', pantalla:'Centro Comercial Mayorca', peso:2.4},
      {zona:'Rionegro', pantalla:'Centro Comercial San NicolÃ¡s', peso:2.4}
    ];
    function renderBrandFlow() {
      const monthFilter = document.getElementById('brandMonth')?.value || 'all';
      const formatFilter = document.getElementById('brandFormat')?.value || 'all';
      const zoneFilter = document.getElementById('brandZone')?.value || 'all';
      const months = brandMonths.filter(m => monthFilter === 'all' || m.mes === monthFilter);
      const total = months.reduce((s,m)=>s+m.total,0);
      const dooh = months.reduce((s,m)=>s+m.dooh,0);
      const display = months.reduce((s,m)=>s+m.display,0);
      const screens = brandScreensData.filter(i => zoneFilter === 'all' || i.zona === zoneFilter);
      document.getElementById('brandTotal') && (document.getElementById('brandTotal').textContent = moneyM(total));
      document.getElementById('brandDooh') && (document.getElementById('brandDooh').textContent = formatFilter === 'Display' ? '$0,0M' : moneyM(dooh));
      document.getElementById('brandDisplay') && (document.getElementById('brandDisplay').textContent = formatFilter === 'DOOH' ? '$0,0M' : moneyM(display));
      document.getElementById('brandScreens') && (document.getElementById('brandScreens').textContent = screens.length);
      const monthContainer = document.getElementById('brandMonthRows');
      if (monthContainer) {
        monthContainer.innerHTML = months.map(m => {
          const doohW = formatFilter === 'Display' ? 0 : 70;
          const displayW = formatFilter === 'DOOH' ? 0 : 30;
          const shownTotal = formatFilter === 'DOOH' ? m.dooh : formatFilter === 'Display' ? m.display : m.total;
          return `<div class="brand-month-row"><strong>${m.mes}<br><span class="tag ${m.rol === 'Pico' ? 'light' : 'gray'}">${m.rol}</span></strong><div class="brand-month-track"><span style="width:${doohW}%"></span><span style="width:${displayW}%"></span></div><small>${moneyM(shownTotal)}</small></div>`;
        }).join('') || '<div class="flow-empty">Sin datos para este filtro.</div>';
      }
      const screenContainer = document.getElementById('brandScreenRows');
      if (screenContainer) {
        screenContainer.innerHTML = screens.map((i, idx) => {
          const visible = formatFilter === 'Display' ? 0 : i.peso;
          const displaySupport = formatFilter === 'DOOH' ? 0 : Math.max(.3, i.peso*.3);
          return `<div class="brandflow-item"><div><strong>${i.pantalla}</strong><small>${i.zona} Â· Punto DOOH + refuerzo digital</small></div><div class="num">DOOH<br>${moneyM(visible)}</div><div class="num">Display<br>${moneyM(displaySupport)}</div><div class="num">${idx+1}</div></div>`;
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
// Dulces Momentos - Alfajores de Autor
// Logic for box builder, catalog filtering, modal interactions, and WhatsApp inquiries.

// Product catalog data using the user's selected Pexels photography
const PRODUCTS = [
  {
    id: 'alf-01',
    name: 'Dulce de Leche de Tambo & Sal Marina',
    category: 'clasico',
    badge: 'Sabor Estrella',
    badgeType: 'gold',
    tag: 'El Relleno Más Codiciado',
    description: 'Primer plano a la perfección: masa crocante horneada al punto, generoso relleno desbordante de dulce de leche repostero de tambo cocido en paila de cobre y escamas de sal marina.',
    price: 3600,
    rating: 4.98,
    sensory: { cacao: 25, dulzor: 80, acidez: 15, textura: 95 },
    pairing: 'Café de especialidad filtrado o Mate de campo amargo.',
    image: 'https://images.pexels.com/photos/32554156/pexels-photo-32554156.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'alf-02',
    name: 'Baño de Chocolate Belga & Especias',
    category: 'intenso',
    badge: 'Edición Glaseada',
    badgeType: 'dark',
    tag: 'Cacao Noble & Canela en Rama',
    description: 'Inspirado en los bocados de miel y cacao: masa especiada con cardamomo y miel pura, dulce de leche untuoso y cobertura espesa de chocolate belga semiamargo.',
    price: 3800,
    rating: 4.92,
    sensory: { cacao: 80, dulzor: 65, acidez: 20, textura: 90 },
    pairing: 'Té negro especiado Chai o Vino Oporto.',
    image: 'https://images.pexels.com/photos/16777946/pexels-photo-16777946.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'alf-03',
    name: 'Masa Sablée Horneada a Mano',
    category: 'clasico',
    badge: 'Receta de Familia',
    badgeType: 'dark',
    tag: 'Mantequilla Pastoril & Yemas de Campo',
    description: 'Tapas doradas horneadas artesanalmente a baja temperatura con manteca pura de pastura, de textura que se deshace en paladar al primer contacto.',
    price: 3400,
    rating: 4.95,
    sensory: { cacao: 0, dulzor: 75, acidez: 10, textura: 85 },
    pairing: 'Café Latte con canela o Infusión de manzanilla silvestre.',
    image: 'https://images.pexels.com/photos/17553044/pexels-photo-17553044.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'alf-04',
    name: 'Nuez Pecán & Frutos Secos del Valle',
    category: 'intenso',
    badge: 'Favorito del Taller',
    badgeType: 'dark',
    tag: 'Nueces Seleccionadas a Mano',
    description: 'Masa enriquecida con harina de nueces pecán cosechadas a mano, dulce de leche aromatizado con salvia y corazón de trozos crocantes de nueces tostadas.',
    price: 3900,
    rating: 4.91,
    sensory: { cacao: 50, dulzor: 70, acidez: 20, textura: 98 },
    pairing: 'Vino Malbec Gran Reserva o Whisky Single Malt escocés.',
    image: 'https://images.pexels.com/photos/25391941/pexels-photo-25391941.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'alf-05',
    name: 'Chocolatería de Autor & Ganache Amarga',
    category: 'intenso',
    badge: 'Premiado 2024',
    badgeType: 'gold',
    tag: 'Templado Artesanal en Mármol',
    description: 'Una pieza de alta pastelería moldeada a mano: chocolate de origen 70% cacao, emulsión sedosa de dulce de leche al licor y un baño crocante templado sobre piedra.',
    price: 3950,
    rating: 4.97,
    sensory: { cacao: 90, dulzor: 45, acidez: 40, textura: 90 },
    pairing: 'Café Espresso doble de Etiopía o Vino Pinot Noir.',
    image: 'https://images.pexels.com/photos/15837304/pexels-photo-15837304.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'alf-06',
    name: 'Cacao Profundo & Azúcar Mascabo Orgánico',
    category: 'frutal',
    badge: 'Notas Tostadas',
    badgeType: 'dark',
    tag: 'Contraste Rústico & Natural',
    description: 'Masa rústica perfumada con azúcar mascabo no refinado y cacao puro en polvo, doble relleno de dulce de leche con notas de toffee y final mineral.',
    price: 3750,
    rating: 4.88,
    sensory: { cacao: 85, dulzor: 60, acidez: 35, textura: 85 },
    pairing: 'Café Cold Brew con piel de naranja o Vino Torrontés tardío.',
    image: 'https://images.pexels.com/photos/6946739/pexels-photo-6946739.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const WHATSAPP_PHONE = '5491144005522';

// Custom Box Builder State
let boxSize = 6;
let boxSelections = {};
let currentModalProductId = null;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  initBoxBuilder();
  initFilterTabs();
  initModalListeners();
  initNewsletter();
});

// Format currency
function formatCurrency(amount) {
  return '$' + amount.toLocaleString('es-AR');
}

// Render Products Grid
function renderProducts(category) {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = category === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === category);

  container.innerHTML = filtered.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image-wrap" onclick="openFlavorModal('${product.id}')">
        <img class="product-img" src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-badge ${product.badgeType}">${product.badge}</span>
      </div>
      <div class="product-body">
        <span class="product-flavors-tag">${product.tag}</span>
        <h3 class="product-name" onclick="openFlavorModal('${product.id}')">${product.name}</h3>
        <p class="product-taste-notes">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-unit">Por unidad (95g)</span>
            <span class="price-amount">${formatCurrency(product.price)}</span>
          </div>
          <button class="btn-view-details" onclick="openFlavorModal('${product.id}')">
            <span>Ver Notas de Cata</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Filter tabs handler
function initFilterTabs() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderProducts(cat);
    });
  });
}

// ==================== BOX BUILDER LOGIC ====================
function initBoxBuilder() {
  const sizeCards = document.querySelectorAll('.size-option-card');
  sizeCards.forEach(card => {
    card.addEventListener('click', () => {
      sizeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      boxSize = parseInt(card.getAttribute('data-size'), 10);
      resetBoxSelections();
      renderBoxSlots();
      renderFlavorPickers();
      updateBoxSummary();
    });
  });

  resetBoxSelections();
  renderFlavorPickers();
  renderBoxSlots();
  updateBoxSummary();
}

function resetBoxSelections() {
  boxSelections = {};
  PRODUCTS.forEach(p => {
    boxSelections[p.id] = 0;
  });
}

function renderFlavorPickers() {
  const container = document.getElementById('flavor-picker-list');
  if (!container) return;

  container.innerHTML = PRODUCTS.map(p => `
    <div class="flavor-picker-item">
      <div class="picker-item-info">
        <img src="${p.image}" alt="${p.name}" class="picker-item-img" />
        <div>
          <div class="picker-item-name">${p.name}</div>
          <div class="picker-item-desc">${p.tag}</div>
        </div>
      </div>
      <div class="picker-counter">
        <button class="picker-btn" onclick="modifyBoxFlavor('${p.id}', -1)">-</button>
        <span class="picker-count" id="count-${p.id}">${boxSelections[p.id] || 0}</span>
        <button class="picker-btn" onclick="modifyBoxFlavor('${p.id}', 1)">+</button>
      </div>
    </div>
  `).join('');
}

window.modifyBoxFlavor = function(id, delta) {
  const currentTotal = Object.values(boxSelections).reduce((a, b) => a + b, 0);

  if (delta > 0 && currentTotal >= boxSize) {
    showToast(`Tu caja de ${boxSize} ya está completa`);
    return;
  }

  const currentCount = boxSelections[id] || 0;
  const newCount = currentCount + delta;
  if (newCount < 0) return;

  boxSelections[id] = newCount;

  const counterEl = document.getElementById(`count-${id}`);
  if (counterEl) {
    counterEl.textContent = newCount;
  }

  renderBoxSlots();
  updateBoxSummary();
};

function renderBoxSlots() {
  const slotsContainer = document.getElementById('box-slots-grid');
  if (!slotsContainer) return;

  slotsContainer.style.gridTemplateColumns = boxSize === 6 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)';

  const selectedList = [];
  for (const [id, count] of Object.entries(boxSelections)) {
    const product = PRODUCTS.find(p => p.id === id);
    for (let i = 0; i < count; i++) {
      selectedList.push(product);
    }
  }

  let html = '';
  for (let i = 0; i < boxSize; i++) {
    if (i < selectedList.length && selectedList[i]) {
      const item = selectedList[i];
      html += `
        <div class="slot-item filled" title="${item.name}">
          <img src="${item.image}" alt="${item.name}" class="slot-img" />
        </div>
      `;
    } else {
      html += `
        <div class="slot-item">
          <span>Espacio ${i + 1}</span>
        </div>
      `;
    }
  }

  slotsContainer.innerHTML = html;
}

function updateBoxSummary() {
  const currentTotal = Object.values(boxSelections).reduce((a, b) => a + b, 0);
  const remaining = boxSize - currentTotal;
  const statusEl = document.getElementById('box-status-text');
  const priceEl = document.getElementById('box-total-price');
  const orderBtn = document.getElementById('btn-add-custom-box');

  const basePrice = boxSize === 6 ? 19800 : 36900;

  if (statusEl) {
    if (remaining === 0) {
      statusEl.textContent = `¡Caja completa! (${boxSize} de ${boxSize} alfajores)`;
      statusEl.style.color = '#C68B59';
    } else {
      statusEl.textContent = `Seleccionaste ${currentTotal} de ${boxSize} (faltan ${remaining})`;
      statusEl.style.color = '#6B615D';
    }
  }

  if (priceEl) {
    priceEl.textContent = formatCurrency(basePrice);
  }

  if (orderBtn) {
    orderBtn.disabled = remaining > 0;
  }
}

// Order custom box via WhatsApp
window.orderBoxViaWhatsApp = function() {
  const currentTotal = Object.values(boxSelections).reduce((a, b) => a + b, 0);
  if (currentTotal < boxSize) {
    showToast(`Completá los ${boxSize} alfajores para pedir tu caja`);
    return;
  }

  const basePrice = boxSize === 6 ? 19800 : 36900;
  const parts = [];
  for (const [id, count] of Object.entries(boxSelections)) {
    if (count > 0) {
      const p = PRODUCTS.find(prod => prod.id === id);
      parts.push(`- ${count}x ${p.name}`);
    }
  }

  const message = `Hola Dulces Momentos! Quisiera encargar la siguiente caja personalizada de ${boxSize} alfajores:%0A%0A${parts.join('%0A')}%0A%0ATotal estimado: ${formatCurrency(basePrice)}%0A¿Tienen disponibilidad para envío?`;
  const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${message}`;
  window.open(url, '_blank');
};

// ==================== FLAVOR MODAL ====================
function initModalListeners() {
  const overlay = document.getElementById('flavor-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeFlavorModal();
      }
    });
  }
}

window.openFlavorModal = function(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  currentModalProductId = id;

  const modal = document.getElementById('flavor-modal-overlay');
  const img = document.getElementById('modal-img');
  const name = document.getElementById('modal-title');
  const tag = document.getElementById('modal-tag');
  const desc = document.getElementById('modal-desc');
  const pairing = document.getElementById('modal-pairing');
  const price = document.getElementById('modal-price');

  const fillCacao = document.getElementById('sensory-cacao');
  const fillDulzor = document.getElementById('sensory-dulzor');
  const fillAcidez = document.getElementById('sensory-acidez');
  const fillTextura = document.getElementById('sensory-textura');

  if (img) img.src = product.image;
  if (name) name.textContent = product.name;
  if (tag) tag.textContent = product.tag;
  if (desc) desc.textContent = product.description;
  if (pairing) pairing.textContent = product.pairing;
  if (price) price.textContent = formatCurrency(product.price);

  if (fillCacao) fillCacao.style.width = product.sensory.cacao + '%';
  if (fillDulzor) fillDulzor.style.width = product.sensory.dulzor + '%';
  if (fillAcidez) fillAcidez.style.width = product.sensory.acidez + '%';
  if (fillTextura) fillTextura.style.width = product.sensory.textura + '%';

  if (modal) modal.classList.add('open');
};

window.closeFlavorModal = function() {
  const modal = document.getElementById('flavor-modal-overlay');
  if (modal) modal.classList.remove('open');
};

window.askFlavorViaWhatsApp = function() {
  if (!currentModalProductId) return;
  const product = PRODUCTS.find(p => p.id === currentModalProductId);
  if (!product) return;

  const message = `Hola Dulces Momentos! Me gustaría consultar por el alfajor artesanal: "${product.name}" (${formatCurrency(product.price)} c/u).`;
  const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// ==================== NEWSLETTER ====================
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast('¡Bienvenido al Club de Catas Dulces Momentos! Te enviamos tu cupón 15% OFF.');
      input.value = '';
    }
  });
}

// Toast helper
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C68B59" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Story / Video modal handler
window.openStoryVideo = function() {
  showToast('Iniciando recorrido visual por el atelier de Dulces Momentos...');
};

// Mobile menu toggle
window.toggleMobileMenu = function() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = '#0A0605';
    nav.style.padding = '24px';
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    nav.style.zIndex = '50';
  }
};

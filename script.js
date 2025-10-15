// ReciclaRenda - JavaScript 100% Web com Backend Vercel
// Desenvolvido por: Marcos Amorim Jr. - Teresópolis, RJ ❤️
// Email: marcosamorimjr@gmail.com | Tel: (21) 98697-6714

class ReciclaRendaWeb {
  constructor() {
    // Detecta ambiente (produção ou desenvolvimento)
    this.API_BASE =
      window.location.hostname.includes('vercel.app') || !window.location.hostname.includes('localhost')
        ? '/api' // Produção na Vercel (Serverless Functions)
        : 'http://localhost:3000/api'; // Desenvolvimento local

    this.mockData = this.initializeMockData();
    this.currentUser = null;
    this.isLoggedIn = false;
    this.useRealAPI = false; // Mude para true quando o backend estiver no ar

    this.init();
  }

  init() {
    this.bindEvents();
    this.checkAuthStatus();
    this.loadCollectionPoints();
    this.startAnimations();
    this.initScrollEffects();
  }

  // Dados atualizados para Teresópolis, RJ
  initializeMockData() {
    return {
      wasteTypes: {
        papel: { name: 'Papel/Papelão', pricePerKg: 0.65, co2Factor: 3.2, icon: '📄' },
        plastico: { name: 'Plástico', pricePerKg: 1.4, co2Factor: 2.8, icon: '♻️' },
        metal: { name: 'Metal', pricePerKg: 6.2, co2Factor: 8.1, icon: '🥇' },
        vidro: { name: 'Vidro', pricePerKg: 0.25, co2Factor: 1.2, icon: '🍾' },
        eletronicos: { name: 'Eletrônicos', pricePerKg: 28.0, co2Factor: 25.5, icon: '📱' },
        moveis: { name: 'Móveis', pricePerKg: 0, co2Factor: 15.0, icon: '🪑' },
        oleo: { name: 'Óleo de Cozinha', pricePerKg: 1.8, co2Factor: 2.5, icon: '🛢️' }
      },
      collectionPoints: [
        {
          id: 1,
          name: 'Associação de Catadores de Teresópolis',
          type: 'cooperativa',
          address: 'Três Córregos, 2º Distrito - Teresópolis, RJ',
          materials: ['papel', 'plastico', 'vidro', 'metal'],
          rating: 4.9,
          distance: '3.2 km',
          phone: '(21) 2742-9000',
          hours: 'Seg-Sex: 8h-17h',
          lat: -22.4144,
          lng: -42.9664,
          description: 'Centro de Triagem do Programa Recicla Terê',
          acceptsFurniture: true,
          hasScheduledPickup: true
        },
        {
          id: 2,
          name: 'Ecoponto Centro - Praça dos Expedicionários',
          type: 'ecoponto',
          address: 'Praça dos Expedicionários (Tiro de Guerra) - Centro, Teresópolis, RJ',
          materials: ['papel', 'plastico', 'vidro', 'metal', 'eletronicos'],
          rating: 4.7,
          distance: '1.5 km',
          phone: '(21) 2742-9000',
          hours: '24 horas',
          lat: -22.4118,
          lng: -42.9678,
          description: 'Ponto de Entrega Voluntária - Programa Recicla Terê',
          acceptsFurniture: false,
          hasScheduledPickup: false
        },
        {
          id: 3,
          name: 'Ecoponto Tijuca',
          type: 'ecoponto',
          address: 'Rua Prefeito Sebastião Teixeira - Tijuca, Teresópolis, RJ',
          materials: ['papel', 'plastico', 'vidro', 'metal'],
          rating: 4.6,
          distance: '2.1 km',
          phone: '(21) 2742-9000',
          hours: '24 horas',
          lat: -22.4201,
          lng: -42.9723,
          description: 'Ponto de Entrega Voluntária - Programa Recicla Terê',
          acceptsFurniture: false,
          hasScheduledPickup: false
        },
        {
          id: 4,
          name: 'Ecoponto Bom Retiro',
          type: 'ecoponto',
          address: 'Rua Tenente Luiz Meireles - Bom Retiro, Teresópolis, RJ',
          materials: ['papel', 'plastico', 'vidro', 'metal'],
          rating: 4.5,
          distance: '2.8 km',
          phone: '(21) 2742-9000',
          hours: '24 horas',
          lat: -22.4089,
          lng: -42.9801,
          description: 'Ponto de Entrega Voluntária - Programa Recicla Terê',
          acceptsFurniture: false,
          hasScheduledPickup: false
        },
        {
          id: 5,
          name: 'Catador João Silva - Região Central',
          type: 'catador',
          address: 'Atende toda região central de Teresópolis',
          materials: ['papel', 'metal', 'plastico'],
          rating: 5.0,
          distance: '0.5 km',
          phone: '(21) 98697-6714',
          hours: 'Disponível via WhatsApp',
          lat: -22.4133,
          lng: -42.9667,
          description: 'Catador independente parceiro do Recicla Terê',
          acceptsFurniture: true,
          hasScheduledPickup: true,
          paysCash: true
        },
        {
          id: 6,
          name: 'Ecoponto Várzea',
          type: 'ecoponto',
          address: 'Bairro Várzea - Teresópolis, RJ',
          materials: ['papel', 'plastico', 'vidro', 'metal'],
          rating: 4.4,
          distance: '4.5 km',
          phone: '(21) 2742-9000',
          hours: '24 horas',
          lat: -22.4256,
          lng: -42.9589,
          description: 'Ponto de Entrega Voluntária - Programa Recicla Terê',
          acceptsFurniture: false,
          hasScheduledPickup: false
        },
        {
          id: 7,
          name: 'Secretaria Municipal de Meio Ambiente',
          type: 'prefeitura',
          address: 'Av. Feliciano Sodré - Centro, Teresópolis, RJ',
          materials: ['papel', 'plastico', 'vidro', 'metal', 'eletronicos', 'moveis'],
          rating: 4.8,
          distance: '1.8 km',
          phone: '(21) 2742-9000',
          hours: 'Seg-Sex: 9h-18h',
          lat: -22.4125,
          lng: -42.9655,
          description: 'Informações sobre coleta seletiva e descarte de grandes volumes',
          acceptsFurniture: true,
          hasScheduledPickup: true
        }
      ]
    };
  }

  // Event Listeners
  bindEvents() {
    // Header scroll effect
    window.addEventListener('scroll', () => this.handleScroll());

    // Mobile menu
    window.addEventListener('resize', () => this.handleResize());

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.hideModal(e.target.id);
      }
    });
  }

  // Scroll Effects
  handleScroll() {
    const header = document.querySelector('.header');
    if (header && window.scrollY > 50) {
      header.classList.add('scrolled');
    } else if (header) {
      header.classList.remove('scrolled');
    }
    this.animateOnScroll();
  }

  animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('fade-in');
      }
    });
  }

  handleResize() {
    if (window.innerWidth > 768) {
      const nav = document.getElementById('nav');
      const authSection = document.querySelector('.auth-section');
      if (nav) nav.classList.remove('active');
      if (authSection) authSection.classList.remove('active');
    }
  }

  handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }

  // Animations
  startAnimations() {
    this.animateCounters();
    this.initIntersectionObserver();
  }

  animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const duration = 2000;
      const step = duration > 0 ? target / (duration / 16) : target;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += step;
          counter.textContent = Math.floor(current).toLocaleString('pt-BR');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString('pt-BR');
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(counter.parentElement || counter);
    });
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    document.querySelectorAll('.feature-card, .waste-card, .step').forEach(card => observer.observe(card));
  }

  initScrollEffects() {
    document.querySelectorAll('.feature-card, .waste-card, .step, .point-card').forEach((element, index) => {
      element.setAttribute('data-animate', 'true');
      element.style.animationDelay = `${(index * 0.1).toFixed(2)}s`;
    });
  }

  // Authentication
  checkAuthStatus() {
    const savedUser = localStorage.getItem('reciclarenda_user_web');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        this.isLoggedIn = true;
        this.updateAuthUI();
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('reciclarenda_user_web');
      }
    }
  }

  updateAuthUI() {
    const authSection = document.querySelector('.auth-section');
    if (!authSection) return;

    if (this.isLoggedIn && this.currentUser) {
      authSection.innerHTML = `
        <div class="user-menu">
          <button class="btn btn-outline" onclick="window.reciclaRenda.showDashboard()">
            <i class="fas fa-user"></i> ${this.currentUser.name.split(' ')[0]}
          </button>
          <button class="btn btn-primary" onclick="window.reciclaRenda.logout()">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      `;
    } else {
      authSection.innerHTML = `
        <button class="btn btn-outline" onclick="showModal('login-modal')">Entrar</button>
        <button class="btn btn-primary" onclick="showModal('register-modal')">Cadastrar</button>
      `;
    }
  }

  // API Integration - Login
  async handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]')?.value || '';
    const password = form.querySelector('input[type="password"]')?.value || '';

    if (!email || !password) {
      this.showNotification('Preencha todos os campos', 'error');
      return;
    }

    if (this.useRealAPI) {
      try {
        const response = await fetch(`${this.API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
          this.currentUser = data.user;
          this.isLoggedIn = true;
          localStorage.setItem('reciclarenda_user_web', JSON.stringify(data.user));
          localStorage.setItem('reciclarenda_token', data.token);
          this.hideModal('login-modal');
          this.updateAuthUI();
          this.showNotification(data.message || 'Login realizado!', 'success');
        } else {
          this.showNotification(data.error || 'Credenciais inválidas', 'error');
        }
      } catch (error) {
        this.showNotification('Erro ao conectar com servidor', 'error');
        console.error('Login error:', error);
      }
    } else {
      // Mock login
      const user = {
        id: Date.now(),
        name: 'Marcos Amorim Jr.',
        email,
        phone: '(21) 98697-6714',
        type: 'gerador',
        address: 'Teresópolis, RJ',
        joinDate: new Date().toISOString()
      };
      this.currentUser = user;
      this.isLoggedIn = true;
      localStorage.setItem('reciclarenda_user_web', JSON.stringify(user));
      this.hideModal('login-modal');
      this.updateAuthUI();
      this.showNotification('Login realizado com sucesso! 🎉', 'success');
    }
  }

  // API Integration - Register
  async handleRegister(event) {
    event.preventDefault();
    const form = event.target;

    const name = form.querySelector('input[type="text"]')?.value || '';
    const email = form.querySelector('input[type="email"]')?.value || '';
    const phone = form.querySelector('input[type="tel"]')?.value || '';
    const cep = form.querySelector('input[placeholder*="CEP"]')?.value || '';
    const userType = form.querySelector('select')?.value || '';
    const password = form.querySelectorAll('input[type="password"]')[0]?.value || '';
    const termsAccepted = form.querySelector('input[type="checkbox"]')?.checked || false;

    // Validações
    if (!name || !email || !phone || !cep || !userType || !password) {
      this.showNotification('Preencha todos os campos obrigatórios', 'error');
      return;
    }
    if (!termsAccepted) {
      this.showNotification('Você deve aceitar os termos de uso', 'error');
      return;
    }
    if (password.length < 6) {
      this.showNotification('A senha deve ter pelo menos 6 caracteres', 'error');
      return;
    }

    if (this.useRealAPI) {
      try {
        const response = await fetch(`${this.API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            address: `CEP ${cep}, Teresópolis, RJ`,
            type: userType
          })
        });
        const data = await response.json();
        if (data.success) {
          this.currentUser = data.user;
          this.isLoggedIn = true;
          localStorage.setItem('reciclarenda_user_web', JSON.stringify(data.user));
          localStorage.setItem('reciclarenda_token', data.token);
          this.hideModal('register-modal');
          this.updateAuthUI();
          this.showNotification(data.message || 'Cadastro realizado!', 'success');
        } else {
          this.showNotification(data.error || 'Erro no cadastro', 'error');
        }
      } catch (error) {
        this.showNotification('Erro ao conectar com servidor', 'error');
        console.error('Register error:', error);
      }
    } else {
      // Mock registration
      const user = {
        id: Date.now(),
        name,
        email,
        phone,
        cep,
        type: userType,
        address: `Teresópolis, RJ - CEP ${cep}`,
        joinDate: new Date().toISOString()
      };
      this.currentUser = user;
      this.isLoggedIn = true;
      localStorage.setItem('reciclarenda_user_web', JSON.stringify(user));
      this.hideModal('register-modal');
      this.updateAuthUI();
      this.showNotification(`Bem-vindo(a), ${name}! Conta criada com sucesso! 🎉`, 'success');
    }
  }

  logout() {
    this.currentUser = null;
    this.isLoggedIn = false;
    localStorage.removeItem('reciclarenda_user_web');
    localStorage.removeItem('reciclarenda_token');

    const authSection = document.querySelector('.auth-section');
    if (authSection) {
      authSection.innerHTML = `
        <button class="btn btn-outline" onclick="showModal('login-modal')">Entrar</button>
        <button class="btn btn-primary" onclick="showModal('register-modal')">Cadastrar</button>
      `;
    }
    this.showNotification('Logout realizado com sucesso!', 'success');
  }

  // Waste Type Selection
  selectWasteType(type) {
    const wasteType = this.mockData.wasteTypes[type];
    if (wasteType) {
      this.showNotification(`Material selecionado: ${wasteType.name} ${wasteType.icon}`, 'success');
      const materialSelect = document.getElementById('material-select');
      if (materialSelect) {
        materialSelect.value = type;
        this.updateSimulation();
      }
      this.scrollToSection('simulador');
    }
  }

  // Simulator
  updateSimulation() {
    const materialSelect = document.getElementById('material-select');
    const weightInput = document.getElementById('weight-input');
    const totalValue = document.getElementById('total-value');
    const co2Saved = document.getElementById('co2-saved');

    if (!materialSelect || !weightInput || !totalValue || !co2Saved) return;

    const material = materialSelect.value;
    const weight = parseFloat(weightInput.value) || 0;

    if (material && weight > 0) {
      const wasteType = this.mockData.wasteTypes[material];
      const total = weight * wasteType.pricePerKg;
      const co2 = weight * wasteType.co2Factor;
      totalValue.textContent = `R$ ${total.toFixed(2)}`;
      co2Saved.textContent = `${co2.toFixed(1)} kg`;
    } else {
      totalValue.textContent = 'R$ 0,00';
      co2Saved.textContent = '0 kg';
    }
  }

  // Collection Points
  async loadCollectionPoints() {
    const container = document.getElementById('points-container');
    if (!container) return;

    let points = this.mockData.collectionPoints;

    if (this.useRealAPI) {
      try {
        const response = await fetch(`${this.API_BASE}/collection-points`);
        const data = await response.json();
        if (data.success && Array.isArray(data.points)) {
          points = data.points;
        }
      } catch (error) {
        console.error('Erro ao carregar pontos:', error);
      }
    }

    container.innerHTML = points
      .map(
        (point) => `
      <div class="point-card" data-type="${point.type}">
        <div class="point-header">
          <div>
            <h3 class="point-name">${point.name}</h3>
            <div class="point-type">${this.getPointTypeLabel(point.type)}</div>
          </div>
          <div class="point-rating">
            <i class="fas fa-star"></i>
            <span>${point.rating}</span>
          </div>
        </div>

        <div class="point-address">
          <i class="fas fa-map-marker-alt"></i>
          <span>${point.address}</span>
        </div>

        <div class="point-materials">
          ${
            point.materials
              .map((material) => {
                const wt = this.mockData.wasteTypes[material];
                return wt ? `<span class="material-tag">${wt.name}</span>` : '';
              })
              .join('')
          }
        </div>

        <div class="point-distance">
          <i class="fas fa-route"></i>
          ${point.distance}
        </div>

        <div class="point-contact">
          <i class="fas fa-phone"></i>
          <span>${point.phone}</span>
        </div>

        <div class="point-hours">
          <i class="fas fa-clock"></i>
          <span>${point.hours}</span>
        </div>

        ${point.description ? `<p class="point-description">${point.description}</p>` : ''}

        <button class="btn btn-primary" onclick="window.reciclaRenda.contactPoint(${point.id})">
          <i class="fab fa-whatsapp"></i>
          Entrar em Contato
        </button>
      </div>
    `
      )
      .join('');
  }

  getPointTypeLabel(type) {
    const labels = {
      cooperativa: 'Cooperativa',
      cooperativas: 'Cooperativa',
      empresas: 'Empresa',
      empresa: 'Empresa',
      catadores: 'Catador',
      catador: 'Catador',
      ecoponto: 'Ecoponto',
      prefeitura: 'Órgão Público'
    };
    return labels[type] || type;
  }

  filterPoints(filter, event) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach((btn) => btn.classList.remove('active'));
    if (event?.target) event.target.classList.add('active');

    const cards = document.querySelectorAll('.point-card');
    cards.forEach((card) => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });
  }

  contactPoint(pointId) {
    const point = this.mockData.collectionPoints.find((p) => p.id === pointId);
    if (point) {
      const whatsappNumber = point.phone.replace(/[^0-9]/g, '');
      const message = encodeURIComponent(
        `Olá! Vi ${point.name} no ReciclaRenda e gostaria de saber mais sobre a coleta de recicláveis em Teresópolis, RJ. ❤️`
      );
      const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      this.showNotification(`Redirecionando para WhatsApp de ${point.name}`, 'success');
    }
  }

  // Location Search
  searchLocation() {
    const input = document.getElementById('location-input');
    if (!input) return;

    const location = input.value.trim();
    if (location) {
      this.showNotification(`Buscando pontos próximos a: ${location}, Teresópolis, RJ`, 'success');
      this.loadCollectionPoints();
    } else {
      this.showNotification('Digite um CEP ou bairro para buscar', 'warning');
    }
  }

  // Modal Management
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  switchModal(currentModalId, newModalId) {
    this.hideModal(currentModalId);
    setTimeout(() => this.showModal(newModalId), 100);
  }

  // Contact Form
  async submitContact(event) {
    event.preventDefault();
    const form = event.target;

    const name = form.querySelector('input[type="text"]')?.value || '';
    const email = form.querySelector('input[type="email"]')?.value || '';
    const subject = form.querySelector('input[placeholder*="Assunto"]')?.value || 'Contato via ReciclaRenda';
    const message = form.querySelector('textarea')?.value || '';

    if (!name || !email || !message) {
      this.showNotification('Preencha todos os campos', 'error');
      return;
    }

    if (this.useRealAPI) {
      try {
        const response = await fetch(`${this.API_BASE}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({ name, email, subject, message })
        });
        const data = await response.json();
        if (data.success) {
          this.showNotification(data.message || 'Mensagem enviada!', 'success');
          form.reset();
        } else {
          this.showNotification(data.error || 'Falha ao enviar', 'error');
        }
      } catch (error) {
        this.showNotification('Erro ao enviar mensagem', 'error');
        console.error('Contact error:', error);
      }
    } else {
      this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve. 📧', 'success');
      form.reset();
    }
  }

  // Dashboard
  showDashboard() {
    const dashboardHtml = `
      <div class="dashboard-modal">
        <div class="modal-content" style="max-width: 800px;">
          <div class="modal-header">
            <h2><i class="fas fa-chart-line"></i> Meu Dashboard - Teresópolis ❤️</h2>
            <span class="modal-close" onclick="window.reciclaRenda.hideDashboard()">&times;</span>
          </div>
          <div style="padding: 2rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
              <div class="dashboard-stat">
                <h3>Ganhos Totais</h3>
                <div style="font-size: 2rem; color: var(--primary-color); font-weight: bold;">R$ 347,50</div>
              </div>
              <div class="dashboard-stat">
                <h3>Material Reciclado</h3>
                <div style="font-size: 2rem; color: var(--secondary-color); font-weight: bold;">68 kg</div>
              </div>
              <div class="dashboard-stat">
                <h3>CO₂ Economizado</h3>
                <div style="font-size: 2rem; color: var(--success-color); font-weight: bold;">142 kg</div>
              </div>
            </div>

            <h3>Atividades Recentes</h3>
            <div class="activities-list">
              <div class="activity-item">
                <div><strong>Venda de Papel</strong> - 12kg</div>
                <div style="color: var(--success-color);">+R$ 7,80</div>
              </div>
              <div class="activity-item">
                <div><strong>Coleta de Alumínio</strong> - 3kg</div>
                <div style="color: var(--success-color);">+R$ 18,60</div>
              </div>
              <div class="activity-item">
                <div><strong>Eletrônicos</strong> - 5kg</div>
                <div style="color: var(--success-color);">+R$ 140,00</div>
              </div>
            </div>

            <div style="margin-top: 2rem; padding: 1rem; background: var(--light-color); border-radius: var(--border-radius);">
              <p style="text-align: center; margin: 0;">
                <strong>Parabéns!</strong> Você está ajudando Teresópolis a ser mais sustentável! ❤️🌱
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const dashboardStyles = `
      <style>
        .dashboard-modal {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
          z-index: 2000; backdrop-filter: blur(4px);
        }
        .dashboard-stat { background: var(--light-color); padding: 1.5rem; border-radius: var(--border-radius); text-align: center; }
        .activities-list { background: var(--light-color); border-radius: var(--border-radius); padding: 1rem; margin-top: 1rem; }
        .activity-item { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid rgba(0,0,0,0.1); }
        .activity-item:last-child { border-bottom: none; }
        .modal-content { background: var(--bg, #fff); border-radius: var(--border-radius, 12px); width: 92%; max-width: 800px; overflow: hidden; }
        .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; border-bottom: 1px solid rgba(0,0,0,0.1); }
        .modal-close { cursor: pointer; font-size: 1.5rem; line-height: 1; }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', dashboardStyles);
    document.body.insertAdjacentHTML('beforeend', dashboardHtml);
    document.body.style.overflow = 'hidden';
  }

  hideDashboard() {
    const dashboard = document.querySelector('.dashboard-modal');
    if (dashboard) {
      dashboard.remove();
      document.body.style.overflow = 'auto';
    }
  }

  // Utility Functions
  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }

  showNotification(message, type = 'success') {
    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        display: flex; flex-direction: column; gap: 10px;
      `;
      document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    const bg =
      type === 'success' ? '#2ECC71' :
      type === 'error' ? '#E74C3C' :
      type === 'warning' ? '#F39C12' : '#3498DB';

    notification.style.cssText = `
      background: ${bg}; color: white; padding: 1rem 1.5rem; border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 0.75rem;
      min-width: 300px; max-width: 500px; animation: slideIn 0.3s ease;
    `;

    notification.innerHTML = `
      <i class="fas fa-${this.getNotificationIcon(type)}"></i>
      <span style="flex: 1;">${message}</span>
      <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem;">
        <i class="fas fa-times"></i>
      </button>
    `;

    container.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  getNotificationIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || 'info-circle';
  }
}

// Global helper functions to evitar depender do objeto em HTML inline
function toggleMobileMenu() {
  const nav = document.getElementById('nav');
  const authSection = document.querySelector('.auth-section');
  if (nav) nav.classList.toggle('active');
  if (authSection) authSection.classList.toggle('active');
}

function showModal(modalId) {
  window.reciclaRenda?.showModal(modalId);
}

function hideModal(modalId) {
  window.reciclaRenda?.hideModal(modalId);
}

function switchModal(currentModalId, newModalId) {
  window.reciclaRenda?.switchModal(currentModalId, newModalId);
}

function selectWasteType(type) {
  window.reciclaRenda?.selectWasteType(type);
}

function updateSimulation() {
  window.reciclaRenda?.updateSimulation();
}

function filterPoints(filter, event) {
  window.reciclaRenda?.filterPoints(filter, event);
}

function searchLocation() {
  window.reciclaRenda?.searchLocation();
}

function scrollToSection(sectionId) {
  window.reciclaRenda?.scrollToSection(sectionId);
}

function handleLogin(event) {
  window.reciclaRenda?.handleLogin(event);
}

function handleRegister(event) {
  window.reciclaRenda?.handleRegister(event);
}

function submitContact(event) {
  window.reciclaRenda?.submitContact(event);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.reciclaRenda = new ReciclaRendaWeb();
  console.log('🎉 ReciclaRenda carregado com sucesso! Teresópolis, RJ ❤️');
  console.log('📧 Contato: marcosamorimjr@gmail.com | ☎️ (21) 98697-6714');

  // Add notification animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
    .point-description { font-size: 0.9rem; color: var(--gray-color); margin: 0.5rem 0; font-style: italic; }
  `;
  document.head.appendChild(style);

  document.body.classList.add('loaded');
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && window.reciclaRenda) {
    window.reciclaRenda.startAnimations();
  }
});

// Service Worker (opcional para PWA)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('✅ Service Worker registrado'))
      .catch((err) => console.log('❌ Falha ao registrar SW:', err));
  });
}

// Feito com Amor ❤️ por Marcos Amorim Jr. - Teresópolis, RJ

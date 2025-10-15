// ReciclaRenda - JavaScript 100% Corrigido
// Desenvolvido por: Marcos Amorim Jr. - Teresopolis, RJ
// Email: marcosamorimjr@gmail.com | Tel: (21) 98697-6714

class ReciclaRendaWeb {
    constructor() {
        this.API_BASE = window.location.hostname.includes('vercel.app') || 
                       window.location.hostname.includes('localhost') === false 
                       ? '/api' : 'http://localhost:3000/api';
        
        this.mockData = this.initializeMockData();
        this.currentUser = null;
        this.isLoggedIn = false;
        this.useRealAPI = false;
        this.currentFilter = 'todos';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthStatus();
        this.loadCollectionPoints();
        this.startAnimations();
        this.initScrollEffects();
    }

    initializeMockData() {
        return {
            wasteTypes: {
                papel: { name: 'Papel/Papelao', pricePerKg: 0.65, co2Factor: 3.2, icon: '📄' },
                plastico: { name: 'Plastico', pricePerKg: 1.40, co2Factor: 2.8, icon: '♻️' },
                metal: { name: 'Metal', pricePerKg: 6.20, co2Factor: 8.1, icon: '🥫' },
                vidro: { name: 'Vidro', pricePerKg: 0.25, co2Factor: 1.2, icon: '🍾' },
                eletronicos: { name: 'Eletronicos', pricePerKg: 28.00, co2Factor: 25.5, icon: '📱' },
                moveis: { name: 'Moveis', pricePerKg: 0, co2Factor: 15.0, icon: '🪑' },
                oleo: { name: 'Oleo de Cozinha', pricePerKg: 1.80, co2Factor: 2.5, icon: '🛢️' }
            },
            collectionPoints: [
                {
                    id: 1,
                    name: 'Associacao de Catadores de Teresopolis',
                    type: 'cooperativa',
                    address: 'Tres Corregos, 2º Distrito - Teresopolis, RJ',
                    materials: ['papel', 'plastico', 'vidro', 'metal'],
                    rating: 4.9,
                    distance: '3.2 km',
                    phone: '(21) 2742-9000',
                    hours: 'Seg-Sex: 8h-17h',
                    description: 'Centro de Triagem do Programa Recicla Tere',
                    acceptsFurniture: true,
                    hasScheduledPickup: true
                },
                {
                    id: 2,
                    name: 'Ecoponto Centro - Praca dos Expedicionarios',
                    type: 'ecoponto',
                    address: 'Praca dos Expedicionarios - Centro, Teresopolis, RJ',
                    materials: ['papel', 'plastico', 'vidro', 'metal', 'eletronicos'],
                    rating: 4.7,
                    distance: '1.5 km',
                    phone: '(21) 2742-9000',
                    hours: '24 horas',
                    description: 'Ponto de Entrega Voluntaria',
                    acceptsFurniture: false,
                    hasScheduledPickup: false
                },
                {
                    id: 3,
                    name: 'Catador Joao Silva - Regiao Central',
                    type: 'catador',
                    address: 'Atende toda regiao central de Teresopolis',
                    materials: ['papel', 'metal', 'plastico'],
                    rating: 5.0,
                    distance: '0.5 km',
                    phone: '(21) 98697-6714',
                    hours: 'Disponivel via WhatsApp',
                    description: 'Catador independente parceiro',
                    acceptsFurniture: true,
                    hasScheduledPickup: true,
                    paysCash: true
                }
            ]
        };
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
        
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
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
        const targetId = e.currentTarget.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }

    startAnimations() {
        this.animateCounters();
        this.initIntersectionObserver();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
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
            
            observer.observe(counter.parentElement);
        });
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('section').forEach(section => observer.observe(section));
        document.querySelectorAll('.feature-card, .waste-card, .step').forEach(card => observer.observe(card));
    }

    initScrollEffects() {
        document.querySelectorAll('.feature-card, .waste-card, .step, .point-card').forEach((element, index) => {
            element.setAttribute('data-animate', 'true');
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('reciclarenda_user_web');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.isLoggedIn = true;
                this.updateAuthUI();
            } catch (error) {
                console.error('Erro ao carregar usuario:', error);
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
                    <span>Ola, ${this.currentUser.name}</span>
                    <button class="btn btn-outline" onclick="app.logout()">Sair</button>
                </div>
            `;
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        const form = event.target;
        const email = form.querySelector('#login-email').value;
        const password = form.querySelector('#login-password').value;

        if (!email || !password) {
            this.showNotification('Preencha todos os campos', 'error');
            return;
        }

        const user = {
            id: Date.now(),
            name: 'Marcos Amorim Jr.',
            email: email,
            phone: '(21) 98697-6714',
            type: 'gerador',
            address: 'Teresopolis, RJ',
            joinDate: new Date().toISOString()
        };

        this.currentUser = user;
        this.isLoggedIn = true;
        localStorage.setItem('reciclarenda_user_web', JSON.stringify(user));
        this.hideModal('login-modal');
        this.updateAuthUI();
        this.showNotification('Login realizado com sucesso!', 'success');
    }

    async handleRegister(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.querySelector('#register-name').value;
        const email = form.querySelector('#register-email').value;
        const phone = form.querySelector('#register-phone').value;
        const cep = form.querySelector('#register-cep').value;
        const userType = form.querySelector('#register-type').value;
        const password = form.querySelector('#register-password').value;
        const termsAccepted = form.querySelector('#terms').checked;

        if (!name || !email || !phone || !cep || !userType || !password) {
            this.showNotification('Preencha todos os campos obrigatorios', 'error');
            return;
        }

        if (!termsAccepted) {
            this.showNotification('Voce deve aceitar os termos de uso', 'error');
            return;
        }

        if (password.length < 6) {
            this.showNotification('A senha deve ter pelo menos 6 caracteres', 'error');
            return;
        }

        const user = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            cep: cep,
            type: userType,
            address: `Teresopolis, RJ - CEP ${cep}`,
            joinDate: new Date().toISOString()
        };

        this.currentUser = user;
        this.isLoggedIn = true;
        localStorage.setItem('reciclarenda_user_web', JSON.stringify(user));
        this.hideModal('register-modal');
        this.updateAuthUI();
        this.showNotification(`Bem-vindo(a), ${name}! Conta criada com sucesso!`, 'success');
    }

    logout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        localStorage.removeItem('reciclarenda_user_web');
        localStorage.removeItem('reciclarenda_token');
        
        const authSection = document.querySelector('.auth-section');
        if (authSection) {
            authSection.innerHTML = `
                <button class="btn btn-outline" onclick="app.showModal('login-modal')">Entrar</button>
                <button class="btn btn-primary" onclick="app.showModal('register-modal')">Criar Conta</button>
            `;
        }
        this.showNotification('Logout realizado com sucesso!', 'success');
    }

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

    loadCollectionPoints() {
        const container = document.getElementById('points-container');
        if (!container) return;

        const points = this.mockData.collectionPoints;
        container.innerHTML = points.map(point => this.createPointCard(point)).join('');
    }

    createPointCard(point) {
        const materialsHtml = point.materials.map(m => 
            `<span class="material-tag">${this.mockData.wasteTypes[m].icon} ${this.mockData.wasteTypes[m].name}</span>`
        ).join('');

        return `
            <div class="point-card" data-type="${point.type}">
                <div class="point-header">
                    <div>
                        <h3 class="point-name">${point.name}</h3>
                        <span class="point-type">${point.type}</span>
                    </div>
                    <div class="point-rating">
                        <i class="fas fa-star"></i>
                        <span>${point.rating}</span>
                    </div>
                </div>
                <p class="point-address">
                    <i class="fas fa-map-marker-alt"></i>
                    ${point.address}
                </p>
                <div class="point-materials">
                    ${materialsHtml}
                </div>
                <div class="point-distance">
                    <i class="fas fa-route"></i> ${point.distance}
                </div>
                <p>${point.description}</p>
                <div class="point-contact">
                    <a href="tel:${point.phone}" class="btn btn-outline">
                        <i class="fas fa-phone"></i> Ligar
                    </a>
                    <a href="https://wa.me/${point.phone.replace(/\D/g, '')}" class="btn btn-primary" target="_blank">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
        `;
    }

    filterPoints(type) {
        this.currentFilter = type;
        const cards = document.querySelectorAll('.point-card');
        const buttons = document.querySelectorAll('.filter-btn');

        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        cards.forEach(card => {
            if (type === 'todos' || card.dataset.type === type) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchLocation() {
        const input = document.getElementById('location-input');
        if (input && input.value) {
            this.showNotification(`Buscando pontos proximos a: ${input.value}`, 'success');
        }
    }

    async sendContactForm(event) {
        event.preventDefault();
        const form = event.target;
        
        this.showNotification('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');
        form.reset();
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    switchModal(currentModalId, newModalId) {
        this.hideModal(currentModalId);
        setTimeout(() => this.showModal(newModalId), 300);
    }

    toggleMobileMenu() {
        const nav = document.getElementById('nav');
        const authSection = document.querySelector('.auth-section');
        if (nav) nav.classList.toggle('active');
        if (authSection) authSection.classList.toggle('active');
    }

    showNotification(message, type = 'success') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = element.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }
}

const app = new ReciclaRendaWeb();
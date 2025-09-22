// ReciclaRenda - JavaScript 100% Web (Cliente)
class ReciclaRendaWeb {
    constructor() {
        this.mockData = this.initializeMockData();
        this.currentUser = null;
        this.isLoggedIn = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthStatus();
        this.loadCollectionPoints();
        this.startAnimations();
        this.initScrollEffects();
    }

    // Dados mockados para simular backend
    initializeMockData() {
        return {
            wasteTypes: {
                papel: { name: 'Papel/Papelão', pricePerKg: 0.55, co2Factor: 3.2 },
                plastico: { name: 'Plástico', pricePerKg: 1.25, co2Factor: 2.8 },
                metal: { name: 'Metal', pricePerKg: 5.50, co2Factor: 8.1 },
                vidro: { name: 'Vidro', pricePerKg: 0.20, co2Factor: 1.2 },
                eletronicos: { name: 'Eletrônicos', pricePerKg: 25.00, co2Factor: 25.5 },
                moveis: { name: 'Móveis', pricePerKg: 0, co2Factor: 0 }
            },
            collectionPoints: [
                {
                    id: 1,
                    name: 'EcoCooperativa Verde',
                    type: 'cooperativas',
                    address: 'Rua das Flores, 123 - Centro',
                    materials: ['papel', 'plastico', 'vidro'],
                    rating: 4.8,
                    distance: '1.2 km',
                    phone: '(11) 9999-1111',
                    hours: 'Seg-Sex: 8h-17h'
                },
                {
                    id: 2,
                    name: 'ReciclaMax Empresarial',
                    type: 'empresas',
                    address: 'Av. Industrial, 456 - Distrito',
                    materials: ['metal', 'eletronicos'],
                    rating: 4.6,
                    distance: '2.8 km',
                    phone: '(11) 9999-2222',
                    hours: 'Seg-Sab: 7h-18h'
                },
                {
                    id: 3,
                    name: 'João - Catador Independente',
                    type: 'catadores',
                    address: 'Atende região central',
                    materials: ['papel', 'metal', 'plastico'],
                    rating: 4.9,
                    distance: '0.8 km',
                    phone: '(11) 9999-3333',
                    hours: 'Disponível via WhatsApp'
                },
                {
                    id: 4,
                    name: 'Cooperativa Sustentável',
                    type: 'cooperativas',
                    address: 'Rua da Reciclagem, 789',
                    materials: ['papel', 'plastico', 'vidro', 'metal'],
                    rating: 4.7,
                    distance: '3.1 km',
                    phone: '(11) 9999-4444',
                    hours: 'Seg-Sex: 8h-16h'
                },
                {
                    id: 5,
                    name: 'TechRecicla',
                    type: 'empresas',
                    address: 'Av. Tecnológica, 321',
                    materials: ['eletronicos'],
                    rating: 4.5,
                    distance: '4.2 km',
                    phone: '(11) 9999-5555',
                    hours: 'Seg-Sex: 9h-18h'
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
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Animate elements on scroll
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
        // Handle responsive behavior
        if (window.innerWidth > 768) {
            document.getElementById('nav').classList.remove('active');
            document.querySelector('.auth-section').classList.remove('active');
        }
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
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
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
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

            // Start animation when element is visible
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
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe cards
        document.querySelectorAll('.feature-card, .waste-card, .step').forEach(card => {
            observer.observe(card);
        });
    }

    initScrollEffects() {
        // Add data-animate attributes to elements
        document.querySelectorAll('.feature-card, .waste-card, .step, .point-card').forEach((element, index) => {
            element.setAttribute('data-animate', 'true');
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Authentication (Mock)
    checkAuthStatus() {
        const savedUser = localStorage.getItem('reciclarenda_user_web');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isLoggedIn = true;
            this.updateAuthUI();
        }
    }

    updateAuthUI() {
        const authSection = document.querySelector('.auth-section');
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
        }
    }

    // Waste Type Selection
    selectWasteType(type) {
        this.showNotification(`Material selecionado: ${this.mockData.wasteTypes[type].name}`, 'success');

        // Update simulator if visible
        const materialSelect = document.getElementById('material-select');
        if (materialSelect) {
            materialSelect.value = type;
            this.updateSimulation();
        }

        // Scroll to simulator
        this.scrollToSection('simulador');
    }

    // Simulator
    updateSimulation() {
        const materialSelect = document.getElementById('material-select');
        const weightInput = document.getElementById('weight-input');
        const totalValue = document.getElementById('total-value');
        const co2Saved = document.getElementById('co2-saved');

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
    loadCollectionPoints() {
        const container = document.getElementById('points-container');
        if (!container) return;

        container.innerHTML = this.mockData.collectionPoints.map(point => `
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
                    ${point.materials.map(material => 
                        `<span class="material-tag">${this.mockData.wasteTypes[material].name}</span>`
                    ).join('')}
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

                <button class="btn btn-primary" onclick="window.reciclaRenda.contactPoint(${point.id})">
                    <i class="fas fa-phone"></i>
                    Entrar em Contato
                </button>
            </div>
        `).join('');
    }

    getPointTypeLabel(type) {
        const labels = {
            'cooperativas': 'Cooperativa',
            'empresas': 'Empresa',
            'catadores': 'Catador'
        };
        return labels[type] || type;
    }

    filterPoints(filter) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Filter point cards
        document.querySelectorAll('.point-card').forEach(card => {
            if (filter === 'all' || card.dataset.type === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    contactPoint(pointId) {
        const point = this.mockData.collectionPoints.find(p => p.id === pointId);
        if (point) {
            const whatsappNumber = point.phone.replace(/[^0-9]/g, '');
            const message = encodeURIComponent(`Olá! Vi o ${point.name} no ReciclaRenda e gostaria de saber mais sobre a coleta de recicláveis.`);
            const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${message}`;

            window.open(whatsappUrl, '_blank');
            this.showNotification(`Redirecionando para WhatsApp de ${point.name}`, 'success');
        }
    }

    // Location Search
    searchLocation() {
        const input = document.getElementById('location-input');
        const location = input.value.trim();

        if (location) {
            this.showNotification(`Buscando pontos próximos a: ${location}`, 'success');
            // Em uma implementação real, aqui seria feita a busca via API
            // Por ora, apenas recarregamos os pontos
            this.loadCollectionPoints();
        } else {
            this.showNotification('Digite um CEP ou cidade para buscar', 'warning');
        }
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Focus on first input
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
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

    // Authentication Handlers
    handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
        const password = formData.get('password') || event.target.querySelector('input[type="password"]').value;

        // Simple validation
        if (!email || !password) {
            this.showNotification('Preencha todos os campos', 'error');
            return;
        }

        // Mock login
        const user = {
            id: Date.now(),
            name: 'Usuário Demo',
            email: email,
            type: 'gerador',
            joinDate: new Date().toISOString()
        };

        this.currentUser = user;
        this.isLoggedIn = true;
        localStorage.setItem('reciclarenda_user_web', JSON.stringify(user));

        this.hideModal('login-modal');
        this.updateAuthUI();
        this.showNotification('Login realizado com sucesso! 🎉', 'success');
    }

    handleRegister(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        // Get form values
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const cep = form.querySelector('input[type="text"][placeholder*="CEP"]').value;
        const userType = form.querySelector('select').value;
        const password = form.querySelector('input[type="password"]').value;
        const termsAccepted = form.querySelector('input[type="checkbox"]').checked;

        // Validation
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

        // Mock registration
        const user = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            cep: cep,
            type: userType,
            joinDate: new Date().toISOString()
        };

        this.currentUser = user;
        this.isLoggedIn = true;
        localStorage.setItem('reciclarenda_user_web', JSON.stringify(user));

        this.hideModal('register-modal');
        this.updateAuthUI();
        this.showNotification(`Bem-vindo(a), ${name}! Conta criada com sucesso! 🎉`, 'success');
    }

    logout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        localStorage.removeItem('reciclarenda_user_web');

        // Reset auth UI
        const authSection = document.querySelector('.auth-section');
        authSection.innerHTML = `
            <button class="btn btn-outline" onclick="showModal('login-modal')">Entrar</button>
            <button class="btn btn-primary" onclick="showModal('register-modal')">Cadastrar</button>
        `;

        this.showNotification('Logout realizado com sucesso!', 'success');
    }

    // Contact Form
    submitContact(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        if (!name || !email || !message) {
            this.showNotification('Preencha todos os campos', 'error');
            return;
        }

        // Mock form submission
        this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve. 📧', 'success');
        form.reset();
    }

    // Dashboard (Mock)
    showDashboard() {
        const dashboardHtml = `
            <div class="dashboard-modal">
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2><i class="fas fa-chart-line"></i> Meu Dashboard</h2>
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
                                <div style="color: var(--success-color);">+R$ 6,60</div>
                            </div>
                            <div class="activity-item">
                                <div><strong>Coleta de Alumínio</strong> - 3kg</div>
                                <div style="color: var(--success-color);">+R$ 16,50</div>
                            </div>
                            <div class="activity-item">
                                <div><strong>Eletrônicos</strong> - 5kg</div>
                                <div style="color: var(--success-color);">+R$ 125,00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add dashboard styles
        const dashboardStyles = `
            <style>
                .dashboard-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    backdrop-filter: blur(4px);
                }
                .dashboard-stat {
                    background: var(--light-color);
                    padding: 1.5rem;
                    border-radius: var(--border-radius);
                    text-align: center;
                }
                .activities-list {
                    background: var(--light-color);
                    border-radius: var(--border-radius);
                    padding: 1rem;
                    margin-top: 1rem;
                }
                .activity-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                }
                .activity-item:last-child {
                    border-bottom: none;
                }
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
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = element.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    showNotification(message, type = 'success') {
        const container = document.getElementById('notification-container');
        if (!container) {
            // Create notification container if it doesn't exist
            const newContainer = document.createElement('div');
            newContainer.id = 'notification-container';
            document.body.appendChild(newContainer);
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: auto;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.getElementById('notification-container').appendChild(notification);

        // Auto remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    const authSection = document.querySelector('.auth-section');

    nav.classList.toggle('active');
    authSection.classList.toggle('active');
}

// Global Functions
function showModal(modalId) {
    window.reciclaRenda.showModal(modalId);
}

function hideModal(modalId) {
    window.reciclaRenda.hideModal(modalId);
}

function switchModal(currentModalId, newModalId) {
    window.reciclaRenda.switchModal(currentModalId, newModalId);
}

function selectWasteType(type) {
    window.reciclaRenda.selectWasteType(type);
}

function updateSimulation() {
    window.reciclaRenda.updateSimulation();
}

function filterPoints(filter) {
    window.reciclaRenda.filterPoints(filter);
}

function searchLocation() {
    window.reciclaRenda.searchLocation();
}

function scrollToSection(sectionId) {
    window.reciclaRenda.scrollToSection(sectionId);
}

function handleLogin(event) {
    window.reciclaRenda.handleLogin(event);
}

function handleRegister(event) {
    window.reciclaRenda.handleRegister(event);
}

function submitContact(event) {
    window.reciclaRenda.submitContact(event);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.reciclaRenda = new ReciclaRendaWeb();
    console.log('🎉 ReciclaRenda carregado com sucesso!');

    // Add loading animation
    document.body.classList.add('loaded');
});

// Handle page visibility for better performance
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible, refresh animations
        window.reciclaRenda.startAnimations();
    }
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
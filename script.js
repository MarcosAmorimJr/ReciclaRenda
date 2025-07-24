// Menu mobile e navegação suave
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const authButtons = document.querySelector('.auth-buttons');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = nav.style.display === 'block';
        nav.style.display = isOpen ? 'none' : 'block';
        authButtons.style.display = isOpen ? 'none' : 'flex';
        
        // Adiciona/remove classes para animação
        if (!isOpen) {
            nav.classList.add('mobile-menu');
            authButtons.classList.add('mobile-auth');
        } else {
            nav.classList.remove('mobile-menu');
            authButtons.classList.remove('mobile-auth');
        }
    });

    // Navegação suave corrigida
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fecha o menu mobile se estiver aberto
                if (window.innerWidth <= 768 && nav.style.display === 'block') {
                    nav.style.display = 'none';
                    authButtons.style.display = 'none';
                    nav.classList.remove('mobile-menu');
                    authButtons.classList.remove('mobile-auth');
                }
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Atualiza a URL sem recarregar a página
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Verifica a URL ao carregar para rolar até a seção correta
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Header com efeito de scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Animação dos elementos ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .waste-card, .testimonial-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Gerenciamento de usuários (simulado para o MVP)
const users = JSON.parse(localStorage.getItem('reciclarenda_users')) || [];

// Elementos dos modais
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const closeButtons = document.querySelectorAll('.close-modal');

// Abrir modais
document.querySelectorAll('.btn-outline, .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent.includes('Entrar') || this.textContent.includes('Cadastrar')) {
            if (users.length > 0 && this.textContent.includes('Entrar')) {
                loginModal.style.display = 'block';
            } else {
                registerModal.style.display = 'block';
            }
        }
    });
});

// Fechar modais
closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Alternar entre login e cadastro
showRegister.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
});

showLogin.addEventListener('click', function(e) {
    e.preventDefault();
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Fechar ao clicar fora do modal
window.addEventListener('click', function(e) {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === registerModal) registerModal.style.display = 'none';
});

// Formulário de cadastro
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = {
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        type: document.getElementById('registerType').value,
        createdAt: new Date()
    };
    
    // Verifica se usuário já existe
    if (users.some(u => u.email === user.email)) {
        alert('Este e-mail já está cadastrado!');
        return;
    }
    
    users.push(user);
    localStorage.setItem('reciclarenda_users', JSON.stringify(users));
    
    alert('Cadastro realizado com sucesso! Faça login para continuar.');
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
    
    // Limpa o formulário
    this.reset();
});

// Formulário de login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('reciclarenda_currentUser', JSON.stringify(user));
        alert('Login realizado com sucesso!');
        loginModal.style.display = 'none';
        updateHeaderForLoggedInUser(user);
    } else {
        alert('E-mail ou senha incorretos!');
    }
    
    // Limpa o formulário
    this.reset();
});

// Atualiza o header quando o usuário está logado
function updateHeaderForLoggedInUser(user) {
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.innerHTML = `
        <div class="user-dropdown">
            <button class="user-btn">
                <i class="fas fa-user-circle"></i>
                <span>${user.name.split(' ')[0]}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="#"><i class="fas fa-user"></i> Perfil</a>
                <a href="#"><i class="fas fa-history"></i> Meus resíduos</a>
                <a href="#"><i class="fas fa-wallet"></i> Minha renda</a>
                <a href="#" id="logout"><i class="fas fa-sign-out-alt"></i> Sair</a>
            </div>
        </div>
    `;
    
    // Logout
    document.getElementById('logout')?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('reciclarenda_currentUser');
        location.reload();
    });
}

// Verifica se há usuário logado ao carregar a página
const currentUser = JSON.parse(localStorage.getItem('reciclarenda_currentUser'));
if (currentUser) {
    updateHeaderForLoggedInUser(currentUser);
}

// Mapa interativo (usando Leaflet.js - adicione este link no <head>)
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

function initMap() {
    // Dados simulados de pontos de coleta
    const collectionPoints = [
        {
            id: 1,
            name: "Cooperativa Recicla Vida",
            lat: -23.5505,
            lng: -46.6333,
            type: "cooperative",
            materials: ["paper", "plastic", "glass", "metal"],
            address: "Rua da Reciclagem, 123 - Centro"
        },
        {
            id: 2,
            name: "Ecoponto Vila Verde",
            lat: -23.5605,
            lng: -46.6433,
            type: "ecopoint",
            materials: ["electronic", "furniture"],
            address: "Av. Sustentável, 456 - Vila Verde"
        },
        {
            id: 3,
            name: "Compostagem Comunitária",
            lat: -23.5405,
            lng: -46.6233,
            type: "composting",
            materials: ["organic"],
            address: "Praça da Horta, s/n - Jardim"
        }
    ];

    // Centraliza no Brasil
    const map = L.map('map').setView([-15.7801, -47.9292], 4);
    
    // Adiciona o tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ícones personalizados
    const iconTypes = {
        cooperative: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063187.png',
            iconSize: [32, 32]
        }),
        ecopoint: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484613.png',
            iconSize: [32, 32]
        }),
        composting: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
            iconSize: [32, 32]
        })
    };

    // Adiciona marcadores
    collectionPoints.forEach(point => {
        const marker = L.marker([point.lat, point.lng], {
            icon: iconTypes[point.type]
        }).addTo(map);
        
        const materialsText = point.materials.map(m => {
            const names = {
                paper: "Papel/Papelão",
                plastic: "Plástico",
                glass: "Vidro",
                metal: "Metal",
                electronic: "Eletrônicos",
                furniture: "Móveis",
                organic: "Orgânicos"
            };
            return names[m];
        }).join(", ");
        
        marker.bindPopup(`
            <h3>${point.name}</h3>
            <p><strong>Endereço:</strong> ${point.address}</p>
            <p><strong>Aceita:</strong> ${materialsText}</p>
            <button class="btn btn-primary" style="width:100%;margin-top:10px;">
                <i class="fas fa-route"></i> Como chegar
            </button>
        `);
    });

    // Filtro de materiais
    document.getElementById('filterMaterial').addEventListener('change', function() {
        const material = this.value;
        // Implementar lógica de filtro aqui
    });

    // Usar localização do usuário
    document.getElementById('useLocation').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                map.setView([position.coords.latitude, position.coords.longitude], 13);
                L.marker([position.coords.latitude, position.coords.longitude], {
                    icon: L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
                        iconSize: [32, 32]
                    })
                }).addTo(map).bindPopup("Sua localização").openPopup();
            });
        } else {
            alert("Geolocalização não é suportada por este navegador.");
        }
    });
}

// Inicializa o mapa quando a página carregar
window.addEventListener('load', initMap);
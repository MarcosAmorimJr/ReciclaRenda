// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const authButtons = document.querySelector('.auth-buttons');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        authButtons.style.display = authButtons.style.display === 'flex' ? 'none' : 'flex';
        
        if (nav.style.display === 'block') {
            nav.classList.add('mobile-menu');
            authButtons.classList.add('mobile-auth');
        } else {
            nav.classList.remove('mobile-menu');
            authButtons.classList.remove('mobile-auth');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                    authButtons.style.display = 'none';
                    nav.classList.remove('mobile-menu');
                    authButtons.classList.remove('mobile-auth');
                }
            }
        });
    });
    
    // Adiciona classe ao scroll para header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animação dos cards ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .waste-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar a página
});

// Adiciona estilos dinâmicos para o menu mobile
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        nav.mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--white);
            padding: 1rem;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        
        nav.mobile-menu ul {
            flex-direction: column;
            gap: 1rem;
        }
        
        .auth-buttons.mobile-auth {
            position: absolute;
            top: calc(100% + 180px);
            left: 20px;
            flex-direction: column;
            gap: 1rem;
            width: calc(100% - 40px);
        }
        
        header.scrolled {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
    }
    
    .feature-card, .waste-card, .testimonial-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .feature-card.animated, .waste-card.animated, .testimonial-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
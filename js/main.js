document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Filter writeups
    const filterButtons = document.querySelectorAll('.filter-btn');
    const writeupCards = document.querySelectorAll('.writeup-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter writeups
            writeupCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
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
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Highlight current section in navbar
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Copy flag buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const flagInput = button.previousElementSibling;
            flagInput.select();
            document.execCommand('copy');
            
            // Feedback animation
            const originalText = button.textContent;
            button.textContent = 'Copié!';
            button.style.backgroundColor = 'var(--accent)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = 'var(--primary)';
            }, 2000);
        });
    });
    
    // Initialize Prism for code highlighting
    if (window.Prism) {
        Prism.highlightAll();
    }
});

// Filtrage des projets
const projectFilterButtons = document.querySelectorAll('#projects .filter-btn');
const projectCards = document.querySelectorAll('.project-card');

projectFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Active le bouton
        projectFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        // Filtre les projets
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
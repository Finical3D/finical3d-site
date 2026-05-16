// JavaScript Document

// Hero Carousel
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 4000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

if (slides.length > 0) {
    startSlideShow();

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopSlideShow);
        carousel.addEventListener('mouseleave', startSlideShow);

        // Touch swipe handling
        let touchStartX = 0;
        let touchStartTime = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartTime = Date.now();
            stopSlideShow();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const elapsed = Date.now() - touchStartTime;
            const distance = touchStartX - touchEndX;
            const velocity = Math.abs(distance) / elapsed;

            const minDistance = 50;
            const maxVelocity = 1.2;

            if (Math.abs(distance) > minDistance && velocity < maxVelocity) {
                if (distance > 0) {
                    currentSlide = (currentSlide + 1) % slides.length;
                } else {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                }
                showSlide(currentSlide);
            }
            startSlideShow();
        }, { passive: true });
    }
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('resize', updateActiveNav);
updateActiveNav();

// Category filter
const tabButtons = document.querySelectorAll('.tab-btn');
const collectionCards = document.querySelectorAll('.collection-card');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        collectionCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, 100);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = navbar.offsetHeight;
            const offsetTop = targetId === '#home' ? 0 : target.offsetTop - navHeight;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-content');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        grecaptcha.ready(() => {
            grecaptcha.execute('6LfwAO0sAAAAAH16-kgTh71RlAa4y_e5yblHdCAm', { action: 'submit' }).then((token) => {
                const formData = new FormData(contactForm);
                formData.append('recaptcha_token', token);

                fetch('/api/contact', {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        submitBtn.textContent = 'Message Sent! ✓';
                        submitBtn.style.background = '#4CAF50';
                        contactForm.reset();
                    } else {
                        submitBtn.textContent = 'Something went wrong';
                        submitBtn.style.background = '#e53e3e';
                    }
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.opacity = '';
                        submitBtn.disabled = false;
                    }, 3000);
                })
                .catch(() => {
                    submitBtn.textContent = 'Error — try again';
                    submitBtn.style.background = '#e53e3e';
                    submitBtn.disabled = false;
                });
            });
        });
    });
}

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = '';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.featured-container, .contact-content').forEach(el => {
    observer.observe(el);
});
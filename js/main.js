// Main JavaScript for Onvo Bath Fitting

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in-up');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
                element.classList.add('animate-fade-in-up');
            }
        });
    };

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Run once on page load with a slight delay to trigger initial animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);

    // Product Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button with enhanced styling
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-gold', 'text-black', 'shadow-lg');
                btn.classList.add('bg-gray-100', 'text-gray-800', 'shadow-md');
            });

            this.classList.remove('bg-gray-100', 'text-gray-800', 'shadow-md');
            this.classList.add('bg-gold', 'text-black', 'shadow-lg');

            // Filter products with fade effect
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Trigger reflow to restart animation
                    card.style.animation = 'none';
                    card.offsetHeight; // reflow
                    card.style.animation = null;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your inquiry! We will contact you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});

// Hero Slider Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is available, if not load it
    if (typeof gsap === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = initHeroSlider;
        document.head.appendChild(script);
    } else {
        initHeroSlider();
    }

    function initHeroSlider() {
        // Hero Slider Configuration
        const heroImages = [
            'assets/hero/1.png',
            'assets/hero/2.png',
            'assets/hero/3.png',
            'assets/hero/4.png',
            'assets/hero/5.png',
            'assets/hero/6.png',
            'assets/hero/7.png'
        ];

        const tilesContainer = document.querySelector('.hero-tiles-container');
        const prevButton = document.getElementById('prev-slide');
        const nextButton = document.getElementById('next-slide');
        const paginationDots = document.querySelector('.pagination-dots');

        let currentIndex = 0;
        let isAnimating = false;
        let animationStyle = 0; // Track current animation style

        // Adjust tile grid based on screen size for performance
        const isMobile = window.innerWidth <= 768;
        const rows = isMobile ? 4 : 6;
        const cols = isMobile ? 4 : 6;
        const totalTiles = rows * cols;

        // Define multiple animation styles
        const animationStyles = [
            // Style 1: Random scatter with rotation and scale
            {
                out: {
                    duration: 0.6,
                    opacity: 0,
                    x: function() { return (Math.random() - 0.5) * 100; },
                    y: function() { return (Math.random() - 0.5) * 100; },
                    rotation: function() { return (Math.random() - 0.5) * 30; },
                    scale: function() { return 0.8 + Math.random() * 0.4; },
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.3, from: "random", grid: [rows, cols] }
                },
                in: {
                    duration: 0.6,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.3, from: "random", grid: [rows, cols] }
                }
            },
            // Style 2: Wave effect from left to right
            {
                out: {
                    duration: 0.7,
                    opacity: 0,
                    y: function() { return (Math.random() - 0.5) * 80; },
                    rotation: function() { return (Math.random() - 0.5) * 20; },
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.4, from: "start", grid: [rows, cols], axis: "x" }
                },
                in: {
                    duration: 0.7,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.4, from: "start", grid: [rows, cols], axis: "x" }
                }
            },
            // Style 3: Diagonal wipe
            {
                out: {
                    duration: 0.6,
                    opacity: 0,
                    x: function() { return (Math.random() - 0.5) * 60; },
                    y: function() { return (Math.random() - 0.5) * 60; },
                    scale: function() { return 0.7 + Math.random() * 0.3; },
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.35, from: "edges", grid: [rows, cols] }
                },
                in: {
                    duration: 0.6,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.35, from: "edges", grid: [rows, cols] }
                }
            },
            // Style 4: Vertical cascade
            {
                out: {
                    duration: 0.8,
                    opacity: 0,
                    x: function() { return (Math.random() - 0.5) * 120; },
                    rotation: function() { return (Math.random() - 0.5) * 45; },
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.5, from: "center", grid: [rows, cols], axis: "y" }
                },
                in: {
                    duration: 0.8,
                    opacity: 1,
                    x: 0,
                    rotation: 0,
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.5, from: "center", grid: [rows, cols], axis: "y" }
                }
            },
            // Style 5: Spiral effect
            {
                out: {
                    duration: 0.7,
                    opacity: 0,
                    rotation: function() { return (Math.random() - 0.5) * 90; },
                    scale: function() { return 0.5 + Math.random() * 0.5; },
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.4, from: "center", grid: [rows, cols] }
                },
                in: {
                    duration: 0.7,
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                    stagger: { amount: 0.4, from: "center", grid: [rows, cols] }
                }
            }
        ];

        // Create pagination dots
        heroImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dot.addEventListener('click', () => goToSlide(index));
            paginationDots.appendChild(dot);
        });

        // Initialize slider
        createTiles(currentIndex);

        // Event listeners
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Auto advance slides
        setInterval(nextSlide, 5000);

        function createTiles(imageIndex) {
            tilesContainer.innerHTML = '';
            const imageUrl = heroImages[imageIndex];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const tile = document.createElement('div');
                    tile.classList.add('hero-tile');

                    // Calculate background position for this tile
                    const xPercent = -(col * 100);
                    const yPercent = -(row * 100);

                    tile.style.backgroundImage = `url('${imageUrl}')`;
                    tile.style.backgroundPosition = `${xPercent}% ${yPercent}%`;

                    tilesContainer.appendChild(tile);
                }
            }
        }

        function nextSlide() {
            if (isAnimating) return;
            goToSlide((currentIndex + 1) % heroImages.length);
        }

        function prevSlide() {
            if (isAnimating) return;
            goToSlide((currentIndex - 1 + heroImages.length) % heroImages.length);
        }

        function goToSlide(index) {
            if (isAnimating || index === currentIndex) return;

            isAnimating = true;
            const tiles = Array.from(tilesContainer.children);

            // Update active dot
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Get current animation style
            const currentAnimation = animationStyles[animationStyle];

            // Animate out current tiles
            gsap.to(tiles, currentAnimation.out);

            // After animation, create new tiles and animate in
            setTimeout(() => {
                currentIndex = index;
                // Move to next animation style
                animationStyle = (animationStyle + 1) % animationStyles.length;
                createTiles(currentIndex);

                const newTiles = Array.from(tilesContainer.children);

                // Reset new tiles to hidden state
                gsap.set(newTiles, {
                    opacity: 0,
                    x: currentAnimation.in.x || 0,
                    y: currentAnimation.in.y || 0,
                    rotation: currentAnimation.in.rotation || 0,
                    scale: currentAnimation.in.scale || 1
                });

                // Animate in new tiles
                gsap.to(newTiles, {
                    ...currentAnimation.in,
                    onComplete: () => {
                        isAnimating = false;
                    }
                });
            }, currentAnimation.out.duration * 1000);
        }
    }
});
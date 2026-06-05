// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a, .hero-buttons a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== "#" && href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('portfolioForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = this.querySelector('input[placeholder="Your name"]');
        const emailInput = this.querySelector('input[placeholder="Email address"]');
        const msgArea = this.querySelector('textarea');
        
        if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || msgArea.value.trim() === "") {
            alert("Please fill in all fields before sending ✨");
            return;
        }
        
        // Simulate success
        alert(`Thanks ${nameInput.value}! I'll get back to you within 24 hours. 📬`);
        this.reset();
    });
}

// Update footer year dynamically
const footerPara = document.querySelector('footer p');
if (footerPara) {
    const currentYear = new Date().getFullYear();
    if (footerPara.innerText.includes('2025')) {
        footerPara.innerHTML = `© ${currentYear} Shine John — crafted with <i class="fas fa-heart" style="color: #f97316;"></i> | Built with HTML/CSS/JS | Open for opportunities`;
    }
}

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function highlightNav() {
    let current = "";
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.style.color = "";
        if (link.getAttribute("href") === `#${current}`) {
            link.style.color = "var(--primary)";
        } else {
            link.style.color = "#1f2937";
        }
    });
}

window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);

// ========== TAB TITLE ATTENTION GRABBER ==========
(function() {
    // Use a more reliable way to get the original title
    let originalTitle = document.title;
    let attentionMsg = "Hey, come back! 👋";
    let isBlurred = false;

    // Function to change title
    function setAttention() {
        if (document.title !== attentionMsg) {
            document.title = attentionMsg;
        }
    }

    function restoreTitle() {
        if (document.title !== originalTitle) {
            document.title = originalTitle;
        }
    }

    // Listen for page visibility change (modern approach - works better)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden (user switched tab)
            setAttention();
        } else {
            // Page is visible again
            restoreTitle();
        }
    });

    // Also listen for window blur/focus as fallback
    window.addEventListener('blur', function() {
        isBlurred = true;
        setAttention();
    });

    window.addEventListener('focus', function() {
        if (isBlurred) {
            restoreTitle();
            isBlurred = false;
        }
    });

    // Debug: log to console to confirm script loaded
    console.log("Tab attention grabber active ✅");
})();

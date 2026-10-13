document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Hamburger Menu
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            mobileToggle.classList.toggle("open");
        });

        // Close on link click
        navMenu.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                mobileToggle.classList.remove("open");
            });
        });
    }

    // 2. Active Section Spy & Navbar Blur on Scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // 3. Dynamic Skills Category Filter
    const filterButtons = document.querySelectorAll(".filter-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            skillCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(10px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 200);
                }
            });
        });
    });

    // 4. Contact Form Handler (Interactive Feedback)
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) return;

            // Visual loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                submitBtn.innerHTML = `<span>Sent Successfully!</span> <i class="fas fa-check"></i>`;
                submitBtn.style.background = "#10b981";

                // Direct email trigger as fallback
                const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
                const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
                window.location.href = `mailto:shinejohn26@gmail.com?subject=${subject}&body=${body}`;

                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.background = "";
                    submitBtn.innerHTML = `<span>Send Message</span> <i class="fas fa-arrow-right"></i>`;
                }, 4000);
            }, 800);
        });
    }

    // 5. Back to Top Button
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 6. Dynamic Copyright Year
    const yearElem = document.getElementById("currentYear");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 7. Tab Attention Grabber
    let originalTitle = document.title;
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            document.title = "Let's connect! ⚡ | Shine John";
        } else {
            document.title = originalTitle;
        }
    });
});

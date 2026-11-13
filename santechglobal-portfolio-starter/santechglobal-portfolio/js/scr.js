
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const revealElements = document.querySelectorAll(".reveal");
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    // MOBILE NAVIGATION
    function closeMenu() {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    // SCROLL REVEAL ANIMATION
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // ACTIVE NAVIGATION LINK
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.id;

                        navLinks.forEach(link => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${currentId}`
                            );
                        });
                    }
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // CURRENT FOOTER YEAR
    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

    // CONTACT FORM
    // This prepares an email; it does not store form submissions.
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formData = new FormData(contactForm);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const service = formData.get("service");
        const budget = formData.get("budget").trim();
        const message = formData.get("message").trim();

        const subject = encodeURIComponent(
            `New project enquiry from ${name}`
        );

        const body = encodeURIComponent(
`Hello SantechGlobal,

I would like to discuss a project.

Name: ${name}
Email: ${email}
Service: ${service}
Budget: ${budget || "Not specified"}

Project details:
${message}

Regards,
${name}`
        );

        const mailtoLink =
            `mailto:santechglobal80@gmail.com?subject=${subject}&body=${body}`;

        formFeedback.textContent =
            "Opening your email application...";

        window.location.href = mailtoLink;
    });
});

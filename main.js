/* ============================================================
   MAIN.JS — Portfolio Interactivity
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
	initNavbar();
	initMobileMenu();
	initTypewriter();
	initScrollReveal();
	initScrollSpy();
	initSkillBars();
	initCounters();
	initParticles();
	initBackToTop();
	initContactForm();
	initProfilePhotoEditor();
});

/* ============================================================
   NAVBAR — Scroll Effect
   ============================================================ */
function initNavbar() {
	const navbar = document.getElementById("navbar");
	let lastScroll = 0;

	window.addEventListener("scroll", () => {
		const currentScroll = window.scrollY;

		if (currentScroll > 50) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}

		lastScroll = currentScroll;
	});
}

/* ============================================================
   MOBILE MENU — Hamburger Toggle
   ============================================================ */
function initMobileMenu() {
	const hamburger = document.getElementById("hamburger");
	const navMenu = document.getElementById("nav-menu");
	const navLinks = document.querySelectorAll(".nav-link");

	hamburger.addEventListener("click", () => {
		hamburger.classList.toggle("active");
		navMenu.classList.toggle("active");
		document.body.style.overflow = navMenu.classList.contains("active")
			? "hidden"
			: "";
	});

	// Close menu when a link is clicked
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			hamburger.classList.remove("active");
			navMenu.classList.remove("active");
			document.body.style.overflow = "";
		});
	});

	// Close menu on outside click
	document.addEventListener("click", (e) => {
		if (
			navMenu.classList.contains("active") &&
			!navMenu.contains(e.target) &&
			!hamburger.contains(e.target)
		) {
			hamburger.classList.remove("active");
			navMenu.classList.remove("active");
			document.body.style.overflow = "";
		}
	});
}

/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
function initTypewriter() {
	const element = document.getElementById("typewriter");
	if (!element) return;

	const strings = [
		"Frontend Developer",
		"Python Developer",
		"Computer Science Engineer",
		"Machine Learning Enthusiast",
		"Full-Stack Developer",
		"Problem Solver",
	];

	let stringIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	const typingSpeed = 80;
	const deletingSpeed = 40;
	const pauseTime = 2000;

	function type() {
		const currentString = strings[stringIndex];

		if (isDeleting) {
			element.textContent = currentString.substring(0, charIndex - 1);
			charIndex--;
		} else {
			element.textContent = currentString.substring(0, charIndex + 1);
			charIndex++;
		}

		let timeout = isDeleting ? deletingSpeed : typingSpeed;

		if (!isDeleting && charIndex === currentString.length) {
			timeout = pauseTime;
			isDeleting = true;
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			stringIndex = (stringIndex + 1) % strings.length;
			timeout = 300;
		}

		setTimeout(type, timeout);
	}

	// Start after a short delay
	setTimeout(type, 500);
}

/* ============================================================
   SCROLL REVEAL — Intersection Observer
   ============================================================ */
function initScrollReveal() {
	const reveals = document.querySelectorAll(".reveal");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					// Stagger the animation slightly for grouped elements
					setTimeout(() => {
						entry.target.classList.add("active");
					}, index * 100);
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: "0px 0px -50px 0px",
		}
	);

	reveals.forEach((el) => observer.observe(el));
}

/* ============================================================
   SCROLL SPY — Active Nav Link
   ============================================================ */
function initScrollSpy() {
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll(".nav-link");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.getAttribute("id");

					navLinks.forEach((link) => {
						link.classList.remove("active");
						if (link.getAttribute("href") === `#${id}`) {
							link.classList.add("active");
						}
					});
				}
			});
		},
		{
			threshold: 0.3,
			rootMargin: `-${getComputedStyle(document.documentElement)
				.getPropertyValue("--nav-height")
				.trim()} 0px -30% 0px`,
		}
	);

	sections.forEach((section) => observer.observe(section));
}

/* ============================================================
   SKILL BARS — Animate on Scroll
   ============================================================ */
function initSkillBars() {
	const skillBars = document.querySelectorAll(".skill-progress");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const width = entry.target.getAttribute("data-width");
					entry.target.style.width = `${width}%`;
					entry.target.classList.add("animate");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 }
	);

	skillBars.forEach((bar) => observer.observe(bar));
}

/* ============================================================
   COUNTERS — Animate Numbers
   ============================================================ */
function initCounters() {
	const counters = document.querySelectorAll(".stat-number");
	if (!counters || counters.length === 0) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateCounter(entry.target);
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 }
	);

	counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el) {
	const target = parseInt(el.getAttribute("data-target"), 10);
	const duration = 1500;
	const startTime = performance.now();

	function update(currentTime) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);

		// Ease-out cubic
		const eased = 1 - Math.pow(1 - progress, 3);
		el.textContent = Math.floor(eased * target);

		if (progress < 1) {
			requestAnimationFrame(update);
		} else {
			el.textContent = target;
		}
	}

	requestAnimationFrame(update);
}

/* ============================================================
   INTERACTIVE CONSTELLATION & NEURAL PARTICLE CANVAS
   ============================================================ */
function initParticles() {
	const canvas = document.getElementById("bg-canvas");
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	let width = 0;
	let height = 0;
	let dpr = window.devicePixelRatio || 1;
	let particles = [];
	let ripples = [];
	let animationFrameId = null;
	let isHeroVisible = true;

	const mouse = {
		x: null,
		y: null,
		radius: 170,
	};

	function resize() {
		const parent = canvas.parentElement || canvas.parentNode;
		width = parent ? parent.offsetWidth : window.innerWidth;
		height = parent ? parent.offsetHeight : window.innerHeight;
		dpr = Math.min(window.devicePixelRatio || 1, 2);

		canvas.width = width * dpr;
		canvas.height = height * dpr;
		ctx.scale(dpr, dpr);

		createParticles();
	}

	class Particle {
		constructor(x, y) {
			this.x = x !== undefined ? x : Math.random() * width;
			this.y = y !== undefined ? y : Math.random() * height;
			this.baseRadius = Math.random() * 1.8 + 1.2;
			this.radius = this.baseRadius;
			this.vx = (Math.random() - 0.5) * 0.8;
			this.vy = (Math.random() - 0.5) * 0.8;
			this.alpha = Math.random() * 0.5 + 0.3;
			this.pulseSpeed = Math.random() * 0.03 + 0.01;
			this.pulseOffset = Math.random() * Math.PI * 2;
		}

		update(time) {
			this.x += this.vx;
			this.y += this.vy;

			// Wrap edges smoothly
			if (this.x < -10) this.x = width + 10;
			else if (this.x > width + 10) this.x = -10;

			if (this.y < -10) this.y = height + 10;
			else if (this.y > height + 10) this.y = -10;

			// Pulse size subtly
			this.radius =
				this.baseRadius +
				Math.sin(time * 0.002 + this.pulseOffset) * 0.5;

			// Mouse repulsion & interaction
			if (mouse.x !== null && mouse.y !== null) {
				const dx = mouse.x - this.x;
				const dy = mouse.y - this.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < mouse.radius && dist > 0) {
					const force = (mouse.radius - dist) / mouse.radius;
					const angle = Math.atan2(dy, dx);
					const moveX = Math.cos(angle) * force * 4;
					const moveY = Math.sin(angle) * force * 4;

					this.x -= moveX;
					this.y -= moveY;
				}
			}

			// Ripple impulse waves
			for (let i = 0; i < ripples.length; i++) {
				const rip = ripples[i];
				const dx = this.x - rip.x;
				const dy = this.y - rip.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (Math.abs(dist - rip.radius) < 30 && dist > 0) {
					const push = (1 - rip.radius / rip.maxRadius) * 3;
					this.x += (dx / dist) * push;
					this.y += (dy / dist) * push;
				}
			}
		}

		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, Math.max(0.1, this.radius), 0, Math.PI * 2);
			ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
			ctx.shadowColor = "#8b5cf6";
			ctx.shadowBlur = 10;
			ctx.fill();
			ctx.shadowBlur = 0;
		}
	}

	function createParticles() {
		particles = [];
		// Optimal count based on viewport area (approx 1 per 14000 sq px)
		const targetCount = Math.min(Math.floor((width * height) / 14000), 90);
		const count = Math.max(targetCount, 30);

		for (let i = 0; i < count; i++) {
			particles.push(new Particle());
		}
	}

	function drawConnections() {
		const maxDist = 130;
		const len = particles.length;

		for (let i = 0; i < len; i++) {
			const p1 = particles[i];

			// Connect to nearby particles
			for (let j = i + 1; j < len; j++) {
				const p2 = particles[j];
				const dx = p1.x - p2.x;
				const dy = p1.y - p2.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < maxDist) {
					const opacity = (1 - dist / maxDist) * 0.35;
					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
					ctx.lineWidth = 0.9;
					ctx.stroke();
				}
			}

			// Connect to mouse cursor with vibrant blue-purple gradient
			if (mouse.x !== null && mouse.y !== null) {
				const dx = p1.x - mouse.x;
				const dy = p1.y - mouse.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < mouse.radius) {
					const opacity = (1 - dist / mouse.radius) * 0.75;
					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(mouse.x, mouse.y);
					ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
					ctx.lineWidth = 1.3;
					ctx.stroke();
				}
			}
		}
	}

	function updateRipples() {
		for (let i = ripples.length - 1; i >= 0; i--) {
			const rip = ripples[i];
			rip.radius += 4;
			rip.alpha = (1 - rip.radius / rip.maxRadius) * 0.5;

			if (rip.radius >= rip.maxRadius) {
				ripples.splice(i, 1);
			} else {
				ctx.beginPath();
				ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(192, 132, 252, ${Math.max(
					0,
					rip.alpha
				)})`;
				ctx.lineWidth = 1.5;
				ctx.stroke();
			}
		}
	}

	function animate(time) {
		if (!isHeroVisible) {
			animationFrameId = requestAnimationFrame(animate);
			return;
		}

		ctx.clearRect(0, 0, width, height);

		// Draw & update connections and particles
		drawConnections();
		updateRipples();

		for (let i = 0; i < particles.length; i++) {
			particles[i].update(time);
			particles[i].draw();
		}

		animationFrameId = requestAnimationFrame(animate);
	}

	// Mouse Event Listeners
	const heroSection = document.getElementById("hero") || canvas;

	heroSection.addEventListener("mousemove", (e) => {
		const rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	});

	heroSection.addEventListener("mouseleave", () => {
		mouse.x = null;
		mouse.y = null;
	});

	heroSection.addEventListener("click", (e) => {
		const rect = canvas.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const clickY = e.clientY - rect.top;

		ripples.push({
			x: clickX,
			y: clickY,
			radius: 5,
			maxRadius: 180,
			alpha: 0.6,
		});

		// Add extra particles on click if under max
		if (particles.length < 110) {
			for (let i = 0; i < 4; i++) {
				const angle = Math.random() * Math.PI * 2;
				const speed = Math.random() * 2 + 1;
				const p = new Particle(clickX, clickY);
				p.vx = Math.cos(angle) * speed;
				p.vy = Math.sin(angle) * speed;
				particles.push(p);
			}
		}
	});

	// Touch Support
	heroSection.addEventListener(
		"touchmove",
		(e) => {
			if (e.touches.length > 0) {
				const rect = canvas.getBoundingClientRect();
				mouse.x = e.touches[0].clientX - rect.left;
				mouse.y = e.touches[0].clientY - rect.top;
			}
		},
		{ passive: true }
	);

	heroSection.addEventListener("touchend", () => {
		mouse.x = null;
		mouse.y = null;
	});

	// Window resize debounce
	let resizeTimeout;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(resize, 150);
	});

	// Intersection Observer to pause when off-screen
	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isHeroVisible = entry.isIntersecting;
				});
			},
			{ threshold: 0.05 }
		);
		observer.observe(heroSection);
	}

	// Tab visibility check
	document.addEventListener("visibilitychange", () => {
		isHeroVisible =
			document.visibilityState === "visible" &&
			heroSection.getBoundingClientRect().bottom > 0;
	});

	resize();
	animate(performance.now());
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
	const btn = document.getElementById("back-to-top");
	if (!btn) return;

	window.addEventListener("scroll", () => {
		if (window.scrollY > 500) {
			btn.classList.add("visible");
		} else {
			btn.classList.remove("visible");
		}
	});

	btn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}

/* ============================================================
   CONTACT FORM — Web3Forms Integration
   ============================================================
   HOW TO SET UP:
   1. Go to https://web3forms.com/
   2. Enter your email address
   3. Check your inbox for the Access Key
   4. Replace YOUR_ACCESS_KEY below with that key
   ============================================================ */

// TODO: Replace with your Web3Forms access key (check your email after signing up)
const WEB3FORMS_ACCESS_KEY = "b26226b5-bc36-44b2-8c84-6c1e3c04ff14";

function initContactForm() {
	const form = document.getElementById("contact-form");
	const status = document.getElementById("form-status");
	if (!form || !status) return;

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const name = form.querySelector("#name").value.trim();
		const email = form.querySelector("#email").value.trim();
		const subject = form.querySelector("#subject").value.trim();
		const message = form.querySelector("#message").value.trim();

		// Basic validation
		if (!name || !email || !subject || !message) {
			showStatus("Please fill in all fields.", "error");
			return;
		}

		if (!isValidEmail(email)) {
			showStatus("Please enter a valid email address.", "error");
			return;
		}

		// Disable button while sending
		const submitBtn = form.querySelector(".btn-submit");
		submitBtn.disabled = true;
		submitBtn.querySelector("span").textContent = "Sending...";

		try {
			// Send via Web3Forms
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					access_key: WEB3FORMS_ACCESS_KEY,
					from_name: "Portfolio Contact Form",
					replyto: email,
					name: name,
					email: email,
					subject: "Portfolio: " + subject,
					message: message,
				}),
			});

			const result = await response.json();

			if (result.success) {
				showStatus(
					"Message sent successfully! I'll get back to you soon. 🎉",
					"success"
				);
				form.reset();
			} else {
				showStatus(
					"Failed to send message. Please try again later.",
					"error"
				);
			}
		} catch (err) {
			console.error("Web3Forms error:", err);
			showStatus(
				"Failed to send message. Please try again later.",
				"error"
			);
		} finally {
			submitBtn.disabled = false;
			submitBtn.querySelector("span").textContent = "Send Message";
		}
	});

	function showStatus(msg, type) {
		status.textContent = msg;
		status.className = `form-status ${type}`;

		setTimeout(() => {
			status.textContent = "";
			status.className = "form-status";
		}, 5000);
	}

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}
}

/* ============================================================
   INSTAGRAM-STYLE PROFILE PHOTO EDITOR
   ============================================================ */
function initProfilePhotoEditor() {
	const modal = document.getElementById("insta-modal");
	const backdrop = document.getElementById("insta-modal-backdrop");
	const menuView = document.getElementById("insta-menu-view");
	const editorView = document.getElementById("insta-editor-view");
	const profileWrapper = document.getElementById("profile-wrapper");
	const editTrigger = document.getElementById("avatar-edit-trigger");
	const aboutImg = document.getElementById("about-profile-img");
	const miniThumb = document.getElementById("insta-mini-thumb");
	const previewTarget = document.getElementById("insta-preview-target");
	const filePicker = document.getElementById("insta-file-picker");

	const btnUpload = document.getElementById("insta-btn-upload");
	const btnEdit = document.getElementById("insta-btn-edit");
	const btnRemove = document.getElementById("insta-btn-remove");
	const btnClose = document.getElementById("insta-btn-close");
	const btnBack = document.getElementById("insta-btn-back");
	const btnSave = document.getElementById("insta-btn-save");
	const btnDownload = document.getElementById("insta-btn-download");

	const zoomSlider = document.getElementById("insta-zoom-slider");
	const zoomVal = document.getElementById("insta-zoom-val");
	const filterChips = document.querySelectorAll(".filter-chip");

	if (!modal || !aboutImg) return;

	const DEFAULT_SRC = aboutImg.getAttribute("src") || "images/profile.jpg";
	const storedPhoto = localStorage.getItem("portfolio_profile_photo");
	let currentSrc = (storedPhoto && storedPhoto.startsWith("data:image")) ? storedPhoto : DEFAULT_SRC;
	let currentFilter = localStorage.getItem("portfolio_profile_filter") || "normal";
	let currentZoom = parseInt(localStorage.getItem("portfolio_profile_zoom")) || 100;

	let pendingSrc = currentSrc;
	let pendingFilter = currentFilter;
	let pendingZoom = currentZoom;

	// Apply stored image & styling on startup
	applyProfileDisplay(currentSrc, currentFilter, currentZoom);

	function applyProfileDisplay(src, filter, zoom) {
		aboutImg.src = src;
		aboutImg.className = `about-img filter-${filter}`;
		aboutImg.style.transform = zoom > 100 ? `scale(${zoom / 100})` : "";
		if (miniThumb) {
			miniThumb.src = src;
			miniThumb.className = `filter-${filter}`;
		}
	}

	function openModal() {
		modal.classList.add("active");
		modal.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
		showMenuView();
	}

	function closeModal() {
		modal.classList.remove("active");
		modal.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
		filePicker.value = "";
	}

	function showMenuView() {
		menuView.style.display = "block";
		editorView.style.display = "none";
	}

	function showEditorView() {
		menuView.style.display = "none";
		editorView.style.display = "block";
		updatePreview();
	}

	function updatePreview() {
		previewTarget.src = pendingSrc;
		previewTarget.className = `filter-${pendingFilter}`;
		previewTarget.style.transform = `scale(${pendingZoom / 100})`;
		zoomSlider.value = pendingZoom;
		zoomVal.textContent = `${pendingZoom}%`;

		filterChips.forEach((chip) => {
			chip.classList.toggle("active", chip.dataset.filter === pendingFilter);
		});
	}

	// Trigger opening modal
	if (profileWrapper) {
		profileWrapper.addEventListener("click", openModal);
		profileWrapper.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				openModal();
			}
		});
	}

	if (editTrigger) {
		editTrigger.addEventListener("click", (e) => {
			e.stopPropagation();
			openModal();
		});
	}

	if (backdrop) backdrop.addEventListener("click", closeModal);
	if (btnClose) btnClose.addEventListener("click", closeModal);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.classList.contains("active")) {
			closeModal();
		}
	});

	// Upload button triggers hidden file input
	if (btnUpload) {
		btnUpload.addEventListener("click", () => {
			filePicker.click();
		});
	}

	// File selected
	if (filePicker) {
		filePicker.addEventListener("change", (e) => {
			const file = e.target.files && e.target.files[0];
			if (!file) return;

			if (!file.type.startsWith("image/")) {
				alert("Please select a valid image file (PNG, JPG, WebP, etc.)");
				return;
			}

			const reader = new FileReader();
			reader.onload = (event) => {
				pendingSrc = event.target.result;
				pendingZoom = 100;
				pendingFilter = "normal";
				showEditorView();
			};
			reader.readAsDataURL(file);
		});
	}

	// Edit current photo button
	if (btnEdit) {
		btnEdit.addEventListener("click", () => {
			pendingSrc = currentSrc;
			pendingFilter = currentFilter;
			pendingZoom = currentZoom;
			showEditorView();
		});
	}

	// Remove photo button (Reset to default)
	if (btnRemove) {
		btnRemove.addEventListener("click", () => {
			if (confirm("Reset profile picture to default?")) {
				currentSrc = DEFAULT_SRC;
				currentFilter = "normal";
				currentZoom = 100;
				localStorage.removeItem("portfolio_profile_photo");
				localStorage.removeItem("portfolio_profile_filter");
				localStorage.removeItem("portfolio_profile_zoom");
				applyProfileDisplay(currentSrc, currentFilter, currentZoom);
				closeModal();
				showToast("Profile photo reset to default!");
			}
		});
	}

	// Back button from editor
	if (btnBack) {
		btnBack.addEventListener("click", () => {
			showMenuView();
		});
	}

	// Zoom slider
	if (zoomSlider) {
		zoomSlider.addEventListener("input", (e) => {
			pendingZoom = parseInt(e.target.value);
			zoomVal.textContent = `${pendingZoom}%`;
			previewTarget.style.transform = `scale(${pendingZoom / 100})`;
		});
	}

	// Filter chips
	filterChips.forEach((chip) => {
		chip.addEventListener("click", () => {
			pendingFilter = chip.dataset.filter;
			filterChips.forEach((c) => c.classList.remove("active"));
			chip.classList.add("active");
			previewTarget.className = `filter-${pendingFilter}`;
		});
	});

	// Save photo
	if (btnSave) {
		btnSave.addEventListener("click", () => {
			currentSrc = pendingSrc;
			currentFilter = pendingFilter;
			currentZoom = pendingZoom;

			try {
				if (currentSrc.startsWith("data:image")) {
					localStorage.setItem("portfolio_profile_photo", currentSrc);
				}
				localStorage.setItem("portfolio_profile_filter", currentFilter);
				localStorage.setItem("portfolio_profile_zoom", currentZoom.toString());
			} catch (err) {
				console.warn("Storage quota exceeded, displayed in session only:", err);
			}

			applyProfileDisplay(currentSrc, currentFilter, currentZoom);
			closeModal();
			showToast("Profile photo updated successfully! ✨");
		});
	}

	// Download button
	if (btnDownload) {
		btnDownload.addEventListener("click", () => {
			downloadProcessedImage(pendingSrc, pendingFilter, pendingZoom);
		});
	}

	function downloadProcessedImage(imageSrc, filterName, zoomLevel) {
		const canvas = document.createElement("canvas");
		canvas.width = 600;
		canvas.height = 600;
		const ctx = canvas.getContext("2d");

		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			ctx.clearRect(0, 0, 600, 600);

			let filterStr = "none";
			if (filterName === "clarendon") filterStr = "contrast(1.2) saturate(1.25) brightness(1.05)";
			else if (filterName === "juno") filterStr = "contrast(1.15) saturate(1.35) hue-rotate(-10deg)";
			else if (filterName === "lark") filterStr = "contrast(0.95) brightness(1.1) saturate(1.1)";
			else if (filterName === "reyes") filterStr = "sepia(0.25) saturate(0.85) contrast(0.95) brightness(1.1)";
			else if (filterName === "moon") filterStr = "grayscale(1) contrast(1.25) brightness(1.05)";

			ctx.filter = filterStr;

			// Circular clip
			ctx.save();
			ctx.beginPath();
			ctx.arc(300, 300, 300, 0, Math.PI * 2);
			ctx.closePath();
			ctx.clip();

			const scale = (zoomLevel / 100) * Math.max(600 / img.naturalWidth, 600 / img.naturalHeight);
			const nw = img.naturalWidth * scale;
			const nh = img.naturalHeight * scale;
			const nx = (600 - nw) / 2;
			const ny = (600 - nh) / 2;

			ctx.drawImage(img, nx, ny, nw, nh);
			ctx.restore();

			const link = document.createElement("a");
			link.download = "profile.jpg";
			link.href = canvas.toDataURL("image/jpeg", 0.95);
			link.click();
			showToast("Image downloaded as profile.jpg! 💾");
		};
		img.src = imageSrc;
	}

	function showToast(msg) {
		let toast = document.getElementById("insta-toast");
		if (!toast) {
			toast = document.createElement("div");
			toast.id = "insta-toast";
			toast.style.cssText = `
				position: fixed;
				bottom: 30px;
				left: 50%;
				transform: translateX(-50%) translateY(20px);
				background: linear-gradient(135deg, #1e1b4b, #312e81);
				border: 1px solid rgba(139, 92, 246, 0.4);
				color: #ffffff;
				padding: 12px 24px;
				border-radius: 30px;
				font-size: 0.92rem;
				font-weight: 600;
				z-index: 10000;
				box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.3);
				opacity: 0;
				transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
				display: flex;
				align-items: center;
				gap: 10px;
				pointer-events: none;
			`;
			document.body.appendChild(toast);
		}

		toast.innerHTML = `<i class="fas fa-check-circle" style="color: #38bdf8;"></i> ${msg}`;
		requestAnimationFrame(() => {
			toast.style.opacity = "1";
			toast.style.transform = "translateX(-50%) translateY(0)";
		});

		setTimeout(() => {
			toast.style.opacity = "0";
			toast.style.transform = "translateX(-50%) translateY(20px)";
		}, 3200);
	}
}

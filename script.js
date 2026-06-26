// Set Current Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinkItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ==========================================
// URL Configuration - Change these values
// ==========================================
const CONFIG = {
    link1: "https://example.com/app1", // LINK_1
    link2: "https://example.com/app2", // LINK_2
    link3: "https://example.com/app3"  // LINK_3
};

// Tracking Logic
function trackAndRedirect(linkId) {
    // Get current counts from LocalStorage
    let linkCount = parseInt(localStorage.getItem(linkId) || '0');
    let totalCount = parseInt(localStorage.getItem('totalClicks') || '0');

    // Increment counts
    linkCount++;
    totalCount++;

    // Save to LocalStorage
    localStorage.setItem(linkId, linkCount);
    localStorage.setItem('totalClicks', totalCount);

    // Redirect
    const url = CONFIG[linkId];
    if (url) {
        if (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }
    }
}

// Modal Logic
function openAdminLogin() {
    document.getElementById('loginModal').classList.add('active');
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal on outside click
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const dashboardModal = document.getElementById('dashboardModal');
    if (event.target === loginModal) closeModal('loginModal');
    if (event.target === dashboardModal) closeModal('dashboardModal');
}

// Authentication Logic
function handleLogin(event) {
    event.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');

    if (u === 'friendvibe' && p === 'admin123') {
        closeModal('loginModal');
        openDashboard();
    } else {
        errorMsg.style.display = 'block';
        // Add shake animation
        const modal = document.querySelector('#loginModal .modal-content');
        modal.style.transform = 'translateY(0) translateX(-10px)';
        setTimeout(() => modal.style.transform = 'translateY(0) translateX(10px)', 100);
        setTimeout(() => modal.style.transform = 'translateY(0) translateX(-10px)', 200);
        setTimeout(() => modal.style.transform = 'translateY(0) translateX(0)', 300);
    }
}

// Dashboard Logic
function openDashboard() {
    document.getElementById('dashboardModal').classList.add('active');
    updateDashboardUI();
}

function updateDashboardUI() {
    document.getElementById('d-link1').textContent = localStorage.getItem('link1') || '0';
    document.getElementById('d-link2').textContent = localStorage.getItem('link2') || '0';
    document.getElementById('d-link3').textContent = localStorage.getItem('link3') || '0';
    document.getElementById('d-total').textContent = localStorage.getItem('totalClicks') || '0';
}

// Listen for storage changes in other tabs to update real-time
window.addEventListener('storage', (e) => {
    if (document.getElementById('dashboardModal').classList.contains('active')) {
        updateDashboardUI();
    }
});

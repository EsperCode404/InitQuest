console.log("⚙️ Prototype Interface JS Loaded");

// Loading Animation
const loadingProgress = document.querySelector('.loading-progress');
const loadingPercent = document.querySelector('.loading-percent');
const loadingScreen = document.getElementById('loading-screen');
const app = document.getElementById('app');

// Simulate loading progress
let progress = 0;
const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        
        // Hide loading screen and show app
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                app.style.display = 'block';
                // Initialize your app here
                initApp();
            }, 500);
        }, 500);
    }
    
    // Update progress bar and percentage
    loadingProgress.style.width = `${progress}%`;
    loadingPercent.textContent = `${Math.floor(progress)}%`;
}, 300);

// Initialize the app
function initApp() {
    console.log('App initialized!');
    
    // Menu toggle functionality
    const menuOptions = document.querySelectorAll('.option[data-open]');
    const backButtons = document.querySelectorAll('.back-btn');
    
    menuOptions.forEach(option => {
        option.addEventListener('click', () => {
            const targetMenu = option.getAttribute('data-open');
            document.querySelectorAll('.menu').forEach(menu => {
                menu.classList.add('hidden');
            });
            document.getElementById(targetMenu).classList.remove('hidden');
        });
    });
    
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetMenu = button.getAttribute('data-back');
            document.querySelectorAll('.menu').forEach(menu => {
                menu.classList.add('hidden');
            });
            document.getElementById(targetMenu).classList.remove('hidden');
        });
    });
    
    // Start button functionality
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('mainMenu').classList.remove('hidden');
            startBtn.style.display = 'none';
        });
    }
}

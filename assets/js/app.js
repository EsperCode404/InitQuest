// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.querySelector('.loading-progress');
const percentText = document.querySelector('.loading-percent');
const loadingText = document.querySelector('.loading-text');

// Configuration
const MIN_LOADING_TIME = 2000; // Minimum loading time in milliseconds
const MAX_PROGRESS = 100;
let loadingStartTime;

// Loading states with corresponding progress ranges
const loadingStates = [
    { text: 'Loading resources', from: 0, to: 30 },
    { text: 'Processing data', from: 31, to: 60 },
    { text: 'Finalizing', from: 61, to: 90 },
    { text: 'Almost there', from: 91, to: 99 }
];

// Easing function for smooth animation
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Update loading progress
function updateLoadingProgress(percent) {
    const progress = Math.min(Math.max(0, percent), 100);
    const rotation = (progress / 100) * 360;
    
    // Update progress bar
    if (progressBar) {
        progressBar.style.transform = `rotate(${rotation + 45}deg)`;
        
        // Update colors based on progress
        const hue = 260; // Purple hue
        const saturation = 75;
        const lightness = 60 - (progress / 100) * 10;
        progressBar.style.borderTopColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        progressBar.style.borderRightColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    // Update percentage
    if (percentText) {
        percentText.textContent = `${Math.floor(progress)}%`;
    }
    
    // Update loading text based on progress
    if (loadingText) {
        const currentState = loadingStates.find(state => 
            progress >= state.from && progress <= state.to
        );
        if (currentState) {
            loadingText.textContent = currentState.text;
        }
    }
    
    return progress;
}

// Loading simulation
let progress = 0;
const messages = [
    "Initializing system...",
    "Loading user data...",
    "Decrypting save files...",
    "Calibrating UI interface...",
    "Launching environment..."
];

let messageIndex = 0;

// Initialize the app
function initApp() {
    console.log('App initialized');
    
    // Get elements
    const app = document.getElementById('app');
    const loadingScreen = document.getElementById('loading-screen');
    const startBtn = document.getElementById('startBtn');
    
    // Hide loading screen and show app
    if (loadingScreen) {
        loadingScreen.style.transition = 'opacity 1s ease-out';
        loadingScreen.style.opacity = '0';
        
        // Remove loading screen after fade out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // Show the app content
            if (app) {
                app.style.display = 'block';
                
                // Fade in START button
                setTimeout(() => {
                    if (startBtn) {
                        startBtn.style.opacity = '1';
                        startBtn.style.visibility = 'visible';
                    }
                }, 300);
            }
        }, 1000);
    }
    
    // Initialize START button
    if (startBtn) {
        startBtn.style.opacity = '0';
        startBtn.style.visibility = 'hidden';
        startBtn.style.transition = 'opacity 0.5s ease-in-out';
        
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Fade out START button
            startBtn.style.opacity = '0';
            startBtn.style.visibility = 'hidden';
            
            // Small delay before showing main menu
            setTimeout(() => {
                const mainMenu = document.getElementById('mainMenu');
                if (mainMenu) {
                    // Set initial state
                    mainMenu.style.opacity = '0';
                    mainMenu.style.visibility = 'visible';
                    mainMenu.classList.remove('hidden');
                    
                    // Trigger reflow to ensure the transition works
                    void mainMenu.offsetWidth;
                    
                    // Apply transition and fade in
                    mainMenu.style.transition = 'opacity 0.5s ease-in-out';
                    mainMenu.style.opacity = '1';
                }
            }, 150); // Match the transition timing used in other menu navigations
        });
    }
    
    // Handle menu navigation
    document.addEventListener('click', (e) => {
        // Handle opening menus
        if (e.target.dataset.open) {
            const targetMenu = document.getElementById(e.target.dataset.open);
            if (targetMenu) {
                // Fade out current menu
                document.querySelectorAll('.menu:not(.hidden)').forEach(menu => {
                    menu.style.opacity = '0';
                    setTimeout(() => {
                        menu.classList.add('hidden');
                        menu.style.visibility = 'hidden';
                        
                        // Fade in target menu
                        targetMenu.style.opacity = '0';
                        targetMenu.classList.remove('hidden');
                        targetMenu.style.visibility = 'visible';
                        
                        // Trigger reflow
                        void targetMenu.offsetWidth;
                        
                        targetMenu.style.opacity = '1';
                        targetMenu.style.transition = 'opacity 0.3s ease-in-out';
                    }, 150);
                });
            }
        }
        
        // Handle back button
        if (e.target.dataset.back) {
            const backTo = document.getElementById(e.target.dataset.back);
            if (backTo) {
                // Fade out current menu
                document.querySelectorAll('.menu:not(.hidden)').forEach(menu => {
                    menu.style.opacity = '0';
                    setTimeout(() => {
                        menu.classList.add('hidden');
                        menu.style.visibility = 'hidden';
                        
                        // Fade in target menu
                        backTo.style.opacity = '0';
                        backTo.classList.remove('hidden');
                        backTo.style.visibility = 'visible';
                        
                        // Trigger reflow
                        void backTo.offsetWidth;
                        
                        backTo.style.opacity = '1';
                        backTo.style.transition = 'opacity 0.3s ease-in-out';
                    }, 150);
                });
            }
        }
    });
}

// Start loading simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start the loading animation
    const loadingInterval = setInterval(() => {
        if (progress < 100) {
            // Increment progress with some randomness
            progress += Math.floor(Math.random() * 10);
            if (progress > 100) progress = 100;

            // Update progress bar
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            // Update percentage text
            if (percentText) {
                percentText.textContent = `${progress}%`;
            }
            
            // Update loading message at certain intervals
            if (progress % 25 === 0 && messageIndex < messages.length) {
                if (loadingText) {
                    loadingText.textContent = messages[messageIndex];
                    messageIndex++;
                }
            }
        } else {
            // Loading complete
            clearInterval(loadingInterval);
            
            // Fade out the loading screen
            if (loadingScreen) {
                loadingScreen.style.transition = 'opacity 1s ease-out';
                loadingScreen.style.opacity = '0';
                
                // Remove from DOM after fade out
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Initialize the app
                    initApp();
                }, 1000);
            } else {
                // If loading screen not found, just initialize the app
                initApp();
            }
        }
    }, 400); // Update every 400ms
});
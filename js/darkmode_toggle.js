// Select the button and body element
const modeToggleButton = document.getElementById('mode-toggle');
const body = document.body;

// Check the stored mode preference and apply it
const savedMode = localStorage.getItem('mode');
if (savedMode === 'night') {
    body.classList.add('night');
    modeToggleButton.textContent = '🌞'; // Day mode icon
} else {
    body.classList.add('day');
    modeToggleButton.textContent = '🌙'; // Night mode icon
}

// Add an event listener for the button click
modeToggleButton.addEventListener('click', () => {
    // Toggle between day and night mode
    body.classList.toggle('night');
    
    // Change the button icon based on the mode
    if (body.classList.contains('night')) {
        modeToggleButton.textContent = '🌞'; // Day mode icon
        localStorage.setItem('mode', 'night'); // Save to localStorage
    } else {
        modeToggleButton.textContent = '🌙'; // Night mode icon
        localStorage.setItem('mode', 'day'); // Save to localStorage
    }
});

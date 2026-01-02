// Form Validation and Submission Handler
// Handles password visibility toggle and form submission with loader

/**
 * Toggle password visibility for a given input field
 * @param {string} inputId - The ID of the password input field
 */
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    
    if (!input || !button) return;
    
    // Toggle input type
    if (input.type === 'password') {
        input.type = 'text';
        button.classList.add('show-password');
    } else {
        input.type = 'password';
        button.classList.remove('show-password');
    }
}

/**
 * Validate password fields
 * @returns {Object} Validation result with status and message
 */
function validatePasswords() {
    const password = document.getElementById('password-init').value;
    const confirmPassword = document.getElementById('password-confirm').value;
    
    // Get current language for error messages
    const lang = document.documentElement.lang || 'es';
    
    const messages = {
        es: {
            empty: 'Por favor ingrese una contraseña',
            short: 'La contraseña debe tener al menos 8 caracteres',
            mismatch: 'Las contraseñas no coinciden',
            success: 'Verificando conexión...'
        },
        en: {
            empty: 'Please enter a password',
            short: 'Password must be at least 8 characters',
            mismatch: 'Passwords do not match',
            success: 'Verifying connection...'
        }
    };
    
    const t = messages[lang] || messages.es;
    
    // Validate empty
    if (!password || !confirmPassword) {
        return { valid: false, message: t.empty };
    }
    
    // Validate length
    if (password.length < 8) {
        return { valid: false, message: t.short };
    }
    
    // Validate match
    if (password !== confirmPassword) {
        return { valid: false, message: t.mismatch };
    }
    
    return { valid: true, message: t.success };
}

/**
 * Show toast notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type ('error' or 'success')
 */
function showNotification(message, type = 'error') {
    // Get or create toast container
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    const icon = type === 'error' ? '✕' : '✓';
    
    // Build toast HTML
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">×</button>
    `;
    
    // Add to container
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

/**
 * Simulate connection verification
 * @returns {Promise} Promise that resolves after verification
 */
function verifyConnection() {
    return new Promise((resolve) => {
        // Simulate API call - replace with actual verification logic
        setTimeout(() => {
            // Simulate success (you can add logic for failure scenarios)
            resolve({ success: true });
        }, 2500); // 2.5 seconds delay
    });
}

/**
 * Handle form submission
 */
async function handleFormSubmit() {
    const submitBtn = document.querySelector('.submit-btn');
    
    // Validate passwords
    const validation = validatePasswords();
    
    if (!validation.valid) {
        showNotification(validation.message, 'error');
        return;
    }
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Verify connection
        const result = await verifyConnection();
        
        // Get current language for success message
        const lang = document.documentElement.lang || 'es';
        const successMessage = lang === 'es' 
            ? '¡Conexión verificada exitosamente!' 
            : 'Connection verified successfully!';
        
        if (result.success) {
            showNotification(successMessage, 'success');
            
            // Optional: Reset form or redirect after success
            // setTimeout(() => {
            //     window.location.href = '/success';
            // }, 2000);
        }
        
    } catch (error) {
        const lang = document.documentElement.lang || 'es';
        const errorMessage = lang === 'es' 
            ? 'Error al verificar la conexión. Por favor intente nuevamente.' 
            : 'Error verifying connection. Please try again.';
        
        showNotification(errorMessage, 'error');
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Add Enter key support for form submission
document.addEventListener('DOMContentLoaded', () => {
    const passwordInputs = document.querySelectorAll('#password-init, #password-confirm');
    
    passwordInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleFormSubmit();
            }
        });
    });
});

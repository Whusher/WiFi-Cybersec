// Translations for the WiFi Authentication Portal
const translations = {
    es: {
        // Header
        pageTitle: "Acceso WiFi",
        headerTitle: "Autenticación WiFi",
        headerSubtitle: "Por favor registre su red para obtener acceso a internet. Disculpe las molestias ocasionadas.",
        
        // Device Section
        deviceConnected: "Dispositivo conectado:",
        ssidLabel: "SSID:",
        
        // Form Section
        formTitle: "Complete el formulario para obtener acceso a internet",
        ssidSelect: "Seleccione su red",
        passwordLabel: "Ingrese su contraseña",
        confirmPasswordLabel: "Confirme su contraseña",
        verifyButton: "Verificar conexión",
        
        // Footer
        footerText: "Todos los derechos reservados",
        
        // Language
        languageLabel: "Idioma"
    },
    en: {
        // Header
        pageTitle: "WiFi Access",
        headerTitle: "WiFi Authentication",
        headerSubtitle: "Please register your network to get internet access. We apologize for any inconvenience.",
        
        // Device Section
        deviceConnected: "Device connected:",
        ssidLabel: "SSID:",
        
        // Form Section
        formTitle: "Fill the form to get internet access",
        ssidSelect: "Select your network",
        passwordLabel: "Input your password",
        confirmPasswordLabel: "Confirm your password",
        verifyButton: "Verify connection",
        
        // Footer
        footerText: "All rights reserved",
        
        // Language
        languageLabel: "Language"
    }
};

// Default language is Spanish
let currentLanguage = 'es';

// Initialize language on page load
function initLanguage() {
    // Check if there's a saved preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        currentLanguage = savedLang;
    }
    applyTranslations();
}

// Apply translations to the page
function applyTranslations() {
    const t = translations[currentLanguage];
    
    // Update document title
    document.title = t.pageTitle;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            element.placeholder = t[key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Save preference
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Toggle between languages
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    applyTranslations();
    
    // Update button text
    const langButton = document.getElementById('language-toggle');
    if (langButton) {
        langButton.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

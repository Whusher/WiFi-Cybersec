// Device Information Handler - Extract from URL Parameters
// Extracts device and network information from URI query parameters

/**
 * Default device information (used as fallback/example)
 */
const defaultDeviceInfo = {
    ssid: 'TotalPlay-AN829',
    mac: '00:1A:2B:3C:4D:5E',
    ip: '192.168.1.100',
    deviceName: 'Samsung Galaxy S21',
    provider: 'TotalPlay',
    gateway: '192.168.1.1',
    signal: '85%'
};

/**
 * Extract URL parameters and return device information
 * @returns {Object} Device information object
 */
function getDeviceInfoFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    return {
        ssid: urlParams.get('ssid') || defaultDeviceInfo.ssid,
        mac: urlParams.get('mac') || defaultDeviceInfo.mac,
        ip: urlParams.get('ip') || defaultDeviceInfo.ip,
        deviceName: urlParams.get('device') || urlParams.get('deviceName') || defaultDeviceInfo.deviceName,
        provider: urlParams.get('provider') || defaultDeviceInfo.provider,
        gateway: urlParams.get('gateway') || defaultDeviceInfo.gateway,
        signal: urlParams.get('signal') || defaultDeviceInfo.signal
    };
}

/**
 * Update the UI with device information
 * @param {Object} deviceInfo - Device information object
 */
function updateDeviceUI(deviceInfo) {
    // Update SSID display
    const ssidElement = document.getElementById('current-ssid');
    if (ssidElement) {
        ssidElement.textContent = deviceInfo.ssid;
    }
    
    // Update SSID select dropdown
    const ssidSelect = document.getElementById('ssid');
    if (ssidSelect) {
        // Clear existing options
        ssidSelect.innerHTML = '';
        
        // Add the current SSID as option
        const option = document.createElement('option');
        option.value = deviceInfo.ssid;
        option.textContent = deviceInfo.ssid;
        option.selected = true;
        ssidSelect.appendChild(option);
    }
    
    // Update device information section
    const deviceInfoContainer = document.querySelector('.device-information');
    if (deviceInfoContainer) {
        // Get current language for labels
        // const lang = document.documentElement.lang || 'es';

        // Language is stored in localStorage as toggle manager
        const lang = localStorage.getItem('preferredLanguage') || 'es';

        const labels = {
            es: {
                ssid: 'SSID',
                mac: 'Dirección MAC',
                ip: 'Dirección IP',
                device: 'Dispositivo',
                provider: 'Proveedor',
                gateway: 'Puerta de enlace',
                signal: 'Señal'
            },
            en: {
                ssid: 'SSID',
                mac: 'MAC Address',
                ip: 'IP Address',
                device: 'Device',
                provider: 'Provider',
                gateway: 'Gateway',
                signal: 'Signal'
            }
        };
        
        const t = labels[lang] || labels.es;
        
        // Build device info HTML
        deviceInfoContainer.innerHTML = `
            <p><span>${t.ssid}:</span> <span id="current-ssid">${deviceInfo.ssid}</span></p>
            <p><span>${t.device}:</span> ${deviceInfo.deviceName}</p>
            <p><span>${t.mac}:</span> ${deviceInfo.mac}</p>
            <p><span>${t.ip}:</span> ${deviceInfo.ip}</p>
            <p><span>${t.gateway}:</span> ${deviceInfo.gateway}</p>
            <p><span>${t.signal}:</span> ${deviceInfo.signal}</p>
        `;
    }
    
    // Update provider logo if available
    updateProviderLogo(deviceInfo.provider);
}

/**
 * Update provider logo based on provider name
 * @param {string} provider - Provider name
 */
function updateProviderLogo(provider) {
    const providerImg = document.getElementById('provider');
    if (!providerImg) return;
    
    // Map provider names to logo paths
    const providerLogos = {
        'TotalPlay': './images/TotalPlay/logo.png',
        'Infinitum': './images/Infinitum/logo.png',
        'Izzi': './images/Izzi/logo.png',
        'Megacable': './images/Megacable/logo.png',
        'Axtel': './images/Axtel/logo.png',
        'Starlink': './images/Starlink/logo.png',
        'Tenda': './images/Tenda/logo.png',
        'Maxcom': './images/Maxcom/logo.png'
    };
    
    const logoPath = providerLogos[provider] || './images/Default/logo.png';
    
    providerImg.src = logoPath;
    providerImg.alt = `${provider} Logo`;
    
    // Handle image load error - use default
    providerImg.onerror = function() {
        this.src = './images/Default/logo.png';
        this.alt = 'Default Provider Logo';
    };
}

/**
 * Build example URL with device information
 * @returns {string} Example URL with parameters
 */
function buildExampleURL() {
    const baseURL = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
        ssid: 'TotalPlay-AN829',
        mac: '00:1A:2B:3C:4D:5E',
        ip: '192.168.1.100',
        device: 'Samsung Galaxy S21',
        provider: 'TotalPlay',
        gateway: '192.168.1.1',
        signal: '85%'
    });
    
    return `${baseURL}?${params.toString()}`;
}

/**
 * Initialize device information on page load
 */
function initDeviceInfo() {
    const deviceInfo = getDeviceInfoFromURL();
    updateDeviceUI(deviceInfo);
    
    // Log example URL to console for testing
    console.log('='.repeat(60));
    console.log('Example URL with device parameters:');
    console.log(buildExampleURL());
    console.log('='.repeat(60));
    console.log('Current device info:', deviceInfo);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeviceInfo);
} else {
    initDeviceInfo();
}

// Export functions for testing/debugging
window.deviceInfo = {
    getDeviceInfoFromURL,
    updateDeviceUI,
    buildExampleURL,
    defaultDeviceInfo
};

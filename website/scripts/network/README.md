📡 Device Information System
Key Features:
URL Parameter Extraction

Extracts device info from query parameters: ssid, mac, ip, device, provider, gateway, signal
Falls back to default example values if parameters are missing
Default Example Values:

SSID: TotalPlay-AN829
MAC: 00:1A:2B:3C:4D:5E
IP: 192.168.1.100
Device: Samsung Galaxy S21
Provider: TotalPlay
Gateway: 192.168.1.1
Signal: 85%
Dynamic UI Updates:

Automatically populates device information section
Updates SSID dropdown with current network
Displays provider logo (supports all your image folders)
Labels adapt to selected language (Spanish/English)
Provider Logo System:

Maps provider names to logo paths
Falls back to default logo if provider logo not found
Testing:
Open the console when you load the page - it will display an example URL like:

```
http://localhost/?ssid=TotalPlay-AN829&mac=00:1A:2B:3C:4D:5E&ip=192.168.1.100&device=Samsung%20Galaxy%20S21&provider=TotalPlay&gateway=192.168.1.1&signal=85%25

```

You can test with different parameters:

```
?ssid=MyNetwork&device=iPhone14&provider=Infinitum&mac=AA:BB:CC:DD:EE:FF&ip=192.168.0.50&signal=92%
```
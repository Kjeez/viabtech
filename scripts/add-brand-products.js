/**
 * Adds flagship products for empty brands (Lenovo, Dell, HP, DJI, Godox, Unomat, APC, SanDisk, Lexar)
 * so the Brands page sections look filled rather than showing "Products coming soon".
 */
const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '..', 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

const newProducts = [
  // ───── HP (5 products) ─────
  {
    id: 'hp-laserjet-pro-mfp-4101fdw',
    name: 'HP LaserJet Pro MFP 4101fdw',
    brand: 'HP',
    category: 'Laser Printer',
    type: 'Multifunction Laser',
    image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08465650.png',
    description: 'Fast, secure multifunction laser printer with wireless connectivity, automatic duplex printing, and a 2.7-inch color touchscreen. Ideal for small to medium businesses.',
    features: ['40 ppm Print Speed', 'Auto Duplex Print/Scan/Copy', '2.7" Color Touchscreen', 'Wi-Fi & Ethernet', 'HP Smart App Compatible', '80,000-page Monthly Duty Cycle'],
    specs: { printSpeed: '40 ppm', connectivity: 'Wi-Fi, Ethernet, USB', paperSize: 'A4', duplex: 'Automatic', monthlyDuty: 'Up to 80,000 pages' },
    inStock: true, featured: true
  },
  {
    id: 'hp-color-laserjet-pro-mfp-4301fdw',
    name: 'HP Color LaserJet Pro MFP 4301fdw',
    brand: 'HP',
    category: 'Laser Printer',
    type: 'Color Multifunction Laser',
    image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08465815.png',
    description: 'Professional color laser MFP delivering vibrant output, fast speeds, and robust security for business teams.',
    features: ['35 ppm Color/Mono', 'Auto Duplex', '4.3" Color Touchscreen', 'Wi-Fi Direct', 'HP Wolf Security', '250-Sheet Input Tray'],
    specs: { printSpeed: '35 ppm', colorOutput: 'Yes', connectivity: 'Wi-Fi, Ethernet, USB', duplex: 'Automatic' },
    inStock: true, featured: true
  },
  {
    id: 'hp-officejet-pro-9130e',
    name: 'HP OfficeJet Pro 9130e All-in-One',
    brand: 'HP',
    category: 'Inkjet Printer',
    type: 'All-in-One Inkjet',
    image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08507270.png',
    description: 'High-performance color inkjet all-in-one with fast dual-sided printing and scanning, perfect for productive home offices.',
    features: ['25 ppm Print Speed', 'Auto 2-Sided Print & Scan', '250-Sheet Input Tray', 'Instant Ink Ready', 'Smart App Printing', 'ADF with Flatbed'],
    specs: { printSpeed: '25 ppm', printType: 'Color Inkjet', connectivity: 'Wi-Fi, Ethernet, USB', paperSize: 'A4' },
    inStock: true, featured: false
  },
  {
    id: 'hp-designjet-t650-36',
    name: 'HP DesignJet T650 36-in Printer',
    brand: 'HP',
    category: 'Large Format',
    type: 'Large Format Printer',
    image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06842753.png',
    description: 'Compact 36-inch large-format printer for architects, engineers, and GIS professionals. Fast, precise, and easy to use.',
    features: ['36-inch Print Width', '25 sec/page A1', 'Wi-Fi & Ethernet', 'HP Click Software', 'Roll & Sheet Feed', '1 GB Memory'],
    specs: { printWidth: '36 inches', speed: '25 sec/page (A1)', connectivity: 'Wi-Fi, Ethernet, USB', memory: '1 GB' },
    inStock: true, featured: false
  },
  {
    id: 'hp-scanjet-pro-3600-f1',
    name: 'HP ScanJet Pro 3600 f1 Scanner',
    brand: 'HP',
    category: 'Scanner',
    type: 'Flatbed Scanner',
    image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08316055.png',
    description: 'Fast flatbed scanner with ADF for digitizing documents at up to 30 ppm. Perfect for archiving and office workflows.',
    features: ['30 ppm / 60 ipm', '60-Sheet ADF', 'Duplex Scanning', 'USB 3.0', 'TWAIN & ISIS Compatible', '4,000-page Daily Duty'],
    specs: { scanSpeed: '30 ppm / 60 ipm', adf: '60 sheets', connectivity: 'USB 3.0', resolution: '600 dpi' },
    inStock: true, featured: false
  },

  // ───── Lenovo (5 products) ─────
  {
    id: 'lenovo-thinkcentre-neo-50a',
    name: 'Lenovo ThinkCentre Neo 50a All-in-One',
    brand: 'Lenovo',
    category: 'Desktop',
    type: 'All-in-One Desktop',
    image: 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjIwNzQ0fGltYWdlL3BuZ3xoZjQvaGUzLzE0MDg0NTkzMzQ3NjE0LnBuZ3w3MWM0YzU5NzIzM2Y4M2Q4YWZkMWI5YWFhMDk0MDkyMmQ1MmFkZGJhODU3ZmEzOTFjMjEwZDE2NzI3NDQ3M2I4/lenovo-thinkcentre-neo-50a-27-intel-subseries-hero.png',
    description: 'Sleek 27-inch all-in-one desktop powered by Intel processors, designed for business productivity and collaboration.',
    features: ['27" FHD IPS Display', 'Intel Core i5/i7', 'Up to 32 GB RAM', 'Wi-Fi 6 & Bluetooth 5.1', 'Built-in Webcam & Mic', 'Tool-less Maintenance'],
    specs: { display: '27" FHD IPS', processor: 'Intel Core i5/i7', ram: 'Up to 32 GB', storage: 'Up to 1 TB SSD' },
    inStock: true, featured: true
  },
  {
    id: 'lenovo-ideapad-slim-5',
    name: 'Lenovo IdeaPad Slim 5 14"',
    brand: 'Lenovo',
    category: 'Laptop',
    type: 'Ultrabook',
    image: 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTI3ODQzfGltYWdlL3BuZ3xoN2MvaDM5LzE0MDgxNzUyNzI2NTU4LnBuZ3w1MDg5NGE2NjRiNjEzODUyZGQ5YzcwZTkyZjVmOWUwY2I1NjNlYmM4MWE2YjI3YTIxZmU4YTUxMDAyMGE0YjJl/lenovo-ideapad-slim-5-14-intel-subseries-hero.png',
    description: 'Ultra-thin 14-inch laptop with brilliant OLED display, long battery life, and AI-powered performance for on-the-go productivity.',
    features: ['14" 2.8K OLED Display', 'Intel Core Ultra', 'Up to 16 GB LPDDR5x', 'Backlit Keyboard', 'Up to 14 Hours Battery', 'Dolby Atmos Speakers'],
    specs: { display: '14" 2.8K OLED', processor: 'Intel Core Ultra', ram: 'Up to 16 GB LPDDR5x', battery: 'Up to 14 hours' },
    inStock: true, featured: true
  },
  {
    id: 'lenovo-thinkpad-x1-carbon-gen-12',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'Laptop',
    type: 'Business Ultrabook',
    image: 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjU0MDY0fGltYWdlL3BuZ3xoZWIvaDM5LzE0MDMyODQ3OTk5MDA2LnBuZ3w2MjA0NjBjYzY0OWNjNDE3NDY3NjEzMGM4MDNmYTg3ZGE4MTc1Mjg2NGVkNmJhODA2Y2U5OWQwNTUwNzk4Yzc4/lenovo-thinkpad-x1-carbon-gen-12-14-intel-hero.png',
    description: 'Iconic business ultrabook built with military-grade durability, 14-inch display, and Intel vPro platform for enterprise-level security.',
    features: ['14" 2.8K OLED', 'Intel Core Ultra vPro', 'MIL-STD-810H Tested', 'Up to 57.4 Wh Battery', 'Fingerprint & IR Camera', 'Wi-Fi 7'],
    specs: { display: '14" 2.8K OLED', processor: 'Intel Core Ultra vPro', weight: '1.09 kg', security: 'Fingerprint, IR Camera, vPro' },
    inStock: true, featured: false
  },
  {
    id: 'lenovo-legion-pro-5i-16',
    name: 'Lenovo Legion Pro 5i 16"',
    brand: 'Lenovo',
    category: 'Laptop',
    type: 'Gaming Laptop',
    image: 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTUxMzM1fGltYWdlL3BuZ3xoNWEvaDkyLzE0MDgyMjUzNjk4MDc4LnBuZ3xiM2RjZTAzMzE3YWFlODdjNDNjZjZiM2MzZTM3OWQyYzAyMjUyMjA0ZTU5OTI3MWYzYjdkMjdmZTFmYTIwZjE1/lenovo-legion-pro-5i-16-intel-subseries-hero.png',
    description: 'High-performance gaming laptop with NVIDIA GeForce RTX graphics, 240Hz display, and advanced cooling for serious gamers.',
    features: ['16" 2.5K 240Hz Display', 'Intel Core i9-14900HX', 'NVIDIA RTX 4070/4080', 'Up to 32 GB DDR5', 'Legion ColdFront 5.0', 'Per-key RGB Keyboard'],
    specs: { display: '16" 2.5K 240Hz', processor: 'Intel Core i9-14900HX', gpu: 'NVIDIA RTX 4070/4080', ram: 'Up to 32 GB DDR5' },
    inStock: true, featured: false
  },
  {
    id: 'lenovo-tab-p12',
    name: 'Lenovo Tab P12',
    brand: 'Lenovo',
    category: 'Tablet',
    type: 'Android Tablet',
    image: 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTY1MTkxfGltYWdlL3BuZ3xoZmIvaDlhLzE0MDMyNDk2OTI4Nzk4LnBuZ3w5MDkxYzYwYzFkM2EzYjFkM2IzY2YyMTFmMWQ2OGUxMDg5ODBjZGY5ZjA1MjBjZjcwYjdhYTFlNWQwMzdjNjI3/lenovo-tab-p12-subseries-hero.png',
    description: '12.7-inch entertainment tablet with 3K display, quad JBL speakers, and Dolby Atmos for immersive media experience.',
    features: ['12.7" 3K Display', 'MediaTek Dimensity 7050', '8 GB RAM', 'Quad JBL Speakers', 'Dolby Atmos', '10,200 mAh Battery'],
    specs: { display: '12.7" 3K', processor: 'MediaTek Dimensity 7050', ram: '8 GB', battery: '10,200 mAh' },
    inStock: true, featured: false
  },

  // ───── Dell (5 products) ─────
  {
    id: 'dell-inspiron-16-5640',
    name: 'Dell Inspiron 16 5640 Laptop',
    brand: 'Dell',
    category: 'Laptop',
    type: 'Mainstream Laptop',
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/16-5640/media-gallery/touch/silver/notebook-inspiron-16-5640-t-silver-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=573',
    description: 'Versatile 16-inch laptop with Intel Core processors, vibrant display, and all-day battery life for work and play.',
    features: ['16" FHD+ Display', 'Intel Core i5/i7', 'Up to 16 GB DDR5', 'Thunderbolt 4', 'Backlit Keyboard', 'Up to 12 Hours Battery'],
    specs: { display: '16" FHD+ (1920x1200)', processor: 'Intel Core i5/i7', ram: 'Up to 16 GB DDR5', battery: 'Up to 12 hours' },
    inStock: true, featured: true
  },
  {
    id: 'dell-latitude-5550',
    name: 'Dell Latitude 5550 Business Laptop',
    brand: 'Dell',
    category: 'Laptop',
    type: 'Business Laptop',
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/15-5550/media-gallery/laptop-latitude-15-5550-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=573',
    description: 'Enterprise-grade 15.6-inch business laptop with Intel vPro, enhanced security, and manageability for IT-managed environments.',
    features: ['15.6" FHD Display', 'Intel Core Ultra vPro', 'Up to 32 GB DDR5', 'Smart Card Reader', 'MIL-STD-810H', 'Dell Optimizer AI'],
    specs: { display: '15.6" FHD', processor: 'Intel Core Ultra vPro', ram: 'Up to 32 GB DDR5', security: 'Fingerprint, Smart Card, vPro' },
    inStock: true, featured: true
  },
  {
    id: 'dell-optiplex-7020-tower',
    name: 'Dell OptiPlex 7020 Tower Desktop',
    brand: 'Dell',
    category: 'Desktop',
    type: 'Business Desktop',
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/optiplex-desktops/optiplex-7020-702x/media-gallery/tower/desktop-optiplex-7020-tower-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402',
    description: 'Powerful business desktop with Intel Core processors, expandable design, and enterprise-grade management tools.',
    features: ['Intel Core i5/i7', 'Up to 64 GB DDR5', 'PCIe Gen 5 SSD', 'Wi-Fi 6E & Bluetooth', 'Multiple Display Support', 'Dell Optimizer'],
    specs: { processor: 'Intel Core i5/i7', ram: 'Up to 64 GB DDR5', storage: 'Up to 4 TB', connectivity: 'Wi-Fi 6E, Ethernet' },
    inStock: true, featured: false
  },
  {
    id: 'dell-ultrasharp-u2724d',
    name: 'Dell UltraSharp U2724D 27" Monitor',
    brand: 'Dell',
    category: 'Monitor',
    type: 'Professional Monitor',
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2724d/media-gallery/monitor-u2724d-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=573',
    description: 'Professional 27-inch QHD monitor with IPS Black technology, 120Hz refresh rate, and USB-C connectivity for creative professionals.',
    features: ['27" QHD (2560x1440)', 'IPS Black Technology', '120Hz Refresh Rate', 'USB-C 90W Delivery', '98% DCI-P3 Color', 'VESA DisplayHDR 600'],
    specs: { resolution: '2560x1440 QHD', panel: 'IPS Black', refreshRate: '120Hz', ports: 'HDMI, DP, USB-C 90W' },
    inStock: true, featured: false
  },
  {
    id: 'dell-p2425h-monitor',
    name: 'Dell P2425H 24" Professional Monitor',
    brand: 'Dell',
    category: 'Monitor',
    type: 'Business Monitor',
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/p-series/p2425h/media-gallery/monitor-p2425h-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=573',
    description: 'Reliable 24-inch FHD business monitor with ComfortView Plus, adjustable stand, and versatile connectivity for everyday office use.',
    features: ['23.8" FHD IPS', 'ComfortView Plus', '100Hz Refresh Rate', 'Adjustable Stand', 'HDMI, DP, USB-C', 'VESA Mount Compatible'],
    specs: { resolution: '1920x1080 FHD', panel: 'IPS', refreshRate: '100Hz', adjustability: 'Height, Tilt, Swivel, Pivot' },
    inStock: true, featured: false
  },

  // ───── DJI (5 products) ─────
  {
    id: 'dji-air-3',
    name: 'DJI Air 3 Drone',
    brand: 'DJI',
    category: 'Drones',
    type: 'Consumer Drone',
    image: 'https://store.dji.com/cdn-cgi/image/width=750,quality=75,format=auto/https://dji-official.djicdn.com/dps/products/dji-air-3/images/dji-air-3-sku-01.png',
    description: 'Dual primary cameras with wide-angle and 3x medium telephoto. Capture stunning aerial footage with 48MP photos and 4K/60fps HDR video.',
    features: ['Dual Camera System', '48MP Photos', '4K/60fps HDR Video', '46 Min Max Flight Time', 'Omnidirectional Obstacle Sensing', 'O4 HD Video Transmission'],
    specs: { camera: 'Dual 1/1.3" CMOS', video: '4K/60fps HDR', flightTime: '46 min', range: '20 km', weight: '720 g' },
    inStock: true, featured: true
  },
  {
    id: 'dji-mini-4-pro',
    name: 'DJI Mini 4 Pro',
    brand: 'DJI',
    category: 'Drones',
    type: 'Mini Drone',
    image: 'https://store.dji.com/cdn-cgi/image/width=750,quality=75,format=auto/https://dji-official.djicdn.com/dps/products/dji-mini-4-pro/images/dji-mini-4-pro-sku-01.png',
    description: 'Under 249g mini drone with 4K/60fps HDR video, omnidirectional obstacle sensing, and extended flight time.',
    features: ['Under 249g', '4K/60fps HDR Video', '48MP Photos', 'Omnidirectional Sensing', '34 Min Flight Time', 'ActiveTrack 360°'],
    specs: { weight: '249 g', camera: '1/1.3" CMOS 48MP', video: '4K/60fps HDR', flightTime: '34 min', range: '20 km' },
    inStock: true, featured: true
  },
  {
    id: 'dji-mavic-3-pro',
    name: 'DJI Mavic 3 Pro',
    brand: 'DJI',
    category: 'Drones',
    type: 'Professional Drone',
    image: 'https://store.dji.com/cdn-cgi/image/width=750,quality=75,format=auto/https://dji-official.djicdn.com/dps/products/dji-mavic-3-pro/images/dji-mavic-3-pro-sku-01.png',
    description: 'Triple-camera flagship drone with Hasselblad primary, medium tele, and tele cameras for unmatched aerial photography.',
    features: ['Triple Camera System', 'Hasselblad 4/3 CMOS', '4K/60fps All 3 Cams', '43 Min Flight Time', 'Omnidirectional Sensing', 'Apple ProRes Support'],
    specs: { cameras: 'Hasselblad + Medium Tele + Tele', video: '5.1K/50fps', flightTime: '43 min', range: '28 km', weight: '958 g' },
    inStock: true, featured: false
  },
  {
    id: 'dji-osmo-mobile-6',
    name: 'DJI Osmo Mobile 6 Gimbal',
    brand: 'DJI',
    category: 'Gimbals',
    type: 'Smartphone Gimbal',
    image: 'https://store.dji.com/cdn-cgi/image/width=750,quality=75,format=auto/https://dji-official.djicdn.com/dps/products/dji-osmo-mobile-6/images/dji-osmo-mobile-6-sku-01.png',
    description: '3-axis smartphone gimbal stabilizer with intelligent tracking, gesture control, and built-in extension rod for smooth content creation.',
    features: ['3-Axis Stabilization', 'ActiveTrack 5.0', 'Gesture Control', 'Built-in Extension Rod', 'Quick Launch', '6.5 Hr Battery Life'],
    specs: { axes: '3-Axis', compatibility: 'Smartphones 170-290mm', batteryLife: '6.5 hours', weight: '309 g' },
    inStock: true, featured: false
  },
  {
    id: 'dji-action-4',
    name: 'DJI Osmo Action 4',
    brand: 'DJI',
    category: 'Action Cameras',
    type: 'Action Camera',
    image: 'https://store.dji.com/cdn-cgi/image/width=750,quality=75,format=auto/https://dji-official.djicdn.com/dps/products/dji-osmo-action-4/images/dji-osmo-action-4-sku-01.png',
    description: 'Premium action camera with 1/1.3" sensor, 4K/120fps, and excellent low-light performance for adventures.',
    features: ['1/1.3" Sensor', '4K/120fps Video', '155° Ultra-Wide FOV', 'Waterproof to 18m', 'Dual Touchscreens', '-20°C Cold Resistant'],
    specs: { sensor: '1/1.3" CMOS', video: '4K/120fps', fieldOfView: '155° Ultra-Wide', waterproof: '18m without case' },
    inStock: true, featured: false
  },

  // ───── Godox (5 products) ─────
  {
    id: 'godox-ad600-pro',
    name: 'Godox AD600Pro TTL Flash',
    brand: 'Godox',
    category: 'Studio Lights',
    type: 'Strobe Flash',
    image: 'https://www.godox.com/upfile/content/thumb_images/2020/07/AD600Pro_1.webp',
    description: '600Ws portable TTL flash with 1/8000s HSS, stable color temperature, and 0.01-1s recycling for professional studio and outdoor shoots.',
    features: ['600Ws Power Output', 'TTL / HSS up to 1/8000s', '0.01-1s Recycle Time', '2.4G Wireless X System', '360 Full Power Flashes', 'Bowens Mount Compatible'],
    specs: { power: '600Ws', flashDuration: '1/220-1/10100s', colorTemp: '5600K ±75K', battery: '360 full-power flashes', weight: '3.45 kg' },
    inStock: true, featured: true
  },
  {
    id: 'godox-v1-round-head-flash',
    name: 'Godox V1 Round Head Flash',
    brand: 'Godox',
    category: 'Speedlites',
    type: 'Camera Flash',
    image: 'https://www.godox.com/upfile/content/thumb_images/2020/07/V1_1.webp',
    description: 'Revolutionary round head camera flash with magnetic accessories, TTL, and HSS for natural, even light distribution.',
    features: ['76Ws Guide Number 92', 'Round Head Design', 'Magnetic Accessories', 'TTL / HSS', '2.4G X Wireless', '1.5s Recycle Time'],
    specs: { guideNumber: '92 (ISO 100)', flashDuration: '1/300-1/20000s', colorTemp: '5600K ±200K', battery: '480 full flashes', weight: '530 g' },
    inStock: true, featured: true
  },
  {
    id: 'godox-sl200-iii',
    name: 'Godox SL200III LED Video Light',
    brand: 'Godox',
    category: 'LED Panels',
    type: 'LED Video Light',
    image: 'https://www.godox.com/upfile/content/thumb_images/2023/04/SL200III_1.webp',
    description: '200W daylight-balanced LED video light with Bowens mount, silent fan, and app control for professional video production.',
    features: ['200W LED Output', '5600K Daylight', 'Bowens Mount', 'Silent Fan Mode', 'App Control', '11 FX Effects'],
    specs: { power: '200W', colorTemp: '5600K', cri: 'CRI 96+, TLCI 97+', control: 'App, DMX, On-body', weight: '2.45 kg' },
    inStock: true, featured: false
  },
  {
    id: 'godox-xpro-ii-trigger',
    name: 'Godox XPro II Wireless Trigger',
    brand: 'Godox',
    category: 'Lighting Accessories',
    type: 'Flash Trigger',
    image: 'https://www.godox.com/upfile/content/thumb_images/2022/04/XProII_1.webp',
    description: 'Professional wireless flash trigger with large LCD, Bluetooth connectivity, TCM function, and 2.4G X system for reliable flash control.',
    features: ['2.4G X Wireless System', 'Large LCD Display', 'Bluetooth App Control', 'TCM Function', 'HSS up to 1/8000s', '5 Group / 32 Channels'],
    specs: { protocol: '2.4G X System', range: '100m', channels: '32', hss: 'Up to 1/8000s', weight: '126 g' },
    inStock: true, featured: false
  },
  {
    id: 'godox-ml60',
    name: 'Godox ML60 Portable LED Light',
    brand: 'Godox',
    category: 'LED Panels',
    type: 'Portable LED',
    image: 'https://www.godox.com/upfile/content/thumb_images/2020/07/ML60_1.webp',
    description: 'Compact 60W handheld LED light with silent mode, battery-powered option, and NanliteBowes mount for on-location shoots.',
    features: ['60W Portable LED', '5600K Daylight', 'Silent Mode', 'Battery Powered Option', 'CRI 96+ TLCI 97+', 'Lightweight 750g'],
    specs: { power: '60W', colorTemp: '5600K', cri: 'CRI 96+', batteryLife: '1 hour at full', weight: '750 g' },
    inStock: true, featured: false
  },

  // ───── Unomat (4 products) ─────
  {
    id: 'unomat-pro-1600-tripod',
    name: 'Unomat Pro 1600 Professional Tripod',
    brand: 'Unomat',
    category: 'Tripods',
    type: 'Camera Tripod',
    image: '/images/products/unomat-placeholder.webp',
    description: 'Professional aluminum tripod with 3-way pan head, quick release plate, and adjustable center column for photography and videography.',
    features: ['160cm Max Height', '3-Way Pan Head', 'Quick Release Plate', 'Bubble Level', 'Non-Slip Rubber Feet', 'Carrying Case Included'],
    specs: { maxHeight: '160 cm', minHeight: '55 cm', load: 'Up to 5 kg', weight: '1.6 kg', material: 'Aluminum' },
    inStock: true, featured: true
  },
  {
    id: 'unomat-backpack-pro-300',
    name: 'Unomat Camera Backpack Pro 300',
    brand: 'Unomat',
    category: 'Camera Bags',
    type: 'Camera Backpack',
    image: '/images/products/unomat-placeholder.webp',
    description: 'Spacious camera backpack with padded compartments for 1 DSLR body, 3-4 lenses, a 15" laptop, and accessories.',
    features: ['1 Body + 3-4 Lenses', '15" Laptop Compartment', 'Waterproof Rain Cover', 'Padded Dividers', 'Tripod Holder', 'Side Quick Access'],
    specs: { capacity: '1 body + 3-4 lenses', laptop: 'Up to 15"', material: 'Water-resistant polyester', weight: '1.3 kg' },
    inStock: true, featured: true
  },
  {
    id: 'unomat-sd-card-reader-usb3',
    name: 'Unomat USB 3.0 Multi Card Reader',
    brand: 'Unomat',
    category: 'Memory Card Readers',
    type: 'Card Reader',
    image: '/images/products/unomat-placeholder.webp',
    description: 'High-speed USB 3.0 multi card reader supporting SD, microSD, CF, and Memory Stick formats for fast file transfers.',
    features: ['USB 3.0 SuperSpeed', 'SD / microSD / CF / MS', 'LED Activity Indicator', 'Plug & Play', 'Compact Design', 'Bus Powered'],
    specs: { interface: 'USB 3.0', formats: 'SD, microSD, CF, MS', speed: 'Up to 5 Gbps', weight: '42 g' },
    inStock: true, featured: false
  },
  {
    id: 'unomat-mini-flexible-tripod',
    name: 'Unomat FlexPod Mini Tripod',
    brand: 'Unomat',
    category: 'Tripods',
    type: 'Mini Tripod',
    image: '/images/products/unomat-placeholder.webp',
    description: 'Flexible mini tripod with bendable legs that wrap around poles, branches, and railings. Perfect for vlogging and action cameras.',
    features: ['Flexible Wrapping Legs', 'Supports up to 1 kg', 'Universal 1/4" Mount', 'Phone Holder Included', 'Lightweight 150g', 'GoPro Compatible'],
    specs: { height: '26 cm', maxLoad: '1 kg', mount: '1/4" Universal', weight: '150 g' },
    inStock: true, featured: false
  },

  // ───── APC (5 products) ─────
  {
    id: 'apc-back-ups-pro-1500va',
    name: 'APC Back-UPS Pro 1500VA',
    brand: 'APC',
    category: 'UPS Systems',
    type: 'UPS',
    image: 'https://download.schneider-electric.com/files?p_Doc_Ref=SPD_QUIJ-A5XQJT_EN&p_enDocType=Product%20Photo&p_File_Name=BR1500GI_APC+Back-UPS+Pro_Front.JPG',
    description: 'Premium 1500VA/865W UPS with LCD interface, automatic voltage regulation, and 10 outlets for home office and small business protection.',
    features: ['1500VA / 865W', 'LCD Status Display', 'AVR Voltage Regulation', '10 Outlets (5 Battery + 5 Surge)', 'USB & Serial Ports', 'Sine Wave Output'],
    specs: { capacity: '1500VA / 865W', outlets: '10', topology: 'Line Interactive', runtime: '6 min at full load', weight: '10.7 kg' },
    inStock: true, featured: true
  },
  {
    id: 'apc-smart-ups-smt1500ic',
    name: 'APC Smart-UPS 1500VA LCD',
    brand: 'APC',
    category: 'UPS Systems',
    type: 'Smart UPS',
    image: 'https://download.schneider-electric.com/files?p_Doc_Ref=SPD_QUIJ-ACSQHT_EN&p_enDocType=Product%20Photo&p_File_Name=SMT1500IC_APC+Smart-UPS_Front.JPG',
    description: 'Enterprise-grade 1500VA line-interactive UPS with pure sine wave output, SmartConnect cloud monitoring, and extended runtime capability.',
    features: ['1500VA / 1000W', 'Pure Sine Wave', 'SmartConnect Cloud', 'LCD Display', 'AVR', 'Extended Runtime Capable'],
    specs: { capacity: '1500VA / 1000W', topology: 'Line Interactive', waveform: 'Pure Sine Wave', runtime: '10.4 min at full', weight: '20.2 kg' },
    inStock: true, featured: true
  },
  {
    id: 'apc-essential-surgearrest-pm6u',
    name: 'APC SurgeArrest Essential 6-Outlet',
    brand: 'APC',
    category: 'Surge Protectors',
    type: 'Surge Protector',
    image: 'https://download.schneider-electric.com/files?p_Doc_Ref=SPD_QUIJ-A5XQJT_EN&p_enDocType=Product%20Photo',
    description: '6-outlet surge protector with USB charging ports and 1680 Joule rating for reliable electronics protection.',
    features: ['6 Outlets', '2 USB Charging Ports', '1680 Joule Rating', 'LED Status Indicator', 'Right-Angle Plug', 'Lifetime Warranty'],
    specs: { outlets: '6', joules: '1680', usb: '2 ports (2.4A total)', cordLength: '6 ft', weight: '0.5 kg' },
    inStock: true, featured: false
  },
  {
    id: 'apc-back-ups-650va',
    name: 'APC Back-UPS 650VA',
    brand: 'APC',
    category: 'UPS Systems',
    type: 'Basic UPS',
    image: 'https://download.schneider-electric.com/files?p_Doc_Ref=SPD_QUIJ-A5XQJT_EN&p_enDocType=Product%20Photo',
    description: 'Affordable 650VA UPS with battery backup and surge protection for desktop computers and home networking equipment.',
    features: ['650VA / 360W', '8 Outlets', 'USB Charging Port', 'Automatic Self-Test', 'Audible Alarms', 'Compact Design'],
    specs: { capacity: '650VA / 360W', outlets: '8', topology: 'Standby', runtime: '3 min at full load', weight: '5.5 kg' },
    inStock: true, featured: false
  },
  {
    id: 'apc-rack-pdu-basic',
    name: 'APC Rack PDU Basic 1U',
    brand: 'APC',
    category: 'Power Distribution',
    type: 'PDU',
    image: 'https://download.schneider-electric.com/files?p_Doc_Ref=SPD_QUIJ-A5XQJT_EN&p_enDocType=Product%20Photo',
    description: '1U rackmount power distribution unit with 12 outlets for server room and data center power management.',
    features: ['1U Rack Mount', '12 Outlets', '15A/120V Capacity', 'LED Power Indicator', 'Toolless Mount', '6 ft Power Cord'],
    specs: { formFactor: '1U Rack Mount', outlets: '12', capacity: '15A / 120V', cordLength: '6 ft', weight: '2.3 kg' },
    inStock: true, featured: false
  },

  // ───── SanDisk (5 products) ─────
  {
    id: 'sandisk-extreme-pro-sdxc-256gb',
    name: 'SanDisk Extreme PRO SDXC 256GB',
    brand: 'SanDisk',
    category: 'Memory Cards',
    type: 'SD Card',
    image: 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/memory-cards/extreme-pro-uhs-i-sd/extreme-pro-uhs-i-sd-256gb.png.thumb.1280.1280.png',
    description: 'Professional-grade SDXC card with up to 200MB/s read speed, UHS-I U3 rating, and V30 for 4K UHD video recording.',
    features: ['256 GB Capacity', '200MB/s Read Speed', '140MB/s Write Speed', 'UHS-I, U3, V30', '4K UHD Ready', 'Built-in Write-Protect Switch'],
    specs: { capacity: '256 GB', readSpeed: '200 MB/s', writeSpeed: '140 MB/s', rating: 'UHS-I, U3, V30, Class 10' },
    inStock: true, featured: true
  },
  {
    id: 'sandisk-extreme-pro-microsd-128gb',
    name: 'SanDisk Extreme PRO microSDXC 128GB',
    brand: 'SanDisk',
    category: 'microSD Cards',
    type: 'microSD Card',
    image: 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/memory-cards/extreme-pro-uhs-i-microsd/extreme-pro-uhs-i-microsd-128gb.png.thumb.1280.1280.png',
    description: 'High-performance microSD card for action cameras, drones, and smartphones with A2 app performance for faster app loads.',
    features: ['128 GB Capacity', '200MB/s Read Speed', '90MB/s Write Speed', 'A2 App Performance', 'UHS-I, V30', 'Ideal for Action Cameras'],
    specs: { capacity: '128 GB', readSpeed: '200 MB/s', writeSpeed: '90 MB/s', rating: 'UHS-I, U3, V30, A2' },
    inStock: true, featured: true
  },
  {
    id: 'sandisk-ultra-dual-drive-go-128gb',
    name: 'SanDisk Ultra Dual Drive Go 128GB',
    brand: 'SanDisk',
    category: 'USB Flash Drives',
    type: 'USB Drive',
    image: 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/usb-flash-drives/ultra-dual-drive-go-usb-3-1-flash-drive/ultra-dual-drive-go-usb-3-1-128gb.png.thumb.1280.1280.png',
    description: 'Dual USB Type-C and Type-A flash drive for seamless file transfers between phones, tablets, and computers.',
    features: ['128 GB Capacity', 'USB 3.1 Type-C + Type-A', '150MB/s Read Speed', 'Swivel Design', 'Keyring Hole', 'SanDisk Memory Zone App'],
    specs: { capacity: '128 GB', interface: 'USB 3.1 Type-C + Type-A', readSpeed: '150 MB/s', weight: '5 g' },
    inStock: true, featured: false
  },
  {
    id: 'sandisk-extreme-portable-ssd-1tb',
    name: 'SanDisk Extreme Portable SSD 1TB',
    brand: 'SanDisk',
    category: 'Portable SSDs',
    type: 'Portable SSD',
    image: 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/portable-drives/extreme-portable-ssd-v2/extreme-portable-ssd-1tb.png.thumb.1280.1280.png',
    description: 'Rugged portable SSD with 1050MB/s read speeds, IP65 water and dust resistance, and 2-meter drop protection.',
    features: ['1 TB Capacity', '1050MB/s Read Speed', 'IP65 Water & Dust Resistant', '2m Drop Protection', 'USB 3.2 Gen 2', 'Carabiner Loop'],
    specs: { capacity: '1 TB', readSpeed: '1050 MB/s', writeSpeed: '1000 MB/s', protection: 'IP65, 2m drop', interface: 'USB 3.2 Gen 2 Type-C' },
    inStock: true, featured: false
  },
  {
    id: 'sandisk-extreme-pro-cfexpress-256gb',
    name: 'SanDisk Extreme PRO CFexpress 256GB',
    brand: 'SanDisk',
    category: 'Memory Cards',
    type: 'CFexpress Card',
    image: 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/memory-cards/extreme-pro-cfexpress-type-b/extreme-pro-cfexpress-type-b-256gb.png.thumb.1280.1280.png',
    description: 'Ultra-fast CFexpress Type B card for professional cameras with raw 4K and 8K video capture at sustained high speeds.',
    features: ['256 GB Capacity', '1700MB/s Read Speed', '1200MB/s Write Speed', 'Type B Form Factor', '8K RAW Video Ready', 'Pro Camera Compatible'],
    specs: { capacity: '256 GB', readSpeed: '1700 MB/s', writeSpeed: '1200 MB/s', type: 'CFexpress Type B' },
    inStock: true, featured: false
  },

  // ───── Lexar (5 products) ─────
  {
    id: 'lexar-professional-1800x-sdxc-256gb',
    name: 'Lexar Professional 1800x SDXC 256GB',
    brand: 'Lexar',
    category: 'Memory Cards',
    type: 'SD Card',
    image: 'https://www.lexar.com/wp-content/uploads/2022/11/Lexar-Professional-1800x-SDXC-UHS-II-Card-SILVER-Series-256GB-1.png',
    description: 'Professional UHS-II SDXC card with up to 270MB/s speed, perfect for high-resolution photography and 4K video.',
    features: ['256 GB Capacity', '270MB/s Read Speed', '180MB/s Write Speed', 'UHS-II, V60, U3', '4K UHD Video Ready', 'Lifetime Limited Warranty'],
    specs: { capacity: '256 GB', readSpeed: '270 MB/s', writeSpeed: '180 MB/s', rating: 'UHS-II, V60, U3, Class 10' },
    inStock: true, featured: true
  },
  {
    id: 'lexar-professional-cfexpress-type-b-512gb',
    name: 'Lexar Professional CFexpress Type B 512GB',
    brand: 'Lexar',
    category: 'Memory Cards',
    type: 'CFexpress Card',
    image: 'https://www.lexar.com/wp-content/uploads/2022/11/Lexar-Professional-CFexpress-DIAMOND-Series-Type-B-Card-1.png',
    description: 'Ultra-high-speed CFexpress Type B card with 1900MB/s read speed for capturing stunning 8K RAW footage.',
    features: ['512 GB Capacity', '1900MB/s Read Speed', '1700MB/s Write Speed', 'PCIe Gen 3x2', '8K RAW Capable', 'Pro Camera Compatible'],
    specs: { capacity: '512 GB', readSpeed: '1900 MB/s', writeSpeed: '1700 MB/s', type: 'CFexpress Type B, PCIe Gen 3x2' },
    inStock: true, featured: true
  },
  {
    id: 'lexar-professional-usb-c-reader',
    name: 'Lexar Professional USB-C Dual Reader',
    brand: 'Lexar',
    category: 'Card Readers',
    type: 'Card Reader',
    image: 'https://www.lexar.com/wp-content/uploads/2022/11/Lexar-Professional-USB-C-Dual-Slot-Reader-1.png',
    description: 'Dual-slot USB-C card reader supporting CFexpress Type B and UHS-II SD cards for maximum flexibility.',
    features: ['USB 3.2 Gen 2 Type-C', 'CFexpress Type B Slot', 'UHS-II SD Slot', '10 Gbps Transfer Speed', 'Aluminum Body', 'Compact & Portable'],
    specs: { interface: 'USB 3.2 Gen 2 Type-C', slots: 'CFexpress Type B + SD UHS-II', speed: '10 Gbps', weight: '48 g' },
    inStock: true, featured: false
  },
  {
    id: 'lexar-jumpdrive-m45-256gb',
    name: 'Lexar JumpDrive M45 256GB USB 3.1',
    brand: 'Lexar',
    category: 'USB Flash Drives',
    type: 'USB Flash Drive',
    image: 'https://www.lexar.com/wp-content/uploads/2022/11/Lexar-JumpDrive-M45-USB-3.1-Flash-Drive-1.png',
    description: 'High-speed USB 3.1 flash drive with metal housing, up to 250MB/s read speeds, and a capless design.',
    features: ['256 GB Capacity', '250MB/s Read Speed', 'USB 3.1 Gen 1', 'Metal Body', 'Capless Sliding Design', 'Lightweight & Durable'],
    specs: { capacity: '256 GB', readSpeed: '250 MB/s', interface: 'USB 3.1 Gen 1', weight: '13 g' },
    inStock: true, featured: false
  },
  {
    id: 'lexar-nm790-2tb-nvme-ssd',
    name: 'Lexar NM790 2TB M.2 NVMe SSD',
    brand: 'Lexar',
    category: 'Portable SSDs',
    type: 'Internal SSD',
    image: 'https://www.lexar.com/wp-content/uploads/2023/03/Lexar-NM790-M.2-2280-PCIe-Gen-4x4-NVMe-SSD-1.png',
    description: 'High-performance M.2 NVMe SSD with PCIe Gen 4x4, 7400MB/s read speed, and advanced HMB technology for gaming and content creation.',
    features: ['2 TB Capacity', '7400MB/s Read Speed', '6500MB/s Write Speed', 'PCIe Gen 4x4', 'M.2 2280 Form Factor', 'Advanced HMB 3.0'],
    specs: { capacity: '2 TB', readSpeed: '7400 MB/s', writeSpeed: '6500 MB/s', interface: 'PCIe Gen 4x4 NVMe', formFactor: 'M.2 2280' },
    inStock: true, featured: false
  }
];

// Merge new products and write
const merged = [...products, ...newProducts];
fs.writeFileSync(productsFile, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log(`Added ${newProducts.length} new products. Total: ${merged.length}`);

// Print per-brand counts
const brands = {};
merged.forEach(p => { brands[p.brand] = (brands[p.brand] || 0) + 1; });
console.log('Brand counts:', JSON.stringify(brands, null, 2));

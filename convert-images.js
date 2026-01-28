const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Images to convert
const images = [
    'mega888.png',
    'og-image.png',
    'og-info.png',
    'og-share.png',
    'og-trusted.png'
];

async function convertToWebP() {
    console.log('🎨 Converting images to WebP...\n');

    for (const image of images) {
        const inputPath = path.join(publicDir, image);
        const outputPath = path.join(publicDir, image.replace('.png', '.webp'));

        try {
            const stats = fs.statSync(inputPath);
            const originalSize = (stats.size / 1024).toFixed(2);

            await sharp(inputPath)
                .webp({ quality: 85 })
                .toFile(outputPath);

            const newStats = fs.statSync(outputPath);
            const newSize = (newStats.size / 1024).toFixed(2);
            const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

            console.log(`✅ ${image}`);
            console.log(`   Original: ${originalSize} KB`);
            console.log(`   WebP: ${newSize} KB`);
            console.log(`   Savings: ${savings}%\n`);
        } catch (error) {
            console.error(`❌ Error converting ${image}:`, error.message);
        }
    }

    console.log('🎉 Conversion complete!');
}

convertToWebP().catch(console.error);

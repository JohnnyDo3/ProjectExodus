import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [16, 32, 48, 64, 128, 256];
const svgPath = path.join(process.cwd(), 'public', 'logo.svg');
const outputDir = path.join(process.cwd(), 'public');

async function convertToFavicon() {
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate PNGs at different sizes
  const pngBuffers = await Promise.all(
    sizes.map(size =>
      sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  // Save individual PNGs for reference
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(outputDir, 'logo-192.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(outputDir, 'logo-512.png'));
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(outputDir, 'favicon-32x32.png'));
  await sharp(svgBuffer).resize(16, 16).png().toFile(path.join(outputDir, 'favicon-16x16.png'));

  // Create ICO file manually (ICO format)
  // ICO header: 6 bytes
  // ICO directory entries: 16 bytes each
  // Image data follows

  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);      // Reserved, must be 0
  icoHeader.writeUInt16LE(1, 2);      // Image type: 1 = ICO
  icoHeader.writeUInt16LE(sizes.length, 4);  // Number of images

  const dirEntries = [];
  let dataOffset = 6 + (sizes.length * 16); // After header and all directory entries

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const pngBuffer = pngBuffers[i];

    const entry = Buffer.alloc(16);
    entry.writeUInt8(size < 256 ? size : 0, 0);  // Width (0 means 256)
    entry.writeUInt8(size < 256 ? size : 0, 1);  // Height (0 means 256)
    entry.writeUInt8(0, 2);                       // Color palette
    entry.writeUInt8(0, 3);                       // Reserved
    entry.writeUInt16LE(1, 4);                    // Color planes
    entry.writeUInt16LE(32, 6);                   // Bits per pixel
    entry.writeUInt32LE(pngBuffer.length, 8);    // Image size
    entry.writeUInt32LE(dataOffset, 12);          // Offset to image data

    dirEntries.push(entry);
    dataOffset += pngBuffer.length;
  }

  // Combine everything into ICO file
  const icoBuffer = Buffer.concat([
    icoHeader,
    ...dirEntries,
    ...pngBuffers
  ]);

  fs.writeFileSync(path.join(outputDir, 'favicon.ico'), icoBuffer);

  console.log('Created favicon.ico and PNG files in public/');
  console.log('Files created:');
  console.log('  - favicon.ico (multi-resolution)');
  console.log('  - favicon-16x16.png');
  console.log('  - favicon-32x32.png');
  console.log('  - logo-192.png (for PWA)');
  console.log('  - logo-512.png (for PWA)');
}

convertToFavicon().catch(console.error);

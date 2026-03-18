#!/usr/bin/env node

/**
 * generate-globe-static.mjs
 *
 * Optional build-time script that uses Puppeteer to capture static globe
 * screenshots for mobile fallback. Run this manually when you want to
 * update the static images.
 *
 * Prerequisites:
 *   npm i -D puppeteer
 *
 * Usage:
 *   node scripts/generate-globe-static.mjs [--base-url http://localhost:3000]
 *
 * Output:
 *   public/globe/static-globe.png   — default globe screenshot
 */

import { existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUTPUT_DIR = resolve(ROOT, 'public/globe')

// Parse args
const args = process.argv.slice(2)
const baseUrlIdx = args.indexOf('--base-url')
const BASE_URL = baseUrlIdx !== -1 ? args[baseUrlIdx + 1] : 'http://localhost:3000'

async function main() {
  let puppeteer
  try {
    puppeteer = await import('puppeteer')
  } catch {
    console.error(
      'Puppeteer is not installed. Install it with:\n  npm i -D puppeteer\n'
    )
    process.exit(1)
  }

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  console.log(`Launching browser, targeting ${BASE_URL}/architecture ...`)
  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 })

  try {
    await page.goto(`${BASE_URL}/architecture`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    })

    // Wait for globe to render
    await page.waitForSelector('canvas', { timeout: 15000 })
    // Let globe animations settle
    await new Promise((r) => setTimeout(r, 5000))

    // Capture just the globe section
    const canvas = await page.$('canvas')
    if (canvas) {
      await canvas.screenshot({
        path: resolve(OUTPUT_DIR, 'static-globe.png'),
        type: 'png',
      })
      console.log('Saved public/globe/static-globe.png')
    } else {
      console.warn('No canvas element found, taking full page screenshot')
      await page.screenshot({
        path: resolve(OUTPUT_DIR, 'static-globe.png'),
        type: 'png',
        clip: { x: 0, y: 0, width: 800, height: 800 },
      })
    }
  } catch (err) {
    console.error('Screenshot capture failed:', err.message)
  } finally {
    await browser.close()
  }

  console.log('Done.')
}

main()

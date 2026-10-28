import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assets } from '../src/lib/assets.ts';

test('every initial image is bundled and has a valid image signature, independent of ImgBB', () => {
  for (const [name, image] of Object.entries(assets)) {
    assert.match(image.src, /^\/images\/[a-z0-9-]+\.(jpg|webp)$/, name);
    const file = new URL(`../public${image.src}`, import.meta.url);
    const bytes = readFileSync(file);
    assert.ok(bytes.length > 100, `${name}: empty image`);
    if (image.src.endsWith('.webp')) {
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', name);
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', name);
    } else {
      assert.equal(bytes.readUInt16BE(0), 0xffd8, name);
    }
  }
});

test('backup images use the existing HTTPS image host or the same bundled asset', () => {
  for (const [name, image] of Object.entries(assets)) {
    if (image.fallback === image.src) continue;
    const backup = new URL(image.fallback);
    assert.equal(backup.origin, 'https://i.ibb.co', name);
    assert.equal(backup.pathname.split('/').at(-1), image.src.split('/').at(-1), name);
  }
});

import { access, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const requiredAssets = [
  'dist/index.html',
  'dist/vendor/vision_bundle.mjs',
  'dist/vendor/hand_landmarker.task',
  'dist/vendor/vision_wasm_internal.wasm',
];

for (const asset of requiredAssets) {
  const path = resolve(asset);
  await access(path);
  const details = await stat(path);
  if (!details.isFile() || details.size === 0) {
    throw new Error(`El asset requerido no es válido: ${asset}`);
  }
}

console.log(`AuraMesh validado: ${requiredAssets.length} assets requeridos presentes.`);


import { Document, NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';

const doc = new Document();
const buffer = doc.createBuffer();
const scene = doc.createScene('Scene');

function createCylinderMeshData(radius, height, segments, color) {
  const positions = [];
  const normals = [];
  const indices = [];

  positions.push(0, height / 2, 0);
  normals.push(0, 1, 0);

  positions.push(0, -height / 2, 0);
  normals.push(0, -1, 0);

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    positions.push(x, height / 2, z);
    normals.push(0, 1, 0);

    positions.push(x, -height / 2, z);
    normals.push(0, -1, 0);
  }

  const topCenterIndex = 0;
  const bottomCenterIndex = 1;

  for (let i = 0; i < segments; i++) {
    const topCurr = 2 + i * 2;
    const botCurr = 3 + i * 2;
    const topNext = 2 + ((i + 1) % segments) * 2;
    const botNext = 3 + ((i + 1) % segments) * 2;

    indices.push(topCenterIndex, topNext, topCurr);
    indices.push(bottomCenterIndex, botCurr, botNext);
    indices.push(topCurr, topNext, botCurr);
    indices.push(topNext, botNext, botCurr);
  }

  const posAccessor = doc.createAccessor()
    .setType('VEC3')
    .setArray(new Float32Array(positions))
    .setBuffer(buffer);

  const normAccessor = doc.createAccessor()
    .setType('VEC3')
    .setArray(new Float32Array(normals))
    .setBuffer(buffer);

  const indexAccessor = doc.createAccessor()
    .setType('SCALAR')
    .setArray(new Uint16Array(indices))
    .setBuffer(buffer);

  const mat = doc.createMaterial(color.name)
    .setBaseColorFactor(color.rgba)
    .setRoughnessFactor(0.8)
    .setMetallicFactor(0.1);

  const prim = doc.createPrimitive()
    .setAttribute('POSITION', posAccessor)
    .setAttribute('NORMAL', normAccessor)
    .setIndices(indexAccessor)
    .setMaterial(mat);

  const mesh = doc.createMesh(color.name).addPrimitive(prim);
  return mesh;
}

const layers = [
  { name: 'bun_bottom', radius: 1.0, height: 0.3, color: { name: 'bun', rgba: [0.82, 0.55, 0.28, 1.0] }, yPos: 0.15 },
  { name: 'sauce_bottom', radius: 0.9, height: 0.05, color: { name: 'sauce', rgba: [0.85, 0.2, 0.1, 1.0] }, yPos: 0.32 },
  { name: 'patty', radius: 1.05, height: 0.35, color: { name: 'meat', rgba: [0.35, 0.2, 0.12, 1.0] }, yPos: 0.52 },
  { name: 'cheese', radius: 1.08, height: 0.06, color: { name: 'cheese', rgba: [0.98, 0.75, 0.1, 1.0] }, yPos: 0.73 },
  { name: 'pickle', radius: 0.7, height: 0.08, color: { name: 'pickle', rgba: [0.2, 0.6, 0.2, 1.0] }, yPos: 0.82 },
  { name: 'tomato', radius: 0.95, height: 0.12, color: { name: 'tomato', rgba: [0.9, 0.15, 0.1, 1.0] }, yPos: 0.94 },
  { name: 'lettuce', radius: 1.1, height: 0.08, color: { name: 'lettuce', rgba: [0.3, 0.75, 0.25, 1.0] }, yPos: 1.06 },
  { name: 'bun_top', radius: 1.0, height: 0.45, color: { name: 'bun', rgba: [0.82, 0.55, 0.28, 1.0] }, yPos: 1.32 },
];

layers.forEach(layer => {
  const mesh = createCylinderMeshData(layer.radius, layer.height, 16, layer.color);
  const node = doc.createNode(layer.name)
    .setMesh(mesh)
    .setTranslation([0, layer.yPos, 0]);
  scene.addChild(node);
});

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
await io.write('./public/models/burger-exploded.glb', doc);
console.log('Successfully generated public/models/burger-exploded.glb');

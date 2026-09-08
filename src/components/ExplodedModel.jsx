import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';

function BurgerAssembly({ explodeFactor, glbPath }) {
  const { scene } = useGLTF(glbPath || '/models/burger-exploded.glb');
  const clonedScene = React.useMemo(() => scene.clone(true), [scene]);

  const layerOffsets = {
    'bun_bottom': 0,
    'sauce_bottom': 0.8,
    'patty': 1.6,
    'cheese': 2.5,
    'pickle': 3.3,
    'tomato': 4.2,
    'lettuce': 5.0,
    'bun_top': 6.2,
  };

  clonedScene.traverse((child) => {
    if (child.isMesh) {
      const layerName = Object.keys(layerOffsets).find(key => child.name.toLowerCase().includes(key));
      const mult = layerName ? layerOffsets[layerName] : 1;

      if (child.userData.origY === undefined) {
        child.userData.origY = child.position.y;
      }

      child.position.y = child.userData.origY + (explodeFactor * mult * 0.45);
    }
  });

  return <primitive object={clonedScene} scale={1.2} />;
}

export default function ExplodedModel({ modelAsset, title }) {
  const [explode, setExplode] = useState(0.5);
  const [autoAnimate, setAutoAnimate] = useState(false);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#0a192f] border border-sky-500/30 shadow-2xl font-mono text-sky-100 select-none">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-[#0a192f]/90 to-transparent flex items-center justify-between border-b border-sky-500/20 backdrop-blur-sm">
        <div>
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">// Exploded View Assembly</span>
          <h3 className="text-base font-bold text-white tracking-wide">{title || 'Deconstructed Burger Rig'}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-xs text-sky-300 font-bold">R3F Active</span>
        </div>
      </div>

      <div className="w-full h-[480px] sm:h-[560px]">
        <Canvas camera={{ position: [3.5, 2.5, 4.5], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} />

          <Suspense fallback={
            <Html center>
              <div className="px-4 py-2 bg-[#0a192f] border border-sky-400 text-sky-300 rounded shadow-lg text-xs font-mono">
                Loading 3D Assembly Rig...
              </div>
            </Html>
          }>
            <Center>
              <BurgerAssembly explodeFactor={explode} glbPath={modelAsset} />
            </Center>
          </Suspense>

          <OrbitControls makeDefault autoRotate={autoAnimate} autoRotateSpeed={1.5} maxPolarAngle={Math.PI / 2 + 0.1} minDistance={2} maxDistance={10} />
        </Canvas>
      </div>

      <div className="p-4 bg-[#0f2b48]/90 border-t border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-2/3 flex items-center space-x-4">
          <span className="text-xs font-bold text-sky-300 uppercase whitespace-nowrap">Assemble</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explode}
            onChange={(e) => setExplode(parseFloat(e.target.value))}
            className="w-full h-2 bg-sky-950 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-sky-700/50"
          />
          <span className="text-xs font-bold text-sky-300 uppercase whitespace-nowrap">Explode</span>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => setExplode(explode === 0 ? 0.75 : 0)}
            className="px-3 py-1.5 rounded text-xs font-bold bg-sky-900/80 hover:bg-sky-800 text-sky-200 border border-sky-500/40 transition-colors"
          >
            {explode === 0 ? 'Explode' : 'Collapse'}
          </button>
          <button
            onClick={() => setAutoAnimate(!autoAnimate)}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors border ${
              autoAnimate
                ? 'bg-cyan-500 text-[#0a192f] border-cyan-300'
                : 'bg-sky-900/80 text-sky-200 border-sky-500/40 hover:bg-sky-800'
            }`}
          >
            {autoAnimate ? 'Pause Rotation' : 'Rotate'}
          </button>
        </div>
      </div>
    </div>
  );
}

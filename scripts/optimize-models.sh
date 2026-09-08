#!/usr/bin/env bash
# Optimize GLB 3D assets in public/models/ using gltf-transform CLI

set -e

MODELS_DIR="./public/models"

if [ ! -d "$MODELS_DIR" ]; then
  echo "No public/models directory found."
  exit 0
fi

echo "Optimizing 3D GLB assets in $MODELS_DIR..."

for glb in "$MODELS_DIR"/*.glb; do
  if [ -f "$glb" ]; then
    echo "Compressing $glb..."
    npx gltf-transform optimize "$glb" "$glb" --compress draco || echo "Compression skipped for $glb"
  fi
done

echo "3D model optimization complete!"

#!/usr/bin/env bash

# Caminho do diretório (caso queira especificar um diferente, modifique abaixo)
DIRETORIO="./packages/server"

# Remover arquivos .j, .d.ts e .d.ts.map
find "$DIRETORIO" -type f \( -name "*.js" -o -name "*.d.ts" -o -name "*.d.ts.map" \) -exec rm -f {} \;

echo "Arquivos .j, .d.ts e .d.ts.map removidos do diretório $DIRETORIO."

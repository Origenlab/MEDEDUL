#!/usr/bin/env python3
"""
Script para convertir imagenes JPG/PNG a WebP
Proyecto: MEDEDUL - Mesas de Dulces
"""

import os
from PIL import Image
from pathlib import Path

# Directorio de imagenes
IMG_DIR = "/Users/carsolio/Desktop/PAGINAS-HTML/MEDEDUL/img"

# Calidad de compresion WebP (80-85 recomendado)
QUALITY = 82

def convertir_a_webp(ruta_imagen):
    """Convierte una imagen a formato WebP"""
    try:
        img = Image.open(ruta_imagen)

        # Convertir a RGB si es necesario (para PNG con transparencia)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')

        # Crear ruta de salida WebP
        ruta_webp = ruta_imagen.rsplit('.', 1)[0] + '.webp'

        # Guardar como WebP
        img.save(ruta_webp, 'WEBP', quality=QUALITY, optimize=True)

        # Obtener tamanos
        tamano_original = os.path.getsize(ruta_imagen)
        tamano_webp = os.path.getsize(ruta_webp)
        reduccion = ((tamano_original - tamano_webp) / tamano_original) * 100

        return {
            'archivo': os.path.basename(ruta_imagen),
            'original_kb': tamano_original / 1024,
            'webp_kb': tamano_webp / 1024,
            'reduccion': reduccion
        }
    except Exception as e:
        return {'archivo': ruta_imagen, 'error': str(e)}

def main():
    print("=" * 60)
    print("CONVERSION DE IMAGENES A WEBP - MEDEDUL")
    print("=" * 60)
    print()

    # Buscar todas las imagenes JPG y PNG
    extensiones = ['*.jpg', '*.jpeg', '*.png']
    imagenes = []

    for ext in extensiones:
        imagenes.extend(Path(IMG_DIR).rglob(ext))

    print(f"Encontradas {len(imagenes)} imagenes para convertir")
    print("-" * 60)

    total_original = 0
    total_webp = 0
    convertidas = 0
    errores = 0

    for img_path in imagenes:
        resultado = convertir_a_webp(str(img_path))

        if 'error' in resultado:
            print(f"ERROR: {resultado['archivo']} - {resultado['error']}")
            errores += 1
        else:
            total_original += resultado['original_kb']
            total_webp += resultado['webp_kb']
            convertidas += 1
            print(f"OK: {resultado['archivo']}")
            print(f"    {resultado['original_kb']:.1f}KB -> {resultado['webp_kb']:.1f}KB ({resultado['reduccion']:.1f}% reduccion)")

    print()
    print("=" * 60)
    print("RESUMEN")
    print("=" * 60)
    print(f"Imagenes convertidas: {convertidas}")
    print(f"Errores: {errores}")
    print(f"Tamano original total: {total_original:.1f} KB ({total_original/1024:.2f} MB)")
    print(f"Tamano WebP total: {total_webp:.1f} KB ({total_webp/1024:.2f} MB)")

    if total_original > 0:
        reduccion_total = ((total_original - total_webp) / total_original) * 100
        print(f"Reduccion total: {reduccion_total:.1f}%")

    print()
    print("Conversion completada!")

if __name__ == "__main__":
    main()

# Sprites de Mugi

Los PNG individuales se conservan como masters de edición. La web usa versiones optimizadas en WebP o spritesheets.

Cada animación tiene su carpeta y sus frames se nombran en orden:

```text
public/mugi/
  idle/mugi-idle-01.png
  idle/mugi-idle-02.png
  laugh/mugi-laugh-01.png
  wave/mugi-wave-01.png
```

Para optimizar una secuencia, reducí cada frame con `Image.Resampling.NEAREST`, armá una sheet y exportala como WebP. Antes de exportar, limpiá el color RGB de los píxeles con alpha cero para evitar halos de chroma-key al comprimir. La animación `laugh` es el ejemplo: una sheet 2×2 de 640 px con cuatro frames de 320 px.

Después agregá la ruta del recurso publicado en `lib/mugi-animations.ts`.

Para usar un único spritesheet, definí la animación con `kind: "sheet"`, su grilla (`columns`, `rows`) y `frameCount`. El componente lo recorre automáticamente según su `fps`.

// Shared by every <EkinoImage>: a source used on several slides (or in the
// overview) is loaded and decoded once.
const images = new Map<string, Promise<HTMLImageElement>>();

/** Loads and decodes an image with CORS, so that its pixels can be read. */
export function loadImage(src: string) {
  if (!images.has(src)) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    images.set(
      src,
      img.decode().then(
        () => img,
        (error) => {
          // A failed load can be retried later
          images.delete(src);
          throw error;
        },
      ),
    );
  }
  return images.get(src)!;
}

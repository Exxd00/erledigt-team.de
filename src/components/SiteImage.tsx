'use client';
import { useCallback, useState, type ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> & {
  image: { src: string; fallback: string };
};

export function SiteImage({ image, alt, ...props }: Props) {
  const [failedSource, setFailedSource] = useState<string>();
  const useFallback = failedSource === image.src;
  // The browser can finish an unsuccessful SSR image request before React attaches onError.
  const checkInitialImage = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth === 0) setFailedSource(image.src);
    },
    [image.src],
  );
  return (
    <img
      {...props}
      ref={checkInitialImage}
      alt={alt}
      src={useFallback ? image.fallback : image.src}
      onError={useFallback ? undefined : () => setFailedSource(image.src)}
    />
  );
}

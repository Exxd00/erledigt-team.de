// Serve the bundled originals first so a slow third-party host cannot hide images.
// The owner's existing ImgBB uploads remain fallbacks for the original collection.
export const assets = {
  hedge: { src: '/images/heckenpflege.webp', fallback: '/images/heckenpflege.webp' },
  winter: { src: '/images/winterdienst.webp', fallback: '/images/winterdienst.webp' },
  grounds: { src: '/images/gruenpflege.webp', fallback: '/images/gruenpflege.webp' },
  logo: { src: '/images/logo.jpg', fallback: 'https://i.ibb.co/Q7S3b3bH/logo.jpg' },
  hero: {
    src: '/images/hero-cleaning.webp',
    fallback: 'https://i.ibb.co/fYgsQ7FS/hero-cleaning.webp',
  },
  solar: {
    src: '/images/solar-cleaning.webp',
    fallback: 'https://i.ibb.co/MkcQxsFh/solar-cleaning.webp',
  },
  office: {
    src: '/images/office-cleaning.webp',
    fallback: 'https://i.ibb.co/Z3DskzS/office-cleaning.webp',
  },
  floor: {
    src: '/images/floor-cleaning.webp',
    fallback: 'https://i.ibb.co/LLcQcHS/floor-cleaning.webp',
  },
  textile: {
    src: '/images/textile-cleaning.webp',
    fallback: 'https://i.ibb.co/5xzkGdJ0/textile-cleaning.webp',
  },
  stairs: {
    src: '/images/stairs-cleaning.webp',
    fallback: 'https://i.ibb.co/fYpk2DBL/stairs-cleaning.webp',
  },
  exterior: {
    src: '/images/exterior-cleaning.webp',
    fallback: 'https://i.ibb.co/4RQk9N8V/exterior-cleaning.webp',
  },
} as const;

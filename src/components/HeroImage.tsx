import Image from 'next/image';

export default function HeroImage() {
  return (
    <Image
      src={'/hero-image.png'}
      alt="Hero Image"
      width={1000}
      height={500}
      className="w-full rounded-xl shadow-2xl my-7"
      priority
    />
  );
}

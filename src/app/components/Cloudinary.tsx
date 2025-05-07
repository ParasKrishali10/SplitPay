"use client";
import { CldImage } from 'next-cloudinary';
export default function Page() {
  return (
    <CldImage
          src="cld-sample-5"
          width="500"
          height="500"
          crop={{
              type: 'auto',
              source: true
          }} alt={'No internet connection'}    />
  );
}
// components/Header.jsx
import Link from 'next/link';
import { dbConnect } from '@helpers/db';
import Menu from '@/models/Menu';
import HeaderClient from '@/components/Header/HeaderClient';
import Image from '@/helpers/Image';

export default async function Header() {
  await dbConnect();

  // Load the menu with key "header"
  const menu = await Menu.findOne({ key: 'header' }).lean();

  // Fallback if menu missing
  const items = menu?.items || [];

  return (
    <header className="bg-white text-secondary relative z-30">
      <div className="container flex items-center justify-between py-3 gap-4">
        <Link href="/">
        <Image
            src="/logo.svg"   // lives in /public
            alt="Brochure CMS"
            width={140}       // tweak to suit
            height={40}
            priority          // keep logo crisp
          />
        </Link>
          

        {/* Client-side nav (desktop + mobile) */}
        <HeaderClient items={items} />
      </div>
    </header>
  );
}
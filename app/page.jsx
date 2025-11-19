import dynamic from 'next/dynamic';
import { dbConnect } from '@helpers/db';
import Page from '@/models/Page';
import Post from '@/models/Post'; // ✅ THIS WAS MISSING
import HeroSection from '@/components/Homepage/HeroSection';

// Lazy-load all sections except the first one
const BlueBanner = dynamic(() => import('@/components/Homepage/BlueBanner'), { ssr: false });
const ServicesHomepage = dynamic(() => import('@/components/Homepage/Services'), { ssr: false });
const FeaturesSection = dynamic(() => import('@/components/Homepage/FeaturesSection'), { ssr: false });
const UspsServer = dynamic(
  () => import('@/components/Usps/UspsServer'),
  { ssr: true }
);


export default async function HomePage() {
  await dbConnect();

  // Fetch homepage
  const page = await Page.findOne({ templateKey: 'homepage' }).lean();

  if (!page) {
    return (
      <section className="container py-10">
        <h1 className="text-2xl font-semibold mb-2">Homepage not set up</h1>
        <p className="text-sm text-gray-600">
          Create a page in the admin and assign it the <code>homepage</code> template.
        </p>
      </section>
    );
  }

  const data = page.templateData || {};
  const section1 = data.section1 || {};
  const section2 = data.section2 || {};
  const section3 = data.section3 || {};

  // ✅ Fetch all services posts
  const services = await Post.find({ postTypeKey: 'services' }).lean();

  return (
    <>
      <HeroSection data={section1} />
      <UspsServer />
      {/* Pass services to homepage section */}
      <ServicesHomepage services={services} />

      <BlueBanner data={section2} />
      <FeaturesSection data={section3} />
    </>
  );
}
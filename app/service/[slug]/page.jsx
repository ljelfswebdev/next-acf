// app/service/[slug]/page.jsx
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { dbConnect } from '@helpers/db';
import Post from '@/models/Post';
import Banner from '@/components/Banner';
import UspsServer from '@/components/Usps/UspsServer';

// lazy-load the top section (swiper + description)
const ServiceTopSection = dynamic(
  () => import('@/components/Service/TopSection'),
  { ssr: false }
);


export default async function ServicePage({ params }) {
  await dbConnect();

  const { slug } = params;

  // Only match services post type
  const post = await Post.findOne({
    slug,
    postTypeKey: 'services',
  }).lean();

  if (!post) {
    return notFound();
  }

  const main = post.templateData?.main || {};
  const gallery = Array.isArray(main.gallery) ? main.gallery : [];
  const description = main.description || '';

  return (
    <main>

      <Banner title={post.title} />
      <UspsServer />
      <ServiceTopSection
        title={post.title}
        gallery={gallery}
        description={description}
      />

      {/* Future sections from components/Service can go here */}
    </main>
  );
}
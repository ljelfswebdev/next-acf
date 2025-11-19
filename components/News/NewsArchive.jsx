// components/News/NewsArchive.jsx
'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from '@/helpers/Image';
import Select from 'react-select';
import NewsSidebar from './Sidebar';

const PAGE_SIZE = 6;

// map nice labels → templateData.main field names
const CATEGORY_FIELDS = {
  Kirby: 'isKirby',
  Dyson: 'isDyson',
  Spares: 'isSpares',
  Vacuum: 'isVacuum',
  Service: 'isService',
  General: 'isGeneral',
};

export default function NewsArchive({ posts }) {
  // Sidebar now gives us this object
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const selectedCategories = filters.categories || [];

    return (posts || []).filter((post) => {
      const main = post?.templateData?.main || {};
      const intro = post?.templateData?.intro || {};

      // search in title, heading, excerpt, introText
      const haystack = [
        post.title,
        main.heading,
        main.excerpt,
        intro.introText,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (q && !haystack.includes(q)) return false;

      if (!selectedCategories.length) return true;

      // category filter: at least one selected category flag is true
      const hasAny = selectedCategories.some((label) => {
        const field = CATEGORY_FIELDS[label];
        if (!field) return false;
        return !!main[field];
      });

      return hasAny;
    });
  }, [posts, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(currentPage, totalPages);

  const paged = useMemo(() => {
    const start = (clampedPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, clampedPage]);

  const pageOptions = Array.from({ length: totalPages }, (_, i) => ({
    value: i + 1,
    label: `Page ${i + 1}`,
  }));

  function goToPage(p) {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* MAIN LIST */}
          <div className="space-y-6">
            {paged.length === 0 && (
              <div className="card">
                <p className="text-sm text-gray-600">
                  No news posts found. Try changing the search or filters.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paged.map((post) => {
                const intro = post?.templateData?.intro || {};
                const main = post?.templateData?.main || {};
                const introImage = intro.introImage || main.featuredImage;
                const introText = intro.introText || main.excerpt || '';

                const snippet =
                  introText.length > 180
                    ? `${introText.slice(0, 177)}…`
                    : introText;

                return (
                  <article
                    key={post._id}
                    className="card flex flex-col h-full"
                  >
                
                      <Link
                        href={`/news/${post.slug}`}
                        className="block mb-3 relative w-full aspect-[4/3] overflow-hidden rounded-lg"
                      >
                        <Image
                          src={introImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </Link>
                 

                    <div className="flex flex-col flex-1">
                      <h2 className="text-lg font-semibold mb-2">
                        <Link
                          href={`/news/${post.slug}`}
                          className="hover:text-primary"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {snippet && (
                        <p className="text-sm text-gray-600 flex-1">
                          {snippet}
                        </p>
                      )}

                      <div className="mt-4">
                        <Link
                          href={`/news/${post.slug}`}
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* PAGINATION */}
            {filtered.length > PAGE_SIZE && (
              <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <button
                    type="button"
                    className="button button--secondary"
                    onClick={() => goToPage(clampedPage - 1)}
                    disabled={clampedPage <= 1}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="button button--secondary"
                    onClick={() => goToPage(clampedPage + 1)}
                    disabled={clampedPage >= totalPages}
                  >
                    Next
                  </button>
                  <span className="text-xs text-gray-500 ml-2">
                    Page {clampedPage} of {totalPages}
                  </span>
                </div>

                <div className="w-full md:w-56">
                  <Select
                    instanceId="news-page-select"
                    options={pageOptions}
                    value={pageOptions.find((o) => o.value === clampedPage)}
                    onChange={(opt) => goToPage(opt?.value || 1)}
                    isSearchable={false}
                  />
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div>
            <NewsSidebar
              categories={Object.keys(CATEGORY_FIELDS)}
              onFilterChange={setFilters}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
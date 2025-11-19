// components/Homepage/FeaturesSection.jsx
'use client';

export default function FeaturesSection({ data }) {
  if (!data) return null;

  const {
    subtitle,
    title,
    text,
    bullets,
    linkText,
    linkUrl,
    stickerText,
  } = data;

  const bulletItems = Array.isArray(bullets) ? bullets : [];

  return (
    <section className="py-12">
      <div className="container grid gap-8 md:grid-cols-[2fr,1fr] items-start">
        <div className="space-y-4">
          {subtitle && (
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              {subtitle}
            </p>
          )}

          {title && (
            <h2 className="text-2xl md:text-3xl font-semibold">
              {title}
            </h2>
          )}

          {text && (
            <div
              className="prose max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}

          {bulletItems.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm">
              {bulletItems.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-primary" />
                  <span>{item?.text || ''}</span>
                </li>
              ))}
            </ul>
          )}

          {(linkText || linkUrl) && (
            <div className="mt-4">
              <a
                href={linkUrl || '#'}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary underline"
              >
                {linkText || 'Read more'}
              </a>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          {stickerText && (
            <div className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-6 text-xs font-semibold uppercase tracking-[0.2em]">
              {stickerText}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
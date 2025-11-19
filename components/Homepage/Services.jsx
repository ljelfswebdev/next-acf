'use client';

import Image from "next/image";
import Link from "next/link";

export default function ServicesHomepage({ data = [], services = [] }) {
  if (!services.length) return <>hello</>;

  // Split services into groups based on checkbox flags
  const groups = [
    {
      key: "kirby",
      title: "Kirby",
      items: services.filter(s => s.templateData?.main?.isKirby)
    },
    {
      key: "dyson",
      title: "Dyson",
      items: services.filter(s => s.templateData?.main?.isDyson)
    },
    {
      key: "spares",
      title: "Spares",
      items: services.filter(s => s.templateData?.main?.isSpares)
    },
  ];

  return (
    <section className="">
      {groups.map((group, index) => {
        if (!group.items.length) return null; // skip section if no items

        const isReversed = index % 2 === 1; // alternate layout

        return (
          <section
            key={group.key}
            className={`py-20 text-white ${
              isReversed ? "bg-primary" : "bg-secondary"
            }`}
          >
            <div className="container">
                <div className={`flex flex-col md:flex-row gap-12 items-center ${
              isReversed ? "md:flex-row-reverse" : ""
            }`}>
           
            {/* Section Title */}
            <div className={`w-full md:w-[400px] ${isReversed ? "order-2 md:order-1" : ""}`}>
              <div className="h4">{group.title} Vacuum Servicing & Repairs</div>
            </div>

            {/* Services list */}
            <div className={`grow ${isReversed ? "order-1 md:order-2" : ""}`}>
              <ul className="gap-10 flex flex-col md:flex-row">
                {group.items.map((service) => {
                  const gallery = service.templateData?.main?.gallery || [];
                  const img = gallery[0]?.image || null;

                  return (
                    <li key={service._id} className="w-full md:w-[calc(50%_-_8px)]">
                      <Link  href={`/service/${service.slug}`} className=" flex flex-col items-start justify-center gap-4">
                      {img && (
                        <Image
                          src={img}
                          alt={service.title}
                          width={600}
                          height={600}
                          className="rounded-primary object-cover w-full h-auto aspect-square"
                        />
                      )}

                      <div className="h5">
                        {service.title}
                      </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            </div>
             </div>
          </section>
        );
      })}
    </section>
  );
}
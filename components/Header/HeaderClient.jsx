// components/HeaderClient.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderClient({ items }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((x) => !x);
  const close = () => setOpen(false);

  const topLevel = Array.isArray(items) ? items : [];

  const menuVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.25,
      },
    }),
  };

  return (
    <>
      {/* DESKTOP NAV */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {topLevel.map((item, i) => (
          <div key={item._id || item.label || i} className="relative group">
            {/* Top-level menu item */}
            <Link
              href={item.url || '#'}
              className="hover:text-primary font-semibold transition-colors"
            >
              {item.label}
            </Link>

            {/* Dropdown (children) */}
            {Array.isArray(item.children) && item.children.length > 0 && (
              <div className="absolute left-0 top-full mt-2 bg-white text-black rounded shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[160px]">
                {item.children.map((child, j) => (
                  <Link
                    key={child._id || child.label || j}
                    href={child.url || '#'}
                    className="block px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* MOBILE HAMBURGER */}
      <button
        type="button"
        onClick={toggle}
        className="z-50 md:hidden inline-flex flex-col justify-center items-center w-9 h-9"
        aria-label="Toggle navigation"
      >
        <span
          className={`h-1 rounded-primary w-9 bg-secondary transition-transform origin-center ${
            open ? 'translate-y-2 rotate-45 !bg-white' : ''
          }`}
        />
        <span
          className={`h-1 w-9 rounded-primary bg-secondary my-1 transition-opacity ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`h-1 w-9  rounded-primary bg-secondary transition-transform origin-center ${
            open ? '-translate-y-2 -rotate-45 !bg-white' : ''
          }`}
        />
      </button>

      {/* MOBILE OVERLAY MENU (md and below) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-0 bottom-0 pt-14 bg-secondary text-white md:hidden z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div
              className="h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-4 px-4 pt-4 text-lg">
                {topLevel.map((item, i) => (
                  <motion.div
                    key={item._id || item.label || i}
                    custom={i}
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 5 }}
                    className="border-b border-white/10 pb-3"
                  >
                    <Link
                      href={item.url || '#'}
                      onClick={close}
                      className="block"
                    >
                      {item.label}
                    </Link>

                    {/* Children as indented links */}
                    {Array.isArray(item.children) && item.children.length > 0 && (
                      <div className="mt-2 space-y-1 pl-3 text-sm text-white/80">
                        {item.children.map((child, j) => (
                          <motion.div
                            key={child._id || child.label || j}
                            custom={i + j + 0.5}
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: 5 }}
                          >
                            <Link
                              href={child.url || '#'}
                              onClick={close}
                              className="block"
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
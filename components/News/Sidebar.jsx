// components/News/Sidebar.jsx
'use client';

import { useEffect, useState } from 'react';

// categories is an array of labels, e.g. ['Kirby', 'Dyson', ...]
// onFilterChange gets called with: { search, categories }
export default function NewsSidebar({ categories, onFilterChange }) {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 2s debounce for search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Notify parent whenever debounced search or categories change
  useEffect(() => {
    if (typeof onFilterChange === 'function') {
      onFilterChange({
        search: debouncedSearch,
        categories: selectedCategories,
      });
    }
  }, [debouncedSearch, selectedCategories, onFilterChange]);

  function toggleCategory(label) {
    setSelectedCategories((prev) =>
      prev.includes(label)
        ? prev.filter((x) => x !== label)
        : [...prev, label]
    );
  }

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="card">
        <h3 className="text-sm font-semibold mb-3">Search news</h3>
        <input
          type="text"
          className="input w-full"
          placeholder="Search by title or content…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="card">
        <h3 className="text-sm font-semibold mb-3">Categories</h3>
        <div className="space-y-2 text-sm">
          {categories.map((label) => {
            const checked = selectedCategories.includes(label);
            return (
              <label
                key={label}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={() => toggleCategory(label)}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
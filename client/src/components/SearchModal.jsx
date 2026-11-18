import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const searchableData = [
  { title: "Aurelia Silk Wrap", category: "Boutique", path: "/shop", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsAWFSSzoOcAhziE1dPvku2Y6NtrPe35Cvfe7how-i5HzxZODD2fqtIjbBvtbS_Ttmj9rUcHkcu-aHIXuP1q_d2bdWXL-Lggqc5uc9bN01lae8oIJ16KzTJSUrixXVamiM1apDzN9e_k8M7GHOOMWr-Wt5BhNomxGZtxVdEVo-xPP_kVIiCbR2m15_8qf-_qzOSSGsZtDBl4-9_du6LOgCZRwUkYpaDR85_9bj--Tu8hTocH_hT-7PAw" },
  { title: "Palazzo Linen Pant", category: "Boutique", path: "/shop", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtgyvluw7rPj7XmOSqNAigXBUvJVoj805TZ0K_192QswO15_es-OlhiGXu5IERB1Sapfwp-pHqSuxFCicIEq1jCeXxvNUcM96GHLLRGRPmB8cgXMOCBCj702Y3nDTFarx178XwUMski1zZg5gOywELd7SIiz9hlFuT5doUr4s9lyfySV6Wpggc7zEJyYzQ8Tuv3fCV5Ryj_GUC2SZKBcABTkMkJ_VtaHwj9biW55KjtkP7tQvDMg-w0w" },
  { title: "Baroque Pearl Drops", category: "Jewelry", path: "/shop", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGYlMog9ZE2VUw2Pd87B4N_3k5xesbedpP_s4M2OKSlm1y8r5rUvHs3yK_Cf8lxUClp7RX96fKwAZDte72J_ibKQRV0sxJavxrWGjgdpaLUQjdnn6hEeeWTLROszOyRbXojm9wrss07NgKOn5F_nCD0RaZ_S4aT9ZxIGPlqv64BiBpkQQ_PO-Iyj-F8s-xnKvTPYL7mjpBzdiEvWDsmndoMGs6AGTuoWsKfQ2fMklfBB92SPaPRaCZoA" },
  { title: "The Neo-Minimalist Trench", category: "Trends", path: "/trends", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgkUaVfWNcjou2aASqa-vzAKKKcQOmD125NVVkgleXkKwbUE5xhy2nis8V7a5PLwRh70uSBiYQfYli3OsPzGYyHLod32Ff1ld8f3qjabeHjWOFGPIpBc9obFt_OZzTDWBaxt_E_iUKgBro9cvVrEE-JQ7BRP4VnAbElMEAkMG5ilI0_yvTLV3_Ysnq53kH-w0WLOnHN56N0y_Ba1mZvUxQXFn85V8QgTD2Z46K0l15Jv-Q8RVes2uCYA" },
  { title: "The Glazed Cloud Skin Protocol", category: "Beauty", path: "/beauty", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHj4uoO1Ldr8-mHwR2cJpxmGIiNurzk2RQTOUUgFTnFSKeZhP0ZAGXlS7CUsaS6L296tk8h1dHM8WoWAOSDpmgEpJWqrxgX6eqW1zIzF_BelTdVsf4yyKIZ1E0Q6qkSk4q7uU_9FU83Z3YwSOFrZZoNIHd6mDdB7p3MujYFpO913mLUO6Xd3XjiOeYHjhT0wBTuRkub_6s0xeMSLI7HLnBK2aXKgQEksd9YRx0GndKt-FThVDAcFHBYw" },
  { title: "Ambre Solaire & Fig Eau de Parfum", category: "Fragrance", path: "/beauty", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSlYCN1i28LV9UXRCCa6rYeyWaZT5feyR_xMtrJKsQwY3xAFxLTS067jn6iACs5tBkxsvZeSxEZyMFy1V077zPb70xo0_xdvDOfrOjiiESMh-yfWc-50np7WnKg5wwHFJGbRIfUKJT6e_Ot5Q3GBb5K3GJiVq56BoXSaq-ZmFZ_4MDcChSvO4QQeovQKH6J7fvn5djXkzliJbPKXE2OYHqVWFMSBkb_Plb8AHQjtUNM6glaIcveYp6RQ" },
  { title: "Atelier de Céramique Provençal Bastide", category: "Lifestyle", path: "/lifestyle", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4pb2QBsmj1ro8M6cRjA0X7r_cRYNCi13SvgCMX1ZQj6kMNuBMHduubMG5yiUbNHu-EWshHk_Bo8uyNGiv27_FgJcOkydlRC_Z3fGcJPefhiYzjdBYpdUW4p1146kQq4Ogkjtn42Jzbsb57ZyVVsDts4WX2bkWdrEbvYWbdgQXaVWIPJmI_hxNGVeR0aYtCdGzOSkSRXgUz3Hecp8A5zmRilpZkMgcM9rdi0aXdkvthiYWe8hmbU5MQA" },
  { title: "What’s Your Fashion Archetype Quiz", category: "Quiz", path: "/quiz", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76skRlQ4bGW4vCpYl-QYqXyzwFKmzPcAwrxTc1Lvn0CgfUwUZBj2PuxltAFE2QKieThhbpyYyJwyGfqUwE9wSTWdXHPz3HJUa9TiLzzKaaRMm1xPsPTf-sWSLPwh_4IzmmD89cWVxiUdhSpS-R6XkC90NtAK7Uie8_U50g1XgpL7QChBVUjYpFhUQl22KI3FiT5mFnEmjMjGcIfH2SVGL5srlgeuGSWT74xubaf8he8-xtDZG4RGuhQ" },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? searchableData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchableData.slice(0, 5);

  const handleSelect = (item) => {
    onClose();
    navigate(item.path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-inverse-surface/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-surface-container flex items-center gap-3 bg-surface-container-low">
          <span className="material-symbols-outlined text-primary text-[24px]">search</span>
          <input
            type="text"
            autoFocus
            placeholder="Search trends, boutique, beauty rituals, sanctuaries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant text-sm outline-none font-body-md"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-semibold block mb-2 px-1">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Atelier Highlights'}
          </span>

          {results.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant text-xs">
              No matching editorial entries found for "{query}".
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {results.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container text-left transition-colors w-full group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-14 rounded-lg object-cover bg-surface-container shrink-0 border border-outline-variant/30"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-label-sm text-[9px] uppercase tracking-widest text-secondary block">
                      {item.category}
                    </span>
                    <h4 className="font-headline-sm text-[0.95rem] text-on-surface group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h4>
                  </div>
                  <span className="material-symbols-outlined text-sm text-outline-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

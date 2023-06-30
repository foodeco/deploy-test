import { useState, useEffect } from 'react';
import Genre from '@/Components/Views/MainPage/Component/Genre';

type BookTypeArr = BookType[];

interface BookType {
  type: string;
  number: number;
}

const category: BookTypeArr = [
  { type: '예술', number: 45 },
  { type: '아동', number: 46 },
  { type: '자기계발', number: 47 },
  { type: '비문학', number: 48 },
  { type: '소설/시/희극', number: 49 },
  { type: '경제경영', number: 50 },
];

export default function Main() {
  const [type, setType] = useState<string>();

  useEffect(() => {
    const target = document.querySelectorAll('h1');

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setType(entry.target.id);
        }
      },
      { threshold: 0.3, rootMargin: `0px 0px -80% 0px` }
    );
    target.forEach((item) => {
      io.observe(item);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="Category-menu">
        <img src="/images/pick.png" alt="책갈피" />
        <ul className="Category-menu__text">
          {category.map((item) => (
            <li
              key={item.number}
              className={item.type === type ? 'active' : ''}
            >
              <a href={`#${item.type}`}>{item.type}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="Books-wrapper">
        {/* CATEGORY */}
        {category.map((item) => (
          <Genre key={item.number} category={item} />
        ))}
      </div>
    </main>
  );
}

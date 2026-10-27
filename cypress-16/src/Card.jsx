import { useState } from 'react';
import './Card.css';

export default function Card({ title }) {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h1>{title}</h1>
      <span className="count">{count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

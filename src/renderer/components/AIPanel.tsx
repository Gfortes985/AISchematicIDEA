import React, { useState } from 'react';

export const AIPanel: React.FC<{ onAsk: (prompt: string) => Promise<void>; preview: string[] }> = ({ onAsk, preview }) => {
  const [text, setText] = useState('');
  return (
    <div>
      <h3>AI Editor</h3>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} />
      <button onClick={() => onAsk(text)}>Apply AI command</button>
      <h4>Preview diff</h4>
      <ul>{preview.map((d, i) => <li key={i}>{d}</li>)}</ul>
    </div>
  );
};

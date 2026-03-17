import React, { useState } from 'react';

export const AIPanel: React.FC<{ onAsk: (prompt: string) => Promise<void>; preview: string[] }> = ({ onAsk, preview }) => {
  const [text, setText] = useState('');
  return (
    <div>
      <h3>AI Editor</h3>
      <div className="field">
        <label className="muted">Prompt</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} />
      </div>
      <button className="btn" onClick={() => onAsk(text)}>Apply AI command</button>
      <h4 style={{ marginTop: 14 }}>Preview diff</h4>
      <ul className="ai-list">{preview.map((d, i) => <li key={i}>{d}</li>)}</ul>
    </div>
  );
};

// med-sepse/src/app/game/case/CaseClient.jsx
'use client';

import React, { useMemo, useState } from 'react';

/**
 * Componente cliente para UI interativa do Case.
 * Recebe `caseData` do Server Component (page.js).
 */
export default function CaseClient({ caseData }) {
  const [open, setOpen] = useState(true);

  // formata JSON grande sem travar render
  const pretty = useMemo(() => {
    if (!caseData) return '';
    if (typeof caseData === 'string') return caseData;
    try {
      return JSON.stringify(caseData, null, 2);
    } catch {
      return String(caseData);
    }
  }, [caseData]);

  return (
    <section style={{ marginTop: 12 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          border: '1px solid #ccc',
          cursor: 'pointer'
        }}
      >
        {open ? 'Esconder' : 'Mostrar'} detalhes
      </button>

      {open && (
        <pre style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>
          {pretty}
        </pre>
      )}
    </section>
  );
}

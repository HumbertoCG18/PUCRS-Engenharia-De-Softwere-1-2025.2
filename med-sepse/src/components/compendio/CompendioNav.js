// src/components/compendio/CompendioNav.js
"use client";

// Adicionaremos a lógica para o link ativo no futuro.
// Por enquanto, será uma navegação estática.

export default function CompendioNav() {
  const navItems = [
    { title: "Definições", href: "#definicoes" },
    { title: "Critérios (qSOFA)", href: "#qsofa" },
    { title: "Critérios (SIRS)", href: "#sirs" },
    { title: "Manejo Inicial", href: "#manejo" },
  ];

  return (
    <aside className="w-full h-full">
      <h3 className="text-lg font-semibold mb-4">Tópicos</h3>
      <div className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="text-sm text-foreground/80 hover:text-primary transition-colors p-2 rounded-md"
          >
            {item.title}
          </a>
        ))}
      </div>
    </aside>
  );
}
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center select-none">
      <div className="p-8 border border-border rounded-[12px] bg-mutedBackground/40 max-w-sm w-full container-dashed">
        <h1 className="text-4xl font-bold text-title mb-2">404</h1>
        <p className="text-sm text-mutedForeground mb-6">Página não encontrada.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-[8px] bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}

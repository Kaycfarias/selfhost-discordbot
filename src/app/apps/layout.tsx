export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Layout UI */}
      {/* Place children where you want to render a page or nested layout */}
      <main className="container mx-auto">{children}</main>
    </>
  );
}

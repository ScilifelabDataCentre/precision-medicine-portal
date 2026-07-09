export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="kiarva-page h-screen flex flex-col overflow-hidden w-screen relative ml-[-50vw] left-1/2"
      role="application"
      aria-label="KIARVA application interface"
    >
      <main
        className="flex-1 overflow-hidden"
        id="kiarva-main-content"
        role="main"
        aria-label="KIARVA embedded application"
      >
        <section
          className="outer w-full h-full overflow-hidden"
          aria-label="KIARVA iframe container"
          role="region"
        >
          {children}
        </section>
      </main>
    </div>
  );
}

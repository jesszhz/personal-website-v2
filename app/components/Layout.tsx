interface props {
  children: React.ReactNode;
  className: string;
}

export default function Layout({ children, className }: props) {
  return (
    <div className={`px-[clamp(1rem,15vw,6rem)] md:px-[clamp(6rem,20vw, 100vw)] py-[10vh] h-screen ${className}`}>

      <main className="mx-auto w-full max-w-2xl">{children}</main>
    </div>
  );
}

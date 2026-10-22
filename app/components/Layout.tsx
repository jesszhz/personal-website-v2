interface props {
  children: React.ReactNode;
  className: string;
  maxWidth?: string;
}

export default function Layout({ children, className, maxWidth = "max-w-2xl" }: props) {
  return (
    <div className={`px-[clamp(1rem,15vw,6rem)] md:px-[clamp(6rem,20vw, 100vw)] py-[4vh] md:py-[10vh] min-h-screen ${className}`}>

      <main className={`mx-auto w-full ${maxWidth}`}>{children}</main>
    </div>
  );
}

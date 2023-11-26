interface props {
  children: React.ReactNode;
  className: string;
}

export default function Layout({ children, className }: props) {
  return (
    <div className={`px-96 py-24 h-screen ${className}`}>
      <main>{children}</main>
    </div>
  );
}

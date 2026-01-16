const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-800/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:text-sm">
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Radian. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



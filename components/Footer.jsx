export default function Footer() {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="container py-6 text-sm text-center text-white/70">
        &copy; {new Date().getFullYear()} Brochure CMS
      </div>
    </footer>
  );
}

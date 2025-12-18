export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        
        {/* Huvudkontor */}
        <div>
          <h3 className="font-bold text-lg">Huvudkontor</h3>
          <p>Riksvägen 24</p>
          <p>Stockholm</p>
        </div>

        {/* Kontakt */}
        <div>
          <h3 className="font-bold text-lg">Kontakt</h3>
          <p>Telefon: +46 744 235 455</p>
          <p>
            <a href="/contact" className="underline hover:text-red-500">
              Kontakta oss
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div>
          <p>© 2025 SkateOrDie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

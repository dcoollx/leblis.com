export const Footer = () => {

    return (
        <footer className="border-t border-[#e8e5e0] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p
              className="text-3xl text-[#2a2825]"
              style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontWeight: 600 }}
            >
              le blis
            </p>
            <div className="flex gap-8 text-[#6b6560]">
              <a href="#" className="hover:text-[#2a2825] transition-colors">About</a>
              <a href="#" className="hover:text-[#2a2825] transition-colors">Contact</a>
              <a href="#" className="hover:text-[#2a2825] transition-colors">Instagram</a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-[#6b6560]">
            © 2026 le blis. All rights reserved.
          </div>
        </div>
      </footer>
    )
}
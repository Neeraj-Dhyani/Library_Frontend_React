import React from 'react'
import { BookOpen, Mail, MapPin, Phone} from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#2C2420] text-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#C9A961]" strokeWidth={1.75} />
              <span className="font-serif text-xl tracking-wide text-white">
                library.com
              </span>
            </a>
            <p className="mt-3 text-sm text-[#B9AC98] leading-relaxed max-w-xs">
              A quiet corner of the internet for people who still like turning pages.
            </p>

            <div className="flex items-center gap-3 mt-5">
              
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wide text-[#C9A961] font-medium mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/all_books" className="hover:text-[#C9A961] transition-colors">All Books</a></li>
              <li><a href="/upload" className="hover:text-[#C9A961] transition-colors">Add a Book</a></li>
              <li><a href="#" className="hover:text-[#C9A961] transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#C9A961] transition-colors">Genres</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wide text-[#C9A961] font-medium mb-4">
              Account
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/login" className="hover:text-[#C9A961] transition-colors">Log in</a></li>
              <li><a href="/register" className="hover:text-[#C9A961] transition-colors">Register</a></li>
              <li><a href="#" className="hover:text-[#C9A961] transition-colors">My Shelf</a></li>
              <li><a href="#" className="hover:text-[#C9A961] transition-colors">Help &amp; Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wide text-[#C9A961] font-medium mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-[#B9AC98]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#C9A961]" strokeWidth={1.75} />
                <span>221B Baker Street, Reading District</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#C9A961]" strokeWidth={1.75} />
                <span>hello@library.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#C9A961]" strokeWidth={1.75} />
                <span>+1 (555) 010-2024</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#4A3F35]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row
                        items-center justify-between gap-2 text-xs text-[#B9AC98]">
          <span>&copy; {year} library.com. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#C9A961] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#C9A961] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
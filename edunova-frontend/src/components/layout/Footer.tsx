import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Logo } from './Logo'
import { footerLinks, siteMeta } from '@/data/content'

export function Footer() {
  return (
    <footer className="px-3 pb-3 pt-8 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-8xl rounded-[2rem] border border-white/10 bg-night px-6 py-10 shadow-[0_30px_90px_-40px_rgba(2,6,23,0.8)] sm:px-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {siteMeta.fullName} is a premium educational institution delivering
              world-class education through modern teaching methodologies, digital
              classrooms and AI-powered academic management.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, href: siteMeta.socialLinks.facebook },
                { Icon: Instagram, href: siteMeta.socialLinks.instagram },
                { Icon: Linkedin, href: siteMeta.socialLinks.linkedin },
                { Icon: Twitter, href: siteMeta.socialLinks.twitter },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Platform" links={footerLinks.platform} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-secondary" />
            <p className="text-sm text-white/60">{siteMeta.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="shrink-0 text-secondary" />
            <p className="text-sm text-white/60">+91 80 0000 0000</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="shrink-0 text-secondary" />
            <p className="text-sm text-white/60">admissions@{siteMeta.domain}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteMeta.fullName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="transition-colors hover:text-white/70">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white/70">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; to: string }[]
}) {
  return (
    <div>
      <h4 className="font-sub text-sm font-bold uppercase tracking-[0.25em] text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm text-white/60 transition-colors hover:text-secondary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

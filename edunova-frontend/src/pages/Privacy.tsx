import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        description="How we protect and handle your personal information"
      />

      <section className="tint-gold py-16">
        <div className="container-page max-w-3xl">
          <Reveal className="prose prose-sm max-w-none">
            <h2 className="font-display text-2xl font-bold text-ink">Privacy Policy</h2>
            
            <h3 className="mt-8 font-display text-lg font-bold text-ink">1. Introduction</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              EduNova Global Academy ("we," "us," or "our") operates the website and mobile applications. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our services.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">2. Information Collection and Use</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              We collect information for various purposes to provide and improve our services:
            </p>
            <ul className="mt-3 space-y-2 font-body text-ink-soft">
              <li>• Enrollment and admission data</li>
              <li>• Academic records and performance</li>
              <li>• Attendance and disciplinary records</li>
              <li>• Contact information and communication history</li>
              <li>• Payment and financial information</li>
              <li>• Biometric data (where applicable)</li>
            </ul>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">3. Use of Data</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              EduNova uses the collected data for various purposes:
            </p>
            <ul className="mt-3 space-y-2 font-body text-ink-soft">
              <li>• To provide and maintain our services</li>
              <li>• To notify you about changes to our services</li>
              <li>• To allow you to participate in interactive features</li>
              <li>• To provide customer support</li>
              <li>• To gather analysis or valuable information</li>
              <li>• To monitor and analyze trends and usage</li>
            </ul>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">4. Data Security</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee absolute security.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">5. Data Retention</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              We will retain your personal data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">6. Children's Privacy</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              Our services are not intended for individuals under 13 years of age. We do not knowingly collect personally identifiable information from children under 13. If we become aware that a child under 13 has provided us with personal data, we take steps to delete such information.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">7. Changes to This Privacy Policy</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">8. Contact Us</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 rounded-lg bg-surface p-4">
              <p className="font-sub font-semibold text-ink">EduNova Global Academy</p>
              <p className="mt-1 font-body text-sm text-ink-soft">Email: privacy@edunovaacademy.edu.in</p>
              <p className="font-body text-sm text-ink-soft">Phone: +91 80 0000 0000</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

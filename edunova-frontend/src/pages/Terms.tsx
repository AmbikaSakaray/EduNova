import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

export default function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Terms"
        title="Terms & Conditions"
        description="Please read these terms carefully before using our services"
      />

      <section className="tint-orange py-16">
        <div className="container-page max-w-3xl">
          <Reveal className="prose prose-sm max-w-none">
            <h2 className="font-display text-2xl font-bold text-ink">Terms & Conditions</h2>

            <h3 className="mt-8 font-display text-lg font-bold text-ink">1. Acceptance of Terms</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              By accessing and using this website and services provided by EduNova Global Academy, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">2. Use License</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on EduNova's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="mt-3 space-y-2 font-body text-ink-soft">
              <li>• Modify or copy the materials</li>
              <li>• Use the materials for any commercial purpose or for any public display</li>
              <li>• Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>• Remove any copyright or other proprietary notations from the materials</li>
              <li>• Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">3. Disclaimer</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              The materials on EduNova's website are provided "as is". EduNova makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">4. Limitations</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              In no event shall EduNova Global Academy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EduNova's website.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">5. Accuracy of Materials</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              The materials appearing on EduNova's website could include technical, typographical, or photographic errors. EduNova does not warrant that any of the materials on our website are accurate, complete, or current. EduNova may make changes to the materials contained on our website at any time without notice.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">6. Links</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              EduNova has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by EduNova of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">7. Modifications</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              EduNova may revise these terms of service for our website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">8. Governing Law</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">9. Code of Conduct</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              Users agree to adhere to the school's code of conduct which includes:
            </p>
            <ul className="mt-3 space-y-2 font-body text-ink-soft">
              <li>• Respect for other students, faculty and staff</li>
              <li>• Maintaining academic integrity</li>
              <li>• Following school policies and guidelines</li>
              <li>• Appropriate use of school facilities and technology</li>
              <li>• No harassment, bullying or disruptive behavior</li>
            </ul>

            <h3 className="mt-6 font-display text-lg font-bold text-ink">10. Contact Information</h3>
            <p className="mt-3 font-body text-ink-soft leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <div className="mt-3 rounded-lg bg-surface p-4">
              <p className="font-sub font-semibold text-ink">EduNova Global Academy</p>
              <p className="mt-1 font-body text-sm text-ink-soft">Email: legal@edunovaacademy.edu.in</p>
              <p className="font-body text-sm text-ink-soft">Phone: +91 80 0000 0000</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

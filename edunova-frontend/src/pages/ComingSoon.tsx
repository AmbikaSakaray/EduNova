import { PageHeader } from '@/components/ui/PageHeader'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <PageHeader
      eyebrow="Coming soon"
      title={title}
      description="This page is on the build list — it'll follow the same design system once we get to it."
    />
  )
}

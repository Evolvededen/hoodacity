import { TwinForm } from '@/components/dashboard/twin-form'

export default function NewTwinPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create AI Twin</h1>
        <p className="text-muted-foreground">
          Build a digital representation with personality and style
        </p>
      </div>

      <TwinForm />
    </div>
  )
}

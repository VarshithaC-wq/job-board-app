import { JobForm } from "@/components/job-form"

export default function PostJobPage() {
  return (
    <div className="container max-w-2xl py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Post a Job</h1>
          <p className="text-muted-foreground">Fill out the form below to post a new job listing</p>
        </div>
        <JobForm />
      </div>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { getJobs } from "@/lib/storage"
import type { Job } from "@/lib/types"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    setJobs(getJobs())
  }, [])

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Job Listings</h1>
            <p className="text-muted-foreground">Browse available job opportunities</p>
          </div>
          <Button asChild>
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium">No jobs posted yet</h2>
            <p className="text-muted-foreground mt-2">Be the first to post a job opportunity</p>
            <Button asChild className="mt-4">
              <Link href="/post-job">Post a Job</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


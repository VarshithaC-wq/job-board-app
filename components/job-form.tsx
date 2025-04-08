"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { saveJob } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function JobForm() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setJob((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!job.title || !job.company || !job.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    saveJob(job)
    toast({
      title: "Job posted",
      description: "Your job has been posted successfully.",
    })

    // Reset form and redirect to jobs page
    setJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    })

    router.push("/jobs")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            name="title"
            value={job.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            name="company"
            value={job.company}
            onChange={handleChange}
            placeholder="e.g. Acme Inc."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder="e.g. Remote, New York, NY"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            placeholder="e.g. $80,000 - $100,000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={job.description}
            onChange={handleChange}
            placeholder="Describe the job responsibilities, requirements, and benefits"
            rows={6}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Post Job
      </Button>
    </form>
  )
}


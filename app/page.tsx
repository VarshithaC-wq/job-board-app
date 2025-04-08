import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 space-y-8 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Job Board Application</h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Find your next opportunity or post a job to find the perfect candidate.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/profile">View Profile</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/post-job">Post a Job</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    </div>
  )
}


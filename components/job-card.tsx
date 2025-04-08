import type { Job } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const formattedDate = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.company}</CardDescription>
          </div>
          {job.salary && (
            <Badge variant="outline" className="ml-2">
              {job.salary}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {job.location && (
            <div className="text-sm">
              <span className="font-medium">Location:</span> {job.location}
            </div>
          )}
          <div className="text-sm">
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Posted {formattedDate}</p>
      </CardFooter>
    </Card>
  )
}


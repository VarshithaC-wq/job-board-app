import type { UserProfile, Job } from "./types"

// User Profile Storage
export const getUserProfile = (): UserProfile => {
  if (typeof window === "undefined") return getDefaultProfile()

  const profile = localStorage.getItem("userProfile")
  return profile ? JSON.parse(profile) : getDefaultProfile()
}

export const saveUserProfile = (profile: UserProfile): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("userProfile", JSON.stringify(profile))
}

export const getDefaultProfile = (): UserProfile => {
  return {
    name: "",
    email: "",
    bio: "",
    skills: [],
    picture: "/placeholder.svg?height=200&width=200",
  }
}

// Jobs Storage
export const getJobs = (): Job[] => {
  if (typeof window === "undefined") return []

  const jobs = localStorage.getItem("jobs")
  return jobs ? JSON.parse(jobs) : []
}

export const saveJob = (job: Omit<Job, "id" | "postedAt">): void => {
  if (typeof window === "undefined") return

  const jobs = getJobs()
  const newJob: Job = {
    ...job,
    id: generateId(),
    postedAt: new Date().toISOString(),
  }

  jobs.push(newJob)
  localStorage.setItem("jobs", JSON.stringify(jobs))
}

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


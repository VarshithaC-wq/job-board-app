"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getUserProfile, saveUserProfile } from "@/lib/storage"
import type { UserProfile } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile())
  const [newSkill, setNewSkill] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    setProfile(getUserProfile())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.trim()) return

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }))
    setNewSkill("")
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfile((prev) => ({
          ...prev,
          picture: event.target.result as string,
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveUserProfile(profile)
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-32 w-32 rounded-full overflow-hidden">
            <Image
              src={profile.picture || "/placeholder.svg?height=200&width=200"}
              alt="Profile picture"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Label htmlFor="picture" className="cursor-pointer text-sm font-medium text-primary">
              Change Picture
            </Label>
            <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={profile.name} onChange={handleChange} placeholder="Your name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <div className="flex gap-2">
            <Input
              id="skills"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <Button type="button" onClick={handleAddSkill}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Profile
      </Button>
    </form>
  )
}


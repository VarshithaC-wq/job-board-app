import { ProfileForm } from "@/components/profile-form"

export default function ProfilePage() {
  return (
    <div className="container max-w-2xl py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and skills</p>
        </div>
        <ProfileForm />
      </div>
    </div>
  )
}


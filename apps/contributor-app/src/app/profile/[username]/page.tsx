import { ProfileView } from "@/features/profile/views/ProfileView";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return <ProfileView username={params.username} />;
}

import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Upload } from "lucide-react";
import type { Profile } from "@/types/profile";

const ProfilePage = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!session?.user?.id,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", session?.user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const filePath = `${session?.user?.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = await supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      await updateProfile.mutateAsync({ avatar_url: data.publicUrl });
      toast.success("Avatar updated successfully");
    } catch (error) {
      toast.error("Failed to upload avatar");
      console.error("Error uploading avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNotificationToggle = async (key: keyof Profile) => {
    try {
      await updateProfile.mutateAsync({
        [key]: !profile?.[key],
      });
      toast.success("Preferences updated");
    } catch (error) {
      toast.error("Failed to update preferences");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback>
                  {profile?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button
                  variant="outline"
                  className="relative"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications_email">Email Notifications</Label>
              <Switch
                id="notifications_email"
                checked={profile?.notifications_email}
                onCheckedChange={() => handleNotificationToggle("notifications_email")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications_push">Push Notifications</Label>
              <Switch
                id="notifications_push"
                checked={profile?.notifications_push}
                onCheckedChange={() => handleNotificationToggle("notifications_push")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications_updates">Product Updates</Label>
              <Switch
                id="notifications_updates"
                checked={profile?.notifications_updates}
                onCheckedChange={() => handleNotificationToggle("notifications_updates")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
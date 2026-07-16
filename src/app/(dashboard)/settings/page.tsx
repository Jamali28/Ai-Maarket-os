"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Bell, Palette, Key, Trash2, Save } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </motion.div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-primary/10 text-primary">JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
              <p className="text-xs text-muted-foreground mt-1">PNG or JPG. Max 1MB.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full name" defaultValue="John Doe" icon={<User className="h-4 w-4" />} />
            <Input label="Email" type="email" defaultValue="john@example.com" icon={<Mail className="h-4 w-4" />} />
          </div>
          <Button onClick={handleSave} loading={saving}>
            <Save className="h-4 w-4 mr-1" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Brand Voice */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Brand Voice
          </CardTitle>
          <CardDescription>Define how your brand sounds across all content.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Brand tone" placeholder="e.g. Professional, approachable" defaultValue="Professional, trustworthy" />
          <Input label="Target audience" placeholder="e.g. Fashion-conscious millennials" defaultValue="Professionals aged 25-45" />
          <Input label="Brand keywords" placeholder="Quality, premium, sustainable" defaultValue="Quality, premium, sustainable, artisan" />
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" />
            Save Brand Voice
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </CardTitle>
          <CardDescription>Choose what notifications you receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Generation complete", desc: "When AI finishes generating content" },
            { label: "Weekly summary", desc: "Weekly email with your usage stats" },
            { label: "Product updates", desc: "New features and improvements" },
            { label: "Billing alerts", desc: "Payment failures and plan changes" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-destructive">
            <Trash2 className="h-4 w-4" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-muted-foreground">Permanently remove your account and all data.</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

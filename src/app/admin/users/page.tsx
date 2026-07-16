"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal } from "lucide-react";

const users = [
  { name: "John Doe", email: "john@example.com", plan: "Pro", status: "Active", generations: 47, joined: "2024-03-15" },
  { name: "Sarah Chen", email: "sarah@example.com", plan: "Business", status: "Active", generations: 128, joined: "2024-01-20" },
  { name: "Mike Ross", email: "mike@example.com", plan: "Free", status: "Trialing", generations: 3, joined: "2024-06-01" },
  { name: "Priya Patel", email: "priya@example.com", plan: "Pro", status: "Past Due", generations: 52, joined: "2024-02-10" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">Manage platform users.</p>
        </div>
        <Input
          placeholder="Search users..."
          icon={<Search className="h-4 w-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["User", "Email", "Plan", "Status", "Generations", "Joined", ""].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground p-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <span className="text-sm font-medium">{user.name}</span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <Badge variant={user.plan === "Business" ? "default" : "secondary"} className="text-[10px]">
                        {user.plan}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.status === "Active" ? "success" : user.status === "Past Due" ? "warning" : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{user.generations}</td>
                    <td className="p-4 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="p-4">
                      <button className="p-1 rounded hover:bg-accent">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

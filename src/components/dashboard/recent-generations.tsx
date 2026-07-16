"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils";
import { FileText, Sparkles, Search, Mail } from "lucide-react";

const recentGenerations = [
  {
    id: "1",
    type: "Product Description",
    product: "Premium Leather Backpack",
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 30),
    icon: FileText,
  },
  {
    id: "2",
    type: "SEO Title",
    product: "Wireless Bluetooth Earbuds",
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 120),
    icon: Search,
  },
  {
    id: "3",
    type: "Marketing Email",
    product: "Organic Cotton T-Shirt",
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 240),
    icon: Mail,
  },
  {
    id: "4",
    type: "Instagram Captions",
    product: "Handmade Ceramic Mug",
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 360),
    icon: Sparkles,
  },
];

export function RecentGenerations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Generations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentGenerations.map((gen) => (
            <div key={gen.id} className="flex items-center gap-3 group cursor-pointer">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <gen.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{gen.type}</p>
                <p className="text-xs text-muted-foreground truncate">{gen.product}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  {gen.type === "Marketing Email" ? "Email" : "Copy"}
                </Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatRelativeDate(gen.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

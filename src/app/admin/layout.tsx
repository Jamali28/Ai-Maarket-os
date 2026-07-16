import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen border-r border-border bg-sidebar p-4 hidden lg:block">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Admin Panel</p>
              <p className="text-[10px] text-muted-foreground">Platform Management</p>
            </div>
          </div>
          <nav className="space-y-1">
            {[
              { label: "Users", href: "/admin/users" },
              { label: "Revenue", href: "/admin/revenue" },
              { label: "Prompts", href: "/admin/prompts" },
              { label: "API Usage", href: "/admin/api-usage" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

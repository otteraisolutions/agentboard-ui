import { AuthGuard } from "@/components/layout/AuthGuard";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="m-4 mb-0 flex h-14 items-center gap-2 rounded-2xl bg-card px-4 shadow-clay-sm">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground">Panel de administración</span>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}

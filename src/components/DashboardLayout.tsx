import { useState } from 'react'
import { useLocation } from 'wouter'
import {
  BarChart3,
  LayoutDashboard,
  TrendingUp,
  BarChart as BarChartIcon,
  FlaskConical,
  CalendarDays,
  BookOpen,
  Zap,
  FileText,
  Users,
  Calculator,
  Settings,
  Database,
  ChevronDown,
  LogOut,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/_core/hooks/useAuth'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-4 w-4" /> },
      { label: 'Performance Analyzer', href: '/analyzer', icon: <TrendingUp className="h-4 w-4" /> },
      { label: 'Campaign Intel', href: '/campaigns', icon: <BarChartIcon className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Testing',
    items: [
      { label: 'Test Pipeline', href: '/pipeline', icon: <FlaskConical className="h-4 w-4" /> },
      { label: 'Test Calendar', href: '/calendar', icon: <CalendarDays className="h-4 w-4" /> },
      { label: 'Learning Log', href: '/learnings', icon: <BookOpen className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Briefs',
    items: [
      { label: 'Generate Brief', href: '/briefs', icon: <Zap className="h-4 w-4" /> },
      { label: 'Brief History', href: '/briefs/history', icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Team',
    items: [{ label: 'Team Members', href: '/team', icon: <Users className="h-4 w-4" /> }],
  },
  {
    title: 'Tools',
    items: [
      { label: 'Stat Calculator', href: '/stat-calc', icon: <Calculator className="h-4 w-4" /> },
      { label: 'Settings', href: '/settings', icon: <Settings className="h-4 w-4" /> },
      { label: 'AppsFlyer SSOT', href: '/settings/appsflyer', icon: <Database className="h-4 w-4" /> },
    ],
  },
]

function SidebarNav() {
  const [location] = useLocation()

  return (
    <>
      {navSections.map((section, idx) => (
        <div key={section.title}>
          {idx > 0 && <Separator className="my-2" />}
          <div className="px-2 py-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.title}
            </p>
            <SidebarMenu className="mt-2">
              {section.items.map((item) => {
                const isActive = location === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => (window.location.href = item.href)}
                      className={cn(
                        'flex items-center gap-2',
                        isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </div>
        </div>
      ))}
    </>
  )
}

function SidebarFooterContent() {
  const { user, logout } = useAuth()

  if (!user) return null

  const userInitial = user.name.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sidebar-accent">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col items-start">
            <p className="text-xs font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2 px-2 py-1">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h1 className="font-semibold text-sm">Meta Ads Agent</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="border-t">
          <SidebarFooterContent />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout;

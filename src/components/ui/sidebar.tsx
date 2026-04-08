import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
const SIDEBAR_WIDTH = "240px"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined
)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disableTransition?: boolean
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  SidebarProviderProps
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      disableTransition,
      ...props
    },
    ref
  ) => {
    const [openMobile, setOpenMobile] = React.useState(false)
    const [open, setOpen] = React.useState(defaultOpen)
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        if (setOpenProp) {
          setOpenProp(newOpen)
        } else {
          setOpen(newOpen)
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${newOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp]
    )

    const state = openProp !== undefined ? openProp : open

    const value: SidebarContext = {
      state: state ? "expanded" : "collapsed",
      open: state,
      setOpen: handleOpenChange,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar: () => handleOpenChange(!state),
    }

    return (
      <SidebarContext.Provider value={value}>
        <div
          ref={ref}
          className={cn(
            "flex h-full w-full",
            !disableTransition && "transition-colors"
          )}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { state, openMobile, setOpenMobile, isMobile } = useSidebar()

    return (
      <>
        {collapsible === "offcanvas" && isMobile && (
          <div
            className={cn(
              "fixed inset-0 z-40 bg-black/50 transition-opacity",
              openMobile ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setOpenMobile(false)}
          />
        )}
        <div
          ref={ref}
          data-sidebar="wrapper"
          data-state={state}
          data-collapsible={state === "collapsed" ? collapsible : ""}
          className={cn(
            "group/sidebar relative hidden h-full w-[--sidebar-width] flex-col bg-sidebar-background transition-all duration-300 md:flex",
            state === "collapsed" && collapsible === "icon" && "w-[--sidebar-width-icon]",
            variant === "floating" && "m-2 rounded-lg border border-sidebar-border",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "flex flex-col h-full w-full",
              collapsible === "offcanvas" && "overflow-y-auto"
            )}
          >
            {children}
          </div>
        </div>

        {collapsible === "offcanvas" && (
          <div
            data-sidebar="mobile"
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-[--sidebar-width-mobile] bg-sidebar-background transition-transform md:hidden",
              side === "right" && "right-0 left-auto",
              openMobile ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex flex-col h-full w-full overflow-y-auto">
              {children}
            </div>
          </div>
        )}
      </>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, isMobile, setOpenMobile, openMobile } =
    useSidebar()

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isMobile) {
        setOpenMobile(!openMobile)
      } else {
        toggleSidebar()
      }
      onClick?.(e)
    },
    [isMobile, toggleSidebar, setOpenMobile, openMobile, onClick]
  )

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent h-10 w-10",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <Menu className="h-4 w-4" />
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex min-h-screen flex-1 flex-col bg-background",
      className
    )}
    {...props}
  />
))
SidebarInset.displayName = "SidebarInset"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 px-4 py-4", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto flex flex-col gap-2 px-4 py-4", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-1 flex-col gap-2 overflow-y-auto px-2 py-4",
      className
    )}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("group/menu-item relative", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button relative flex w-full items-center gap-2 overflow-hidden rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground outline-none ring-ring transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-data-[collapsible=icon]/sidebar:justify-center",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent",
        outline:
          "border border-input bg-transparent hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      },
      size: {
        default: "h-9",
        sm: "h-8 text-xs",
        lg: "h-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  isActive?: boolean
  tooltip?: string
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    { className, variant, size, isActive, tooltip, children, ...props },
    ref
  ) => {
    const { state } = useSidebar()

    return (
      <button
        ref={ref}
        className={cn(
          sidebarMenuButtonVariants({ variant, size }),
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
          className
        )}
        data-active={isActive}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  Sidebar,
  SidebarProvider,
  useSidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
}

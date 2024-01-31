import { Link } from 'react-router-dom'
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="all"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Все акции
      </Link>
      <Link
        to="portfolio"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Портфель
      </Link>
      <Link
        to="history"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        История операций
      </Link>
    </nav>
  )
}
import * as React from "react";
import { Link } from "react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { Dices, House, Trophy } from "lucide-react";

export default function NavigationMenuItems() {
  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2">
      <div className="flex items-center justify-center">
        <NavigationMenu className="z-[5] m750:max-w-[300px]">
          <NavigationMenuList className="m750:max-w-[300px]">
            <NavigationMenuItem>
              <Link to={{
                pathname: '/home'
              }}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className="m750:max-w-[80px] m750:text-xs flex items-center justify-center gap-1 text-base">
                    Home <House size={16} />
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link to={{
                pathname: '/game'
              }}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className="m750:max-w-[80px] m750:text-xs flex items-center justify-center gap-1 text-base">
                    Play now <Dices size={16} />
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link to={{
                pathname: '/leader-board'
              }}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className="m750:max-w-[80px] m750:text-xs flex items-center justify-center gap-1 text-base">
                    Leaderboard <Trophy size={16} />
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent block text-mtext select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-none transition-colors hover:border-border dark:hover:border-darkBorder",
            className
          )}
          {...props}
        >
          <div className="text-base font-heading leading-none">{title}</div>
          <p className="text-muted-foreground font-base line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

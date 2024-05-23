"use client"

import Link from "next/link"
import classes from "./nav-link.module.css"
import { usePathname } from "next/navigation"

type TNavLink = {
  href: string
  children: string
}

export default function NavLink({ href, children }: TNavLink) {
  const path = usePathname()
  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  )
}

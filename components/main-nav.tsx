"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Irányítópult',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Plakátok',
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Kategóriák',
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/subcategories`,
            label: 'Alkategóriák',
            active: pathname === `/${params.storeId}/subcategories`,
        },
        {
            href: `/${params.storeId}/brands`,
            label: 'Márkák',
            active: pathname === `/${params.storeId}/brands`,
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Termékek',
            active: pathname === `/${params.storeId}/products`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Beállítások',
            active: pathname === `/${params.storeId}/settings`,
        }

    ];

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => (
                <Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary",
                    route.active ? "text-black dark:text-whie" : "text-muted-foreground"
                )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};
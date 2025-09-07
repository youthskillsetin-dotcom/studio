
import { Logo } from "@/components/icons";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-muted/40 p-4">
             <div className="absolute top-4 left-4">
                <Link href="/" className="flex items-center gap-2 text-foreground/80 hover:text-foreground">
                    <Logo className="h-7 w-7" />
                    <span className="text-xl font-bold font-headline">YouthSkillSet</span>
                </Link>
             </div>
            {children}
        </div>
    )
}

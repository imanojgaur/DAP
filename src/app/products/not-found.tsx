import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sprout, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-background">
      {/* 1. The Subtle Icon Accent */}
      <div className="bg-secondary/50 p-6 rounded-full mb-8 border border-border/50">
        <Sprout className="w-10 h-10 text-muted-foreground stroke-[1.5]" />
      </div>

      {/* 2. Stark, Tight Typography */}
      <h1 className="text-6xl font-extrabold tracking-tight lg:text-7xl mb-2 text-foreground">
        404
      </h1>
      <h2 className="text-2xl font-semibold tracking-tight mb-6 text-foreground/90">
        This plant has been uprooted.
      </h2>
      
      {/* 3. Muted Explanatory Text */}
      <p className="text-muted-foreground text-lg max-w-[500px] mb-10">
        The page you are looking for doesn't exist or has been moved. Let's get you back to the greenhouse.
      </p>

      {/* 4. The Premium Interaction (Shadcn Buttons) */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/collections/all">
            Browse Catalog
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8 group">
          <Link href="/">
            <MoveLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Home
          </Link>
        </Button>
      </div>
    </section>
  );
}
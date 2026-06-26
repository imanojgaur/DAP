import { SearchX, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ShopNotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center space-y-8">
        
        {/* Soft, elegantly muted icon presentation */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted/30">
          <div className="absolute inset-0 rounded-full border border-border/40" />
          <SearchX className="h-8 w-8 text-muted-foreground/70" strokeWidth={1.2} />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-light tracking-tight text-foreground">
            Item not found
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            The specific product or collection you're looking for doesn't exist. It may have been removed, or the link might be broken.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link 
            href="/collections"
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" />
            Explore Collections
          </Link>
          
          <Link 
            href="/"
            className="flex w-full sm:w-auto items-center justify-center rounded-full border border-border bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
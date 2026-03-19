import Image from "next/image";
import type { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import type { Button } from "@/components/ui/button";
import {
	type Card,
	type CardContent,
	type CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function PlantCard({ plant }: { plant: any }) {
	return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow">
      {/* 1. IMAGE SECTION (Using Aspect Ratio for consistency) */}
      <CardHeader
	className="p-0">
        <AspectRatio ratio={4 / 5}>
          <Image
            src={plant.image || "/placeholder-plant.jpg"}
            alt={plant.name}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
          />
        </AspectRatio>
      </CardHeader>
	<CardContent className = "p-4">
        <div className =
		"flex justify-between items-start mb-2" >
		{
			/* Category Badge */
		} <
		Badge;
	variant = "secondary";
	className="capitalize text-[10px]">
            {plant.category.name}
          </Badge>
          <span
	className = "font-bold text-green-700" > $;
	plant.price;
	</span>
        </div>
        <CardTitle
	className="text-lg leading-tight">{plant.name}</CardTitle>
        <p
	className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {plant.description}
        </p>
      </CardContent>
	<CardFooter className = "p-4 pt-0">
        <Button className = "w-full bg-green-600 hover:bg-green-700" > Add;
	to;
	Cart < />Bnottu < />CFadeoorrt < />Cadr;
	)
}

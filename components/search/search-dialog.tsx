"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Map, Briefcase, GraduationCap, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

// This would normally come from your data layer
const searchableContent = [
  {
    id: "bleedi",
    type: "project",
    title: "Bleedi",
    description: "Patchs apaisants pour règles douloureuses",
    href: "/projects/bleedi",
    icon: Briefcase,
  },
  {
    id: "mamayou",
    type: "project",
    title: "Mamayou",
    description: "Gigoteuses premium pour bébés",
    href: "/projects/mamayou",
    icon: Briefcase,
  },
  {
    id: "open-wealth",
    type: "project",
    title: "Open Wealth",
    description: "Plateforme de micro-investissements",
    href: "/projects/open-wealth",
    icon: Briefcase,
  },
  {
    id: "istanbul-2024",
    type: "trip",
    title: "Istanbul 2024",
    description: "Découverte de la Turquie",
    href: "/trips/istanbul-2024",
    icon: Map,
  },
  {
    id: "studies",
    type: "page",
    title: "Études",
    description: "Mon parcours académique",
    href: "/studies",
    icon: GraduationCap,
  },
  {
    id: "goals",
    type: "page",
    title: "Objectifs",
    description: "Mes 4 piliers de vie",
    href: "/goals",
    icon: Target,
  },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const filteredContent = React.useMemo(() => {
    if (!search) return searchableContent;

    const searchLower = search.toLowerCase();
    return searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    router.push(href);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Rechercher des projets, voyages, articles..."
              value={search}
              onValueChange={setSearch}
            />
          </div>
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Résultats">
              {filteredContent.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.type}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

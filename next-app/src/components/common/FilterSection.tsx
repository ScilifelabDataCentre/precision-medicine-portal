import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Reusable filter section component for displaying checkbox filters
 * Can be used across different pages that need similar filtering functionality
 */
interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  items: string[];
  selectedItems: string[];
  onFilterChange: (item: string) => void;
  getItemCount: (item: string) => number;
}

export const FilterSection = ({
  title,
  icon,
  items,
  selectedItems,
  onFilterChange,
  getItemCount,
}: FilterSectionProps) => (
  <div className="space-y-4">
    <h2 className="font-bold text-2xl text-foreground flex items-center gap-2">
      {icon && <span aria-hidden="true">{icon}</span>}
      {title}
    </h2>
    <Card>
      <CardContent className="pt-6">
        {items.map((item) => (
          <div key={item} className="flex min-h-target items-center gap-3">
            <Checkbox
              id={`filter-${title}-${item}`}
              aria-label={item}
              checked={selectedItems.includes(item)}
              onCheckedChange={() => onFilterChange(item)}
            />
            <label
              htmlFor={`filter-${title}-${item}`}
              className="flex min-h-target flex-1 cursor-pointer items-center text-ui peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item} ({getItemCount(item)})
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

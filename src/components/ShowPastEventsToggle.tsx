import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ShowPastEventsToggleProps {
  showPast: boolean;
  onToggle: (value: boolean) => void;
}

export function ShowPastEventsToggle({ showPast, onToggle }: ShowPastEventsToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="show-past"
        checked={showPast}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="show-past" className="cursor-pointer">
        Mostrar eventos pasados
      </Label>
    </div>
  );
}
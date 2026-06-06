import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ConsentSummaryCardsProps = {
  totalActive: number;
  totalRevoked: number;
  totalExpired: number;
};

type SummaryCardConfig = {
  label: string;
  value: number;
  accentClass: string;
};

const ConsentSummaryCards = ({
  totalActive,
  totalRevoked,
  totalExpired,
}: ConsentSummaryCardsProps) => {
  const cards: SummaryCardConfig[] = [
    {
      label: "Active",
      value: totalActive,
      accentClass: "text-success",
    },
    {
      label: "Revoked",
      value: totalRevoked,
      accentClass: "text-destructive",
    },
    {
      label: "Expired",
      value: totalExpired,
      accentClass: "text-muted-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map(({ label, value, accentClass }) => (
        <Card key={label}>
          <CardHeader>
            <CardDescription>{label}</CardDescription>
            <CardTitle className={cn("text-3xl tabular-nums", accentClass)}>
              {value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ConsentSummaryCards;

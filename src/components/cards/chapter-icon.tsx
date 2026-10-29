import {
  Activity,
  Bot,
  Clock,
  Droplets,
  HeartPulse,
  Layers,
  Ribbon,
  Scale,
  Siren,
  Stethoscope,
  Waypoints,
  Workflow,
  type LucideProps,
} from "lucide-react";

const icons = { Activity, Bot, Clock, Droplets, HeartPulse, Layers, Ribbon, Scale, Siren, Waypoints, Workflow };

/** Ícone de capítulo guardado por nome (permite escolha no backoffice). */
export function ChapterIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? Stethoscope;
  return <Icon {...props} />;
}

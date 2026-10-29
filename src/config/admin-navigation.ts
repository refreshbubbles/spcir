import {
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  Handshake,
  Image,
  Inbox,
  LayoutDashboard,
  Newspaper,
  Settings,
  Sparkles,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = { label: string; href: string; icon: LucideIcon; badge?: string };

export const adminNav: { title?: string; items: AdminNavItem[] }[] = [
  { items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }] },
  {
    title: "Conteúdos",
    items: [
      { label: "Banners (Hero)", href: "/admin/banners", icon: Image },
      { label: "Destaques", href: "/admin/destaques", icon: Sparkles },
      { label: "Notícias", href: "/admin/noticias", icon: Newspaper },
      { label: "Eventos", href: "/admin/eventos", icon: CalendarDays },
      { label: "Páginas", href: "/admin/paginas", icon: FileText },
      { label: "Publicações", href: "/admin/publicacoes", icon: BookOpen },
      { label: "Capítulos e Núcleos", href: "/admin/capitulos", icon: Building2 },
    ],
  },
  {
    title: "Formação",
    items: [
      { label: "Cursos e Estágios", href: "/admin/cursos", icon: GraduationCap },
      { label: "Inscrições", href: "/admin/inscricoes", icon: UserCheck, badge: "12" },
    ],
  },
  {
    title: "Sócios",
    items: [
      { label: "Sócios", href: "/admin/socios", icon: Users },
      { label: "Pedidos de adesão", href: "/admin/adesoes", icon: Inbox, badge: "5" },
      { label: "Quotas", href: "/admin/quotas", icon: Wallet },
      { label: "Patrocínios", href: "/admin/patrocinios", icon: Handshake, badge: "2" },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Mensagens", href: "/admin/mensagens", icon: Inbox },
      { label: "Definições", href: "/admin/definicoes", icon: Settings },
    ],
  },
];

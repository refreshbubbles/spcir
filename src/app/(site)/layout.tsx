import { Suspense } from "react";
import { ChatWidget } from "@/components/chat/chat-widget";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader, SiteHeaderWithPath } from "@/components/layout/site-header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-brand-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar para o conteúdo
      </a>
      <AnnouncementBar />
      <Suspense fallback={<SiteHeader />}>
        <SiteHeaderWithPath />
      </Suspense>
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <MobileActionBar />
      <ChatWidget />
    </>
  );
}

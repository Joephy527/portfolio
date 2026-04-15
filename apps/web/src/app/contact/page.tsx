import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = { title: "Contact | Yoseph Ephrem Kifle" };

export default function ContactPage() {
  return (
    <main className="no-scroll relative">
      <div className="relative z-10 flex items-center justify-center h-full px-6 md:px-16 lg:px-24">
        <ContactContent />
      </div>
    </main>
  );
}

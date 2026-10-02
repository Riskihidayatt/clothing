import { Heart } from "lucide-react";
import { communityPosts } from "@/data/community";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/icons/SocialIcons";

const likeFormatter = new Intl.NumberFormat("en", { notation: "compact" });

export function Community() {
  return (
    <section aria-labelledby="community-title" className="border-t border-bone/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="community-title"
          eyebrow={`Tag ${siteConfig.handle} biar di-feature`}
          title={
            <>
              Worn by the <span className="text-acid">community</span>
            </>
          }
          action={
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-acid"
            >
              <InstagramIcon className="h-5 w-5" />
              Follow {siteConfig.handle}
            </a>
          }
        />

        <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-2">
          {communityPosts.map((post, i) => (
            <Reveal as="li" key={post.id} delay={(i % 3) * 0.06}>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Lihat postingan ${post.handle} di Instagram`}
                className="group relative block aspect-square overflow-hidden bg-ink-2"
              >
                <SafeImage
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-between bg-ink/0 p-3 opacity-0 transition-all duration-300 group-hover:bg-ink/60 group-hover:opacity-100 group-focus-visible:bg-ink/60 group-focus-visible:opacity-100 md:p-4">
                  <InstagramIcon className="h-5 w-5 self-end" />
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span>{post.handle}</span>
                    <span className="inline-flex items-center gap-1 text-acid">
                      <Heart className="h-3.5 w-3.5 fill-current" aria-hidden />
                      {likeFormatter.format(post.likes)}
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

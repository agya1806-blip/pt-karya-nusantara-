import { cn } from "@/lib/utils";

interface TeamCardProps {
  avatar: string;
  name: string;
  role: string;
  bio: string;
  href?: string;
  className?: string;
}

function TeamCard({ avatar, name, role, bio, href, className }: TeamCardProps) {
  const shared = (
    <>
      <div className="overflow-hidden rounded-2xl">
        <img
          src={avatar}
          alt={name}
          className="aspect-square w-full object-cover transition-transform duration-300 ease-luxury group-hover:scale-105"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-heading-sm text-text">{name}</h3>
        <p className="text-body-sm text-brand-500 mt-1">{role}</p>
        <p className="text-body-sm text-text-secondary mt-2 leading-relaxed">{bio}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn("group block", className)}>
        {shared}
      </a>
    );
  }

  return (
    <div className={cn("group", className)}>
      {shared}
    </div>
  );
}

export { TeamCard };

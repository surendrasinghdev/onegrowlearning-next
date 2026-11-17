import { announcements } from "@/data/site";

function Items({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {announcements.map((a) => (
        <li key={a} className="flex items-center gap-6 pr-6 text-[13px] font-semibold tracking-wide whitespace-nowrap text-amber">
          {a}
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-brand" />
        </li>
      ))}
    </ul>
  );
}

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-navy-deep py-2">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <Items />
        <Items hidden />
      </div>
    </div>
  );
}

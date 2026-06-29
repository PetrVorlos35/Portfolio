// Long-form case studies for selected projects. Content is grounded in the
// actual repos (Journeov2, outlay) and live sites. Bilingual (cs/en) to match
// the rest of the site; the page picks a language via LanguageContext.

export type CaseStudySection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type CaseStudyContent = {
  title: string;
  tagline: string;
  category: string;
  role: string;
  stack: { label: string; items: string[] }[];
  sections: CaseStudySection[];
};

export type CaseStudy = {
  slug: string;
  year: string;
  liveUrl?: string;
  repoUrl: string;
  cs: CaseStudyContent;
  en: CaseStudyContent;
};

export const caseStudies: Record<string, CaseStudy> = {
  journeo: {
    slug: "journeo",
    year: "2026",
    liveUrl: "https://journeo.vorlos.eu",
    repoUrl: "https://github.com/PetrVorlos35/Journeov2",
    en: {
      title: "Journeo",
      tagline:
        "A travel diary and group-trip planner. Build itineraries, split shared costs with friends, and settle up in one place.",
      category: "Fullstack App",
      role: "Solo project. Design, frontend, backend and infrastructure.",
      stack: [
        {
          label: "Frontend",
          items: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "i18next", "React Router"],
        },
        {
          label: "Backend",
          items: ["Node.js", "Express", "MySQL", "JWT", "Google OAuth", "Nodemailer"],
        },
        { label: "Infra", items: ["Vercel", "Serverless functions", "@vercel/og"] },
      ],
      sections: [
        {
          heading: "Overview",
          body:
            "Journeo began as my high-school graduation project, then I rebuilt it from the ground up as Journeo v2. It's a full-stack app for planning trips with other people: build a day-by-day itinerary, invite friends, track shared expenses, split the bill, and settle up, all in one multilingual interface.",
        },
        {
          heading: "The problem",
          body:
            "Planning a group trip means juggling two things at once: the plan and the money. Who booked the apartment, who covered dinner, who still owes whom. Most tools do one or the other, a planner or an expense splitter, so the trip ends up scattered across a chat, a spreadsheet and a separate money app. I wanted the itinerary and the shared budget to live in the same place.",
        },
        {
          heading: "What I built",
          bullets: [
            "Day-by-day trip itineraries with a calendar date picker",
            "A friends system: invite people to a trip and manage who's in",
            "Expense splitting with a Splitwise-style balance engine and a minimal-transactions “settle up”",
            "Group voting so the whole trip can decide together",
            "In-app notifications and email (Nodemailer)",
            "Layered auth: email + password (bcrypt), Google one-tap OAuth, and email OTP verification with throttling",
            "An admin panel and usage stats",
            "Full EN/CS internationalisation with language auto-detection",
          ],
        },
        {
          heading: "Tech & why",
          body:
            "I deliberately hand-rolled an Express + MySQL backend instead of reaching for a backend-as-a-service. I wanted to own the auth, the schema and the balance maths, and to learn the parts you normally let a platform hide: REST route design, middleware, rate limiting and SQL migrations. The frontend is React on Vite for fast iteration, with dynamic Open Graph share images generated via @vercel/og.",
        },
        {
          heading: "Hardest part",
          bullets: [
            "The settle-up algorithm: turning a tangled web of “who paid what” into the fewest transactions that clear everyone's balance. I net each person out, then greedily match debtors to creditors.",
            "Getting auth genuinely safe: OTP throttling to stop abuse, rate limiting on sensitive routes, and proper password hashing.",
            "Evolving the database without breaking it. Expense splitting and settle-up were added later through versioned SQL migrations.",
          ],
        },
        {
          heading: "Outcome",
          body:
            "A working, deployed app I actually use to plan real trips. More importantly, it taught me end-to-end ownership across schema design, authentication, deployment and i18n, not just the UI layer.",
        },
      ],
    },
    cs: {
      title: "Journeo",
      tagline:
        "Cestovatelský deník a plánovač skupinových výletů. Itineráře, dělení společných nákladů s přáteli a vyrovnání na jednom místě.",
      category: "Fullstack aplikace",
      role: "Sólo projekt. Design, frontend, backend i infrastruktura.",
      stack: [
        {
          label: "Frontend",
          items: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "i18next", "React Router"],
        },
        {
          label: "Backend",
          items: ["Node.js", "Express", "MySQL", "JWT", "Google OAuth", "Nodemailer"],
        },
        { label: "Infra", items: ["Vercel", "Serverless funkce", "@vercel/og"] },
      ],
      sections: [
        {
          heading: "Přehled",
          body:
            "Journeo vzniklo jako můj maturitní projekt a poté jsem ho od základu přepsal jako Journeo v2. Je to fullstack aplikace pro plánování výletů s dalšími lidmi: sestavíš itinerář den po dni, pozveš přátele, sleduješ společné výdaje, rozdělíš účet a vyrovnáte se, vše v jednom vícejazyčném rozhraní.",
        },
        {
          heading: "Problém",
          body:
            "Plánování skupinového výletu znamená žonglovat se dvěma věcmi najednou: s plánem a s penězi. Kdo rezervoval byt, kdo zaplatil večeři, kdo komu ještě dluží. Většina nástrojů umí jen jedno, buď plánovač, nebo dělení výdajů, takže výlet skončí roztroušený mezi chatem, tabulkou a samostatnou aplikací na peníze. Chtěl jsem, aby itinerář a společný rozpočet žily na jednom místě.",
        },
        {
          heading: "Co jsem postavil",
          bullets: [
            "Itineráře výletů den po dni s kalendářním výběrem dat",
            "Systém přátel: pozvi lidi na výlet a spravuj, kdo je součástí",
            "Dělení výdajů s výpočtem zůstatků ve stylu Splitwise a vyrovnáním na minimum transakcí",
            "Skupinové hlasování, aby mohl rozhodovat celý výlet",
            "Notifikace v aplikaci i e-mailem (Nodemailer)",
            "Vrstvené přihlášení: e-mail + heslo (bcrypt), Google one-tap OAuth a e-mailové OTP ověření s omezením pokusů",
            "Administrační panel a statistiky používání",
            "Plná lokalizace EN/CS s automatickou detekcí jazyka",
          ],
        },
        {
          heading: "Technologie a proč",
          body:
            "Záměrně jsem si napsal vlastní backend na Express + MySQL místo sáhnutí po backend-as-a-service. Chtěl jsem vlastnit přihlašování, schéma i výpočty zůstatků a naučit se to, co platforma obvykle skryje: návrh REST routes, middleware, rate limiting a SQL migrace. Frontend je React na Vite kvůli rychlé iteraci, sdílecí Open Graph obrázky se generují dynamicky přes @vercel/og.",
        },
        {
          heading: "Nejtěžší část",
          bullets: [
            "Algoritmus vyrovnání: převést spleť „kdo co zaplatil“ na co nejmenší počet transakcí, které srovnají zůstatky všech. Spočítám čistý zůstatek každého a poté pažravě páruji dlužníky s věřiteli.",
            "Udělat přihlašování opravdu bezpečně: omezení OTP proti zneužití, rate limiting citlivých endpointů a správné hashování hesel.",
            "Vyvíjet databázi, aniž bych ji rozbil. Dělení výdajů a vyrovnání přibyly později přes verzované SQL migrace.",
          ],
        },
        {
          heading: "Výsledek",
          body:
            "Funkční nasazená aplikace, kterou skutečně používám k plánování reálných výletů. Hlavně mě ale naučila vlastnit projekt od začátku do konce: návrh schématu, autentizaci, nasazení i i18n, ne jen vrstvu UI.",
        },
      ],
    },
  },

  outlay: {
    slug: "outlay",
    year: "2026",
    liveUrl: "https://outlay.vorlos.eu",
    repoUrl: "https://github.com/PetrVorlos35/outlay",
    en: {
      title: "Outlay",
      tagline:
        "Every recurring charge, always visible. Track your subscriptions, count down each renewal, and get warned before money leaves your account.",
      category: "Fullstack SaaS",
      role: "Solo project. Design, frontend and backend.",
      stack: [
        { label: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "next-intl"] },
        { label: "Backend", items: ["Convex", "Convex Auth", "Scheduled functions", "Nodemailer"] },
        { label: "Infra", items: ["Vercel", "TypeScript"] },
      ],
      sections: [
        {
          heading: "Overview",
          body:
            "Outlay is a subscription tracker: one view of every recurring charge, a live countdown to each renewal, and an email reminder before you're billed, so nothing charges you by surprise.",
        },
        {
          heading: "The problem",
          body:
            "Subscriptions are easy to start and easy to forget, and their prices quietly creep up. People get billed for things they meant to cancel, and notice a price hike only on the statement. I wanted a single dashboard that shows the true monthly cost and reaches out before the money leaves, not after.",
        },
        {
          heading: "What I built",
          bullets: [
            "A dashboard of every subscription with the real monthly total",
            "Multi-currency support (USD / EUR / CZK / GBP) with conversion to one comparable figure",
            "A seeded catalog of popular services for one-tap adding, with the price, logo and brand colour pre-filled",
            "Billing cycles (weekly / monthly / quarterly / yearly) normalised to a single monthly cost",
            "A renewal countdown plus email reminders before each charge, with a dedup guard so you're never emailed twice",
            "Price-change tracking that remembers the previous price to catch hikes early",
            "Pause / active status and spend categories (streaming, music, software, gaming, …)",
            "Auth, a launch waitlist and full internationalisation (next-intl)",
          ],
        },
        {
          heading: "Tech & why",
          body:
            "I built Outlay on Convex specifically to contrast it with Journeo's hand-rolled stack. Convex gives a reactive backend (data changes push to the UI live with no manual cache wiring) and keeps the schema, server functions and auth in one typed system. Reminder emails run on scheduled (cron) functions via Nodemailer, and the service catalog is seeded in the database so it can be edited without a redeploy.",
        },
        {
          heading: "Hardest part",
          bullets: [
            "Normalising different billing cycles and currencies into one comparable monthly number.",
            "Sending reminder emails without duplicates: a `lastReminderSent` guard keyed to the renewal date.",
            "Keeping a single USD baseline catalog while showing each user a correct local (e.g. CZK) price.",
          ],
        },
        {
          heading: "Outcome",
          body:
            "A deployed, SaaS-style app, and a deliberate counterpart to Journeo. Two projects, two backend philosophies: one custom Express + MySQL, one modern reactive BaaS, so the portfolio shows I can reason about the trade-offs rather than knowing a single way.",
        },
      ],
    },
    cs: {
      title: "Outlay",
      tagline:
        "Každá opakovaná platba stále na očích. Sleduj svá předplatná, odpočítávej každé obnovení a dostaň upozornění dřív, než ti odejdou peníze z účtu.",
      category: "Fullstack SaaS",
      role: "Sólo projekt. Design, frontend i backend.",
      stack: [
        { label: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "next-intl"] },
        { label: "Backend", items: ["Convex", "Convex Auth", "Plánované funkce", "Nodemailer"] },
        { label: "Infra", items: ["Vercel", "TypeScript"] },
      ],
      sections: [
        {
          heading: "Přehled",
          body:
            "Outlay je sledovač předplatných: jeden přehled všech opakovaných plateb, živý odpočet do každého obnovení a e-mailové upozornění dřív, než ti přijde platba, aby tě nic nepřekvapilo.",
        },
        {
          heading: "Problém",
          body:
            "Předplatné se snadno založí a snadno zapomene a jeho cena potichu roste. Lidem se účtují věci, které chtěli zrušit, a zdražení si všimnou až na výpisu. Chtěl jsem jeden přehled, který ukáže skutečné měsíční náklady a ozve se dřív, než peníze odejdou, ne potom.",
        },
        {
          heading: "Co jsem postavil",
          bullets: [
            "Přehled všech předplatných se skutečným měsíčním součtem",
            "Podpora více měn (USD / EUR / CZK / GBP) s převodem na jedno srovnatelné číslo",
            "Předvyplněný katalog populárních služeb pro přidání na jedno klepnutí, s cenou, logem i barvou značky",
            "Platební cykly (týdně / měsíčně / čtvrtletně / ročně) přepočtené na jednotné měsíční náklady",
            "Odpočet do obnovení a e-mailové upozornění před každou platbou, s pojistkou proti duplicitě",
            "Sledování změny ceny, které pamatuje předchozí cenu a včas odhalí zdražení",
            "Stav pozastaveno / aktivní a kategorie výdajů (streaming, hudba, software, hraní, …)",
            "Přihlášení, čekací listina k spuštění a plná lokalizace (next-intl)",
          ],
        },
        {
          heading: "Technologie a proč",
          body:
            "Outlay jsem postavil na Convexu záměrně jako protiklad k ručně psanému stacku Journea. Convex nabízí reaktivní backend (změny dat se posílají do UI živě bez ruční práce s cache) a drží schéma, serverové funkce i přihlašování v jednom typovaném systému. Připomínkové e-maily běží na plánovaných (cron) funkcích přes Nodemailer a katalog služeb je nasazený v databázi, takže ho lze upravit bez nového nasazení.",
        },
        {
          heading: "Nejtěžší část",
          bullets: [
            "Sjednotit různé platební cykly a měny do jednoho srovnatelného měsíčního čísla.",
            "Posílat připomínkové e-maily bez duplicit: pojistka `lastReminderSent` navázaná na datum obnovení.",
            "Držet jeden katalog se základem v USD, ale každému uživateli ukázat správnou lokální cenu (např. v CZK).",
          ],
        },
        {
          heading: "Výsledek",
          body:
            "Nasazená aplikace ve stylu SaaS a záměrný protějšek k Journeu. Dva projekty, dvě filozofie backendu: jeden vlastní Express + MySQL, druhý moderní reaktivní BaaS. Portfolio tak ukazuje, že umím zvážit kompromisy, ne jen jeden způsob.",
        },
      ],
    },
  },
};

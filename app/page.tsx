import Header from "@/components/header";
import Banner from "@/components/banner";
import { getOffers } from "@/app/lib/api";

interface Offer {
  id: string | number;
  bonuses?: {
    welcome_bonus?: string;
  };
}

export default async function HomePage() {
const offers = await getOffers();
const firstId = offers?.[0]?.id;

  const fallbackOffers = [
    {
      bonuses: {
        welcome_bonus:
          "EXCLUSIVE WELCOME OFFER OF 2’000 AUD AND 275 FREE SPINS",
      },
    },
  ];

 
  const bannerOffers =
    offers && offers.length > 0
      ? offers.map((o) => ({
          bonuses: {
            welcome_bonus: o.bonuses?.welcome_bonus ?? "",
          },
        }))
      : fallbackOffers;

  return (
    <main>
      <Header firstId={firstId} />
      <Banner offers={bannerOffers} />
    </main>
  );
}

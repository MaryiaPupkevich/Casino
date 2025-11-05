export type Offer = {
  id: number | string;
  link?: string;
  bonuses?: { welcome_bonus?: string };
  position?: number | null;
  countries?: string[];
};


type WebsiteResponse = {
  offers?: Offer[];
  data?: { offers?: Offer[] };
};

export async function getWebsiteData(siteId = 26): Promise<WebsiteResponse> {
  const res = await fetch(
    `https://api.adkey-seo.com/api/website/get-website/${siteId}`,
    {
      cache: "no-store", 
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch website data");
  }

  return res.json();
}

export async function getOffers(siteId = 26): Promise<Offer[]> {
  const data = await getWebsiteData(siteId);


  const rawOffers = data.offers ?? data.data?.offers;


  const offers: Offer[] = Array.isArray(rawOffers) ? rawOffers : [];

  
  return [...offers].sort(
  (a, b) =>
(a.position ?? Number.POSITIVE_INFINITY) -
(b.position ?? Number.POSITIVE_INFINITY)
);

  return offers;
}

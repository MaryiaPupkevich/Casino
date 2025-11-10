export type Offer = {
  id: number | string;
  name?: string;
  link?: string;
  logo?:string;
  bonuses?:{
  welcome_bonus?: string;
  rate?: string;        
  amount?: string;      
  free_spins?: string;  
  country?: string; 
  position?: number | null;
  countries?: string[];
  }
  wager?: string | null;      
  bonus_code?: string | null; 
  position?: number | null;
  countries?: string[];
};

type WebsiteResponse = {
 website?: {
    id: number;
    link?: string;
    type?: string;
    country_code?: string;
    country_name?: string;
  };
  offers?: Offer[];
  data?: {
    offers?: Offer[];
  };
};

export type Game = {
  id: number;    
  name: string;
  image: string; 
};

const API_BASE = 'https://api.adkey-seo.com/api';

export const OFFERS_IMAGE_BASE =
  'https://api.adkey-seo.com/storage/images/offers/';

export const GAMES_IMAGE_BASE =
  'https://api.adkey-seo.com/storage/images/games/';

  export function getGamesType(websiteType?: string): "gambling" | "betting" {
  const t = websiteType?.toLowerCase() ?? "";
  return t.includes("betting") ? "betting" : "gambling";
}


export async function getWebsiteData(siteId = 26): Promise<WebsiteResponse> {
  const res = await fetch(`${API_BASE}/website/get-website/${siteId}`,
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

  
  return offers;
}

export async function getGames(
  type: 'gambling' | 'betting' 
): Promise<Game[]> {
  const res = await fetch(`${API_BASE}/website/get-games/${type}`, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    console.error('Failed to load games');
    return [];
  }

  const data = await res.json();


  const games: Game[] = Array.isArray(data) ? data : [];

  return games;
}

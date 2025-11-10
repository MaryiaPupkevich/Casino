"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/header";
import Banner from "@/components/banner";
import BonusTable from "@/components/bonusTable";
import TopGames from "@/components/TopGames";
import FAQ from "@/components/FAQ"; 
import Footer from "@/components/footer";

import {
  getOffers,
  getWebsiteData,
  OFFERS_IMAGE_BASE,
  type Offer,
} from "@/app/lib/api";

type OfferOrPlaceholder = Offer | { id: string; isPlaceholder: true };
type BannerItem = { bonuses: { welcome_bonus: string } };

function isOffer(item: OfferOrPlaceholder): item is Offer {
  return !("isPlaceholder" in item);
}

export default function HomePage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [countryName, setCountryName] = useState("Australia");
  const [bannerOffers, setBannerOffers] = useState<BannerItem[]>([]);
  const [columns, setColumns] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const [websiteType, setWebsiteType] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 680) setColumns(2);
      else if (w < 1200) setColumns(3);
      else setColumns(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getWebsiteData(26);
        const fetchedOffers = await getOffers(26);

        console.log("website data:", data);
        console.log("offers length:", fetchedOffers.length);

        setOffers(fetchedOffers || []);
        setCountryName(data?.website?.country_name || "Australia");
        setWebsiteType(data?.website?.type);

        const fallbackOffers: Offer[] = [
          {
            id: "fallback-1",
            name: "Default Casino",
            logo: "fallback-logo.png",
            bonuses: {
              welcome_bonus:
                "EXCLUSIVE WELCOME OFFER OF 2’000 AUD AND 275 FREE SPINS",
            },
          },
        ];

        const bannerSource: Offer[] =
          fetchedOffers && fetchedOffers.length > 0
            ? fetchedOffers.map((o) => ({
                id: o.id,
                name: o.name ?? "Casino",
                logo: o.logo ?? "fallback-logo.png",
                bonuses: {
                  welcome_bonus: o.bonuses?.welcome_bonus ?? "",
                },
              }))
            : fallbackOffers;

        setBannerOffers(
          bannerSource.map((b) => ({
            bonuses: {
              welcome_bonus: b.bonuses?.welcome_bonus ?? "Welcome Bonus",
            },
          }))
        );
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    fetchData();
  }, []);

  const firstId = offers?.[0]?.id;

  const filledOffers = useMemo<OfferOrPlaceholder[]>(() => {
    const base = showAll ? offers : offers.slice(0, 8);
    const remainder = base.length % columns;

    if (remainder === 0) return base;

    const placeholders = Array.from(
      { length: columns - remainder },
      (_, i) => ({
        id: `empty-${columns}-${i}`,
        isPlaceholder: true as const,
      })
    );

    return [...base, ...placeholders];
  }, [offers, columns, showAll]);



  return (
    <main>
      <Header firstId={firstId} />
      <Banner offers={bannerOffers} firstId={firstId} />

      <section className="slogan">
        <div className="container">
          <div className="slogan-text">
            Cowboys Online – Casino & Sports Betting in One Place
          </div>
        </div>
      </section>

      <section className="top-casinos">
        <div className="container">
          <h2 className="top-casinos__title">
            TOP CASINOS {countryName.toUpperCase()}
          </h2>

          <div className="top-casinos__grid">
            <div className="casino-row">
              {filledOffers.map((offer) => {
                if (!isOffer(offer)) {
                  return (
                    <div
                      key={offer.id}
                      className="casino-card casino-card-placeholder">
                      <img
                        src="/fallback-logo.png"
                        alt="Coming soon"
                        className="casino-card__logo"
                      />
                      <h3 className="casino-card__name">Coming Soon</h3>
                      <p className="casino-card__bonusname">
                        New casino incoming
                      </p>
                      <p className="casino-card__bonus">Stay tuned!</p>
                    </div>
                  );
                }

                
                const logoUrl = offer.logo
                  ? `${OFFERS_IMAGE_BASE}${offer.logo}`
                  : "/fallback-logo.png";
                const offerName = offer.name ?? "Casino";
                const bonusText =
                  offer.bonuses?.welcome_bonus ?? "Welcome Bonus";

                return (
                  <div key={offer.id} className="casino-card">
                    <img
                      src={logoUrl}
                      alt={offerName}
                      className="casino-card__logo"
                    />
                    <h3 className="casino-card__name">{offerName}</h3>
                    <p className="casino-card__bonusname">Welcome bonus</p>
                    <p className="casino-card__bonus">{bonusText}</p>
                    <a
                      href={`/casino/${offer.id}`}
                      className="casino-card__btn"
                    >
                      CLAIM BONUS
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

         {!showAll && offers.length > 8 && (
  <button
    id="show-all-btn"
    className="top-casinos__all-btn"
    onClick={() => setShowAll(true)}
  >
    ALL CASINO
  </button>

)}
        </div>
      </section>
       {offers.length > 0 && (
        <section className="bonus-section">
          <div className="container">
            <BonusTable offers={offers} />
          </div>
        </section>
       )}
       <section className="casino-about">
        <div className="container">
  <div className="casino-about__inner">
    <h2 className="casino-about__title">DALLAS COWBOYS CASINO</h2>
    <div className="casino-about__text">
      <p>
       Discover the thrill of gaming at Cowboys Casino in Calgary, Canada. Dive into exciting games and vibrant entertainment. Join us for an unforgettable experience!
      </p>

      <ul className="casino-about__list">
        <li>C$20 in free play credits</li>
        <li>20% discount of birthday day</li>
        <li>Loyalty program available</li>
      </ul>

      <p>
        Cowboys Casino, located in the heart of Calgary, Alberta, is a vibrant and bustling entertainment hub that offers a diverse range of gaming options. Renowned for its lively atmosphere and extensive gaming floors, this casino caters to both seasoned gamblers and newcomers. With a variety of table games, slots, and poker rooms, Cowboys Casino reviews are designed to deliver a thrilling experience. Additionally, it features dining venues and hosts various live events, making it a go-to destination for entertainment seekers in the region.
      </p>
    </div>
    <div className="casino-about__image">
      <img
        src="/laptop.png"               
        alt="Cowboys online – casino & sports betting on a laptop"
      />
    </div>
  </div>
  </div>
</section>
  {firstId != null && websiteType && (
  <section className="top-games">
   
      <TopGames firstOfferId={firstId} websiteType={websiteType} />
  </section>
  
)}
<section className="advantages-section">
  <div className="container">
    <h2 className="advantages-title">COWBOYS CASINO ADVANTAGES</h2>

    <p className="advantages-intro">
   Cowboys Casino, strategically situated in the heart of Calgary, is a premier gaming and entertainment destination that offers a plethora of benefits to its visitors. Known for its vibrant atmosphere and exceptional service, the casino stands out as a favorite among locals and tourists alike. Whether you are there for the games or the live entertainment, Cowboys Casino promises a memorable experience with its well-rounded offerings.
    </p>

    <div className="advantages-grid">
      <div className="advantages-column">
        <h3 className="advantages-subtitle">ADVANTAGES</h3>
        <ul className="advantages-list">
          <li>Diverse gaming options</li>
          <li>Frequent promotions</li>
          <li>Multiple dining venues</li>
          <li>Live entertainment and events</li>
          <li>Central location</li>
        </ul>
      </div>

      <div className="advantages-column">
        <h3 className="advantages-subtitle">DISADVANTAGES</h3>
        <ul className="advantages-list">
          <li>Potentially crowded</li>
          <li>Limited parking</li>
          <li>Noise level can be high</li>
          <li>Occasional wait times</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section className="banking-section">
  <div className="container">
    
      <h2 className="banking-title">COWBOYS CASINO LOGIN</h2>

      <p className="banking-text">
        Cowboys Casino is a prominent entertainment venue in Calgary, known for its dynamic gaming environment and variety of entertainment options. It houses numerous gaming tables, slot machines, and an exclusive poker room that attracts both local and visiting patrons. The casino also offers a rich selection of dining and live event experiences, making it a comprehensive destination for leisure and entertainment.
      </p>
      <p className="banking-text">
       For guests looking to enhance their experience, Cowboys Casino provides a streamlined login procedure through their website. This system allows patrons to manage their accounts, check points and rewards, and receive updates on upcoming Cowboys Casino events and promotions. Users can easily register online by entering personal details to create a secure account, which can then be used for a variety of services, including advance bookings and personalized gaming experiences.
      </p>

      <div className="banking-grid">
        <div className="banking-column">
          <h3 className="banking-subtitle">DEPOSIT METHODS</h3>
          <p className="banking-text">
          At Cowboys Casino, patrons are afforded a variety of convenient deposit methods to fund their accounts, ensuring that they can start playing without delay. The casino accepts major credit cards like Visa and MasterCard, which are among the most popular choices due to their wide accessibility and immediate transaction approval. Additionally, direct bank transfers are available, allowing for secure deposits straight from personal bank accounts.
          </p>
        </div>
        <div className="banking-column">
          <h3 className="banking-subtitle">WITHDRAWAL METHODS</h3>
          <p className="banking-text">
           When it comes to withdrawing winnings, Cowboys Casino hours provide several straightforward and efficient options. Similar to deposits, players can choose to receive their funds through direct bank transfers, which safely move winnings directly into their personal bank accounts, usually within a few business days. Credit cards such as Visa and MasterCard are also supported for withdrawals, offering a convenient way to credit funds back to the same card used for deposits.
          </p>
        </div>
      </div>
    </div>
</section>
<section className="app-section">
  <div className="container">
    <div className="app-top">
      <div className="app-left">
        <h2 className="app-title">ZEN8 COWBOYS CASINO APP</h2>
           <div className="app-phone-inline">
          <img src="/app-phone.png" alt="Mobile app" />
        </div>
        <p className="app-text">
          Cowboys Casino offers a user-friendly mobile app that allows players to access their favorite games from anywhere, at any time. The app is designed for both iOS and Android devices, ensuring a broad compatibility range. With intuitive navigation and a responsive design, the app provides a seamless mobile gaming experience. Features include full account management capabilities, live game streaming, and the ability to make deposits and withdrawals directly through the app.
        </p>
        <p className="app-text">
          Features include full account management capabilities, live game streaming, and the
          ability to make deposits and withdrawals directly through the app.
        </p>
        <div className="app-stores">
          <img src="/google-play.jpg" alt="Get it on Google Play" />
          <img src="/app-store.jpg" alt="Download on the App Store" />
        </div>
      </div>
      <div className="app-right">
        <img src="/app-phone.png" alt="Casino mobile app" />
      </div>
    </div>
    <div className="app-bottom">
      <div className="app-column">
        <h3 className="app-subtitle">CURRENCIES</h3>
        <p className="app-text">
          Reflecting its international customer base, Cowboys Casino accepts several major currencies
          for transactions. Players can conduct transactions in Canadian dollars (CAD), US dollars
          (USD), and Euros (EUR).
        </p>
        <p className="app-text">
          This flexibility allows players from different regions to play and transact in their
          preferred or local currency, simplifying the process and enhancing their gaming experience.
        </p>
      </div>
      <div className="app-column">
        <h3 className="app-subtitle">LANGUAGES</h3>
        <p className="app-text">
          To accommodate a diverse clientele, Cowboys Casino offers its services in multiple
          languages. The primary language of operation is English, but the casino also provides
          language support for French and Spanish speakers.
        </p>
        <p className="app-text">
          This multilingual approach helps players feel more comfortable and confident while
          navigating the platform and managing their accounts.
        </p>
      </div>
    </div>
  </div>
</section>
<FAQ/>
 <section className="games-section">
      <div className="container">
        <h2 className="games-title">
          GAMES AVAILABLE TO PLAY AT COWBOYS CASINO
        </h2>
        <p className="games-intro">
         Cowboys Casino in Calgary is renowned for its wide array of gaming opportunities, catering to all types of players, from novices to seasoned gamblers. With its expansive gaming floor, visitors can enjoy a variety of games in a lively and exciting environment. Here’s a breakdown of the main gaming options available at Cowboys Casino:
        </p>
        <div className="games-grid">
          <div className="games-column">
            <article className="games-block">
              <h3 className="games-subtitle">SLOTS</h3>
              <p className="games-text">
               At Cowboys Casino Calgary, the slots area is a major attraction, featuring an array of machines that include traditional three-reel classics, contemporary five-reel video slots, and progressive jackpot slots that offer life-changing payouts. The selection is frequently updated with new and exciting games to maintain interest and provide fresh challenges for regular patrons.
              </p>
            </article>
            <article className="games-block">
              <h3 className="games-subtitle">POKER ROOM</h3>
              <p className="games-text">
                Cowboys Casino poker room is a hub of strategic gaming activity, offering a range of poker styles and tournament formats. The environment is professional yet inviting, with highly skilled dealers who ensure the integrity and smooth flow of games. The Cowboys Casino poker room also promotes a sense of camaraderie among players through regular Cowboys Casino poker tournaments and cash games, which foster competitive yet friendly play. This section of the casino is particularly popular among players who appreciate poker’s balance of luck and skill.
              </p>
            </article>
          </div>
          <div className="games-column">
            <article className="games-block">
              <h3 className="games-subtitle">TABLE GAMES</h3>
              <p className="games-text">
               The table games at Cowboys Casino are designed to cater to both beginners and seasoned gamblers. Popular games like Blackjack come with variations that introduce new rules and betting options, adding depth to the traditional gameplay. Roulette enthusiasts can choose between American and European roulette tables, each offering different odds and betting strategies. For those interested in Asian-inspired gaming, Baccarat provides a simple yet intriguing game of chance, while Craps offers a dynamic community gaming experience with its complex bets and fast-paced action.
              </p>
            </article>

            <article className="games-block">
              <h3 className="games-subtitle">ELECTRONIC TABLE GAMES</h3>
              <p className="games-text">
               The electronic table games at Cowboys Casino hotel provide a modern twist on classic casino fare. These games utilize advanced technology to simulate live table games with virtual dealers and electronic betting. Players can enjoy a faster-paced gaming experience with features like rapid roulette, which accelerates the traditional game for quick play. Electronic Blackjack and Baccarat games are also available, offering a perfect platform for beginners to learn the rules without the pressure of a crowded table.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
    <section className="support-section">
      <div className="container support-inner">
        <div className="support-left">
          <h2 className="support-title">
            COWBOYS CASINO GIRLS
            SUPPORT
          </h2>
          <p className="support-text">
           Cowboys Casino prides itself on providing exceptional customer support to ensure a pleasant gaming experience for all its visitors. Support is available 24/7 via multiple channels, including live chat, email, and telephone. The live chat feature is especially popular as it provides instant assistance for urgent inquiries.
          </p>
        </div>
        <div className="support-right">
          <img
            src="/support.png"      
            alt="Cowboys Casino support"
            className="support-image"
          />
        </div>
      </div>
    </section>
     <section className="bonuses-section">
      <div className="container bonuses-inner">
        <h2 className="bonuses-title">
          COWBOYS CASINO BONUSES AND
          <br />
          PROMOTIONS
        </h2>

        <p className="bonuses-intro">
          Cowboys Casino in Calgary is known for enriching the gaming experience of its visitors through an array of enticing bonuses and promotions. These offers are designed to reward regular patrons and attract new ones, making each visit potentially more rewarding. Whether it is through additional play credits, cash prizes, or special event access, Cowboys Casino ensures that both new and returning customers have plenty of reasons to play.
        </p>

        <div className="bonuses-grid">
          <div className="bonuses-column">
            <h3 className="bonuses-subtitle">WELCOME BONUS</h3>
            <p className="bonuses-text">
            At Cowboys Casino, the Welcome Bonus serves as a warm introduction for new members, offering them free play credits immediately after they register. Typically, newcomers receive around C$20 in free play credits when they sign up for a casino membership card. This initial bonus is crafted to give new visitors a taste of the diverse gaming options available without any initial financial risk. It is an effective way to encourage guests to try out different games, potentially finding their favorites which they might return to play again. This incentive not only boosts the casino visitor numbers but also enhances the overall guest experience right from the start.
            </p>

            <h3 className="bonuses-subtitle">JACKPOT BONUSES</h3>
            <p className="bonuses-text">
             Cowboys Casino enhances the excitement on the gaming floor with its progressive jackpot bonuses, available on select slot machines and table games. These jackpots start at a base amount, like C$10,000, and gradually increase with each play, attracting more participants as the potential prize grows. It is not uncommon for these jackpots to exceed C$100,000, creating a buzz on the casino floor and drawing in crowds hoping to hit the big win.
            </p>

            <h3 className="bonuses-subtitle">
              BIRTHDAY BONUSES AND COWBOYS CASINO TICKETS
            </h3>
            <p className="bonuses-text">
             Celebrating a birthday at Cowboys Casino is made special with the Birthday Bonus, which often includes perks like free play credits or discounts on dining. Typically, a birthday celebrant might receive C$25 in free play credits and a 20% discount at one of the casinos dining establishments. This personalized touch not only makes the birthday guest feel valued but also encourages celebratory gatherings at the casino, potentially increasing foot traffic and patron spending on these occasions.
            </p>
          </div>
          <div className="bonuses-column">
            <h3 className="bonuses-subtitle">LOYALTY REWARDS</h3>
            <p className="bonuses-text">
             The Loyalty Rewards program at Casino Cowboys is designed to acknowledge and reward the regular patrons for their continued engagement. Points in this program are accumulated based on the frequency of visits and the amount of money wagered. These points are quite versatile, redeemable for a variety of rewards including free meals at the restaurants in Cowboys Casino, complimentary hotel stays, or extra casino credits. For instance, spending C$100 might earn a player 10 loyalty points, which could then be exchanged for benefits that enhance their experience and encourage further play.
            </p>

            <h3 className="bonuses-subtitle">DAILY AND WEEKLY PROMOTIONS</h3>
            <p className="bonuses-text">
             To maintain a dynamic and engaging atmosphere, Cowboys Casino organizes a variety of daily and weekly promotions. These promotions range from double points days, where players earn twice the loyalty points on their card, to special draw nights offering additional chances to win cash or prizes. For example, every Tuesday might feature a promotional draw where participants can win a prize of C$500. These regularly scheduled events keep the gameplay fresh and exciting, providing regular patrons and casual visitors alike with numerous opportunities to benefit simply by choosing to play on specific days.
            </p>
          </div>
        </div>
      </div>
    </section>
          <Footer />

</main>
  );
}

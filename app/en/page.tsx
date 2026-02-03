import ConsultForm from "../ar/ConsultForm";
import EndlessSmiles from "../ar/EndlessSmiles";
import WhatsAppFloat from "../ar/WhatsAppFloat";
import { getConfig, getEndlessSmiles, getHomeData } from "../../lib/content";

export const dynamic = "force-dynamic";

export default async function EnglishLanding() {
  const [config, home, smiles] = await Promise.all([getConfig(), getHomeData(), getEndlessSmiles()]);

  return (
    <div className="page">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <img className="logo" src="/images/header/logo.png" alt="logo" />
            <h1 className="hero-title">{home.top.line1En || "Best choice for dental implant in Istanbul"}</h1>
            <p className="hero-sub">{home.top.line2En || "Get the Hollywood smile you deserve"}</p>
          </div>
          <div>
            <ConsultForm
              buttonLabel="Send"
              placeholderName="Name *"
              placeholderEmail="Email"
              placeholderPhone="Phone *"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="section-title">Contact us to help you</h2>
            <p className="section-text">{home.contact.textEn}</p>
          </div>
          <div className="icon-grid">
            <div className="icon-card">
              {home.contact.logo1 && <img src={home.contact.logo1} alt="" />}
              <div>{home.contact.logo1NameEn}</div>
            </div>
            <div className="icon-card">
              {home.contact.logo2 && <img src={home.contact.logo2} alt="" />}
              <div>{home.contact.logo2NameEn}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <h2 className="section-title">Unforgettable smiles</h2>
          <EndlessSmiles items={smiles} lang="en" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Smile journey</h2>
          <div className="journey">
            <div className="journey-card">
              {home.journey.photo1 && <img src={home.journey.photo1} alt="" />}
              <div>{home.journey.photo1TextEn}</div>
            </div>
            <div className="journey-card">
              {home.journey.photo2 && <img src={home.journey.photo2} alt="" />}
              <div>{home.journey.photo2TextEn}</div>
            </div>
            <div className="journey-card">
              {home.journey.photo3 && <img src={home.journey.photo3} alt="" />}
              <div>{home.journey.photo3TextEn}</div>
            </div>
            <div className="journey-card">
              {home.journey.photo4 && <img src={home.journey.photo4} alt="" />}
              <div>{home.journey.photo4TextEn}</div>
            </div>
            <div className="journey-card">
              {home.journey.photo5 && <img src={home.journey.photo5} alt="" />}
              <div>{home.journey.photo5TextEn}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "linear-gradient(120deg, #f8efe4, #f1e6d6)" }}>
        <div className="container split">
          <div>
            {home.dontLeave.sidePhoto && <img src={home.dontLeave.sidePhoto} alt="" />}
          </div>
          <div>
            <h2 className="section-title">Do not leave before consulting with us</h2>
            <p className="section-text">{home.dontLeave.textEn}</p>
            <ConsultForm
              buttonLabel="Send"
              placeholderName="Name *"
              placeholderEmail="Email"
              placeholderPhone="Phone *"
            />
          </div>
        </div>
      </section>

      <footer className="footer">Copyright © DahhanDent {new Date().getFullYear()}</footer>

      <WhatsAppFloat phone={config.whatsapp} label={config.msgEn || "Free consultation"} />
    </div>
  );
}

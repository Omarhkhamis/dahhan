import ConsultForm from "./ConsultForm";
import EndlessSmiles from "./EndlessSmiles";
import WhatsAppFloat from "./WhatsAppFloat";
import { getConfig, getEndlessSmiles, getHomeData } from "../../lib/content";

export const dynamic = "force-dynamic";

export default async function ArabicLanding() {
  const [config, home, smiles] = await Promise.all([getConfig(), getHomeData(), getEndlessSmiles()]);

  return (
    <div className="page">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <img className="logo" src="/images/header/logo.png" alt="logo" />
            <h1 className="hero-title">{home.top.line1Ar || "أفضل خيار لزراعة الأسنان في إسطنبول"}</h1>
            <p className="hero-sub">{home.top.line2Ar || "احصل على ابتسامة هوليود التي تستحقها"}</p>
          </div>
          <div>
            <ConsultForm
              buttonLabel="إرسال"
              placeholderName="الاسم *"
              placeholderEmail="البريد الإلكتروني"
              placeholderPhone="رقم الهاتف *"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="section-title">تواصل معنا لنساعدك</h2>
            <p className="section-text">{home.contact.textAr}</p>
          </div>
          <div className="icon-grid">
            <div className="icon-card">
              {home.contact.logo1 && <img src={home.contact.logo1} alt="" />}
              <div>{home.contact.logo1NameAr}</div>
            </div>
            <div className="icon-card">
              {home.contact.logo2 && <img src={home.contact.logo2} alt="" />}
              <div>{home.contact.logo2NameAr}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <h2 className="section-title">ابتسامات لا تنسى</h2>
          <EndlessSmiles items={smiles} lang="ar" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">رحلة رسم الابتسامة</h2>
          <div className="journey">
            <div className="journey-card">
              {home.journey.photo1 && <img src={home.journey.photo1} alt="" />}
              <div>{home.journey.photo1TextAr}</div>
            </div>
            <div className="journey-card">
              {home.journey.photo2 && <img src={home.journey.photo2} alt="" />}
              <div>{home.journey.photo2TextAr}</div>
            </div>
            <div className="journey-card">
              {home.journey.photo3 && <img src={home.journey.photo3} alt="" />}
              <div>{home.journey.photo3TextAr}</div>
            </div>
            <div className="journey-card">
              {home.journey.photo4 && <img src={home.journey.photo4} alt="" />}
              <div>{home.journey.photo4TextAr}</div>
            </div>
            <div className="journey-card">
              {home.journey.photo5 && <img src={home.journey.photo5} alt="" />}
              <div>{home.journey.photo5TextAr}</div>
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
            <h2 className="section-title">لا تغادر قبل استشاراتنا</h2>
            <p className="section-text">{home.dontLeave.textAr}</p>
            <ConsultForm
              buttonLabel="إرسال"
              placeholderName="الاسم *"
              placeholderEmail="البريد الإلكتروني"
              placeholderPhone="رقم الهاتف *"
            />
          </div>
        </div>
      </section>

      <footer className="footer">Copyright © DahhanDent {new Date().getFullYear()}</footer>

      <WhatsAppFloat phone={config.whatsapp} label={config.msgAr || "استشارة مجانية"} />
    </div>
  );
}

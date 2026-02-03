"use client";

import { useEffect, useState } from "react";

type ContentState = {
  config: any;
  home: any;
  smilesAdmin: any[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<ContentState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [msgs, setMsgs] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [activeSection, setActiveSection] = useState<
    | "settings"
    | "top"
    | "contact"
    | "journey"
    | "dontLeave"
    | "smiles"
    | "messages"
    | "subscribers"
  >("settings");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    if (!res.ok) {
      window.location.href = "/admin/login";
      return;
    }
    const json = await res.json();
    setData({ config: json.config, home: json.home, smilesAdmin: json.smilesAdmin || [] });
    const [msgRes, subRes] = await Promise.all([
      fetch("/api/admin/messages"),
      fetch("/api/admin/subscribers")
    ]);
    if (msgRes.ok) {
      const msgJson = await msgRes.json();
      setMsgs(msgJson.rows || []);
    }
    if (subRes.ok) {
      const subJson = await subRes.json();
      setSubs(subJson.rows || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(updates: { internalName: string; value: string }[]) {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates })
    });
    if (res.ok) {
      setMessage("تم الحفظ");
    } else {
      setMessage("فشل الحفظ");
    }
    setSaving(false);
  }

  async function uploadFile(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Upload failed");
    return json.path as string;
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  if (loading || !data) {
    return <div className="admin-content">...Loading</div>;
  }

  const updates: { internalName: string; value: string }[] = [];

  function queue(internalName: string, value: string) {
    updates.push({ internalName, value });
  }

  const sections = [
    { key: "settings", label: "الإعدادات العامة" },
    { key: "top", label: "الواجهة العلوية" },
    { key: "contact", label: "تواصل معنا" },
    { key: "journey", label: "رحلة رسم الابتسامة" },
    { key: "dontLeave", label: "لا تغادر" },
    { key: "smiles", label: "ابتسامات لا تنسى" },
    { key: "messages", label: "الرسائل" },
    { key: "subscribers", label: "قائمة المشتركين" }
  ] as const;

  return (
    <div className="admin-shell">
      <main className="admin-content">
        <div className="admin-header">
          <div>
            <h1 style={{ marginTop: 0 }}>لوحة الإدارة</h1>
            <p style={{ margin: 0, opacity: 0.7 }}>إدارة كل قسم على حدة من القائمة الجانبية</p>
          </div>
          {message && <p className="admin-message">{message}</p>}
        </div>

        {activeSection === "settings" && (
          <div className="admin-card">
            <h3>الإعدادات العامة</h3>
            <div className="admin-grid">
              <input
                className="admin-input"
                value={data.config.whatsapp || ""}
                onChange={(e) => setData({ ...data, config: { ...data.config, whatsapp: e.target.value } })}
                placeholder="رقم واتساب"
              />
              <input
                className="admin-input"
                value={data.config.msgAr || ""}
                onChange={(e) => setData({ ...data, config: { ...data.config, msgAr: e.target.value } })}
                placeholder="رسالة واتساب عربي"
              />
              <input
                className="admin-input"
                value={data.config.msgEn || ""}
                onChange={(e) => setData({ ...data, config: { ...data.config, msgEn: e.target.value } })}
                placeholder="WhatsApp message EN"
              />
            </div>
            <button
              className="button"
              disabled={saving}
              onClick={() => {
                queue("cfgs_whatsapp", data.config.whatsapp || "");
                queue("cfgs_whats_msg_ar", data.config.msgAr || "");
                queue("cfgs_whats_msg_en", data.config.msgEn || "");
                save([...updates]);
              }}
            >
              حفظ الإعدادات
            </button>
            <div className="admin-separator" />
            <div>
              <h4 style={{ marginTop: 0 }}>تغيير كلمة المرور</h4>
              <div className="admin-grid">
                <input
                  className="admin-input"
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="كلمة مرور جديدة"
                />
                <input
                  className="admin-input"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="تأكيد كلمة المرور"
                />
              </div>
              {passError && <p className="admin-error">{passError}</p>}
              <button
                className="button"
                disabled={saving}
                onClick={() => {
                  setPassError("");
                  if (!newPass.trim()) {
                    setPassError("أدخل كلمة مرور جديدة");
                    return;
                  }
                  if (newPass !== confirmPass) {
                    setPassError("كلمتا المرور غير متطابقتين");
                    return;
                  }
                  queue("cfgs_wpass", newPass.trim());
                  save([...updates]);
                  setNewPass("");
                  setConfirmPass("");
                }}
              >
                تغيير كلمة المرور
              </button>
            </div>
          </div>
        )}

        {activeSection === "top" && (
          <div className="admin-card">
            <h3>الواجهة العلوية</h3>
            <div className="admin-grid">
              <input
                className="admin-input"
                value={data.home.top.line1Ar || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, top: { ...data.home.top, line1Ar: e.target.value } } })}
                placeholder="السطر الأول عربي"
              />
              <input
                className="admin-input"
                value={data.home.top.line1En || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, top: { ...data.home.top, line1En: e.target.value } } })}
                placeholder="Line 1 EN"
              />
              <input
                className="admin-input"
                value={data.home.top.line2Ar || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, top: { ...data.home.top, line2Ar: e.target.value } } })}
                placeholder="السطر الثاني عربي"
              />
              <input
                className="admin-input"
                value={data.home.top.line2En || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, top: { ...data.home.top, line2En: e.target.value } } })}
                placeholder="Line 2 EN"
              />
            </div>
            <button
              className="button"
              disabled={saving}
              onClick={() => {
                queue("mp_top_photo_line1_ar", data.home.top.line1Ar || "");
                queue("mp_top_photo_line1_en", data.home.top.line1En || "");
                queue("mp_top_photo_line2_ar", data.home.top.line2Ar || "");
                queue("mp_top_photo_line2_en", data.home.top.line2En || "");
                save([...updates]);
              }}
            >
              حفظ النصوص
            </button>
          </div>
        )}

        {activeSection === "contact" && (
          <div className="admin-card">
            <h3>تواصل معنا</h3>
            <div className="admin-grid">
              <textarea
                className="admin-input"
                value={data.home.contact.textAr || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, contact: { ...data.home.contact, textAr: e.target.value } } })}
                placeholder="نص عربي"
              />
              <textarea
                className="admin-input"
                value={data.home.contact.textEn || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, contact: { ...data.home.contact, textEn: e.target.value } } })}
                placeholder="Text EN"
              />
              <input
                className="admin-input"
                value={data.home.contact.logo1NameAr || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, contact: { ...data.home.contact, logo1NameAr: e.target.value } } })}
                placeholder="اسم الأيقونة 1 عربي"
              />
              <input
                className="admin-input"
                value={data.home.contact.logo1NameEn || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, contact: { ...data.home.contact, logo1NameEn: e.target.value } } })}
                placeholder="Icon 1 EN"
              />
              <input
                className="admin-input"
                value={data.home.contact.logo2NameAr || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, contact: { ...data.home.contact, logo2NameAr: e.target.value } } })}
                placeholder="اسم الأيقونة 2 عربي"
              />
              <input
                className="admin-input"
                value={data.home.contact.logo2NameEn || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, contact: { ...data.home.contact, logo2NameEn: e.target.value } } })}
                placeholder="Icon 2 EN"
              />
            </div>
            <div className="admin-grid" style={{ marginTop: 12 }}>
              <div>
                <div style={{ marginBottom: 6 }}>أيقونة 1</div>
                <input
                  type="file"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const path = await uploadFile(e.target.files[0]);
                      setData({ ...data, home: { ...data.home, contact: { ...data.home.contact, logo1: path } } });
                    }
                  }}
                />
                {data.home.contact.logo1 && (
                  <div className="admin-image">
                    <img src={data.home.contact.logo1} alt="Logo 1" />
                  </div>
                )}
              </div>
              <div>
                <div style={{ marginBottom: 6 }}>أيقونة 2</div>
                <input
                  type="file"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const path = await uploadFile(e.target.files[0]);
                      setData({ ...data, home: { ...data.home, contact: { ...data.home.contact, logo2: path } } });
                    }
                  }}
                />
                {data.home.contact.logo2 && (
                  <div className="admin-image">
                    <img src={data.home.contact.logo2} alt="Logo 2" />
                  </div>
                )}
              </div>
            </div>
            <button
              className="button"
              disabled={saving}
              onClick={() => {
                queue("cu_text_ar", data.home.contact.textAr || "");
                queue("cu_text_en", data.home.contact.textEn || "");
                queue("cu_logo1", data.home.contact.logo1 || "");
                queue("cu_logo1_name_ar", data.home.contact.logo1NameAr || "");
                queue("cu_logo1_name_en", data.home.contact.logo1NameEn || "");
                queue("cu_logo2", data.home.contact.logo2 || "");
                queue("cu_logo2_name_ar", data.home.contact.logo2NameAr || "");
                queue("cu_logo2_name_en", data.home.contact.logo2NameEn || "");
                save([...updates]);
              }}
            >
              حفظ القسم
            </button>
          </div>
        )}

        {activeSection === "journey" && (
          <div className="admin-card">
            <h3>رحلة رسم الابتسامة</h3>
            <div className="admin-grid">
              {Array.from({ length: 5 }).map((_, idx) => {
                const i = idx + 1;
                const photo = data.home.journey[`photo${i}`];
                const textAr = data.home.journey[`photo${i}TextAr`];
                const textEn = data.home.journey[`photo${i}TextEn`];
                return (
                  <div key={i} className="admin-card" style={{ padding: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>الصورة {i}</div>
                    <input
                      type="file"
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const path = await uploadFile(e.target.files[0]);
                          setData({
                            ...data,
                            home: {
                              ...data.home,
                              journey: { ...data.home.journey, [`photo${i}`]: path }
                            }
                          });
                        }
                      }}
                    />
                    {photo && (
                      <div className="admin-image">
                        <img src={photo} alt={`Journey ${i}`} />
                      </div>
                    )}
                    <input
                      className="admin-input"
                      value={textAr || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          home: {
                            ...data.home,
                            journey: { ...data.home.journey, [`photo${i}TextAr`]: e.target.value }
                          }
                        })
                      }
                      placeholder="نص عربي"
                    />
                    <input
                      className="admin-input"
                      value={textEn || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          home: {
                            ...data.home,
                            journey: { ...data.home.journey, [`photo${i}TextEn`]: e.target.value }
                          }
                        })
                      }
                      placeholder="Text EN"
                    />
                  </div>
                );
              })}
            </div>
            <button
              className="button"
              disabled={saving}
              onClick={() => {
                queue("dsj_photo1", data.home.journey.photo1 || "");
                queue("dsj_photo1_text_ar", data.home.journey.photo1TextAr || "");
                queue("dsj_photo1_text_en", data.home.journey.photo1TextEn || "");
                queue("dsj_photo2", data.home.journey.photo2 || "");
                queue("dsj_photo2_text_ar", data.home.journey.photo2TextAr || "");
                queue("dsj_photo2_text_en", data.home.journey.photo2TextEn || "");
                queue("dsj_photo3", data.home.journey.photo3 || "");
                queue("dsj_photo3_text_ar", data.home.journey.photo3TextAr || "");
                queue("dsj_photo3_text_en", data.home.journey.photo3TextEn || "");
                queue("dsj_photo4", data.home.journey.photo4 || "");
                queue("dsj_photo4_text_ar", data.home.journey.photo4TextAr || "");
                queue("dsj_photo4_text_en", data.home.journey.photo4TextEn || "");
                queue("dsj_photo5", data.home.journey.photo5 || "");
                queue("dsj_photo5_text_ar", data.home.journey.photo5TextAr || "");
                queue("dsj_photo5_text_en", data.home.journey.photo5TextEn || "");
                save([...updates]);
              }}
            >
              حفظ الرحلة
            </button>
          </div>
        )}

        {activeSection === "dontLeave" && (
          <div className="admin-card">
            <h3>لا تغادر</h3>
            <div className="admin-grid">
              <textarea
                className="admin-input"
                value={data.home.dontLeave.textAr || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, dontLeave: { ...data.home.dontLeave, textAr: e.target.value } } })}
                placeholder="نص عربي"
              />
              <textarea
                className="admin-input"
                value={data.home.dontLeave.textEn || ""}
                onChange={(e) => setData({ ...data, home: { ...data.home, dontLeave: { ...data.home.dontLeave, textEn: e.target.value } } })}
                placeholder="Text EN"
              />
              <div>
                <div style={{ marginBottom: 6 }}>الصورة الجانبية</div>
                <input
                  type="file"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const path = await uploadFile(e.target.files[0]);
                      setData({ ...data, home: { ...data.home, dontLeave: { ...data.home.dontLeave, sidePhoto: path } } });
                    }
                  }}
                />
                {data.home.dontLeave.sidePhoto && (
                  <div className="admin-image">
                    <img src={data.home.dontLeave.sidePhoto} alt="Side" />
                  </div>
                )}
              </div>
            </div>
            <button
              className="button"
              disabled={saving}
              onClick={() => {
                queue("dl_side_photo", data.home.dontLeave.sidePhoto || "");
                queue("dl_text_ar", data.home.dontLeave.textAr || "");
                queue("dl_text_en", data.home.dontLeave.textEn || "");
                save([...updates]);
              }}
            >
              حفظ القسم
            </button>
          </div>
        )}

        {activeSection === "smiles" && (
          <div className="admin-card">
            <h3>ابتسامات لا تنسى</h3>
            <div className="admin-grid">
              {data.smilesAdmin.map((item, idx) => (
                <div key={item.group || idx} className="admin-card" style={{ padding: 12 }}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>مجموعة {idx + 1}</div>
                  <textarea
                    className="admin-input"
                    value={item.textAr || ""}
                    onChange={(e) => {
                      const updated = [...data.smilesAdmin];
                      updated[idx] = { ...item, textAr: e.target.value };
                      setData({ ...data, smilesAdmin: updated });
                    }}
                    placeholder="نص عربي"
                  />
                  <textarea
                    className="admin-input"
                    value={item.textEn || ""}
                    onChange={(e) => {
                      const updated = [...data.smilesAdmin];
                      updated[idx] = { ...item, textEn: e.target.value };
                      setData({ ...data, smilesAdmin: updated });
                    }}
                    placeholder="Text EN"
                  />
                  <div style={{ marginTop: 8 }}>
                    <div>صورة قبل</div>
                    <input
                      type="file"
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const path = await uploadFile(e.target.files[0]);
                          const updated = [...data.smilesAdmin];
                          updated[idx] = { ...item, before: path };
                          setData({ ...data, smilesAdmin: updated });
                        }
                      }}
                    />
                    {item.before && (
                      <div className="admin-image">
                        <img src={item.before} alt="Before" />
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div>صورة بعد</div>
                    <input
                      type="file"
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const path = await uploadFile(e.target.files[0]);
                          const updated = [...data.smilesAdmin];
                          updated[idx] = { ...item, after: path };
                          setData({ ...data, smilesAdmin: updated });
                        }
                      }}
                    />
                    {item.after && (
                      <div className="admin-image">
                        <img src={item.after} alt="After" />
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      className="button"
                      onClick={() => {
                        const updatesBatch = [] as { internalName: string; value: string }[];
                        if (item.textArInternal) updatesBatch.push({ internalName: item.textArInternal, value: item.textAr || "" });
                        if (item.textEnInternal) updatesBatch.push({ internalName: item.textEnInternal, value: item.textEn || "" });
                        if (item.beforeInternal) updatesBatch.push({ internalName: item.beforeInternal, value: item.before || "" });
                        if (item.afterInternal) updatesBatch.push({ internalName: item.afterInternal, value: item.after || "" });
                        save(updatesBatch);
                      }}
                    >
                      حفظ المجموعة
                    </button>
                    {item.group && (
                      <button
                        className="button"
                        style={{ background: "#b42318" }}
                        onClick={async () => {
                          await fetch("/api/admin/content", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ deleteGroup: item.group })
                          });
                          load();
                        }}
                      >
                        حذف
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="button"
              onClick={async () => {
                await fetch("/api/admin/content", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    createGroup: {
                      textAr: "نص جديد",
                      textEn: "New text",
                      before: "",
                      after: ""
                    }
                  })
                });
                load();
              }}
            >
              إضافة مجموعة جديدة
            </button>
          </div>
        )}

        {activeSection === "messages" && (
          <div className="admin-card">
            <h3>الرسائل</h3>
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "right", padding: 8 }}>الاسم</th>
                    <th style={{ textAlign: "right", padding: 8 }}>الهاتف</th>
                    <th style={{ textAlign: "right", padding: 8 }}>البريد</th>
                    <th style={{ textAlign: "right", padding: 8 }}>التاريخ</th>
                    <th style={{ textAlign: "right", padding: 8 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {msgs.map((m) => (
                    <tr key={m.eid}>
                      <td style={{ padding: 8 }}>{m.cname}</td>
                      <td style={{ padding: 8 }}>{m.phone}</td>
                      <td style={{ padding: 8 }}>{m.email}</td>
                      <td style={{ padding: 8 }}>{m.dt_create}</td>
                      <td style={{ padding: 8 }}>
                        <button
                          className="button"
                          style={{ background: "#b42318" }}
                          onClick={async () => {
                            await fetch("/api/admin/messages", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ deleteId: m.eid })
                            });
                            load();
                          }}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!msgs.length && (
                    <tr>
                      <td colSpan={5} style={{ padding: 8, color: "#6b7280" }}>
                        لا توجد رسائل
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "subscribers" && (
          <div className="admin-card">
            <h3>قائمة المشتركين</h3>
            <div className="admin-grid" style={{ marginBottom: 12 }}>
              <input
                className="admin-input"
                placeholder="أضف بريدًا إلكترونيًا"
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    const email = (e.target as HTMLInputElement).value.trim();
                    if (!email) return;
                    await fetch("/api/admin/subscribers", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ addEmail: email })
                    });
                    (e.target as HTMLInputElement).value = "";
                    load();
                  }
                }}
              />
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "right", padding: 8 }}>البريد</th>
                    <th style={{ textAlign: "right", padding: 8 }}>التاريخ</th>
                    <th style={{ textAlign: "right", padding: 8 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((s) => (
                    <tr key={s.eid}>
                      <td style={{ padding: 8 }}>{s.email}</td>
                      <td style={{ padding: 8 }}>{s.dt_create}</td>
                      <td style={{ padding: 8 }}>
                        <button
                          className="button"
                          style={{ background: "#b42318" }}
                          onClick={async () => {
                            await fetch("/api/admin/subscribers", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ deleteId: s.eid })
                            });
                            load();
                          }}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!subs.length && (
                    <tr>
                      <td colSpan={3} style={{ padding: 8, color: "#6b7280" }}>
                        لا توجد اشتراكات
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <aside className="admin-sidebar">
        <div>
          <div className="admin-brand">Dahhan Admin</div>
          <p style={{ fontSize: 12, opacity: 0.7 }}>Modern CMS</p>
        </div>
        <nav className="admin-nav">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              className={`admin-nav-button${activeSection === section.key ? " active" : ""}`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <button className="button admin-logout" onClick={handleLogout}>
          تسجيل الخروج
        </button>
      </aside>
    </div>
  );
}

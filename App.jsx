import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { appsScriptConfig, weddingConfig } from './config';

const initialFormData = {
  attendance: '',
  name: '',
  furigana: '',
  romaji: '',
  allergies: '',
  allergyDetails: '',
  other: '',
  message: '',
};

function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-reveal]')];
    if (!nodes.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function OpeningSequence({ onDone }) {
  const [phase, setPhase] = useState('intro');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = [];

    if (reduced) {
      setPhase('reduced');
      timers.push(window.setTimeout(onDone, 460));
    } else {
      timers.push(window.setTimeout(() => setPhase('card'), 280));
      timers.push(window.setTimeout(() => setPhase('open'), 1220));
      timers.push(window.setTimeout(() => setPhase('story'), 1760));
      timers.push(window.setTimeout(() => setPhase('leave'), 2240));
      timers.push(window.setTimeout(onDone, 2780));
      // Safety fallback: never trap a guest in the opening animation.
      timers.push(window.setTimeout(onDone, 3500));
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onDone]);

  return (
    <div className={`opening opening--${phase}`} aria-hidden="true">
      <div className="opening-backdrop" />
      <div className="opening-light-leak" />

      <div className="film-frame">
        <span className="film-mark film-mark--top-left">K &amp; K</span>
        <span className="film-mark film-mark--top-center">FRAME 01</span>
        <span className="film-mark film-mark--top-right">NOV 14</span>
        <span className="film-mark film-mark--left">TOKYO</span>
      </div>

      <div className="invitation-card" aria-hidden="true">
        <div className="invitation-panel invitation-panel--left" />
        <div className="invitation-panel invitation-panel--right" />
        <div className="invitation-card-border" />
        <div className="invitation-card-copy">
          <span>A PRIVATE INVITATION</span>
          <strong>
            {weddingConfig.couple.groom.firstName}
            <em>&amp;</em>
            {weddingConfig.couple.bride.firstName}
          </strong>
          <i />
          <small>2026.11.14</small>
        </div>
      </div>

      <p className="opening-story">物語がはじまります</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero-image"
        src={weddingConfig.images.hero}
        alt="新郎新婦のウェディングフォト"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-overlay" />
      <div className="hero-topline">THE WEDDING OF</div>
      <div className="hero-copy">
        <h1>
          <span>{weddingConfig.couple.groom.firstName}</span>
          <em>&amp;</em>
          <span>{weddingConfig.couple.bride.firstName}</span>
        </h1>
        <div className="hero-meta">
          <span>14 NOVEMBER 2026</span>
          <span>TOKYO</span>
        </div>
      </div>
      <a className="hero-scroll" href="#invitation" aria-label="招待状本文へ移動">
        <span>SCROLL TO BEGIN</span>
        <ArrowDown size={14} strokeWidth={1.3} />
      </a>
    </section>
  );
}

function Invitation() {
  return (
    <section className="paper-section invitation" id="invitation">
      <div className="section-index" data-reveal>
        <span>01</span>
        <span>THE INVITATION</span>
      </div>

      <div className="invitation-copy" data-reveal>
        <p>
          私たちはこのたび<br />
          結婚式を挙げることとなりました
        </p>
        <p>
          今日まで大切に見守ってくださった皆さまと<br />
          心ほどけるひとときを<br className="mobile-only" />過ごせましたら幸いです
        </p>
        <p>
          当日 お会いできますことを<br />
          心より楽しみにしております
        </p>
      </div>

      <div className="signature" data-reveal>
        <span>{weddingConfig.couple.groom.fullName}</span>
        <i />
        <span>{weddingConfig.couple.bride.fullName}</span>
      </div>
    </section>
  );
}

function WeddingDetails() {
  return (
    <section className="paper-section details">
      <div className="section-index" data-reveal>
        <span>02</span>
        <span>THE WEDDING</span>
      </div>

      <div className="date-editorial" data-reveal>
        <p>{weddingConfig.date.englishDay},</p>
        <h2>{weddingConfig.date.englishMonth}</h2>
        <div className="date-number-row">
          <strong>{weddingConfig.date.dayNumber}</strong>
          <span>{weddingConfig.date.year}</span>
        </div>
        <p className="date-japanese">{weddingConfig.date.japanese}</p>
      </div>

      <div className="schedule" data-reveal>
        {weddingConfig.schedule.map((item, index) => (
          <div className="schedule-row" key={`${item.time}-${item.title}`}>
            <span className="schedule-number">0{index + 1}</span>
            <time>{item.time}</time>
            <div>
              <h3>{item.title}</h3>
              {item.note && <p>{item.note}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="venue-block" data-reveal>
        <span className="eyebrow">VENUE</span>
        <h3>{weddingConfig.venue.name}</h3>
        <p className="venue-address">
          {weddingConfig.venue.address.split('\n').map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
          {weddingConfig.venue.access}
        </p>
        <a href={weddingConfig.venue.mapUrl} target="_blank" rel="noreferrer" className="text-link">
          VIEW MAP <ExternalLink size={13} strokeWidth={1.3} />
        </a>
      </div>
    </section>
  );
}

function CinematicBreak() {
  return (
    <section className="cinematic-break">
      <img
        src={weddingConfig.images.story}
        alt="カヌーで寄り添う新郎新婦"
        loading="lazy"
        decoding="async"
      />
      <div className="cinematic-overlay" />
      <div className="cinematic-copy" data-reveal>
        <span>NOVEMBER 14</span>
        <span>TOKYO</span>
      </div>
    </section>
  );
}

function FinalStill() {
  return (
    <section className="final-still" aria-label="新郎新婦のウェディングフォト">
      <img
        src={weddingConfig.images.ending}
        alt="ボートに座る新郎新婦"
        loading="lazy"
        decoding="async"
      />
      <div className="final-still-overlay" />
    </section>
  );
}

function Choice({ active, children, onClick }) {
  return (
    <button type="button" className={`choice ${active ? 'is-active' : ''}`} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label>
        <span className="field-label">
          {label}
          {required && <small>必須</small>}
        </span>
        {children}
      </label>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

function RSVP() {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState('form');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  const isAttend = formData.attendance === 'ご出席';
  const isDecline = formData.attendance === 'ご欠席';

  const update = (key, value) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!formData.attendance) next.attendance = 'ご出席またはご欠席をお選びください';
    if (!formData.name.trim()) next.name = 'お名前をご入力ください';
    if (!formData.furigana.trim()) next.furigana = 'ふりがなをご入力ください';
    if (!formData.romaji.trim()) next.romaji = 'ローマ字表記をご入力ください';

    if (isAttend) {
      if (!formData.allergies) next.allergies = 'アレルギーの有無をお選びください';
      if (formData.allergies === 'あり' && !formData.allergyDetails.trim()) {
        next.allergyDetails = '対象となる食材をご入力ください';
      }
    }

    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => {
        document.querySelector('.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return false;
    }
    return true;
  };

  const review = () => {
    if (!validate()) return;
    setStep('confirm');
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitResponse = async () => {
    if (!appsScriptConfig.endpoint) {
      setSubmitError('回答送信先の設定が完了していません。');
      return;
    }

    if (isSubmitting) return;

    setSubmitError('');
    setIsSubmitting(true);

    const params = new URLSearchParams();
    params.set('attendance', formData.attendance);
    params.set('name', formData.name.trim());
    params.set('furigana', formData.furigana.trim());
    params.set('romaji', formData.romaji.trim());

    if (isAttend) {
      params.set('allergies', formData.allergies);
      if (formData.allergies === 'あり') {
        params.set('allergyDetails', formData.allergyDetails.trim());
      }
      if (formData.other.trim()) {
        params.set('other', formData.other.trim());
      }
    }

    if (isDecline && formData.message.trim()) {
      params.set('message', formData.message.trim());
    }

    try {
      // Apps Script Web App は別オリジンのため、no-cors の simple POST で送信する。
      // レスポンス本文は読めないが、リクエスト自体は doPost(e) に届く。
      await fetch(appsScriptConfig.endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });

      setStep('thanks');
      setFormData(initialFormData);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      console.error('RSVP submit failed:', error);
      setSubmitError('送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };


  const confirmationRows = isAttend
    ? [
        ['ご出欠', formData.attendance],
        ['お名前', formData.name],
        ['ふりがな', formData.furigana],
        ['ローマ字', formData.romaji],
        ['食物アレルギー', formData.allergies],
        ...(formData.allergies === 'あり' ? [['アレルギーの詳細', formData.allergyDetails]] : []),
        ...(formData.other ? [['その他ご連絡事項', formData.other]] : []),
      ]
    : [
        ['ご出欠', formData.attendance],
        ['お名前', formData.name],
        ['ふりがな', formData.furigana],
        ['ローマ字', formData.romaji],
        ...(formData.message ? [['メッセージ', formData.message]] : []),
      ];

  return (
    <>
      <section className="rsvp" ref={sectionRef} id="rsvp">
      <div className="rsvp-shell">
        {step === 'thanks' ? (
          <div className="thanks" data-reveal>
            <span className="eyebrow">R.S.V.P.</span>
            <h2>THANK YOU</h2>
            <p>ご回答ありがとうございました</p>
            <div className="thanks-rule" />
            <p className="thanks-small">
              回答内容に変更がございましたら<br />
              新郎新婦まで直接ご連絡ください
            </p>
            <span className="thanks-date">14.11.2026 · TOKYO</span>
          </div>
        ) : (
          <>
            <div className="rsvp-heading" data-reveal>
              <span className="section-no">03</span>
              <p>R.S.V.P.</p>
              <h2>Will you join us?</h2>
              <span className="deadline">{weddingConfig.replyDeadline}</span>
            </div>

            {step === 'form' && (
              <div className="rsvp-form" data-reveal>
                <div className={`attendance-block ${errors.attendance ? 'has-error' : ''}`}>
                  <span className="field-label">ご出欠 <small>必須</small></span>
                  <div className="choice-row">
                    <Choice active={isAttend} onClick={() => update('attendance', 'ご出席')}>
                      ご出席
                    </Choice>
                    <Choice active={isDecline} onClick={() => update('attendance', 'ご欠席')}>
                      ご欠席
                    </Choice>
                  </div>
                  {errors.attendance && <p className="field-error">{errors.attendance}</p>}
                </div>

                {formData.attendance && (
                  <div className="form-fields-enter">
                    <Field label="お名前" required error={errors.name}>
                      <input
                        value={formData.name}
                        onChange={(event) => update('name', event.target.value)}
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="ふりがな" required error={errors.furigana}>
                      <input value={formData.furigana} onChange={(event) => update('furigana', event.target.value)} autoComplete="off" />
                    </Field>

                    <Field label="ローマ字表記" required error={errors.romaji}>
                      <input
                        value={formData.romaji}
                        onChange={(event) => update('romaji', event.target.value)}
                        autoCapitalize="words"
                        autoComplete="off"
                        placeholder="例：KOSUKE TAKAHASHI"
                      />
                    </Field>

                    {isAttend && (
                      <>
                        <div className={`form-field ${errors.allergies ? 'has-error' : ''}`}>
                          <span className="field-label">食物アレルギー <small>必須</small></span>
                          <div className="choice-row choice-row--compact">
                            <Choice active={formData.allergies === 'なし'} onClick={() => update('allergies', 'なし')}>
                              なし
                            </Choice>
                            <Choice active={formData.allergies === 'あり'} onClick={() => update('allergies', 'あり')}>
                              あり
                            </Choice>
                          </div>
                          {errors.allergies && <p className="field-error">{errors.allergies}</p>}
                        </div>

                        {formData.allergies === 'あり' && (
                          <Field label="アレルギーの詳細" required error={errors.allergyDetails}>
                            <textarea
                              rows="2"
                              value={formData.allergyDetails}
                              onChange={(event) => update('allergyDetails', event.target.value)}
                              placeholder="対象となる食材をご記入ください"
                            />
                          </Field>
                        )}

                        <Field label="その他ご連絡事項（任意）">
                          <textarea rows="2" value={formData.other} onChange={(event) => update('other', event.target.value)} />
                        </Field>
                      </>
                    )}

                    {isDecline && (
                      <Field label="新郎新婦へのメッセージ（任意）">
                        <textarea rows="3" value={formData.message} onChange={(event) => update('message', event.target.value)} />
                      </Field>
                    )}

                    <button type="button" className="primary-action" onClick={review}>
                      <span>入力内容を確認する</span>
                      <ArrowRight size={16} strokeWidth={1.2} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 'confirm' && (
              <div className="confirmation" data-reveal>
                <span className="eyebrow">YOUR RESPONSE</span>
                <div className="confirmation-list">
                  {confirmationRows.map(([label, value]) => (
                    <div className="confirmation-row" key={label}>
                      <span>{label}</span>
                      <p>{value || '—'}</p>
                    </div>
                  ))}
                </div>

                {submitError && <p className="submit-error">{submitError}</p>}

                <div className="google-native-form">
                  <div className="confirmation-actions">
                    <button type="button" className="secondary-action" onClick={() => setStep('form')} disabled={isSubmitting}>
                      <ArrowLeft size={15} strokeWidth={1.2} />
                      <span>修正する</span>
                    </button>
                    <button type="button" className="primary-action" onClick={submitResponse} disabled={isSubmitting}>
                      <span>{isSubmitting ? '送信中…' : 'この内容で回答する'}</span>
                      {!isSubmitting && <ArrowRight size={16} strokeWidth={1.2} />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer>
      <span>KOSUKE &amp; KOKORO</span>
      <span>14 NOVEMBER 2026</span>
    </footer>
  );
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  useReveal();

  useEffect(() => {
    document.body.classList.toggle('intro-lock', !introComplete);
    return () => document.body.classList.remove('intro-lock');
  }, [introComplete]);

  return (
    <>
      {!introComplete && <OpeningSequence onDone={() => setIntroComplete(true)} />}
      <main className={introComplete ? 'site is-ready' : 'site'}>
        <Hero />
        <Invitation />
        <WeddingDetails />
        <CinematicBreak />
        <RSVP />
        <FinalStill />
      </main>
      <Footer />
      <div className="film-grain" aria-hidden="true" />
    </>
  );
}

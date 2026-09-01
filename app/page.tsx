'use client';

import { useEffect, useState } from 'react';
import catalog from '../data/experiments.json';

type Experiment = {
  id: string;
  title: string;
  category: string;
  description: string;
  path: string;
  source: string;
  accent: string;
};

const experiments = catalog as Experiment[];

export default function Home() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = experiments.findIndex((experiment) => experiment.id === openId);
  const openExperiment = openIndex >= 0 ? experiments[openIndex] : null;

  const openAt = (index: number) => {
    const next = experiments[(index + experiments.length) % experiments.length];
    setOpenId(next.id);
    window.history.replaceState(null, '', `#${next.id}`);
  };

  const close = () => {
    setOpenId(null);
    window.history.replaceState(null, '', window.location.pathname);
  };

  useEffect(() => {
    const initial = window.location.hash.slice(1);
    if (experiments.some((experiment) => experiment.id === initial)) setOpenId(initial);
  }, []);

  useEffect(() => {
    if (!openExperiment) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') openAt(openIndex + 1);
      if (event.key === 'ArrowLeft') openAt(openIndex - 1);
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openExperiment, openIndex]);

  return (
    <main className="gallery-shell">
      <header className="gallery-header">
        <a className="wordmark" href="#top" aria-label="Toolcraft Gallery home">
          <span>TC</span><span>—01</span>
        </a>
        <p>Interactive studies by Kevin Rufino</p>
        <span className="gallery-count">Gallery / {String(experiments.length).padStart(2, '0')}</span>
      </header>

      <section className="gallery-title" id="top">
        <p className="kicker">Toolcraft archive / 2026—ongoing</p>
        <h1>Small tools.<br /><span>Big rabbit holes.</span></h1>
        <p className="gallery-deck">A collection of playable experiments in motion, image, type, and interaction.</p>
      </section>

      <section className="card-gallery" aria-label="Toolcraft experiments">
        {experiments.map((experiment, index) => (
          <article className="experiment-card" key={experiment.id} style={{ '--card-accent': experiment.accent } as React.CSSProperties}>
            <div className="card-registration" aria-hidden="true" />
            <div className="card-preview">
              <iframe
                src={experiment.path}
                title={`${experiment.title} preview`}
                loading={index > 1 ? 'lazy' : 'eager'}
                tabIndex={-1}
                aria-hidden="true"
              />
              <button className="card-launch" type="button" onClick={() => openAt(index)} aria-label={`Open ${experiment.title}`}>
                <span>Explore</span>
                <span className="launch-icon" aria-hidden="true">↗</span>
              </button>
              <span className="card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <footer className="card-copy">
              <div>
                <p>{experiment.category}</p>
                <h2>{experiment.title}</h2>
              </div>
              <p className="card-description">{experiment.description}</p>
              <a href={experiment.source} target="_blank" rel="noreferrer" aria-label={`View ${experiment.title} source on GitHub`}>
                Source <span aria-hidden="true">↗</span>
              </a>
            </footer>
          </article>
        ))}
      </section>

      <footer className="site-footer">
        <span>Five experiments. Always in progress.</span>
        <a href="#top">Back to top ↑</a>
      </footer>

      {openExperiment && (
        <section className="experiment-modal" role="dialog" aria-modal="true" aria-label={`${openExperiment.title} experiment`}>
          <header className="modal-bar">
            <div>
              <span>{String(openIndex + 1).padStart(2, '0')} / {String(experiments.length).padStart(2, '0')}</span>
              <strong>{openExperiment.title}</strong>
            </div>
            <nav aria-label="Experiment navigation">
              <button type="button" onClick={() => openAt(openIndex - 1)} aria-label="Previous experiment">←</button>
              <button type="button" onClick={() => openAt(openIndex + 1)} aria-label="Next experiment">→</button>
              <a href={openExperiment.path} target="_blank" rel="noreferrer">New tab ↗</a>
              <button className="modal-close" type="button" onClick={close} aria-label="Close experiment">×</button>
            </nav>
          </header>
          <iframe
            key={openExperiment.id}
            className="modal-frame"
            src={openExperiment.path}
            title={openExperiment.title}
            allow="clipboard-write; fullscreen"
          />
        </section>
      )}
    </main>
  );
}

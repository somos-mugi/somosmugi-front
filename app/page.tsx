const services = [
  ["Estrategia", "Ordenamos lo que hacés para que tu propuesta llegue con claridad a las personas indicadas."],
  ["Identidad", "Diseñamos sistemas visuales con carácter, consistencia y espacio para crecer."],
  ["Digital", "Creamos experiencias web ágiles, intuitivas y tan lindas como funcionales."],
];

const Arrow = () => <span aria-hidden="true" className="arrow">↗</span>;

export default function Home() {
  return (
    <main>
      <section className="hero" id="inicio">
        <nav className="nav wrap" aria-label="Navegación principal">
          <a className="brand" href="#inicio" aria-label="SomosMugi, inicio">somos<span>mugi</span><i /></a>
          <div className="nav-links">
            <a href="#que-hacemos">Qué hacemos</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
          </div>
          <a className="nav-cta" href="#contacto">Hablemos <Arrow /></a>
        </nav>

        <div className="hero-copy wrap">
          <p className="eyebrow">ESTUDIO CREATIVO · BUENOS AIRES</p>
          <h1>Las ideas<br /><em>se hacen</em><br />presentes.</h1>
          <div className="hero-bottom">
            <p>Ayudamos a proyectos con propósito a encontrar su voz, su forma y su lugar en el mundo.</p>
            <a className="round-link" href="#que-hacemos" aria-label="Descubrir SomosMugi">↓</a>
          </div>
        </div>
        <div className="hero-orb" aria-hidden="true"><span /></div>
        <div className="cloud cloud-a" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="cloud cloud-b" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="scroll-note">SCROLL PARA EXPLORAR</p>
      </section>

      <section className="intro wrap" id="nosotros">
        <p className="section-label">(01) SOMOS MUGI</p>
        <div>
          <h2>Hacemos que las cosas que te importan <em>se noten.</em></h2>
          <p className="lead">Somos un estudio pequeño, curioso y multidisciplinario. Nos gustan las conversaciones honestas, las grandes preguntas y los detalles que hacen la diferencia.</p>
          <a className="text-link" href="#contacto">Conocenos un poco más <Arrow /></a>
        </div>
      </section>

      <section className="services" id="que-hacemos">
        <div className="wrap">
          <p className="section-label">(02) QUÉ HACEMOS</p>
          <div className="services-head"><h2>Ideas que toman<br /><em>buena forma.</em></h2><p>Un proceso cercano para crear marcas que no pasan desapercibidas.</p></div>
          <div className="service-list">
            {services.map(([name, text], index) => (
              <article className="service" key={name}>
                <span className="service-no">0{index + 1}</span>
                <h3>{name}</h3>
                <p>{text}</p>
                <Arrow />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto wrap">
        <div className="shape shape-one" aria-hidden="true" />
        <p className="section-label">(03) NUESTRA FORMA</p>
        <p className="manifesto-text">No creemos en las fórmulas. Creemos en <em>escuchar</em>, pensar y hacer con intención.</p>
        <div className="shape shape-two" aria-hidden="true" />
        <div className="cloud cloud-c" aria-hidden="true"><i /><i /><i /><i /></div>
      </section>

      <section className="contact" id="contacto">
        <div className="wrap contact-grid">
          <p className="section-label">(04) CONTACTO</p>
          <div>
            <h2>¿Hacemos<br /><em>algo lindo?</em></h2>
            <a className="contact-email" href="mailto:holamugi@gmail.com">holamugi@gmail.com <Arrow /></a>
          </div>
        </div>
        <footer className="wrap footer">
          <span>© 2026 SomosMugi</span>
          <span>Hecho con calma en Buenos Aires</span>
          <a href="#inicio">Volver arriba ↑</a>
        </footer>
      </section>
    </main>
  );
}

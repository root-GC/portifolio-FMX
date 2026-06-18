import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './global.css';

// ---------- Componentes Internos ----------

const Navbar: React.FC = () => (
  <nav className="navbar">
    <div className="navbar-inner">
      <div className="navbar-brand">
        <img
          alt="Logo FMX"
          className="navbar-logo"
          src="/assets/fmx-logo.png"
        />
        <span className="navbar-title">Portifólio</span>
      </div>
      <div className="navbar-links">
        <a className="nav-link nav-link-active" href="#">Início</a>
        <a className="nav-link" href="#problema">Sobre</a>
        <a className="nav-link" href="#solucao">Solução</a>
        <a className="nav-link" href="#telas">Telas</a>
        <a className="nav-link" href="#impacto">Impacto</a>
      </div>
    </div>
  </nav>
);

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const baseGeo = new THREE.CylinderGeometry(1, 1.2, 0.5, 16);
    const bodyGeo = new THREE.CylinderGeometry(0.6, 0.8, 3, 16);
    const headGeo = new THREE.SphereGeometry(0.8, 16, 12);

    const matPrimary = new THREE.MeshStandardMaterial({ color: 0xC32428, roughness: 0.3, metalness: 0.1 });
    const matSecondary = new THREE.MeshStandardMaterial({ color: 0x6C4C23, roughness: 0.3, metalness: 0.1 });

    const pieces: { mesh: THREE.Group; speed: number; rotSpeed: number; offset: number }[] = [];
    const pieceCount = 6;

    for (let i = 0; i < pieceCount; i++) {
      const piece = new THREE.Group();
      const base = new THREE.Mesh(baseGeo, i % 2 === 0 ? matPrimary : matSecondary);
      const body = new THREE.Mesh(bodyGeo, i % 2 === 0 ? matPrimary : matSecondary);
      const head = new THREE.Mesh(headGeo, i % 2 === 0 ? matPrimary : matSecondary);
      body.position.y = 1.75;
      head.position.y = 3.5;
      piece.add(base);
      piece.add(body);
      piece.add(head);
      piece.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 10);
      piece.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const speed = 0.005 + Math.random() * 0.01;
      const rotSpeed = 0.002 + Math.random() * 0.005;
      pieces.push({ mesh: piece, speed, rotSpeed, offset: Math.random() * 100 });
      scene.add(piece);
    }

    function resize() {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    }

    function animate(time: number) {
      requestAnimationFrame(animate);
      resize();
      const t = time * 0.001;
      pieces.forEach(p => {
        p.mesh.position.y += Math.sin(t + p.offset) * 0.02;
        p.mesh.rotation.y += p.rotSpeed;
        p.mesh.rotation.x += p.rotSpeed * 0.5;
      });
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
      <canvas ref={canvasRef} className="opacity-30" id="hero-canvas" />
      <div className="container relative hero-grid" style={{ zIndex: 10 }}>
        <div className="space-y-md">
          <div className="badge">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified</span>
            <span>Inovação Nacional</span>
          </div>
          <h1 className="h1-mobile h1-responsive leading-tight">
            SISTEMA INTEGRADO DE FILIAÇÃO E CONTROLO DE QUOTAS
          </h1>
          <p className="body-lg text-on-surface-variant max-w-xl">
            Modernizando a gestão do xadrez federado em Moçambique com transparência, eficiência e dados centralizados para o crescimento estratégico do desporto.
          </p>
          <div className="flex flex-wrap gap-md" style={{ paddingTop: '8px' }}>
            <button className="btn-primary">Ver Documentação</button>
            <a
              className="btn-glass"
              href="https://github.com/seu-usuario/seu-repositorio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined">code</span>
              Repositório
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute" style={{ inset: '-16px', background: 'rgba(195,36,40,0.05)', filter: 'blur(64px)', borderRadius: '9999px', opacity: 0.5 }}></div>
          <img
            className="w-full h-auto rounded-2xl shadow-2xl relative border border-white-20"
            src="/assets/backgroud-side.png"
            alt="Dashboard do sistema FMX"
          />
        </div>
      </div>
    </section>
  );
};

const ProblemSection: React.FC = () => {
  const items = [
    { icon: 'database_off', title: 'Falta de Dados', text: 'Ausência de uma base de dados nacional centralizada e fiável.' },
    { icon: 'edit_document', title: 'Gestão Manual', text: 'Processos de filiação lentos, baseados em papel e Excel.' },
    { icon: 'payments', title: 'Controlo de Quotas', text: 'Dificuldade em monitorizar pagamentos e regularidade financeira.' },
    { icon: 'query_stats', title: 'Sem Estatísticas', text: 'Impossibilidade de gerar relatórios estratégicos nacionais.' },
  ];

  return (
    <section className="py-xl bg-white chess-pattern" id="problema" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
      <div className="container">
        <div className="text-center mb-lg reveal">
          <h2 className="h2 mb-xs">O PROBLEMA</h2>
          <div className="divider"></div>
          <p className="mt-md body-lg text-on-surface-variant">Os desafios que travam o progresso do xadrez nacional</p>
        </div>
        <div className="grid grid-lg-4 grid-md-2">
          {items.map((item, idx) => (
            <div key={idx} className="glass-card p-md rounded-xl flex flex-col items-center text-center reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="problem-icon">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3 className="h3 mb-xs">{item.title}</h3>
              <p className="caption text-on-surface-variant">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection: React.FC = () => (
  <section className="py-xl" id="solucao">
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-lg items-center">
        <div className="lg:w-1/2 space-y-md reveal">
          <h2 className="h2">A SOLUÇÃO</h2>
          <p className="body-lg text-on-surface-variant">
            Um ecossistema digital unificado que conecta todos os níveis do xadrez moçambicano em tempo real.
          </p>
          <div className="space-y-sm">
            {[
              { num: '01.', title: 'Cadastro Descentralizado', desc: 'Associações inserem dados localmente.' },
              { num: '02.', title: 'Processamento Cloud', desc: 'Validação automática de elegibilidade e quotas.' },
              { num: '03.', title: 'Visão Executiva', desc: 'Federação toma decisões baseadas em dados reais.' },
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-sm rounded-lg flex items-center gap-md border-l-4 border-l-primary">
                <span className="h3 text-primary">{item.num}</span>
                <div>
                  <h4 className="label-md">{item.title}</h4>
                  <p className="caption opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full reveal" style={{ flex: '1' }}>
          <div className="relative p-md glass-card rounded-2xl flex flex-col gap-md items-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
            <div className="flex flex-col md:flex-row items-center gap-md w-full justify-between relative z-10">
              {[
                { icon: 'person', label: 'Jogadores' },
                { icon: 'groups', label: 'Associações' },
                { icon: 'settings_suggest', label: 'SISTEMA', primary: true },
                { icon: 'account_balance', label: 'Federação' },
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className={`flow-box ${item.primary ? 'flow-box-primary' : 'glass-card'}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="caption font-bold">{item.label}</span>
                  </div>
                  {idx < 3 && <span className="material-symbols-outlined text-secondary">arrow_forward</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ScreenshotsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const slides = [
    {
      image: '/assets/login.jpg',
      title: 'Autenticação Segura',
      desc: 'Acesso controlado para jogadores, associações e administradores do sistema.',
      gradient: 'slide-gradient-1',
    },
    {
      image: '/assets/admin.jpg',
      title: 'Painel da Federação',
      desc: 'Visão centralizada com métricas, gráficos e gestão de utilizadores.',
      gradient: 'slide-gradient-2',
    },
    {
      image: '/assets/fmx.jpg',
      title: 'Sistema Integrado FMX',
      desc: 'Plataforma unificada para gestão de filiações, quotas e comunicação.',
      gradient: 'slide-gradient-3',
    },
    {
      image: '/assets/association1.jpg',
      title: 'Gestão de Associações',
      desc: 'Cadastro de associações provinciais e clubes filiados.',
      gradient: 'slide-gradient-1',
    },
    {
      image: '/assets/association2.jpg',
      title: 'Controlo Financeiro',
      desc: 'Monitorização de quotas e regularidade dos pagamentos por associação.',
      gradient: 'slide-gradient-2',
    },
    {
      image: '/assets/jogador.jpg',
      title: 'Ficha do Atleta',
      desc: 'Registo completo com histórico de competições e status de filiação.',
      gradient: 'slide-gradient-3',
    },
  ];

  const next = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Fecha o modal ao pressionar a tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalOpen]);

  return (
    <section className="py-xl bg-surface-container-low" id="telas">
      <div className="container">
        <div className="text-center mb-lg reveal">
          <h2 className="h2 mb-xs">TELAS DO SISTEMA</h2>
          <div className="divider"></div>
          <p className="mt-md body-lg text-on-surface-variant">Conheça as principais interfaces desenvolvidas</p>
        </div>
        <div className="relative max-w-4xl mx-auto reveal">
          <div className="slide-container">
            <div className={`slide-panel ${slides[currentSlide].gradient}`}>
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="slide-image cursor-zoom-in"
                onClick={openModal}
                title="Clique para ampliar"
              />
              <h3 className="h2 mb-sm">{slides[currentSlide].title}</h3>
              <p className="body-lg text-center max-w-lg">{slides[currentSlide].desc}</p>
              <div className="mt-lg flex gap-sm">
                <span className="px-sm py-xs rounded-full caption" style={{ background: 'rgba(255,255,255,0.2)' }}>React</span>
                <span className="px-sm py-xs rounded-full caption" style={{ background: 'rgba(255,255,255,0.2)' }}>CSS Puro</span>
                <span className="px-sm py-xs rounded-full caption" style={{ background: 'rgba(255,255,255,0.2)' }}>API REST</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-md mt-md">
            <button onClick={prev} className="slide-nav-btn">
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <div className="flex gap-xs">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`slide-indicator ${idx === currentSlide ? 'active' : ''}`}
                />
              ))}
            </div>
            <button onClick={next} className="slide-nav-btn">
              <span className="material-symbols-outlined text-primary">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE VISUALIZAÇÃO AMPLIADA */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} title="Fechar">
              <span className="material-symbols-outlined">close</span>
            </button>
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

const ImpactSection: React.FC = () => (
  <section className="py-xl bg-primary-container text-on-primary-container" id="impacto">
    <div className="container">
      <div className="grid grid-md-3">
        {[
          { value: '100%', title: 'Dados Centralizados', desc: 'Fim da redundância e perda de informação.' },
          { value: '0%', title: 'Erros Manuais', desc: 'Processos automatizados com validação instantânea.' },
          { value: '+85%', title: 'Transparência', desc: 'Controlo auditável de todas as quotas e filiações.' },
        ].map((item, idx) => (
          <div key={idx} className="text-center reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
            <div className="impact-number">{item.value}</div>
            <h3 className="h3 mb-xs">{item.title}</h3>
            <p className="body-md opacity-80">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ArchitectureSection: React.FC = () => (
  <section className="py-xl bg-surface-container-low overflow-hidden">
    <div className="container">
      <div className="text-center mb-lg reveal">
        <h2 className="h2">ARQUITECTURA & TECNOLOGIA</h2>
        <p className="mt-md body-lg text-on-surface-variant">Construído sobre pilares de robustez e escalabilidade</p>
      </div>
      <div className="grid grid-lg-2 items-center">
        <div className="glass-card p-lg rounded-2xl reveal">
          <h3 className="h3 mb-md">Stack Tecnológica</h3>
          <div className="flex flex-wrap gap-sm">
            {[
              { color: '#3b82f6', name: 'React' },
              { color: '#ef4444', name: 'Laravel' },
              { color: '#6366f1', name: 'PostgreSQL' },
              { color: '#eab308', name: 'Linux' },
            ].map((tech, idx) => (
              <span key={idx} className="px-md py-xs bg-white rounded-full border border-outline-variant shadow-sm flex items-center gap-xs label-md">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: tech.color }}></span>
                {tech.name}
              </span>
            ))}
          </div>
          <div className="mt-lg space-y-md">
            <div className="flex justify-between items-center caption label-md uppercase tracking-wider opacity-60">
              <span>Frontend</span><span>React Components</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: '90%' }}></div></div>
            <div className="flex justify-between items-center caption label-md uppercase tracking-wider opacity-60">
              <span>Backend</span><span>RESTful Laravel API</span>
            </div>
            <div className="progress-bar"><div className="progress-fill secondary" style={{ width: '85%' }}></div></div>
          </div>
        </div>
        <div className="space-y-md reveal">
          {[
            { icon: 'security', title: 'Segurança Avançada', desc: 'Protecção de dados dos atletas em conformidade com as melhores práticas digitais.' },
            { icon: 'speed', title: 'Alta Performance', desc: 'Consultas rápidas a milhares de registos para emissão instantânea de certificados.' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-md p-md glass-card rounded-xl">
              <div className="w-16 h-16 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">{item.icon}</span>
              </div>
              <div>
                <h4 className="h3 mb-xs">{item.title}</h4>
                <p className="body-md text-on-surface-variant">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const RoadmapSection: React.FC = () => {
  const milestones = [
    { year: '2026', title: 'Lançamento & Piloto', desc: 'Implementação nas províncias de Maputo e Beira.' },
    { year: '2027', title: 'Expansão Nacional & Mobile', desc: 'Digitalização de todas as associações provinciais e lançamento da app móvel para atletas.' },
  ];

  return (
    <section className="py-xl">
      <div className="container">
        <h2 className="h2 text-center text-primary mb-xl reveal">ROADMAP 2026-2027</h2>
        <div className="timeline reveal">
          {milestones.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="glass-card p-md rounded-xl max-w-md">
                <span className="text-primary font-bold">{item.year}</span>
                <h4 className="h3">{item.title}</h4>
                <p className="caption opacity-80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-surface-container-low w-full py-lg mt-xl border-t border-outline-variant-30">
    <div className="container">
      <div className="footer-grid mb-lg">
        <div className="space-y-sm">
          <div className="flex items-center gap-xs">
            {/* <img alt="Logo" className="h-10 w-10" src="/assets/fmx-logo.png" /> */}
            <span className="h3 text-primary">FMX</span>
          </div>
          <p className="caption text-on-surface-variant leading-relaxed">
            Sistema oficial de gestão da Federação Moçambicana de Xadrez. Excelência em cada movimento.
          </p>
        </div>
        <div className="space-y-sm">
          <h4 className="label-md text-primary uppercase">Equipa Técnica</h4>
          <ul className="space-y-xs caption text-on-surface-variant">
            <li>Ester Melina Elias Mapaco</li>
            <li>Génio Nassone Cossa</li>
            <li>Virgílio Pavia Gomes</li>
          </ul>
        </div>
        <div className="space-y-sm">
          <h4 className="label-md text-primary uppercase">Ligações Rápidas</h4>
          <ul className="space-y-xs caption text-on-surface-variant">
            <li><a className="text-on-surface-variant" href="#">Início</a></li>
            <li><a className="text-on-surface-variant" href="#">Termos de Uso</a></li>
            <li><a className="text-on-surface-variant" href="#">Política de Privacidade</a></li>
            <li><a className="text-on-surface-variant" href="#">Contacto</a></li>
          </ul>
        </div>
        <div className="space-y-sm">
          <h4 className="label-md text-primary uppercase">Contacto</h4>
          <p className="caption text-on-surface-variant">
            Av. Samora Machel, Maputo<br />
            info@fmxadrez.org.mz<br />
            +258 21 000 000
          </p>
        </div>
      </div>
      <div className="pt-md border-t border-outline-variant-30 text-center">
        <p className="caption text-on-surface-variant opacity-80">
          © 2026 Federação Moçambicana de Xadrez. Promovendo xeques-mates.
        </p>
      </div>
    </div>
  </footer>
);

// ---------- App Principal ----------

const App: React.FC = () => {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ScreenshotsSection />
        <ImpactSection />
        <ArchitectureSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
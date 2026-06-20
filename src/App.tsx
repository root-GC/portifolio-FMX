import React, { useEffect, useState } from 'react';
// @ts-ignore TS7016: Could not find a declaration file for module './global.css'.
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
        <a className="nav-link" href="#funcionalidades">Funcionalidades</a>
        <a className="nav-link" href="#telas">Telas</a>
        <a className="nav-link" href="#impacto">Impacto</a>
      </div>
    </div>
  </nav>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
      {/* Fundo com peças vermelhas bem visíveis e tabuleiro castanho */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1611996575749-79b5a2e4d8c0?w=1200&q=80"
          alt="Tabuleiro de xadrez com peças vermelhas e castanhas"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(1.1) saturate(1.2)' }}
        />
        {/* Overlay muito leve para não esconder o vermelho */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(245,235,220,0.3) 100%)',
          }}
        ></div>
      </div>
      <div className="container relative hero-grid" style={{ zIndex: 10 }}>
        <div className="space-y-md">
          <div className="badge">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified</span>
            <span>Inovação Nacional</span>
          </div>
          <h1 className="h1-mobile h1-responsive leading-tight text-primary">
            SISTEMA INTEGRADO DE FILIAÇÃO E CONTROLO DE QUOTAS
          </h1>
          <p className="body-lg text-on-surface-variant max-w-xl">
            Modernizando a gestão do xadrez federado em Moçambique com transparência, eficiência e dados centralizados para o crescimento estratégico do desporto.
          </p>
          <div className="flex flex-wrap gap-md" style={{ paddingTop: '8px' }}>
            <button
              className="btn-primary"
              onClick={() => window.open("https://github.com/EsterMelina/SIFCQA-da-FMX/tree/main/docs", "_blank")}
            >
             Documentação
            </button>
            <a
              className="btn-glass"
              href="https://github.com/EsterMelina/SIFCQA-da-FMX"
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

const FeaturesSection: React.FC = () => {
  const features = [
    { icon: 'account_balance', title: 'Gestão da Federação', desc: 'Controlo total sobre jogadores e competições nacionais.' },
    { icon: 'groups', title: 'Gestão de Associações', desc: 'Cadastro e administração de associações provinciais.' },
    { icon: 'payments', title: 'Pagamento de Quotas', desc: 'Monitorização de quotas com alertas e recibos automáticos.' },
    { icon: 'swap_horiz', title: 'Transferência de Jogadores', desc: 'Processo simplificado de transferências entre associações.' },
    { icon: 'campaign', title: 'Comunicação Interna', desc: 'Mensagens e notificações entre federação, associações e jogadores.' },
    { icon: 'description', title: 'Relatórios Avançados', desc: 'Geração de estatísticas por província, idade e desempenho.' },
  ];

  return (
    <section className="py-xl bg-surface-container-low" id="funcionalidades">
      <div className="container">
        <div className="text-center mb-lg reveal">
          <h2 className="h2 mb-xs">FUNCIONALIDADES PRINCIPAIS</h2>
          <div className="divider"></div>
          <p className="mt-md body-lg text-on-surface-variant">Tudo o que precisa para gerir o xadrez nacional</p>
        </div>
        <div className="grid grid-lg-2 gap-gutter">
          {features.map((f, idx) => (
            <div key={idx} className="glass-card p-md rounded-xl flex items-center gap-md reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>{f.icon}</span>
              </div>
              <div>
                <h4 className="h3 mb-xs">{f.title}</h4>
                <p className="caption text-on-surface-variant">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
    title: 'Painel do Administrador',
    desc: 'Visão centralizada com métricas do funcionamento do sistema.',
    gradient: 'slide-gradient-2',
  },
  {
    image: '/assets/fmx.jpg',
    title: 'Gestão da Federação',
    desc: 'Criação de associações, staff da federação e relatórios estatísticos.',
    gradient: 'slide-gradient-3',
  },
  {
    image: '/assets/association1.jpg',
    title: 'Gestão de Associações',
    desc: 'Relatórios estatísticos das actividades da associação.',
    gradient: 'slide-gradient-1',
  },
  {
    image: '/assets/association2.jpg',
    title: 'Menu da Associação',
    desc: 'Dados preliminares das actividades na associação.',
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

const TeamSection: React.FC = () => {
  const members = [
    { name: 'Ester Melina Elias Mapaco', role: 'Desenvolvedora Full‑Stack & Product Owner' },
    { name: 'Génio Nassone Cossa', role: 'Desenvolvedor Full‑Stack & Arquitecto de Sistemas' },
    { name: 'Virgílio Pavia Gomes', role: 'Desenvolvedor Back‑end & Especialista em Bases de Dados' },
  ];

  return (
    <section className="py-xl bg-surface-container-low" id="equipa">
      <div className="container">
        <div className="text-center mb-lg reveal">
          <h2 className="h2 mb-xs">EQUIPA DO PROJECTO</h2>
          <div className="divider"></div>
          <p className="mt-md body-lg text-on-surface-variant">Conheça os responsáveis pelo desenvolvimento do sistema</p>
        </div>

        <div className="grid grid-md-3 gap-gutter mb-xl reveal">
          {members.map((m, idx) => (
            <div key={idx} className="glass-card p-md rounded-2xl text-center" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-md">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>person</span>
              </div>
              <h4 className="h3 mb-xs">{m.name}</h4>
              <p className="caption text-on-surface-variant">{m.role}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-lg rounded-2xl reveal">
          <div className="flex flex-col lg:flex-row gap-lg items-center">
            <div className="lg:w-1/2 space-y-sm">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">school</span>
                <span className="label-md text-primary uppercase">Contexto Académico</span>
              </div>
              <p className="body-md text-on-surface-variant">
                Projecto desenvolvido no âmbito do 4.º ano da Licenciatura em Informática, Minor em Desenvolvimento de Sistemas, pela <strong>Universidade Pedagógica de Maputo</strong>.
              </p>
              <p className="body-md text-on-surface-variant">
                O sistema aplica conceitos avançados de engenharia de software, com foco na escalabilidade, segurança e usabilidade.
              </p>
            </div>
            <div className="lg:w-1/2 space-y-sm">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">memory</span>
                <span className="label-md text-primary uppercase">Tecnologias Utilizadas</span>
              </div>
              <div className="flex flex-wrap gap-sm">
                {['React', 'Laravel', 'CSS Puro', 'PostgreSQL', 'Redis', 'Linux'].map(tech => (
                  <span key={tech} className="px-md py-xs bg-primary-light text-primary rounded-full caption font-bold">{tech}</span>
                ))}
              </div>
              <p className="caption text-on-surface-variant mt-sm">Além das tecnologias principais, foram utilizadas bibliotecas como Three.js, Material Symbols e boas práticas de acessibilidade.</p>
            </div>
          </div>
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
            <img alt="Logo FMX" className="h-20 w-20 object-contain" src="/assets/fmx-logo.png" />
          </div>
          <p className="caption text-on-surface-variant leading-relaxed">
            Promovemos e regulamentamos o xadrez moçambicano, visando a criação e a manutenção de futuros campeões.
          </p>
        </div>
        {/* <div className="space-y-sm">
          <h4 className="label-md text-primary uppercase">Equipa Técnica</h4>
          <ul className="space-y-xs caption text-on-surface-variant">
            <li>Ester Melina Elias Mapaco</li>
            <li>Génio Nassone Cossa</li>
            <li>Virgílio Pavia Gomes</li>
          </ul>
        </div> */}
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
            Av. Emilia Dausse 530, Maputo<br />
            Moçambique 1100<br />
            <a href="https://linktr.ee/federacaomocambicanadexadrez" target="_blank" rel="noopener noreferrer" className="text-primary underline">linktr.ee/federacaomocambicanadexadrez</a>
          </p>
        </div>
      </div>
      <div className="pt-md border-t border-outline-variant-30 text-center">
        <p className="caption text-on-surface-variant opacity-80">
          © 2026 Federação Moçambicana de Xadrez. Promovendo xeques‑mates.
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
        <FeaturesSection />
        <ScreenshotsSection />
        <ImpactSection />
        <ArchitectureSection />
        <RoadmapSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
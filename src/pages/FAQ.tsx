import React, { useState } from 'react';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useThemeColor } from '../hooks/useThemeColor';
import { LongLogo } from '../components/LongLogo';
import { FaPaw, FaClipboardCheck, FaChevronDown, FaUsers, FaUser, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useBodyThemeClass } from '../hooks/useBodyThemeClass';
import './FAQ.css';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const placeholderColor = useThemeColor({}, 'placeholder');
  const iconColor = useThemeColor({}, 'textPrimary');
  const navigate = useNavigate();
  useBodyThemeClass();
  const toggleSection = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Domínio do Projeto",
      icon: <FaPaw size={20} />,
      content: (
        <>
          <p>O <strong>DoggyConnect</strong> é uma aplicação para atuar na área de cruzamento de animais de estimação, facilitando a
comunicação entre os donos de pets que desejem encontrar parceiros para seus pets ou colocá-los
à disposição 
          </p>
          <p>A aplicação tem o papel de proporcionar:</p>
          <ul>
            <li>Cruzamento responsável de cães</li>
            <li>Conectar criadores certificados</li>
            <li>Garantir transparência no processo</li>
            <li>Promover saúde animal através de:</li>
            <ul>
              <li>Verificação de vacinas</li>
              <li>Histórico genético</li>
              <li>Compatibilidade entre raças</li>
            </ul>
          </ul>
        </>
      )
    },
    {
      title: "Requisitos Funcionais",
      icon: <FaClipboardCheck size={20} />,
      content: (
        <div className="requirements-list">
          {[
            { id: 'RF_01', desc: 'Registrar usuário: O Sistema deve permitir que o usuário realize o registro de um novo usuário para utilização do sistema.', priority: '[X] Essencial [ ] Importante [ ] Desejável' },
            { id: 'RF_02', desc: 'Adicionar um pet: O Sistema deve permitir que o usuário crie um perfil para o seu pet com dados referentes ao mesmo.', priority: '[X] Essencial [ ] Importante [ ] Desejável' },
            { id: 'RF_03', desc: 'Adicionar fotos ao perfil: O sistema deve permitir que o usuário adicione fotos do seu pet e as disponibilize no perfil do mesmo.', priority: '[X] Essencial [ ] Importante [ ] Desejável' },
            { id: 'RF_04', desc: 'Visualizar parceiros para cruzamento: O sistema deve permitir que o usuário visualize possíveis candidatos a cruzamento que esteja em sua área.', priority: '[X] Essencial [ ] Importante [ ] Desejável' },
            { id: 'RF_05', desc: 'Combinar perfil: O sistema deve permitir que os usuários possam dar match, um no perfil de outro.', priority: '[X] Essencial [ ] Importante [ ] Desejável' },
            { id: 'RF_06', desc: 'Solicitar Cruzamento: O sistema deve permitir, caso haja sinal positivo de combinação de ambos os perfis, que seja feita a solicitação de cruzamento dos pets por ambos os usuários.', priority: '[X] Essencial [ ] Importante [ ] Desejável' },
            { id: 'RF_07', desc: 'Solicitação de dados: O sistema deve permitir que o usuário possa solicitar dados adicionais sobre o perfil do pet disponível para cruzamento.', priority: '[ ] Essencial [X] Importante [ ] Desejável' },
            { id: 'RF_08', desc: 'Editar perfil de usuário: O sistema deve permitir que o usuário possa editar os dados sobre o perfil.', priority: '[ ] Essencial [X] Importante [ ] Desejável' }
          ].map(req => (
            <div key={req.id} className="req-item">
              <div className="req-header">
                <span className="req-id">{req.id}</span>
                <p className="req-desc">{req.desc}</p>
              </div>
              <div className="req-priority">
                <span>Prioridade: {req.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Integrantes da Equipe",
      icon: <FaUsers size={20} />,
      content: (
        <div className="team-grid">
          {[
            { name: "EDWILSON BEZERRA SOBRINHO NETO", github: "", avatar: <FaUser size={48} /> },
            { name: "HENRIQUE ELIAS PARNAIBA", github: "", avatar: <FaUser size={48} /> },
            { name: "ISRAEL LÁZARO MANGUEIRA TAVARES", github: "IsraelLazaro", avatar: <FaUser size={48} /> },
            { name: "PAULO SANTIAGO RODRIGUES SILVA", github: "", avatar: <FaUser size={48} /> }
          ]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(member => (
              <div key={member.name} className="team-card">
                <div className="avatar-container">
                  {member.avatar}
                </div>
                <div className="member-info">
                  <ThemedText type="body" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {member.name}
                  </ThemedText>
                  {member.github && (
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link"
                    >
                      <FaGithub /> @{member.github}
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      )
    }
  ];

  return (
    <div className="faq-container">
      <ThemedView variant="container" style={styles.container}>
        <header style={styles.header}>
          <LongLogo style={styles.logo} onClick={() => navigate('/Welcome')} />
          <ThemedText type="title" style={{ marginTop: 20 }}>
            Programação para Web II
          </ThemedText>
        </header>

        <main style={styles.main}>
          {sections.map((section, index) => (
            <section key={index} className="faq-section">
              <ThemedButton  onClick={() => toggleSection(index)} style={styles.sectionHeader} type="transparent">
                <div style={styles.sectionTitle}>
                  {section.icon}
                  <ThemedText type="subtitle" style={styles.sectionTitleText}>
                    {section.title}
                  </ThemedText>
                </div>
                <FaChevronDown
                  size={18}
                  style={{
                    color: iconColor,
                    transform: activeIndex === index ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </ThemedButton>

              <div className={`section-content ${activeIndex === index ? 'open' : ''}`}>
                {section.content}
              </div>
            </section>
          ))}
        </main>
      </ThemedView>

      <footer style={styles.footer}>
        <ThemedText type="small">
          DoggyConnect ® {new Date().getFullYear()} |{' '}
          <a href="mailto:suporte@doggyconnect.com" style={{ color: placeholderColor }}>
            suporte@doggyconnect.com
          </a>
        </ThemedText>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '100px',
    minHeight: 'auto',
    padding: '20px',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center'
  },
  logo: {
    maxWidth: '250px',
    margin: '0 auto'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '16px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sectionTitleText: {
    margin: 0
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    padding: '20px',
    borderTop: '1px solid #eee',
    marginTop: 'auto'
  }
};

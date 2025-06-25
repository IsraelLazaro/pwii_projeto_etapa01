import React from 'react';
import { LongLogo } from '../../components/LongLogo';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const primaryTextColor = useThemeColor({}, 'textPrimary');
  const secondTextColor = useThemeColor({}, 'textSecondary');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'stroke');
  const navigate = useNavigate();

  return (
    <div className="safe-area">
      <ThemedView variant="container" style={styles.container}>
        <LongLogo />

        <ThemedText type="subtitle" style={styles.texto}>
          Apresente seu melhor amigo ao mundo!
        </ThemedText>
        <div className='info-area'>
          <ThemedText  style={styles.texto}>
          <p>
            Encontre o Par Ideal para seu Pet! 🐾
          </p>
            Nosso site é a ponte perfeita para conectar tutores apaixonados e seus pets em busca de
              cruzamentos responsáveis. Funciona como um "Tinder Pet": você cria o perfil do seu animalzinho,
                define suas preferências e começa a explorar outros pets próximos que também estão procurando um par.
        </ThemedText>
        </div>
        <ThemedText lightColor={secondTextColor} style={styles.textPrimary}>
          Adicione uma foto, suas características e veja seu cão se tornar o centro das atenções.
        </ThemedText>

        <img
          src="/assets/images/ilustrative2.png"
          alt="Ilustração"
          style={{ marginTop: 32, maxWidth: '100%', height: 'auto' }}
        />

        <div style={styles.paginationDots}>
          <div style={{ ...styles.paginationDot, backgroundColor: secondaryColor }} />
          <div style={{ ...styles.paginationDot, backgroundColor: primaryColor }} />
        </div>

        <div style={styles.buttons}>
          <ThemedButton
            type="transparent"
            style={styles.button}
            onClick={() => navigate(-1)}
          >
            {/* Substituir por um ícone web ou texto mesmo */}
            <span style={{ color: primaryTextColor }}>←</span>
            <ThemedText style={{ marginLeft: 10 }}>Voltar</ThemedText>
          </ThemedButton>

          <ThemedButton
            style={styles.button}
            onClick={() => navigate('/Login')}
          >
            <ThemedText lightColor="white">Login</ThemedText>
          </ThemedButton>
        </div>
      </ThemedView>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingBottom: 48,
    paddingTop: 48,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    marginTop: 64,
    marginBottom: 16,
  },
  paginationDots: {
    display: 'flex',
    flexDirection: 'row',
    width: 30,
    justifyContent: 'space-evenly',
    marginTop: 16,
    marginBottom: 64,
  },
  paginationDot: {
    borderRadius: 20,
    width: 10,
    height: 10,
  },
  buttons: {
    width: '100%',
    maxWidth: 400,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

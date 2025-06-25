import React from 'react';
import { LongLogo } from '../../components/LongLogo';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const headlineColor = useThemeColor({}, 'textSecondary');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'stroke');
  const navigate = useNavigate();

  return (
    <div className="safe-area">
      <ThemedView variant="container" style={styles.container}>
        <LongLogo />
        <ThemedText type="title" style={styles.title}>
          Bem-vindo ao DoggyConnect!
        </ThemedText>
        <ThemedText lightColor={headlineColor}>
          Crie o perfil do seu pet, compartilhe e conecte-se com uma comunidade de amantes de cães.
        </ThemedText>
        <img
          src="/assets/images/ilustrative1.png"
          alt="Ilustração"
          style={{ marginTop: 32, maxWidth: '100%', height: 'auto' }}
        />
        <div style={styles.paginationDots}>
          <div style={{ ...styles.paginationDot, backgroundColor: primaryColor }} />
          <div style={{ ...styles.paginationDot, backgroundColor: secondaryColor }} />
        </div>
        <div style={styles.buttons}>
          <ThemedButton style={{ width: '30%' }} onClick={() => navigate('/Home')}>
            <ThemedText lightColor="white">Conhecer</ThemedText>
          </ThemedButton>
        </div>
      </ThemedView>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  safeArea: {
    minHeight: '100vh',
    padding: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingBottom: 48,
    paddingTop: 48,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
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
    justifyContent: 'center',
    gap: 16,
  }

};

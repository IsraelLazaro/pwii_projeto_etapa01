import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useNavigate } from 'react-router-dom';

// quando for usar autenticação
// import { useAuth } from '@/hooks/useAuth';
import { mockLogin } from '../../services/auth'; 

import { LongLogo } from '../../components/LongLogo';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedButton } from '../../components/ThemedButton';
import { AlertModal, type AlertModalHandle } from '../../components/AlertModal';

import './Login.css';

// ✅ Validação com Yup
const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
}).required();

export default function Login() {
  const primaryColor = useThemeColor({}, 'primary');
  const secondTextColor = useThemeColor({}, 'placeholder');
  const navigate = useNavigate();

  // fazer login
  // const { login } = useAuth();

  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [modalText, setModalText] = useState('Sucesso');
  const modalRef = useRef<AlertModalHandle>(null);

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = async (data: any) => {
    // resposta login
    // const response = await login(data.email, data.password);

    const response = await mockLogin(data.email, data.password);

    if (response.success) {
      navigate('/home');
    } else {
      setModalText(response.message);
      modalRef.current?.setVisible();
    }
  };

  return (
    <div className="safe-area">
      <ThemedView variant="container" style={styles.container}>
        <LongLogo />

        <ThemedText type="title" style={styles.title}>Fazer Login</ThemedText>
        <ThemedText type='body' lightColor={secondTextColor}>
          Entre para se conectar com a comunidade de pets.
        </ThemedText>

        <div style={styles.inputs}>
          <ThemedTextInput
            label="E-mail:"
            placeholder="Digite seu endereço de e-mail"
            onChangeText={(text) => setValue('email', text)}
            errorMessage={errors.email?.message}
            style={{ marginBottom: 16 }}
          />
          <ThemedTextInput
            label="Senha:"
            placeholder="Digite sua senha"
            secureTextEntry
            onChangeText={(text) => setValue('password', text)}
            errorMessage={errors.password?.message}
          />
        </div>

        <ThemedButton style={styles.button} onClick={handleSubmit(onSubmit)}>
          <ThemedText lightColor="white">Entrar</ThemedText>
        </ThemedButton>

        <div style={styles.signup}>
          <ThemedText>Ainda não tem conta?</ThemedText>
          <ThemedText
            style={{ color: primaryColor, marginLeft: 8, cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Cadastre-se agora!
          </ThemedText>
        </div>
      </ThemedView>

      <AlertModal type="fail" ref={modalRef} text={modalText} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    maxWidth: 480,
  },
  title: {
    marginTop: 48,
    marginBottom: 16,
  },
  inputs: {
    marginTop: 24,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signup: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

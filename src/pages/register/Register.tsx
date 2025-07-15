import { useState, useRef, useEffect} from 'react';
import './Register.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mockRegister } from '../../services/auth';
import * as yup from 'yup';;
import { useThemeColor } from '../../hooks/useThemeColor';
import { useNavigate } from 'react-router-dom';
import { AlertModal, type AlertModalHandle } from '../../components/AlertModal';
import { LongLogo } from '../../components/LongLogo';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText'
import { ThemedView } from '../../components/ThemedView';

const schema = yup.object({
    name: yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: yup.string().required('O e-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('A confirmação da senha é obrigatória'),  
}).required();

export default function Register() {
  const primaryColor = useThemeColor({}, 'primary');
  const secondTextColor = useThemeColor({}, 'placeholder');
  const navigate = useNavigate();
  const { register , setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    });
  const [modalText, setModalText] = useState('Sucesso');
  const modalRef = useRef<AlertModalHandle>(null);

  useEffect(()=>{
    register('name');
    register('email');
    register('password');
    register('confirmPassword');
    }, [register]);
  const onSubmit = async (data: any) => {
    try {
      const response = await mockRegister(data.name, data.email, data);
      if (response.success) {
        setModalText('Cadastro realizado com sucesso!');
        modalRef.current?.setVisible(); 
      } else {
        setModalText('Erro ao cadastrar!');
        modalRef.current?.setVisible();
      }
    } catch {
      setModalText('Erro ao cadastrar!');
      modalRef.current?.setVisible();
    }
  };

  return (
    <div className='safe-area'>
        <ThemedView variant='container' style={styles.container}>
        <LongLogo
          style={{ cursor: 'pointer', marginTop:10 }}
          onClick={() => navigate('/Welcome')}
        />
           <ThemedText type='title' style={{...styles.title, marginTop: 0}}>CADASTRO</ThemedText>
            <ThemedText type='body' darkColor={secondTextColor}>
            Faça seu cadastro para ter acesso a todas as funcionalidades do aplicativo.
            </ThemedText>    
            <img src="/assets/images/fundo-pata.webp" alt="pata" className='imgFundo'/>
            <div style={styles.inputs}>
                <ThemedTextInput 
                    label="Nome:"
                    placeholder="Digite seu nome"
                    placeholderTextColor={secondTextColor} 
                    onChangeText={(text) => setValue('name', text)}
                    errorMessage={errors.name?.message}
                    style={{ marginBottom: 10 }}               
                />
                <ThemedTextInput
                    label="E-mail:"
                    placeholder="Digite seu e-mail"
                    placeholderTextColor={secondTextColor} 
                    onChangeText={(text) => setValue('email', text)}
                    errorMessage={errors.email?.message}
                    style={{ marginBottom: 16 }}
                />
                <ThemedTextInput
                    label="Senha:"
                    placeholder="Digite sua senha"
                    placeholderTextColor={secondTextColor} 
                    secureTextEntry
                    onChangeText={(text) => setValue('password', text)}
                    errorMessage={errors.password?.message}
                />
                <ThemedTextInput
                  label="Confirmar Senha:"
                  placeholder="Digite a senha novamente"
                  placeholderTextColor={secondTextColor} 
                  secureTextEntry
                  onChangeText={(text) => setValue('confirmPassword', text)}
                  errorMessage={errors.confirmPassword?.message}
                />                      
        </div>   
        <ThemedButton style={styles.button} onClick={handleSubmit(onSubmit)}>
            <ThemedText lightColor="white">Cadastrar</ThemedText>
        </ThemedButton> 
        <div style={styles.signup}>
          <ThemedText>Já possui uma conta?</ThemedText>
          <ThemedText
            style={{ color: primaryColor, marginLeft: 8, cursor: 'pointer' }}
            onClick={() => navigate('/Login')}
          >
            Login!!
          </ThemedText>
        </div>
        </ThemedView>
        <AlertModal
          type={modalText.includes('sucesso') ? 'success' : 'fail'}
          ref={modalRef}
          text={modalText}
          onClose={() => {
            if (modalText.includes('sucesso')) {
              navigate('/Profile'); 
            }
          }}
        />
    </div>
  );  
}
  
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 20,
    paddingBottom: 48,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    minHeight: '100vh', 
    overflowY: 'auto',  
  },
  title: {
    marginTop: 'auto',
  },
  inputs: {
    marginTop: 10,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

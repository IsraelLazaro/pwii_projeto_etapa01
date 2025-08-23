import { useState, useRef, useEffect} from 'react';
import './Register.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';;
import { useThemeColor } from '../../hooks/useThemeColor';
import { useNavigate } from 'react-router-dom';
import { AlertModal, type AlertModalHandle } from '../../components/AlertModal';
import { LongLogo } from '../../components/LongLogo';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { CityStateInputs } from '../../components/CityStateInputs';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText'
import { ThemedView } from '../../components/ThemedView';
import { cities } from '../../services/cities';
import { api } from "../../../api";

const schema = yup.object({
    name: yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: yup.string().required('O e-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    state: yup.string()
        .required('O estado é obrigatório')
        .length(2, 'Digite a sigla do estado (ex: PB, RN)'),
    city: yup.string()
        .required('A cidade é obrigatória')
        .min(2, 'A cidade deve ter pelo menos 2 caracteres'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('A confirmação da senha é obrigatória'),  
}).required();

export default function Register() {
  const [selectedState, setSelectedState] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]); 
  const primaryColor = useThemeColor({}, 'primary');
  const secondTextColor = useThemeColor({}, 'placeholder');
  const coordinate = [-38.5555, -6.8896];
  const navigate = useNavigate();
  const { register , setValue, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    });
  const [modalText, setModalText] = useState('Sucesso');
  const modalRef = useRef<AlertModalHandle>(null);

useEffect(() => {
  if (selectedState) {
    setAvailableCities(cities[selectedState] || []); 
    setValue("city", "");
  } else {
    setAvailableCities([]);
  }
}, [selectedState, setValue]);

  useEffect(()=>{
    register('name');
    register('email');
    register('state');
    register('city');
    register('password');
    register('confirmPassword');
    }, [register]);
  const onSubmit = async (data: any) => {
    try {
      const payload = {
      userName: data.name, 
      email: data.email,
      password: data.password,
      address: {
        city: data.city,
        state: data.state,
        location: {
          type: "Point",
          coordinates: coordinate, 
        },
      },
    }
    console.log(payload)
    const response = await api.post("/user", payload);
      
      if (response.status === 201) {
        setModalText('Cadastro realizado com sucesso!');
        modalRef.current?.setVisible(); 
      } else {
        setModalText('Erro ao cadastrar!');
        modalRef.current?.setVisible();
      }
    } catch (error)  {
      console.error(error);
      setModalText('Erro ao cadastrar!');
      modalRef.current?.setVisible();
    }
  };

return (
  <div className='safe-area'>
    <ThemedView variant='container' style={styles.container}>
      <LongLogo
        style={{ cursor: 'pointer', marginTop: 10 }}
        onClick={() => navigate('/Welcome')}
      />
      <ThemedText type='title' style={{...styles.title, marginTop: 0}}>CADASTRO</ThemedText>
      <ThemedText type='body' darkColor={secondTextColor}>
        Faça seu cadastro para ter acesso a todas as funcionalidades do aplicativo.
      </ThemedText>    
      <img src="/assets/images/fundo-pata.webp" alt="pata" className='imgFundo'/>
      
      <div style={styles.inputs}>
        <CityStateInputs
          states={Object.keys(cities)}
          cities={availableCities}
          selectedState={selectedState}
          onStateChange={(uf) => {
            setSelectedState(uf);
            setValue('state', uf);
          }}
          onCityChange={(city) => setValue('city', city)}
          stateError={errors.state?.message}
          cityError={errors.city?.message}
        />
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
          style={{ marginBottom: 16 }}
        />
        <ThemedTextInput
          label="Confirmar Senha:"
          placeholder="Digite a senha novamente"
          placeholderTextColor={secondTextColor} 
          secureTextEntry
          onChangeText={(text) => setValue('confirmPassword', text)}
          errorMessage={errors.confirmPassword?.message}
          style={{ marginBottom: 16 }}
        />                      
      </div>   
      
      <ThemedButton style={styles.button} onClick={handleSubmit(onSubmit)}>
        <ThemedText lightColor="white">Cadastrar</ThemedText>
      </ThemedButton> 
      
      <div style={styles.signup}>
        <ThemedText>Já possui uma conta?</ThemedText>
        <ThemedText style={{ color: primaryColor, marginLeft: 8, cursor: 'pointer' }}
          onClick={() => navigate('/Login')} >
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
    paddingTop:100,
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

import { useState, useRef, useEffect } from 'react';
import './UserEdit.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertModal, type AlertModalHandle } from '../../components/AlertModal';
import { LongLogo } from '../../components/LongLogo';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { api } from "../../../api";
import { useAuth } from '../../hooks/useAuth';

const schema = yup.object({
  name: yup.string().optional(),
  userName: yup.string().min(3, 'Mínimo 3 caracteres').optional(),
  email: yup.string().email('E-mail inválido').optional(),
  password: yup.string().min(6, 'Mínimo 6 caracteres').optional(),
  confirmPassword: yup
    .string()
    .when('password', (password, s) =>
      password
        ? s.required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas não coincidem')
        : s.optional()
    ),
  cpf: yup.string().optional(),
  phone: yup.string().optional(),
}).required();

interface FormValues {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  phone: string;
}

const formatCPF = (value: string) => {
  return (value || '')
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatPhone = (value: string) => {
  return (value || '')
    .replace(/\D/g, '')
    .slice(0, 10)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export default function UserEdit() {
  const secondTextColor = useThemeColor({}, 'placeholder');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const { login } = useAuth();

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    phone: ''
  });

  const [profilePicture, setProfilePicture] = useState<string>('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, setValue, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const [modalText, setModalText] = useState('');
  const modalRef = useRef<AlertModalHandle>(null);

  const watchedValues = watch();

  useEffect(() => {
    setFormValues(prev => ({
      ...prev,
      name: watchedValues.name || '',
      userName: watchedValues.userName || '',
      email: watchedValues.email || '',
      password: watchedValues.password || '',
      confirmPassword: watchedValues.confirmPassword || '',
      cpf: watchedValues.cpf || '',
      phone: watchedValues.phone || ''
    }));
  }, [watchedValues]);

  useEffect(() => {
    register('name');
    register('userName');
    register('email');
    register('password');
    register('confirmPassword');
    register('cpf');
    register('phone');
  }, [register]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!userId) return;

        const response = await api.get(`/user/${userId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.data) {
          const user = response.data;

          setValue('name', user.name || '');
          setValue('userName', user.userName || '');
          setValue('email', user.email || '');
          setValue('cpf', formatCPF(user.cpf || ''));
          setValue('phone', formatPhone(user.phone || ''));

          setFormValues(prev => ({
            ...prev,
            name: user.name || '',
            userName: user.userName || '',
            email: user.email || '',
            cpf: formatCPF(user.cpf || ''),
            phone: formatPhone(user.phone || '')
          }));

          if (user.profilePicture) {
            setProfilePicture(user.profilePicture);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setModalText("Erro ao carregar os dados do usuário.");
        modalRef.current?.setVisible();
      }
    };

    fetchUser();
  }, [userId, setValue]);

  const handleInputChange = (field: keyof FormValues, value: string) => {
    let nextValue = value;
    if (field === 'cpf') {
      nextValue = formatCPF(value);
    } else if (field === 'phone') {
      nextValue = formatPhone(value);
    }
    setValue(field, nextValue);
    setFormValues(prev => ({
      ...prev,
      [field]: nextValue
    }));
  };

  const onPickFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const f = ev.target.files?.[0];
    if (!f) return;
    setFileToUpload(f);
    setFilePreview(URL.createObjectURL(f));
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('picture', file);
    const token = localStorage.getItem('token');
    
    const res = await api.put('/user/picture', formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return res.data?.profilePicture || null;
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.delete('/user', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      setModalText('Conta deletada com sucesso!');
      modalRef.current?.setVisible();
      
      setTimeout(() => {
        navigate('/Welcome');
        window.location.reload();
      }, 2000);

    } catch (err: any) {
      console.error('Erro ao deletar conta:', err);
      setModalText(err.response?.data?.message || 'Erro ao deletar a conta. Tente novamente.');
      modalRef.current?.setVisible();
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      let uploadedPicture = null;
      if (fileToUpload) {
        uploadedPicture = await uploadImage(fileToUpload);
      }
      const payload: any = {};
      if (data.name) payload.name = data.name;
      if (data.userName) payload.userName = data.userName;
      if (data.email) payload.email = data.email;
      if (data.password) payload.password = data.password;
      if (data.cpf) payload.cpf = data.cpf.replace(/\D/g, '');
      if (data.phone) payload.phone = data.phone.replace(/\D/g, '');

      const response = await api.put(`/user`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.status === 200) {
        const { user, token } = response.data;

        if (token && typeof token === "string") {
            login(user, token);
        } else {
            login(user, localStorage.getItem("token")!);
        }

        setModalText("Dados atualizados com sucesso!");
        
        if (fileToUpload) {
          setFilePreview(null);
          setFileToUpload(null);
        }
      } else {
        setModalText("Erro ao atualizar os dados.");
      }
    } catch (err: any) {
      console.error(err);
      setModalText(err.response?.data?.message || "Erro ao atualizar os dados.");
    } finally {
      setLoading(false);
    }
    modalRef.current?.setVisible();
  };

  return (
    <div className='safe-area'>
      <ThemedView variant='container' style={styles.container}>
        <LongLogo
          style={{ cursor: 'pointer', marginTop: 10 }}
          onClick={() => {navigate('/Profile'); window.location.reload(); }}
        />
        <ThemedText type='title' style={styles.title}>EDITAR PERFIL</ThemedText>
        <img src="/assets/images/fundo-pata.webp" alt="pata" className='imgFundo'/>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>📸 Foto de Perfil:</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={onPickFile}
            style={{ marginBottom: 10 }}
          />
          {filePreview && (
            <div style={{ position: 'relative', display: 'inline-block', marginRight: 10, marginBottom: 10 }}>
              <img
                src={filePreview}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                alt="Preview"
              />
              <button
                onClick={() => {
                  setFilePreview(null);
                  setFileToUpload(null);
                }}
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          )}

          {profilePicture && !filePreview && (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={`${api.getUri()}/uploads/${profilePicture}`}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                alt="Foto atual"
                onError={(e) => {
                  console.log('Erro ao carregar imagem:', e);
                  setProfilePicture('');
                }}
              />
            </div>
          )}
        </div>

        <div style={styles.inputs}>
          <ThemedTextInput
            label="Nome:"
            placeholder="Digite seu nome"
            placeholderTextColor={secondTextColor}
            value={formValues.name}
            onChangeText={(t) => handleInputChange('name', t)}
            errorMessage={errors.name?.message}
            style={{ marginBottom: 10 }}
          />

          <ThemedTextInput
            label="Nome de usuário:"
            placeholder="Digite seu username"
            placeholderTextColor={secondTextColor}
            value={formValues.userName}
            onChangeText={(t) => handleInputChange('userName', t)}
            errorMessage={errors.userName?.message}
            style={{ marginBottom: 10 }}
          />

          <ThemedTextInput
            label="E-mail:"
            placeholder="Digite seu e-mail"
            placeholderTextColor={secondTextColor}
            value={formValues.email}
            onChangeText={(t) => handleInputChange('email', t)}
            errorMessage={errors.email?.message}
            style={{ marginBottom: 10 }}
          />

          <ThemedTextInput
            label="Nova Senha:"
            placeholder="Digite a nova senha"
            placeholderTextColor={secondTextColor}
            value={formValues.password}
            secureTextEntry
            onChangeText={(t) => handleInputChange('password', t)}
            errorMessage={errors.password?.message}
            style={{ marginBottom: 10 }}
          />

          <ThemedTextInput
            label="Confirmar Senha:"
            placeholder="Confirme a nova senha"
            placeholderTextColor={secondTextColor}
            value={formValues.confirmPassword}
            secureTextEntry
            onChangeText={(t) => handleInputChange('confirmPassword', t)}
            errorMessage={errors.confirmPassword?.message}
            style={{ marginBottom: 10 }}
          />

          <ThemedTextInput
            label="CPF:"
            placeholder="Digite seu CPF"
            placeholderTextColor={secondTextColor}
            value={formValues.cpf}
            onChangeText={(t) => handleInputChange('cpf', t)}
            errorMessage={errors.cpf?.message}
            style={{ marginBottom: 10 }}
          />

          <ThemedTextInput
            label="Telefone:"
            placeholder="Digite seu telefone"
            placeholderTextColor={secondTextColor}
            value={formValues.phone}
            onChangeText={(t) => handleInputChange('phone', t)}
            errorMessage={errors.phone?.message}
            style={{ marginBottom: 10 }}
          />
        </div>
        
        <div className='btn-edit'>
          <ThemedButton style={styles.button} onClick={handleSubmit(onSubmit)} disabled={loading}>
            <ThemedText lightColor="white">
              {loading ? 'Salvando...' : 'Salvar'}
            </ThemedText>
          </ThemedButton>
          <ThemedButton style={styles.button} type="transparent" onClick={() => { navigate('/Profile'); window.location.reload();}}> 
            Voltar 
          </ThemedButton>
        </div>
        
        <ThemedButton 
          type="danger" 
          onClick={handleDeleteAccount} 
          style={{ marginTop: '16px' }}
        >
          Deletar Conta
        </ThemedButton>
      </ThemedView>

      <AlertModal
        type={modalText.includes("sucesso") ? 'success' : 'fail'}
        ref={modalRef}
        text={modalText}
        onClose={() => {
          if (modalText.includes("sucesso")) {
            navigate('/Profile');
            window.location.reload();
          }
        }}
      />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingTop: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
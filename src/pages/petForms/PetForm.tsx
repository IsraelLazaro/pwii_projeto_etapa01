import { useEffect, useRef, useState } from 'react';
import './PetForm.css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertModal, type AlertModalHandle } from '../../components/AlertModal';
import { LongLogo } from '../../components/LongLogo';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { api } from '../../../api';

type Sex = 'Male' | 'Female';

type FormInputs = {
  name: string;
  breed: string;
  age: string;     
  weight?: string;   
  specie: string;
  sex: Sex;
};

type Pet = {
  _id?: string;
  name: string;
  breed: string;
  age: number;
  weight?: number;
  specie: string;
  sex: Sex;
  photos?: string[];
};

const schema: yup.ObjectSchema<FormInputs> = yup.object({
  name: yup.string().required('O nome é obrigatório').min(2, 'Mínimo 2 caracteres'),
  breed: yup.string().required('A raça é obrigatória'),
  age: yup
    .string()
    .required('A idade é obrigatória')
    .test('is-int', 'Idade deve ser um número inteiro', (v) => /^\d+$/.test(String(v || ''))),
  weight: yup.string().optional(),
  specie: yup.string().required('A espécie é obrigatória'),
  sex: yup.mixed<Sex>().oneOf(['Male', 'Female'], 'Selecione o sexo').required(),
}) as yup.ObjectSchema<FormInputs>;

export default function PetForms() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  const secondTextColor = useThemeColor({}, 'placeholder');

  const [photos, setPhotos] = useState<string[]>([]);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef<AlertModalHandle>(null);
  const [modalText, setModalText] = useState('Sucesso');

  const { register, setValue, handleSubmit, reset, watch, formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      breed: '',
      age: '',
      weight: '',
      specie: '',
      sex: 'Male',
      },
    });

  useEffect(() => {
    register('name');
    register('breed');
    register('age');
    register('weight');
    register('specie');
    register('sex');
  }, [register]);

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/pets/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const pet: Pet = res.data;
        reset({
          name: pet.name ?? '',
          breed: pet.breed ?? '',
          age: pet.age != null ? String(pet.age) : '',
          weight: pet.weight != null ? String(pet.weight) : '',
          specie: pet.specie ?? '',
          sex: (pet.sex as Sex) ?? 'Male',
        });
        setPhotos(Array.isArray(pet.photos) ? pet.photos : []);
      } catch {
        setModalText('Erro ao carregar o pet.');
        modalRef.current?.setVisible();
      }
    };
    fetchPet();
  }, [id, reset]);

  const onPickFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const f = ev.target.files?.[0];
    if (!f) return;
    setFileToUpload(f);
    setFilePreview(URL.createObjectURL(f));
  };

  const uploadImage = async (file: File, petIdOrNew: string) => {
    const formData = new FormData();
    formData.append('picture', file);
    const token = localStorage.getItem('token');
    const res = await api.post(`/pets/${petIdOrNew}/pictures`, formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'multipart/form-data',
      },
    });
    return (res.data?.[0] as string) || null;
  };

  const deleteImage = async (fileName: string) => {
    if (!id) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/pets/${id}/pictures/${fileName}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setPhotos((arr) => arr.filter((p) => p !== fileName));
    } catch {
      setModalText('Erro ao excluir imagem.');
      modalRef.current?.setVisible();
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      let uploadedName: string | null = null;
      if (fileToUpload) {
        uploadedName = await uploadImage(fileToUpload, id || 'new');
      }

      const payload: Pet = {
        name: data.name,
        breed: data.breed,
        age: parseInt(data.age, 10),
        weight: data.weight ? Number(data.weight) : undefined,
        specie: data.specie,
        sex: data.sex,
        photos: [
          ...(uploadedName ? [uploadedName] : []),
          ...photos,
        ],
      };

      if (id) {
        await api.put(`/pets/${id}`, payload, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setModalText('Pet atualizado com sucesso!');
      } else {
        await api.post('/pets', { pets: [payload] }, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setModalText('Pet adicionado com sucesso!');
        reset({
          name: '',
          breed: '',
          age: '',
          weight: '',
          specie: '',
          sex: 'Male',
        });
        setPhotos([]);
        setFilePreview(null);
        setFileToUpload(null);
      }

      modalRef.current?.setVisible();
      setTimeout(() => navigate('/Profile'), 800);
    } catch {
      setModalText('Erro ao salvar o pet.');
      modalRef.current?.setVisible();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="safe-area">
      <ThemedView variant='container' style={styles.container}>
        <LongLogo
          style={{ cursor: 'pointer', marginTop: 10 }}
          onClick={() => navigate('/Welcome')}
        />
        <ThemedText type='title' style={{...styles.title, marginTop: 0}}>{watch("name") || "Novo Pet"}</ThemedText>
        <img src="/assets/images/fundo-pata.webp" alt="pata" className='imgFundo'/>

        <div style={styles.inputs}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>📸 Foto do Pet:</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={onPickFile}
              style={{ marginBottom: 10 }}
            />
            {filePreview && (
              <div style={{ position: 'relative', display: 'inline-block', marginRight: 10 }}>
                <img
                  src={filePreview}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                />
                <ThemedButton type='danger'
                  onClick={() => {
                    setFilePreview(null);
                    setFileToUpload(null);
                 }}>
                  🗑️DELETAR
                </ThemedButton>

              </div>
            )}
          </div>
          {photos.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Fotos atuais:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {photos.map((photo, index) => (
                  <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={`${api.getUri()}/uploads/${photo}?${Date.now()}`}
                      style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                      onError={(e) => console.log('Erro ao carregar imagem:', e)}
                    />
                    <button className='btn-upload-img'
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
                      onClick={() => deleteImage(photo)}
                    >
                      🗑️DELETAR
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ThemedTextInput 
            label="Nome:"
            placeholder="Digite o nome do pet"
            placeholderTextColor={secondTextColor} 
            value={watch("name")}   
            onChangeText={(text) => setValue('name', text)}
            errorMessage={errors.name?.message}
            style={{ marginBottom: 10 }}               
          />
          <ThemedTextInput 
            label="Raça:"
            placeholder="Digite a raça"
            placeholderTextColor={secondTextColor} 
            value={watch("breed")}   
            onChangeText={(text) => setValue('breed', text)}
            errorMessage={errors.breed?.message}
            style={{ marginBottom: 10 }}               
          />
          <ThemedTextInput 
            label="Idade:"
            placeholder="Digite a idade"
            value={watch("age")}
            onChangeText={(text) => setValue("age", text)}
            errorMessage={errors.age?.message}
            type="number"
            style={{ marginBottom: 10 }}             
          />
          <ThemedTextInput 
            label="Peso:"
            placeholder="Digite o peso (kg)"
            placeholderTextColor={secondTextColor} 
            value={watch("weight") || ""}   
            onChangeText={(text) => setValue('weight', text)}
            errorMessage={errors.weight?.message}
            type="number"
            style={{ marginBottom: 10 }}               
          />
          <ThemedTextInput 
            label="Espécie:"
            placeholder="Ex: Cachorro, Gato"
            placeholderTextColor={secondTextColor} 
            value={watch("specie")}   
            onChangeText={(text) => setValue('specie', text)}
            errorMessage={errors.specie?.message}
            style={{ marginBottom: 10 }}               
          />
          <label style={{ marginBottom: 5, fontWeight: 'bold' }}>Sexo:</label>
          <select
            id='sexo'
            value={watch("sex")}
            onChange={(e) => setValue("sex", e.target.value as Sex)}
            style={{
              padding: 8,
              borderRadius: 8,
              border: errors.sex ? "1px solid red" : "1px solid #ccc",
              marginBottom: 10,
            }}
          >
            <option value="Male">Macho</option>
            <option value="Female">Fêmea</option>
          </select>
          {errors.sex && (
            <span style={{ color: "red", fontSize: 12 }}>{errors.sex.message}</span>
          )}
        </div>

        <div className='btns-forms-pet'>
          <ThemedButton style={styles.button} onClick={handleSubmit(onSubmit)} disabled={loading}>
            <ThemedText lightColor="white">
              {loading ? 'Salvando...' : (id ? 'Atualizar' : 'Cadastrar')}
            </ThemedText>
          </ThemedButton>
          <ThemedButton style={styles.button}  type="transparent" onClick={() => { navigate(-1); }}> Voltar </ThemedButton>
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
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
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
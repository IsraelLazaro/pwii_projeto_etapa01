import React, { useEffect, useState } from 'react';
import { UserHeader } from '../../components/UserHeader';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useNavigate } from 'react-router-dom';
import { LongLogo } from '../../components/LongLogo';
import './Profile.css';
import { useThemeColor } from '../../hooks/useThemeColor';
import { PetCard } from '../../components/PetCard';
import { api } from "../../../api";
import { useAuth } from '../../hooks/useAuth';

interface Pet {
  _id: string;
  name: string;
  age: number;
  specie: string; 
  breed: string;
  sex: string;
  weight?: number;
  size?: number;
  photos?: string[];
}
export default function Profile() {
    const primaryColor = useThemeColor({}, 'primary');
    const navigate = useNavigate();    
    const secondTextColor = useThemeColor({}, 'placeholder');
    const { user, token } = useAuth();
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchUserPets = async () => {
            try {
                setLoading(true);
                const response = await api.get('/pets', {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setPets(response.data || []);
                
            } catch (error) {
                console.error("Erro ao buscar pets:", error);
                setPets([]); 
            } finally {
                setLoading(false);
            }
        };
        
        if (token) {
            fetchUserPets();
        }
    }, [token]);
    const handleDelete = async (petId: string) => {
        try {
        await api.delete(`/pets/${petId}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        setPets((prev) => prev.filter((p) => p._id !== petId));
        } catch (error) {
        console.error("Erro ao deletar pet:", error);
        }
    };
    if (!user) return <div>Carregando...</div>;

    return (
        <div className='safe-area'>
            <ThemedView variant="container" style={styles.container}>
                <div style={{ textAlign: 'left', width: '100%' }}>
                    <LongLogo type="profile"></LongLogo>
                    <div  className='click-img-profile'>
                        <UserHeader userName={user.userName} avatarUrl={user.avatarUrl || '/assets/images/default_user.svg'}/>
                    </div>

                    <div className="profile-info">
                        <ThemedText type='small' style={{ color: secondTextColor, paddingTop: 10 }}>{user.email}</ThemedText>
                    </div>
                </div>

                <div className="profile-pets">
                    <ThemedView variant='section' style={styles.loadPet}>
                        <ThemedText type='subtitle' style={{ color: primaryColor }}>Meus Pets</ThemedText>
                        {pets.length === 0 ? (
                            <div style={{ width: '100%', textAlign: 'center', marginTop: '16px' }}>
                                <ThemedText type="small">Nenhum pet cadastrado</ThemedText>
                            </div>
                        ) : (
                            pets.map((pet) => (
                                <div key={pet._id} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 12 }} className='pets'>
                                    <ThemedView variant='card'>
                                        <PetCard
                                            key={pet._id}
                                            name={pet.name}
                                            breed={pet.breed}
                                            imageUrl={pet.photos?.[0] ? `${api.getUri()}/uploads/${pet.photos[0]}` : '/assets/images/logo-pet.png'}
                                            onEdit={() => navigate(`/PetForms/${pet._id}`)}
                                            onDelete={() => {
                                                if (window.confirm("Tem certeza que deseja excluir este pet?")) {
                                                    handleDelete(pet._id);
                                                }
                                                }}
                                        />
                                    </ThemedView>
                                </div>
                            ))
                        )}
                    </ThemedView>
                </div>

                <div style={styles.button}>
                    <ThemedButton type="success"
                        onClick={() => {
                        navigate('/PetForms');
                        }}
                    >Novo Pet</ThemedButton>
                      <ThemedButton 
                        type="danger" 
                        onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate('/Login');
                        }}
                    >
                        Sair
                    </ThemedButton>
                </div>
            </ThemedView>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        flex: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '30%',
        maxWidth: 'auto',
        overflow: 'hidden',
    },
    title: {
        marginTop: 'auto',
        marginBottom: 16,
    },
    button: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    loadPet: {
        width: 'auto',
    },
};

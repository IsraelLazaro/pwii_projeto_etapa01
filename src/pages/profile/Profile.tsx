import React, { useEffect, useState } from 'react';
import { UserHeader } from '../../components/UserHeader';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useNavigate } from 'react-router-dom';
import { mockGetUser, mockGetPets, type Pet } from '../../services/auth';
import { LongLogo } from '../../components/LongLogo';
import './Profile.css';
import { useThemeColor } from '../../hooks/useThemeColor';
import { PetCard } from '../../components/PetCard';

export default function Profile() {
    const primaryColor = useThemeColor({}, 'primary');
    const navigate = useNavigate();
    const secondTextColor = useThemeColor({}, 'placeholder');
    const [user, setUser] = useState<any>(null);
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        async function fetchUserAndPets() {
            const userData = await mockGetUser();
            setUser(userData);
            const petsData = await mockGetPets();
            const userPets = petsData.filter(pet => userData.pets.includes(pet._id));
            setPets(userPets);
        }
        fetchUserAndPets();
    }, []);

    if (!user) return <div>Carregando...</div>;

    return (
        <div className='safe-area'>
            <ThemedView variant="container" style={styles.container}>
                <div style={{ textAlign: 'left', width: '100%' }}>
                    <LongLogo type="profile"></LongLogo>
                    <div onClick={() => navigate('/Welcom_2')} className='click-img-profile'>
                        <UserHeader username={user.username} avatarUrl={user.avatarUrl} />
                    </div>

                    <div className="profile-info">
                        <ThemedText type='small' style={{ color: secondTextColor, paddingTop: 10 }}>{user.email}</ThemedText>
                        <ThemedText type="small" style={{ fontSize: 14 }}>{user.bio}</ThemedText>
                    </div>
                </div>

                <div className="profile-pets">
                    <ThemedView variant='section' style={styles.loadPet}>
                        <ThemedText type='subtitle' style={{ color: primaryColor }}>Meus Pets</ThemedText>
                        {pets.length === 0 ? (
                            <ThemedText type="small" style={{ textAlign: 'center' }}>Nenhum pet cadastrado</ThemedText>
                        ) : (
                            pets.map((pet) => (
                                <div key={pet._id} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 12 }} className='pets'>
                                    <ThemedView variant='card'>
                                        <PetCard
                                            key={pet._id}
                                            name={pet.name}
                                            breed={pet.breed}
                                            imageUrl={pet.photos?.[0] || '/assets/images/logo-pet.png'}
                                            onEdit={() => console.log('Editar pet:', pet._id)}
                                        />
                                    </ThemedView>
                                </div>
                            ))
                        )}
                    </ThemedView>
                </div>

                <div style={styles.button}>
                    <ThemedButton type="success">Novo Pet</ThemedButton>
                    <ThemedButton type="danger" onClick={() => navigate('/Login')}>Sair</ThemedButton>
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

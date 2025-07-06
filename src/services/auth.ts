export async function mockLogin(email: string, password: string): Promise<{ success: boolean; message: string }> {
  await new Promise((res) => setTimeout(res, 500)); 

  if (email === 'user@example.com' && password === '123456') {
    return { success: true, message: 'Login bem-sucedido!' };
  }

  return { success: false, message: 'E-mail ou senha incorretos.' };
}

export async function mockRegister(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
  await new Promise((res) => setTimeout(res, 500)); 

  if (email === 'user@example.com') {
    return { success: false, message: 'E-mail já cadastrado.' };
  }
  if (name.length<5){
    return { success: false, message: 'Nome deve ter mais de 5 caracteres.' };
  }
  if (password.length<6) {
    return { success: false, message: 'Senha deve ter mais de 6 caracteres.' };
  }

  return { success: true, message: 'Cadastro realizado com sucesso!' };
}
export async function mockGetUser(): Promise<{
  username: string;
  avatarUrl: string;
  bio: string;
  email: string;
  pets: string[];
}> {
  await new Promise((res) => setTimeout(res, 300)); 

  return {
    username: 'Pedro Paulo Pimenta',
    avatarUrl: '/assets/images/pic(1).png',
    bio: 'Amante de pets, tutor do Rex 🐶',
    email: 'PedroPP@example.com',
    pets: ['1', '2', '3','4'],
  };
}

export interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  weight?: number;
  specie: string;
  sex: string;
  photos: string[];
  vaccines?: string[];
  description?: string;
}

export async function mockGetPets(): Promise<Pet[]> {
  await new Promise((res) => setTimeout(res, 300));

  return [
    {
      _id: '1',
      name: 'Rex',
      breed: 'Golden Retriever',
      age: 5,
      weight: 30,
      specie: 'dog',
      sex: 'male',
      photos: ['/assets/images/dog.png', '/assets/images/petdog.png'],
      vaccines: ['Raiva', 'Gripe Canina', 'Parvovirose'],
      description: 'Um cão muito amigável e cheio de energia.',
    },
    {
      _id: '2',
      name: 'Mimi',
      breed: 'Siamês',
      age: 3,
      specie: 'cat',
      sex: 'female',
      photos: [],
      vaccines: ['Raiva', 'Leucemia Felina'],
      description: 'Gata tranquila e muito carinhosa.',
    },
    {
      _id: '3',
      name: 'Nina',
      breed: 'Vira-lata',
      age: 2,
      specie: 'dog',
      sex: 'female',
      photos: [],
      vaccines: [],
      description: 'Filhote adotada recentemente, brincalhona.',
    },
    {
      _id: '4',
      name: 'Bob',
      breed: 'Calopsita',
      age: 1,
      specie: 'bird',
      sex: 'male',
      photos: [],
      vaccines: ['Raiva', 'Leucemia Felina'],
      description: 'Pássaro muito falante e sociável.',
    }
  ];
}


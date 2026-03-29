import { Contact } from '@/types/api';

export const mockContacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'João da Silva',
    phone: '11987654321',
    email: 'joao.silva@gmail.com',
    tags: ['cliente', 'premium'],
    createdAt: '2024-01-10T08:00:00.000Z',
  },
  {
    id: 'contact-2',
    name: 'Maria Aparecida Santos',
    phone: '21976543210',
    email: 'maria.santos@hotmail.com',
    tags: ['prospect'],
    createdAt: '2024-02-15T09:30:00.000Z',
  },
  {
    id: 'contact-3',
    name: 'Pedro Oliveira',
    phone: '31965432109',
    tags: ['cliente'],
    createdAt: '2024-03-01T11:00:00.000Z',
  },
  {
    id: 'contact-4',
    name: 'Ana Carolina Ferreira',
    phone: '41954321098',
    email: 'ana.ferreira@empresa.com.br',
    tags: ['cliente', 'vip'],
    createdAt: '2024-01-20T14:00:00.000Z',
  },
  {
    id: 'contact-5',
    name: 'Lucas Rodrigues',
    phone: '51943210987',
    email: 'lucas.rodrigues@gmail.com',
    tags: [],
    createdAt: '2024-04-05T10:15:00.000Z',
  },
];

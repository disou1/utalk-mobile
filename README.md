umbler-talk-mobile/
# Umbler Talk Mobile

Aplicativo mobile para iOS e Android criado para permitir que agentes de suporte e vendedores atendam clientes via WhatsApp de qualquer lugar, com uma experiência mais rápida, fluida e adequada ao contexto mobile do que a versão web atual.

## Problema

Hoje o Umbler Talk funciona muito bem no desktop, mas muitos atendentes trabalham em campo e nem sempre têm um computador disponível. A experiência via navegador no celular não entrega a agilidade necessária para responder clientes em tempo real.

## Solução

O Umbler Talk Mobile foi desenhado como uma extensão natural do produto, focado nas tarefas mais frequentes do atendente:
- visualizar conversas atribuídas a si
- responder mensagens rapidamente
- consultar dados do contato
- transferir conversas para membros ou setores
- registrar etiquetas
- acompanhar notificações em tempo real

## Principais funcionalidades

- Inbox com conversas atribuídas
- Tela de conversa com resposta rápida
- Modo mensagem e notas internas
- Detalhes do contato
- Transferência de conversa
- Registro de etiquetas
- Central de notificações
- Modo demo para apresentação

## Stack

- React Native
- Expo
- TypeScript
- Expo Router
- Zustand
- TanStack Query

## Como executar

```bash
npm install
npm run start

├── app/                        # Telas (Expo Router file-based routing)

│   ├── \_layout.tsx             # Root layout + providers

│   ├── index.tsx               # Redirect inteligente

│   ├── (auth)/

│   │   └── connect.tsx         # Login / Conexão com API

│   ├── (app)/

│   │   ├── \_layout.tsx         # Tab navigator

│   │   ├── inbox.tsx           # Lista de conversas

│   │   └── settings.tsx        # Configurações

│   ├── conversation/\[id].tsx   # Tela de conversa

│   ├── contact/\[id].tsx        # Perfil do contato

│   └── transfer/\[id].tsx       # Transferência (modal)

├── components/

│   ├── common/                 # Avatar, Badge, Button, EmptyState, Skeleton

│   ├── inbox/                  # ConversationItem, InboxFilters

│   └── conversation/           # MessageBubble, MessageComposer

├── services/

│   ├── api/                    # apiClient + todos os serviços por domínio

│   └── storage/                # SecureStore + AsyncStorage

├── hooks/                      # TanStack Query hooks por feature

├── store/                      # Zustand stores (auth, inbox)

├── types/                      # TypeScript: api.ts + ui.ts

├── utils/                      # dateUtils, mappers, phoneUtils

├── theme/                      # colors, spacing, typography

└── mocks/                      # Dados demo realistas

## Diferencial para o hackathon

O projeto prioriza velocidade operacional, fidelidade visual ao ecossistema Umbler e uma experiência mobile pensada para uso com uma mão, com foco nas ações mais frequentes de atendimento.

## Status do projeto

MVP funcional para demonstração, com modo demo navegável e estrutura preparada para integração com API real do Umbler Talk.


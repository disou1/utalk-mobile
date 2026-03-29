umbler-talk-mobile/

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


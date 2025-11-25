# Sistema de Duplicatas - Frontend React

Front-end desenvolvido em React para o sistema de gerenciamento de duplicatas.

## Características

- **Interface Limpa e Acessível**: Design moderno seguindo as melhores práticas de UX/UI
- **Paleta de Cores Personalizada**:
  - Graphite (#353535)
  - Stormy Teal (#3C6E71)
  - White (#FFFFFF)
  - Alabaster Grey (#D9D9D9)
  - Yale Blue (#284B63)

## Funcionalidades

### Empresas
- ✅ Listar todas as empresas cadastradas
- ✅ Cadastrar novas empresas (sacador/sacado)
- ✅ Visualizar detalhes das empresas

### Duplicatas
- ✅ Listar todas as duplicatas
- ✅ Criar novas duplicatas
- ✅ Visualizar detalhes completos
- ✅ Avançar status da duplicata (Emissão → Aceite → Liquidação)
- ✅ Timeline visual do ciclo de vida
- ✅ Badges coloridos por status

## Tecnologias Utilizadas

- **React 18**: Framework front-end
- **React Router**: Navegação entre páginas
- **Axios**: Cliente HTTP para API
- **Lucide React**: Ícones modernos
- **Vite**: Build tool rápido e moderno

## Instalação e Execução

### 1. Instalar Dependências

```bash
cd frontend
npm install
```

### 2. Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

O front-end estará disponível em `http://localhost:3000`

### 3. Build para Produção

```bash
npm run build
```

## Configuração do Backend

O front-end está configurado para se conectar com o backend Flask através de um proxy. Certifique-se de que:

1. O backend está rodando em `http://localhost:5000`
2. O Flask-CORS está instalado e configurado:

```bash
pip install flask-cors
```

O CORS já foi configurado no arquivo `app.py` do backend.

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Layout.jsx    # Layout principal com navegação
│   │   ├── Card.jsx      # Componente de card
│   │   ├── Button.jsx    # Botões estilizados
│   │   └── Badge.jsx     # Badges de status
│   ├── pages/            # Páginas da aplicação
│   │   ├── Home.jsx      # Página inicial
│   │   ├── Empresas.jsx  # Lista de empresas
│   │   ├── NovaEmpresa.jsx
│   │   ├── Duplicatas.jsx
│   │   ├── NovaDuplicata.jsx
│   │   └── DetalheDuplicata.jsx
│   ├── services/         # Serviços de API
│   │   └── api.js        # Cliente Axios configurado
│   ├── App.jsx           # Componente raiz
│   ├── main.jsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── index.html
├── package.json
└── vite.config.js
```

## Páginas e Rotas

- `/` - Página inicial com informações do sistema
- `/empresas` - Lista de empresas
- `/empresas/nova` - Formulário de nova empresa
- `/duplicatas` - Lista de duplicatas
- `/duplicatas/nova` - Formulário de nova duplicata
- `/duplicatas/:id` - Detalhes e ações da duplicata

## Design Responsivo

O front-end é totalmente responsivo e se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Acessibilidade

- Semântica HTML adequada
- Contraste de cores seguindo WCAG 2.1
- Navegação por teclado
- Labels descritivos em formulários
- Estados visuais claros (hover, focus, disabled)

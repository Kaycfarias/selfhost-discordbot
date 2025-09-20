# Dashboard de Bots Discord Self-Hosted

Um dashboard web moderno para gerenciar bots Discord auto-hospedados, construído com Next.js 15 e componentes shadcn/ui. Atualmente em fase de desenvolvimento inicial.

## Visão Geral do Projeto

Este dashboard fornece uma interface web para monitorar e controlar bots Discord rodando em contêineres Docker. O frontend se comunica com uma API backend para gerenciar deployments de bots, visualizar logs e acessar sessões de terminal em tempo real.

### Status Atual

**🚧 Desenvolvimento Inicial**
- Layout básico do dashboard com navegação lateral
- Sistema de componentes shadcn/ui implementado
- Componentes placeholder para terminal e gerenciamento de bots
- Estrutura de navegação estática (pronta para integração dinâmica)

### Funcionalidades Planejadas

- **Gerenciamento de Bots**: Deploy, iniciar, parar e monitorar bots Discord
- **Terminal em Tempo Real**: Acesso interativo ao terminal dos contêineres em execução
- **Monitoramento de Recursos**: Métricas de CPU, memória e performance
- **Visualização de Logs**: Gerenciamento centralizado de logs dos bots
- **Configuração**: Configurações dos bots e gerenciamento de ambiente

## Stack Tecnológico

- **Frontend**: Next.js 15 com App Router e Turbopack
- **Biblioteca UI**: Componentes shadcn/ui com Tailwind CSS v4
- **Estilização**: Sistema de cores OKLCH customizado com temas claro/escuro
- **Terminal**: Integração xterm.js (planejado)
- **Comunicação API**: WebSocket e endpoints REST (planejado)

## Getting Started

## Primeiros Passos

### Pré-requisitos

- Runtime [Bun](https://bun.sh/)
- Node.js 18+ (se não estiver usando Bun)

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd selfhost-discordbot
```

2. Instale as dependências:
```bash
bun install
```

3. Execute o servidor de desenvolvimento:
```bash
bun dev
```

4. Abra [http://localhost:3000](http://localhost:3000) para visualizar o dashboard.

### Scripts Disponíveis

```bash
bun dev          # Inicia servidor de desenvolvimento com Turbopack
bun build        # Cria build de produção
bun start        # Inicia servidor de produção
bun lint         # Executa verificações do ESLint
```

## Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raiz com wrapper do dashboard
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais e variáveis do tema
│   └── dashboard/         # Rotas do dashboard
├── components/
│   ├── dashboard-layout.tsx   # Layout principal do dashboard
│   ├── app-sidebar.tsx       # Sidebar de navegação
│   ├── terminal*.tsx         # Componentes do terminal (placeholder)
│   └── ui/                   # Componentes shadcn/ui
└── lib/
    └── utils.ts              # Funções utilitárias
```

## Desenvolvimento

O projeto utiliza:
- **TypeScript**: Tipagem rigorosa em todo o código
- **Tailwind CSS**: Estilização utility-first com tema customizado
- **shadcn/ui**: Componentes acessíveis pré-construídos
- **ESLint**: Qualidade e consistência de código

Desenvolvimento atual foca em:
1. Configurar estrutura básica do dashboard ✅
2. Implementar gerenciamento de lista de bots (planejado)
3. Adicionar funcionalidade de terminal (planejado)
4. Integração com API backend (planejado)

## Arquitetura

### Implementação Atual
- **Layout Global**: `DashboardLayout` envolve todas as páginas via layout raiz
- **Navegação Lateral**: Sidebar recolhível com estrutura de navegação estática
- **Sistema de Componentes**: Componentes shadcn/ui com temas consistentes
- **Design Responsivo**: Layout mobile-friendly com recolhimento da sidebar

### Arquitetura Planejada
- **Frontend**: Este dashboard Next.js
- **API Backend**: Serviço separado gerenciando contêineres Docker
- **Comunicação**: Endpoints REST e conexões WebSocket
- **Contêineres de Bots**: Bots Discord rodando em ambientes Docker isolados

## Contribuindo

1. Siga desenvolvimento TypeScript-first
2. Use padrões de componentes existentes do shadcn/ui
3. Mantenha estrutura de arquivos e convenções de nomenclatura consistentes
4. Teste componentes isoladamente ao invés de execução completa da aplicação

## Licença

Este projeto é privado e não licenciado para uso público.

## Recursos

- [Documentação Next.js](https://nextjs.org/docs)
- [Componentes shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Documentação Discord.js](https://discord.js.org/)

# Arquitetura do Terminal

Esta documentação descreve a organização modular do componente Terminal com suporte a color codes ANSI e formatação avançada de timestamps.

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── terminal.tsx                           # Componente principal
│   └── connection-status-indicator.tsx        # Indicador de status
├── hooks/
│   └── use-terminal.ts                        # Hooks personalizados
├── services/
│   ├── terminal-processor.service.ts          # Processamento de dados
│   └── websocket-client.ts                    # Utilitários WebSocket
├── utils/
│   ├── terminal.utils.ts                      # Utilitários de formatação
│   └── index.ts                               # Re-exports
├── types/
│   └── terminal.types.ts                      # Definições de tipos
└── constants/
    └── terminal.constants.ts                  # Constantes e configurações
```

## 🏗️ Responsabilidades por Módulo

### `terminal.tsx`

**Componente Principal**

- Coordena todos os outros módulos
- Gerencia estado de conexão
- Renderização da UI

### `connection-status-indicator.tsx`

**Componente de Status**

- Exibe status da conexão
- UI para estados: connecting, connected, error, closed

### `use-terminal.ts`

**Hooks Personalizados com Color Support**

- `useTerminalWebSocket`: Gerencia conexão WebSocket
- `useTerminalResize`: Handle de redimensionamento
- **Sistema de mensagens coloridas**
- Lógica de side effects isolada

**Funcionalidades Color:**

- Timestamps do sistema em cinza
- Indicadores de status com SYSTEM_MESSAGE_INDICATORS
- Mensagens de erro e sucesso diferenciadas
- Suporte completo a ANSI color codes

**Hooks Exportados:**

- `useTerminal(botId)`: Hook principal
- `useTerminalWebSocket()`: Gerenciamento WebSocket
- `useTerminalResize()`: Auto-redimensionamento

### `terminal-processor.service.ts`

**Processamento de Dados e Configuração**

- Normalização de quebras de linha
- **Processamento configurável de timestamps**
- Transformação de dados do terminal
- Suporte a diferentes modos de formatação

**Modos de Timestamp:**

- `time-only`: Apenas horário (HH:mm:ss)
- `full-datetime`: Data/hora completa com cores

**Configuração:**

```typescript
interface ProcessorConfig {
  timestampMode: "time-only" | "full-datetime";
  showSystemDateTime: boolean;
}
```

**Funções Principais:**

- `processTerminalData()`: Modo básico (apenas horário)
- `processTerminalDataWithDateTime()`: Modo completo com cores
- `processLineTimestamp()`: Processa linha individual
- `normalizeLineBreaks()`: Normaliza quebras de linha

### `websocket-client.ts`

**Serviços WebSocket**

- Decodificação de dados
- Construção de URLs
- Utilitários de conexão

### `terminal.utils.ts`

**Utilitários de Formatação e Color Codes**

- Formatação de tempo e data (brasileira)
- **Processamento de color codes ANSI**
- Validações de linha e timestamps
- Extração e conversão de timestamps

**Funções de Color Codes:**

- `processColorCodes(text, color)`: Aplica cores ANSI ao texto
- Cores disponíveis: black, red, green, yellow, blue, magenta, cyan, white, gray

**Funções de Timestamp:**

- `formatCurrentTime()`: Horário atual (HH:mm:ss)
- `formatCurrentDateTime()`: Data/hora completa (DD/MM/YYYY HH:mm:ss)
- `extractIsoTimestamp()`: Extrai timestamp ISO de logs
- `formatLineWithExtractedDateTime()`: Formata linha com timestamp colorido

**Exemplos de Uso:**

```typescript
// Aplicar cor cinza ao timestamp
const coloredTimestamp = processColorCodes("[12:30:45]", "gray");

// Formatar linha com data/hora extraída
const formattedLine = formatLineWithExtractedDateTime(logLine, isoTimestamp);

// Verificar se linha é mensagem do sistema
const isSystem = isSystemMessage(line);
```

### `terminal.types.ts`

**Definições de Tipos**

- Interfaces TypeScript
- Types para props e status
- Contratos de API

### `terminal.constants.ts`

**Constantes e Configurações com Color Support**

- **Regex patterns para timestamps complexos**
- **Estilos CSS e ANSI color codes**
- **SYSTEM_MESSAGE_INDICATORS**: Indicadores visuais (🔄, ✅, ❌, 🔌)
- Configurações de formato de data/hora
- **Suporte a timestamps com/sem milissegundos**

**Constantes de Color:**

- `TERMINAL_STYLES`: Configurações CSS do terminal
- Regex para detecção de timestamps ISO
- Formatação brasileira de data/hora
- Configurações de layout e tema

**Regex Patterns:**

- `TIMESTAMP_REGEX`: Timestamps formatados [HH:mm:ss]
- `ISO_TIMESTAMP_REGEX`: Timestamps ISO básicos
- `DATETIME_WITH_MS_REGEX`: Timestamps com milissegundos
- `FULL_DATETIME_REGEX`: Timestamps completos

## 🎨 Sistema de Color Codes ANSI

### **Cores Disponíveis**

O terminal suporta 9 cores ANSI básicas através da função `processColorCodes()`:

| Cor       | Código ANSI | Uso Recomendado           |
| --------- | ----------- | ------------------------- |
| `black`   | `\x1b[30m`  | Texto auxiliar            |
| `red`     | `\x1b[31m`  | Erros, alertas críticos   |
| `green`   | `\x1b[32m`  | Sucessos, confirmações    |
| `yellow`  | `\x1b[33m`  | Avisos, warnings          |
| `blue`    | `\x1b[34m`  | Informações, links        |
| `magenta` | `\x1b[35m`  | Destacar elementos        |
| `cyan`    | `\x1b[36m`  | Dados técnicos            |
| `white`   | `\x1b[37m`  | Texto principal           |
| `gray`    | `\x1b[90m`  | **Timestamps, metadados** |

### **Como Usar Color Codes**

#### **1. Aplicar Cor a Texto**

```typescript
import { processColorCodes } from "@/utils/terminal.utils";

// Aplicar cor vermelha a mensagem de erro
const errorMessage = processColorCodes("ERRO: Falha na conexão", "red");

// Aplicar cor cinza a timestamp (uso padrão)
const grayTimestamp = processColorCodes("[12:30:45]", "gray");

// Aplicar cor verde a mensagem de sucesso
const successMessage = processColorCodes("✅ Conectado!", "green");
```

#### **2. Usar em Mensagens do Sistema**

```typescript
function writeSystemMessage(instance: TerminalInstance, message: string) {
  const timestamp = formatCurrentDateTime();
  const coloredTimestamp = processColorCodes(timestamp, "gray");
  instance.writeln(`${coloredTimestamp} ${message}`);
}
```

#### **3. Processar Dados do Terminal**

```typescript
// No terminal-processor.service.ts
export function formatLineWithExtractedDateTime(
  line: string,
  isoTimestamp: string
): string {
  const dateTime = extractDateTimeFromTimestamp(isoTimestamp);
  const cleanLine = line.replace(isoTimestamp, "").trim();
  const coloredTimestamp = processColorCodes(dateTime, "gray");
  return `${coloredTimestamp} ${cleanLine}`;
}
```

### **Onde Usar Color Codes**

#### **✅ Locais Recomendados**

- **Timestamps**: Sempre usar `gray` para timestamps
- **Mensagens de Sistema**: No hook `use-terminal.ts`
- **Processamento de Logs**: No `terminal-processor.service.ts`
- **Status de Conexão**: Vermelho para erros, verde para sucesso

#### **❌ Evitar Usar**

- **Dados do Bot**: Não colorir logs vindos diretamente do bot
- **Input do Usuário**: Manter comandos digitados sem cor
- **Texto Longo**: Evitar colorir blocos grandes de texto

### **Padrões de Cor por Contexto**

#### **Sistema e Timestamps**

```typescript
// ✅ CORRETO: Timestamp cinza
const coloredTimestamp = processColorCodes("[12:30:45]", "gray");

// ✅ CORRETO: Status de conexão
const connectingMsg = processColorCodes("🔄 Conectando...", "yellow");
const connectedMsg = processColorCodes("✅ Conectado!", "green");
const errorMsg = processColorCodes("❌ Erro de conexão", "red");
```

#### **Mensagens de Status**

```typescript
// Status indicators com cores apropriadas
const statusMessages = {
  connecting: processColorCodes("🔄 Conectando ao bot...", "yellow"),
  connected: processColorCodes("✅ Conectado ao bot!", "green"),
  error: processColorCodes("❌ Erro de conexão WebSocket", "red"),
  closed: processColorCodes("🔌 Conexão encerrada", "cyan"),
};
```

### **Reset Automático**

Todas as cores são automaticamente resetadas com `\x1b[0m` ao final:

```typescript
// A função processColorCodes automaticamente adiciona o reset
export function processColorCodes(text: string, color: string): string {
  const colorCodes: Record<string, string> = {
    /* ... */
  };
  return `${colorCodes[color]}${text}\x1b[0m`; // Reset automático
}
```

## ⏰ Sistema de Timestamps Avançado

### **Modos de Processamento**

#### **1. Modo Time-Only (Padrão)**

```typescript
// Usar processTerminalData() - apenas horário
const config = { timestampMode: "time-only", showSystemDateTime: false };
// Resultado: [14:30:25] Mensagem do bot
```

#### **2. Modo Full-DateTime (Completo)**

```typescript
// Usar processTerminalDataWithDateTime() - data/hora colorida
const config = { timestampMode: "full-datetime", showSystemDateTime: true };
// Resultado: [21/09/2025 14:30:25] Mensagem do bot (timestamp em cinza)
```

### **Detecção Automática de Timestamps**

O sistema detecta automaticamente 4 tipos de timestamps:

```typescript
// 1. Timestamps formatados [HH:mm:ss]
detectTimestampType("[14:30:25] Log message"); // → "formatted"

// 2. ISO com milissegundos
detectTimestampType("2025-09-21T14:30:25.123Z Log message"); // → "iso-with-ms"

// 3. ISO sem milissegundos
detectTimestampType("2025-09-21T14:30:25Z Log message"); // → "iso"

// 4. Sem timestamp
detectTimestampType("Simple log message"); // → "none"
```

### **Configuração por Contexto**

#### **Para Hooks (use-terminal.ts)**

```typescript
// Sistema usa sempre formatCurrentDateTime() + cor cinza
function writeSystemMessage(instance: TerminalInstance, message: string) {
  const timestamp = formatCurrentDateTime(); // 21/09/2025 14:30:25
  const coloredTimestamp = processColorCodes(timestamp, "gray");
  instance.writeln(`${coloredTimestamp} ${message}`);
}
```

#### **Para Processamento de Logs**

```typescript
// Logs do bot: processTerminalDataWithDateTime() para timestamps coloridos
ws.onmessage = (event) => {
  const rawData = decodeWebSocketData(event.data);
  const processedData = processTerminalDataWithDateTime(rawData); // Com cores
  instance.write(processedData);
};
```

### **Funções de Formatação Disponíveis**

| Função                           | Uso                | Exemplo                 |
| -------------------------------- | ------------------ | ----------------------- |
| `formatCurrentTime()`            | Hora atual simples | `"14:30:25"`            |
| `formatCurrentDateTime()`        | Data/hora completa | `"21/09/2025 14:30:25"` |
| `formatCurrentDate()`            | Apenas data        | `"21/09/2025"`          |
| `extractTimeFromTimestamp()`     | ISO → Hora         | `"14:30:25"`            |
| `extractDateTimeFromTimestamp()` | ISO → Data/Hora BR | `"21/09/2025 14:30:25"` |

## 🔄 Fluxo de Dados

```
1. terminal.tsx (renderização)
   ↓ (usa TERMINAL_STYLES constants)
2. use-terminal.ts (lógica + color codes)
   ↓ (chama services com formatação)
3. websocket-client.ts → terminal-processor.service.ts (com timestamps coloridos)
   ↓ (usa utils para color/timestamp)
4. terminal.utils.ts (processColorCodes + formatação)
```

### **Fluxo de Color Codes**

```
WebSocket Data → Processor (detecta timestamps) → Utils (aplica cores) → Terminal (renderiza)
Sistema Messages → Hook (formata + cor cinza) → Terminal (exibe)
```

## 🎯 Princípios Aplicados

### **Single Responsibility Principle**

- Cada módulo tem uma responsabilidade única
- Funções pequenas e focadas

### **Dependency Inversion**

- Componente principal depende de abstrações (hooks)
- Services isolados e testáveis

### **Clean Architecture**

- Separação entre UI, lógica de negócio e utilitários
- Dependências apontam para dentro

### **TypeScript First**

- Todas as interfaces definidas em `types/`
- Type safety em todos os módulos

## 🧪 Testabilidade

### **Funções Puras**

- `terminal.utils.ts`: Todas as funções são puras
- `terminal-processor.service.ts`: Processamento sem side effects

### **Hooks Isolados**

- `useTerminalWebSocket`: Pode ser testado independentemente
- `useTerminalResize`: Lógica isolada de UI

### **Services Mockáveis**

- WebSocket service pode ser facilmente mockado
- Processor service é determinístico

## 📦 Reutilização

### **Componentes**

- `ConnectionStatusIndicator`: Reutilizável em outros contextos
- `terminal.tsx`: Pode ser usado com diferentes `botId`

### **Hooks**

- `useTerminalWebSocket`: Reutilizável para outros WebSockets
- `useTerminalResize`: Aplicável a qualquer terminal xterm

### **Utils & Services**

- Todos os utilitários podem ser usados independentemente
- Services são agnósticos ao React

## 🚀 Benefícios da Arquitetura

1. **Manutenibilidade**: Fácil localizar e modificar funcionalidades
2. **Testabilidade**: Cada módulo pode ser testado isoladamente
3. **Reusabilidade**: Componentes e hooks reutilizáveis
4. **Legibilidade**: Código bem organizado e documentado
5. **Escalabilidade**: Fácil adicionar novas funcionalidades
6. **Type Safety**: TypeScript rigoroso em todos os módulos
7. **🎨 Visual Enhancement**: Color codes melhoram UX do terminal
8. **⏰ Timestamp Flexibility**: Suporte a múltiplos formatos de data/hora
9. **🔄 Auto-Detection**: Detecção automática de tipos de timestamp
10. **🎯 Context-Aware**: Cores apropriadas por contexto (sistema, erro, sucesso)

### **Melhorias Específicas de Color Codes**

- **Diferenciação Visual**: Timestamps cinzas separam metadados do conteúdo
- **Status Claro**: Cores indicam estado da conexão instantaneamente
- **Consistência**: Padrão uniforme de cores em todo o sistema
- **Acessibilidade**: Cores ANSI padrão compatíveis com todos os terminais
- **Performance**: Processing de cores otimizado com reset automático

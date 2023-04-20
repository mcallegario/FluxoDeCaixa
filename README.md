# Descritivo da Solução
Um comerciante precisa controlar o seu fluxo de caixa diário com os lançamentos (débitos e créditos), também precisa de um relatório que disponibilize o saldo diário consolidado.

# Requisitos de Negócio
- Serviço que faça o controle de lançamentos;
- Serviço do consolidado diário.

# Desenho da Solução
<img src="doc/arquitetura.png">
- Desenho da solução, e explicação não técnica do funcionamento da arquitetura;
- Pode ser feito na linguagem que você domina;
- Boas práticas são bem-vindas (Design Patterns, Padrões de Arquitetura, SOLID e etc);
- Readme com instruções de como subir a aplicação local, container e utilização dos serviços;
- Hospedar em repositório público (GitHub).

# Começando
Primeiro, clone o repositório

```bash
cd FluxoDeCaixa # vá para o diretório raiz do projeto
npm install # instalar dependências de desenvolvimento
npm run dev # watch mode
npm run build # to build the project
```

# Desenvolvimento
```bash
npm run dev # watch mode
```

# Produção
```bash
npm run compile # to transpile TS to JS
npm run start # to build the project
```


# Descritivo da Solução
Um comerciante precisa controlar o seu fluxo de caixa diário com os lançamentos (débitos e créditos), também precisa de um relatório que disponibilize o saldo diário consolidado.

# Requisitos de Negócio
- Serviço que faça o controle de lançamentos;
- Serviço do consolidado diário.

# Desenho da Solução
<img src="doc/arquitetura.png">

# Implementação da Solução

Implementei uma solução simples utilizando Node.js com Express e TypeScript para criar uma WebAPI.
Optei por não utilizar aqui nenhum banco de dados em específico. Estou usando a memória do processo Node.js como armazenamento temporário, focando mais nos aspectos web da API mesmo.
Além da WebAPI também implementei um exemplo da sua utilização através de uma aplicação frontend em HTML/Javascript.

# Dependências
- Express: webserver que vamos utilizar para a webapi;
- CORS: pacote de segurança necessário para permitir comunicação futura com frontend;
- Helmet: pacote de segurança para dar uma blindada básica na nossa webapi;
- DotEnv: pacote de configuração para cuidar das variáveis de ambiente;
- Morgan: pacote para logging de requisições no terminal;
- Express Async Errors: pacote para conseguir capturar erros assíncronos;
- Typescript: pacote para suporte à typescript no projeto;
- TS-Node: pacote para execução de arquivos TS sem precisar de pré-transpilação;

# Serviços implementados
- Os serviços da WebAPI está sendo executado no endereço http://localhost:3000/lancamento/v1/
- Serviços disponíveis:
    - “/all”, recupera todos os lançamentos (*)
    - “/consolidated:”, recupera todos os consolidados diários (*)
    - “/consolidated/:data”, recupera o consolidado diário de uma data especifica
    - “/get/:id”, recupera um lançamento passando o parâmetro do seu “id”
    - “/save”, inclui ou altera um determinado lançamento, recebe um objeto, se for passado o “id” neste objeto será realizado a alteração caso contrário será incluído;
    - “/delete/:id”, exclui o lançamento passando o parâmetro do seu “id”

    (*) Esse serviço foi implementado apenas para esse exercício, em produção o ideal implementar paginação.

# Estrutura do objeto json
    Lancamento {
        id: number;
        data: string;
        descricao: string;
        tipo: tipoLancamentoType;
        valor: number;
    }

    Consolidado {
        data: string;
        valor: number;
    }

# Começando
Primeiro, clone o repositório

```bash
cd FluxoDeCaixa # vá para o diretório raiz do projeto
npm install # instalar dependências de desenvolvimento
npm run dev # watch mode
npm run build # to build the project
```

# Em Desenvolvimento
```bash
npm run dev # watch mode
```

# Em Produção
```bash
npm run compile # to transpile TS to JS
npm run start # to build the project
```

# Exemplo
Com a solução em execução abra no navegador o arquivo index.html da pasta exemplo.
<img src="doc/exemplo1.png">
<img src="doc/exemplo2.png">
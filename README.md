# Descritivo da Solução
Um comerciante precisa controlar o seu fluxo de caixa diário com os lançamentos (débitos e créditos), também precisa de um relatório que disponibilize o saldo diário consolidado.

# Requisitos de Negócio
- Serviço que faça o controle de lançamentos;
- Serviço do consolidado diário.

# Desenho da Solução

Primeiramente, a requisição chega no arquivo app.ts, onde é encaminhada por meio de um router para o controller responsável por seu processamento. Esse controller pode precisar de dados para executar sua função, e esses dados são obtidos por meio de um repository da entidade correspondente, que é o módulo responsável pelo acesso aos dados especificados pelo model. A figura abaixo ilustra esse fluxo de processamento.
<img src="doc/arquitetura.png">

# Implementação da Solução

Implementei uma solução simples utilizando Node.js com Express e TypeScript para criar uma WebAPI.
Além da WebAPI também implementei um exemplo da sua utilização através de uma aplicação frontend em HTML/Javascript.
Optei por não utilizar aqui nenhum banco de dados em específico. Estou usando a memória do processo Node.js como armazenamento temporário, focando mais nos aspectos web da API mesmo.
Para tornar a experiência mais próxima do que se teria com um banco de dados real, que é sempre assíncrono(async), utilizei promessas(promises), embora isso seja completamente desnecessário neste cenário simplificado. No entanto, isso será benéfico posteriormente, quando o banco de dados for conectado. Portanto, todas as funções retornarão uma promessa(Promise).

# Dependências
- Express: webserver que vamos utilizar para a webapi;
- CORS: pacote de segurança necessário para permitir comunicação futura com frontend;
- Helmet: pacote de segurança para dar uma blindada básica na nossa webapi;
- DotEnv: pacote de configuração para cuidar das variáveis de ambiente;
- Morgan: pacote para logging de requisições no terminal;
- Express Async Errors: pacote para conseguir capturar erros assíncronos;
- Typescript: pacote para suporte à typescript no projeto;
- TS-Node: pacote para execução de arquivos TS sem precisar de pré-transpilação;

# Serviços Implementados
- Os serviços da WebAPI está sendo executado no endereço http://localhost:3000/lancamento/v1/
- Serviços disponíveis:
    - “/all”, verbo HTTP GET, recupera todos os lançamentos no formato JSON. (*)
    - “/consolidated:”, verbo HTTP GET, recupera todos os consolidados diários no formato JSON. (*)
    - “/consolidated/:data”, verbo HTTP GET, recupera o consolidado diário de uma data especifica no formato JSON.
    - “/get/:id”, verbo HTTP GET, recupera um lançamento passando o parâmetro do seu “id” no formato JSON.
    - “/save”, verbo HTTP POST, inclui ou altera um determinado lançamento, recebe um objeto, se for passado o “id” neste objeto será realizado a alteração caso contrário será incluído.
    - “/delete/:id”, verbo HTTP DELETE, exclui o lançamento passando o parâmetro do seu “id”.

    (*) Esse serviço foi implementado apenas para esse exercício. Em um cenário real, essa função que retorna todos não existiria e no lugar ela esperaria a quantidade ou página a ser retornada, já que facilmente os registros são na casa dos milhares ou milhões em bancos reais e retornar todos não seria nada performático e prático.

# Estrutura do Objeto JSON
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
npm run dev # modo de assistir(watch)
npm run build # para construir(build) o projeto
```

# Em Desenvolvimento
```bash
npm run dev # modo de assistir(watch)
```

# Em Produção
```bash
npm run compile # para compilar(transpile) TS para JS
npm run start # para construir(build) o projeto
```

# Exemplo
Com a solução em execução abra no navegador o arquivo index.html da pasta exemplo.
<img src="doc/exemplo1.png">
<img src="doc/exemplo2.png">
# 2025.2 - AquiTemFCTE

![Capa AquiTemFCTE](./docs/assets/AquiTemFCTE.png)

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/UnBArqDsw2025-2-Turma02/2025.2_T02_G6_AquiTemFCTE_Entrega_04?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/UnBArqDsw2025-2-Turma02/2025.2_T02_G6_AquiTemFCTE_Entrega_04?style=for-the-badge)
![GitHub views](https://komarev.com/ghpvc/?username=UnBArqDsw2025-2-Turma02&repo=2025.2_T02_G6_AquiTemFCTE_Entrega_04&color=blueviolet&style=for-the-badge&label=Views)

</div>

## Sobre o Projeto

O AquiTemFCTE é uma plataforma digital que busca atender às necessidades da comunidade universitária da Universidade de Brasília (UnB) do Campus Faculdade de Ciências e Tecnologias em Engenharia (FCTE). Nosso principal objetivo é facilitar a compra, venda e troca de itens novos e usados exclusivamente entre os estudantes da universidade, criando um ambiente seguro e confiável para transações.

O projeto foi concebido no âmbito da disciplina de Arquitetura e Desenho de Software (UnB - 2025.2) e visa solucionar a dificuldade que muitos alunos têm em encontrar canais confiáveis para negociar produtos dentro do próprio campus. A plataforma centraliza essas atividades e otimiza a experiência do usuário, oferecendo recursos de pesquisa, categorização de produtos e perfis de usuário verificados.

## ⚙️ Configurando o Ambiente:

Para iniciar sua contribuição ao projeto, primeiro clone o repositório em sua máquina local com o comando abaixo:

```bash
git clone https://github.com/UnBArqDsw2025-2-Turma02/2025.2_T02_G6_AquiTemFCTE_Entrega_04.git
```

Após isso, instale as dependências de desenvolvimento com a utilização do `npm` com o comando abaixo:

```bash
npm install
```

Pronto! Agora o seu ambiente está configurado para dar início às contribuições. Para executar a projeto localmente, siga os passos do próximo tópico.

## 🚀 Executando o Projeto

Este projeto utiliza uma estrutura monorepo com [Turborepo](https://turbo.build/). A documentação é gerada usando o [Docsify](https://docsify.js.org/), a interface é baseada em [ReactJs]() e o backend contruído com <EM BREVE>.

Os comandos disponíveis para executar todo o ambiente pode ser visto abaixo:

- **`npm run dev`**: Inicia o servidor de desenvolvimento da documentação, interface e backend.
- **`npm run build`**: Realiza o build do ambiente da interface e backend.

### Estrutura do Projeto

```
├── apps/
│   └── docs/           # Documentação do projeto (Docsify)
├── packages/           # Pacotes compartilhados
│   ├── ui/            # Componentes de interface
│   ├── eslint-config/ # Configurações do ESLint
│   └── typescript-config/ # Configurações do TypeScript
└── turbo.json         # Configuração do Turborepo
```

### Deploy Automático

O projeto possui um workflow automatizado no GitHub Actions que:
- Testa a build em Pull Requests
- Faz deploy automático para GitHub Pages quando há merge na branch `main`
- A documentação fica disponível em: `https://unbarqdsw2025-2-turma02.github.io/2025.2_T02_G6_AquiTemFCTE_Entrega_04/`

## 🧪 Construído com:

- [Turborepo](https://turbo.build/) - Utilizado para gerenciamento do monorepo
- [Docsify](https://docsify.js.org/) - Utilizado para a documentação do projeto
- [GitHub Actions](https://docs.github.com/en/actions) - Utilizado para CI/CD e deploy automático
- [GitHub Pages](https://pages.github.com/) - Utilizado para hospedagem da documentação
- [Contributor Covenant](https://www.contributor-covenant.org/) - Utilizado para o [Código de Conduta](./CODE_OF_CONDUCT.md)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - Utilizado como Padrão de Commits no [Guia de Contribuição](./CONTRIBUTING.md)
- [GitHub Flow](https://docs.github.com/pt/get-started/using-github/github-flow) - Utilizado como Política de Branchs no [Guia de Contribuição](./CONTRIBUTING.md)

## 📃 Contribuição:

Leia o arquivo [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes e regras para o desenvolvimento, junto ao [Código de Conduta](./CODE_OF_CONDUCT.md) também disponível. Contribuições que fujam destas regras serão recusadas pelos mantenedores do projeto.

## 👩‍💻 Mantenedores:

<div align="center">
  
<table>
  <tr>
    <td align="center" width="120">
      <a href="https://github.com/Algusto-RC">
        <img src="https://github.com/Algusto-RC.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Algusto Rodrigues</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/caiomsabino">
        <img src="https://github.com/caiomsabino.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Caio Lucas</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/DanielRogs">
        <img src="https://github.com/DanielRogs.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Daniel Rodrigues</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/Davicamilo23">
        <img src="https://github.com/Davicamilo23.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Davi Camilo</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/rabelzx">
        <img src="https://github.com/rabelzx.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Eric Rabelo</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="120">
      <a href="https://github.com/felipeacampelo">
        <img src="https://github.com/felipeacampelo.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Felipe de Aquino</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/IgorJustino">
        <img src="https://github.com/IgorJustino.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Igor Justino</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/isaqzin">
        <img src="https://github.com/isaqzin.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Isaque Camargos</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/lcsgborges">
        <img src="https://github.com/lcsgborges.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Lucas Guimarães</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/ludmilaaysha">
        <img src="https://github.com/ludmilaaysha.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Ludmila Aysha</b></sub>
      </a>
    </td>
  </tr>
</table>

</div>
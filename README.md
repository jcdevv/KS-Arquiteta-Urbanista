# Karen Santos — Arquitetura & Urbanismo

Site institucional de portfólio para **Karen Santos**, Arquiteta e Urbanista (CAU/SP), especializada em projetos de regularização, aprovações e licenciamentos junto a órgãos municipais, estaduais e de segurança.

🔗 **[Ver site](#)** _(adicione aqui o link do GitHub Pages depois de publicar)_

## ✨ Sobre o projeto

Site em página única (one-page), com identidade visual em tons de roxo/lilás, tipografia serifada + sans-serif, e um motivo recorrente de "marcas de prancha técnica" que remete ao rigor de projetos de arquitetura.

**Seções:**
- Hero
- Sobre
- Como funciona (processo de trabalho em 4 etapas)
- Serviços
- Contato (com envio direto para WhatsApp)

## 🛠️ Tecnologias

Site estático, sem frameworks nem build step:

- **HTML5** semântico
- **CSS3** puro (variáveis CSS para o design system de cores/tipografia)
- **JavaScript** vanilla (menu mobile, scroll-spy, animações de entrada e envio de contato)
- Fontes via Google Fonts: `Playfair Display`, `DM Sans`, `DM Mono`

## 📁 Estrutura

```
├── index.html   → estrutura e conteúdo do site
├── style.css    → design system e estilos
└── script.js    → interações (menu, scroll, formulário)
```

## 🚀 Como rodar localmente

Não precisa de instalação nem servidor — é só abrir o arquivo:

```bash
# clone o repositório
git clone https://github.com/jcdevv/KS-Arquiteta-Urbanista.git

# entre na pasta e abra o index.html no navegador
cd KS-Arquiteta-Urbanista
```

Ou, se preferir um servidor local simples:

```bash
npx serve .
```

## 📬 Contato do formulário

O formulário de contato monta a mensagem com os dados preenchidos e abre o WhatsApp já com o texto pronto para envio (via `wa.me`), com um fallback para copiar a mensagem manualmente caso o WhatsApp não abra automaticamente.

## 📄 Licença

Todos os direitos reservados © Karen Santos.

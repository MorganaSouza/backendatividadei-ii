const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const languages = [
  { id: 1, name: 'JavaScript', description: 'Linguagem de programação essencial para o desenvolvimento web. Usada para criar interatividade em páginas, manipulação do DOM e comunicação com servidores. Funciona tanto no front-end quanto no back-end (Node.js).' },
  { id: 2, name: 'Python', description: 'Linguagem de alto nível conhecida por sua sintaxe simples e legibilidade. Amplamente utilizada em ciência de dados, automação, inteligência artificial, back-end e scripts.' },
  { id: 3, name: 'Java', description: 'Linguagem orientada a objetos amplamente usada em aplicações corporativas, sistemas bancários, aplicações Android e sistemas distribuídos. Funciona na JVM (Java Virtual Machine).' },
  { id: 4, name: 'C++', description: 'Extensão da linguagem C com recursos de orientação a objetos. Muito utilizada em desenvolvimento de jogos, sistemas embarcados, drivers e aplicações que exigem alta performance.' },
  { id: 5, name: 'Go', description: 'Criada pelo Google, é uma linguagem compilada, rápida e eficiente. Ideal para desenvolvimento de APIs, microsserviços e sistemas concorrentes devido ao seu suporte nativo a goroutines.' },
  { id: 6, name: 'C#', description: 'Linguagem desenvolvida pela Microsoft para a plataforma .NET. Muito usada em aplicações desktop, web, jogos com Unity e sistemas corporativos.' },
  { id: 7, name: 'PHP', description: 'Linguagem de script para desenvolvimento web dinâmico. Ainda muito utilizada em sistemas legados e CMS como WordPress. Suporta integração com bancos de dados e APIs.' },
  { id: 8, name: 'Swift', description: 'Linguagem moderna da Apple para desenvolvimento de aplicativos iOS, iPadOS, macOS, watchOS e tvOS. Foco em segurança, performance e facilidade de uso.' },
  { id: 9, name: 'Kotlin', description: 'Linguagem oficial para Android, interoperável com Java. Possui sintaxe moderna e é usada para desenvolvimento mobile, back-end e aplicativos multiplataforma com Kotlin Multiplatform.' },
  { id: 10, name: 'Rust', description: 'Famosa por sua segurança de memória sem garbage collector. Usada para desenvolvimento de sistemas, jogos, servidores e até navegadores como o Firefox.' },
  { id: 11, name: 'R', description: 'Linguagem focada em estatística, análise de dados e visualização gráfica. Muito utilizada por cientistas de dados e pesquisadores acadêmicos.' },
  { id: 12, name: 'Scala', description: 'Linguagem funcional e orientada a objetos que roda na JVM. Popular em sistemas distribuídos, big data (com Apache Spark) e aplicativos escaláveis.' },
  { id: 13, name: 'Perl', description: 'Linguagem poderosa para processamento de texto, automação de tarefas e scripts em servidores. Ainda usada em bioinformática, administração de sistemas e testes.' },
  { id: 14, name: 'Lua', description: 'Linguagem leve, embutida em motores de jogos como Love2D e em sistemas embarcados. Fácil de integrar com C/C++ e usada como linguagem de script.' },
  { id: 15, name: 'Objective-C', description: 'Linguagem predecessora do Swift, usada no desenvolvimento de aplicativos para sistemas Apple. Baseada em C, com recursos de orientação a objetos.' },
  { id: 16, name: 'C', description: 'Uma das linguagens mais antigas, usada para desenvolvimento de sistemas operacionais (como o Linux), compiladores e aplicações de baixo nível.' },
  { id: 17, name: 'MATLAB', description: 'Linguagem de programação voltada para cálculos numéricos, engenharia e simulações. Usada em pesquisa científica, análise de sinais e aprendizado de máquina.' },
  { id: 18, name: 'Shell', description: 'Linguagem de script usada em ambientes Unix/Linux para automação de tarefas, manipulação de arquivos e execução de comandos no terminal.' },
  { id: 19, name: 'TypeScript', description: 'Superset do JavaScript que adiciona tipagem estática. Muito usado no desenvolvimento front-end moderno com Angular, React e Vue.' },
  { id: 20, name: 'SQL', description: 'Linguagem usada para manipulação e consulta de dados em bancos relacionais. Essencial para qualquer aplicação que utiliza banco de dados.' },
  { id: 21, name: 'Dart', description: 'Linguagem moderna criada pelo Google, usada principalmente com o framework Flutter para desenvolvimento de apps móveis, web e desktop.' },
  { id: 22, name: 'Haskell', description: 'Linguagem puramente funcional, conhecida por sua elegância matemática. Usada em projetos acadêmicos e sistemas críticos que exigem robustez.' },
  { id: 23, name: 'Assembly', description: 'Linguagem de baixo nível próxima ao código de máquina. Usada em firmware, drivers e otimização extrema de performance.' },
  { id: 24, name: 'Elixir', description: 'Linguagem funcional baseada em Erlang. Projetada para aplicações distribuídas, tolerantes a falhas e altamente escaláveis, como sistemas de telecomunicação.' },
  { id: 25, name: 'F#', description: 'Linguagem funcional da Microsoft, parte da plataforma .NET. Usada para cálculos matemáticos, finanças e análise de dados.' },
  { id: 26, name: 'VB.NET', description: 'Variante do Visual Basic para plataforma .NET. Ainda utilizada em ambientes corporativos e aplicações desktop legadas.' },
  { id: 27, name: 'Julia', description: 'Linguagem de alto desempenho voltada para computação científica e análise numérica. Combina velocidade de C com simplicidade de Python.' },
  { id: 28, name: 'COBOL', description: 'Linguagem legada usada em sistemas bancários e governamentais. Focada em processamento de grandes volumes de dados.' },
  { id: 29, name: 'Fortran', description: 'Uma das linguagens mais antigas, usada em engenharia, ciência e computação de alto desempenho (HPC).' },
  { id: 30, name: 'Erlang', description: 'Criada pela Ericsson para sistemas de telecomunicação. Suporta concorrência massiva e é extremamente confiável.' },
  { id: 31, name: 'Ada', description: 'Usada em sistemas embarcados e aplicações militares, com foco em segurança e integridade.' },
  { id: 32, name: 'Groovy', description: 'Linguagem dinâmica para a JVM. Usada em scripts, automação (Jenkins), e aplicações web com Grails.' },
  { id: 33, name: 'VHDL', description: 'Usada para modelagem e simulação de circuitos digitais. Fundamental na engenharia eletrônica e sistemas embarcados.' },
  { id: 34, name: 'Prolog', description: 'Linguagem baseada em lógica. Usada em IA, linguística computacional e sistemas especialistas.' },
  { id: 35, name: 'Scratch', description: 'Linguagem visual para ensinar lógica de programação a crianças. Baseada em blocos arrastáveis.' },
  { id: 36, name: 'Nim', description: 'Linguagem compilada com foco em performance e sintaxe clara. Alternativa moderna ao C e C++.' },
  { id: 37, name: 'Crystal', description: 'Semelhante ao Ruby, mas com tipagem estática e compilação. Promete alta performance com sintaxe expressiva.' },
  { id: 38, name: 'Zig', description: 'Linguagem de sistemas com foco em segurança e previsibilidade. Concorrente moderna do C com compilação eficiente.' },
  { id: 39, name: 'Bash', description: 'Shell padrão em sistemas Linux. Usado para scripts, automação e administração de servidores.' },
  { id: 40, name: 'ReScript', description: 'Linguagem funcional com foco em compilação para JavaScript. Projetada para produtividade e manutenção em grandes projetos.' },
];

app.get('/api/languages', (req, res) => {
    res.json(languages);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

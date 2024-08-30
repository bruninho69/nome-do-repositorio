const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// Carrega os sons
const somCorreto = new Audio('correct-6033.mp3');
const somErrado = new Audio('fail-jingle-stereo-mix-88784.mp3');

const perguntas = [
    {
        enunciado: "A FromSoftware é uma renomada desenvolvedora de jogos japonesa, conhecida por criar títulos desafiadores e inovadores que têm conquistado uma base de fãs dedicada ao redor do mundo. Seu primeiro grande sucesso foi um jogo lançado em 2009 para PlayStation 3 que introduziu um novo estilo de gameplay, qual é o nome deste jogo?",
        alternativas: [
            {
                texto: "Demon’s Souls",
                afirmacao: "✅ Demon Sous foi o primeiro grande sucesso da empresa, porém não foi o primeiro jogo. "
            },
            {
                texto: "Dark Souls",
                afirmacao: "❌ Por mais que Dark Souls sejam um dos maiores sucessos, na verdade o pioneiro da from software foi o Demon Souls, porem não foi exatamente o primeiro jogo."
            }
        ]
    },
    {
        enunciado: "A FromSoftware começou sua jornada no mundo dos jogos de uma forma bastante modesta. Com o lançamento de seu primeiro jogo, a empresa estabeleceu as bases para o que viria a se tornar uma das franquias mais influentes no gênero de RPG. Qual foi o primeiro jogo desenvolvido pela From Software?",
        alternativas: [
            {
                texto: "Kingsfield",
                afirmacao: "✅ O Primeiro jogo da From Software foi Kingsfield, um jogo de primeira pessoa de um homem que está em busca de seu pai desaparecido."
            },
            {
                texto: "Demon Souls",
                afirmacao: "❌ O Primeiro jogo da From Software foi Kingsfield, um jogo de primeira pessoa de um homem que está em busca de seu pai desaparecido."
            }
        ]
    },
    {
        enunciado: "O cenário e a atmosfera de um jogo podem ser profundamente influenciados pela cultura e época que o inspiram. Em um de seus jogos, a FromSoftware mergulha no Japão feudal, misturando elementos históricos e fantásticos. Qual jogo da FromSoftware se passa em um mundo inspirado no Japão feudal?",
        alternativas: [
            {
                texto: "Sekiro: Shadows Die Twice",
                afirmacao: "✅ Sekiro, inspirado no japão feudal é um dos mais recentes sucessos da From Software e que veio a ganhar o premio GOTY em 2019."
            },
            {
                texto: "Bloodborne",
                afirmacao: "❌ Bloodborne um grande suceso da empresa, não se inspira no Japao feudal, o jogo que faz esse papel é Sekiro, um dos mais recentes sucessos da from software, e que veio a ganhar o premio GOTY em 2019."
            }
        ]
    },
    {
        enunciado: "Sekiro: Shadows Die Twice trouxe uma abordagem nova e única ao design de combate da FromSoftware. O jogo se distanciou de alguns elementos tradicionais da série para focar em mecânicas diferentes e exigentes. Qual foi o principal diferencial de Sekiro: Shadows Die Twice em comparação com outros jogos da FromSoftware?",
        alternativas: [
            {
                texto: "Foco em furtividade e exploração de mundo aberto",
                afirmacao: "❌ Não é um jogo mais focado na furtividade, e sim em combates rápidos e com um sistema de bloqueio inovador."
            },
            {
                texto: "Sistema de combate com foco em habilidades de parry e ataque rápido.",
                afirmacao: "✅ O jogo tem uma pegada inovadora de parries e combate mais ágil, por isso ele tem fama de ser um dos jogos mais dificies da empresa."
            }
        ]
    },
    {
        enunciado: "Bloodborne é um dos títulos mais icônicos da FromSoftware, conhecido por sua ambientação sombria e desafiadora. Foi lançado em um ano específico que se destaca por marcar o início de uma nova era para a empresa. Em que ano Bloodborne foi lançado?",
        alternativas: [
            {
                texto: "2014",
                afirmacao: "❌ Um dos outros grandes sucessos da From Software foi o Bloodborne, que foi lançado em 2015"
            },
            {
                texto: "2015",
                afirmacao: "✅ Um dos outros grandes sucessos da From Software foi o Bloodborne, que foi lançado em 2015"
            }
        ]
    },
    {
        enunciado: "A FromSoftware é amplamente associada a um designer influente que desempenha um papel crucial em muitos dos jogos mais renomados da empresa. Sua visão e estilo têm moldado a identidade da desenvolvedora. Qual o nome do criador e principal designer da From Software, conhecido por sua influencia e genialidade em muitos dos jogos da empresa?",
        alternativas: [
            {
                texto: "Fumito Ueda",
                afirmacao: "❌ Fumito Ueda é um dos maiores designers de games, inclusive fez parte da criação de Shadow of the Colossus, porem não tem relação nenhuma com a From Software. O principal designer da From Software é Hidetaka Miyazaki."
            },
            {
                texto: "Hidetaka Miyazaki",
                afirmacao: "✅ O principal designer da From Software é Hidetaka Miyazaki, o principal responsável pelo genero Souls Borne. "
            }
        ]
    },
    {
        enunciado: "Em 2022, a FromSoftware lançou um dos seus títulos mais ambiciosos, oferecendo um vasto mundo aberto e uma nova abordagem para o design de jogos. Este jogo recebeu aclamação pela sua liberdade e profundidade. Qual o nome do mundo onde Elden Ring se passa?",
        alternativas: [
            {
                texto: "The Lands Between",
                afirmacao: "✅ o jogo Elden Ring se passa no mundo de The lands between (também conhecido como Terras Intermédias)."
            },
            {
                texto: "Yharnam",
                afirmacao: "❌ Yharnam é o onde se passa Bloodborne, Elden ring se passa no mundo de The Lands Between."
            }
        ]
    },

];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";

    // Verifica se a resposta está correta ou errada
    if (afirmacoes.includes('✅')) {
        somCorreto.play();
    } else {
        somErrado.play();
    }

    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Resultado...";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
}

mostraPergunta();jai

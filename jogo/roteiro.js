/* ============================================
   ROTEIRO.JS — Toda a história do jogo
   Edite aqui para mudar mensagens, opções, delays
   ============================================

   TIPOS DE CENA:
   tipo: 'in'  = Ademir fala (bolha esquerda)
   tipo: 'out' = Rafaela fala (bolha direita)

   ESPECIAIS:
   esp: 'load-chat'  → barra de loading no início
   esp: 'popup'      → popup "aperte e continue"
   esp: 'big-av'     → avatar cresce (Outro Ademir)
   esp: 'volta-av'   → avatar volta (Ademir original)
   esp: 'drama'      → loading dramático
   esp: 'unica'      → botão único de resposta (sem escolha)
   esp: 'raf'        → 3 opções Rafaela (só 1 certa avança)
   esp: 'fim'        → tela final

   d: delay em ms antes de aparecer a mensagem
   prox: id da próxima cena
*/

const ROTEIRO = [
  // ── ABERTURA ──────────────────────────────────────────
  { id: 0,  esp: 'load-chat', prox: 1 },
  { id: 1,  tipo: 'in',  msg: 'Oi, podemos conversar lindinha? 🥺', d: 1200, prox: 2 },
  { id: 2,  esp: 'popup', prox: 3 },

  // ── BLOCO 1 — Introdução ──────────────────────────────
  { id: 3,  tipo: 'in',  msg: 'Sabe, essa semana, sem você...', d: 1000, prox: 4 },
  { id: 4,  tipo: 'in',  msg: '...uma coisa diferente foi mudando em mim.', d: 1500, prox: 5 },
  { id: 5,  tipo: 'in',  msg: 'Querer ver sua felicidade, seu sorriso...', d: 1600, prox: 6 },
  { id: 6,  tipo: 'in',  msg: 'Tudo que eu acabei fazendo você querer estar longe.', d: 1800, prox: 7 },
  { id: 7,  tipo: 'in',  msg: 'Mas não estamos aqui para lamentações. 💙', d: 1400, prox: 8 },

  // ── OPÇÃO ÚNICA ───────────────────────────────────────
  { id: 8,  esp: 'unica', d: 700, otxt: 'escolha certa¿', prox: 9 },
  { id: 9,  tipo: 'out', msg: 'escolha certa¿', d: 500, prox: 10 },

  // ── BLOCO 2 — Outro Universo ──────────────────────────
  { id: 10, tipo: 'in',  msg: 'Não sei te dizer se para você teve sinais...', d: 1400, prox: 11 },
  { id: 11, tipo: 'in',  msg: '...ou algumas direções que parecem que juntam a gente.', d: 1700, prox: 12 },
  { id: 12, tipo: 'in',  msg: 'Mas meu cérebro foi juntando e nas orações que fiz...', d: 1800, prox: 13 },
  { id: 13, tipo: 'in',  msg: '...meu desejo é ser alguém capaz de fazer sorrisos.', d: 1700, prox: 14 },
  { id: 14, tipo: 'in',  msg: 'Isso aqui, é outro Ademir.', d: 1200, prox: 15 },
  { id: 15, tipo: 'in',  msg: 'Não desse universo — um que inspirou o Ademir que, quando rezou, pediu ajuda. 🙏', d: 2100, prox: 16 },

  { id: 16, esp: 'unica', d: 700, otxt: 'Não é o Ademir desse universo?', prox: 17 },
  { id: 17, tipo: 'out', msg: 'Não é o Ademir desse universo?', d: 500, prox: 18 },

  // ── AVATAR CRESCE — Outro Ademir ─────────────────────
  { id: 18, esp: 'big-av', prox: 19 },
  { id: 19, tipo: 'in',  msg: 'Não sou o seu ex-namorado.', d: 1300, prox: 20 },
  { id: 20, tipo: 'in',  msg: 'Sou o namorado da outra Rafaela.', d: 1400, prox: 21 },
  { id: 21, tipo: 'in',  msg: 'Vim ajudar ele, pois ele pediu direção ao Senhor, e eu vim como uma ajuda.', d: 2100, prox: 22 },
  { id: 22, tipo: 'in',  msg: 'Você agora está lidando com dois Ademiros — e um que teve a direção do Senhor. 🌟', d: 2100, prox: 23 },
  { id: 23, tipo: 'in',  msg: 'Quando ele me contou, disse que foi rude com você.', d: 1700, prox: 24 },
  { id: 24, tipo: 'in',  msg: 'No meu mundo, eu não fiz algumas coisas que ele fez...', d: 1900, prox: 25 },
  { id: 25, tipo: 'in',  msg: '...mas eu errei outras com a Rafa.', d: 1200, prox: 26 },
  { id: 26, tipo: 'in',  msg: 'Parece um evento canônico que isso deveria acontecer para melhorar.', d: 2100, prox: 27 },
  { id: 27, tipo: 'in',  msg: 'No meu mundo, pós uma briga com a Rafaela, eu comecei a ter os mesmos problemas...', d: 2100, prox: 28 },
  { id: 28, tipo: 'in',  msg: '...e eu tentei me matar enquanto namorava a outra você do meu mundo. 💔', d: 2300, prox: 29 },

  // ── LOADING DRAMÁTICO ─────────────────────────────────
  { id: 29, esp: 'drama', prox: 30 },
  { id: 30, tipo: 'in',  msg: 'Mas ela me impediu e eu fui salvo.', d: 1500, prox: 31 },
  { id: 31, tipo: 'in',  msg: 'Me senti mal por ter machucado e lidado com isso...', d: 1800, prox: 32 },
  { id: 32, tipo: 'in',  msg: '...e carrego comigo as cicatrizes que, felizmente, o seu Ademir não carrega.', d: 2100, prox: 33 },

  // ── OPÇÕES RAFAELA ────────────────────────────────────
  {
    id: 33, esp: 'raf', d: 800,
    ops: [
      { t: 'O que faz você pensar que eu voltaria com ele só por causa de um outro Ademir que veio de outro universo? Eu disse que tomei minha decisão.', ok: true,  prox: 34 },
      { t: 'Ok, obrigada por compartilhar isso...', ok: false, prox: 34 },
      { t: 'Que história estranha...', ok: false, prox: 34 }
    ]
  },
  { id: 34, tipo: 'out', msg: 'O que faz você pensar que eu voltaria com ele, só por causa de um outro Ademir que veio de outro universo para ajudar? Eu disse que tomei minha decisão.', d: 500, prox: 35 },

  { id: 35, tipo: 'in',  msg: 'A busca de você é natural para nós que amamos.', d: 1500, prox: 36 },
  { id: 36, tipo: 'in',  msg: 'Quando você quebra um copo, ele volta? Não volta.', d: 1600, prox: 37 },
  { id: 37, tipo: 'in',  msg: 'Mas você ama ele — então faz o possível para não quebrar mais copos.', d: 1900, prox: 38 },
  { id: 38, tipo: 'in',  msg: 'Quando você se arrepende, você muda, melhora e vai atrás.', d: 1700, prox: 39 },
  { id: 39, tipo: 'in',  msg: 'Claro que não digo que você é igual à minha namorada.', d: 1500, prox: 40 },
  { id: 40, tipo: 'in',  msg: 'No meu mundo ela é um pouco mais velha, terminando a escola...', d: 1900, prox: 41 },
  { id: 41, tipo: 'in',  msg: '...não você que recém chegou no primeiro ano. Contudo... 💙', d: 1700, prox: 42 },

  {
    id: 42, esp: 'raf', d: 700,
    ops: [
      { t: 'Não quero saber de você — se conseguiu a outra mim de outro mundo, parabéns. Por que eu deveria estar conectada a você?', ok: true,  prox: 43 },
      { t: 'Isso faz sentido, pode continuar...', ok: false, prox: 43 },
      { t: 'Interessante, mas ainda não entendo...', ok: false, prox: 43 }
    ]
  },
  { id: 43, tipo: 'out', msg: 'Não quero saber de você, se você conseguiu mesmo a outra mim de outro mundo, parabéns para você. Pq eu deveria estar conectada com você¿', d: 500, prox: 44 },

  // ── VOLTA ADEMIR ORIGINAL ─────────────────────────────
  { id: 44, esp: 'volta-av', prox: 45 },
  { id: 45, tipo: 'in',  msg: 'RAFAELA, PRINCESA, não é o outro Ademiro agora.', d: 1500, prox: 46 },
  { id: 46, tipo: 'in',  msg: 'DESCULPA TE ENCHER O SACO 💔💔', d: 1200, prox: 47 },
  { id: 47, tipo: 'in',  msg: 'Eu pedi ajuda a Deus e ele surgiu, dizendo que iria me ajudar e que eu não estava só.', d: 2100, prox: 48 },
  { id: 48, tipo: 'in',  msg: 'EU AMO VOCÊ COM TUDO. QUERO VOCÊ FELIZ.', d: 1500, prox: 49 },
  { id: 49, tipo: 'in',  msg: 'E quero te conquistar — não pelo prazer de conquistar...', d: 1700, prox: 50 },
  { id: 50, tipo: 'in',  msg: '...e sim para ter o meu amor que me fez ver o mundo de outros olhos e me fez apaixonado.', d: 2300, prox: 51 },
  { id: 51, tipo: 'in',  msg: 'Ser alguém melhor. Tudo bem você não querer responder.', d: 1700, prox: 52 },
  { id: 52, tipo: 'in',  msg: 'Mas ele pediu se poderíamos ter essa conversa. Você pode falar com ele? Por favorzinho 🥺', d: 2100, prox: 53 },

  {
    id: 53, esp: 'raf', d: 800,
    ops: [
      { t: 'Se você é o outro Ademir de uma dimensão com a outra Rafaela, como ela lidou com os problemas de estudo?', ok: true,  prox: 54 },
      { t: 'Ok, pode falar...', ok: false, prox: 54 },
      { t: 'Tá bom, mas seja rápido.', ok: false, prox: 54 }
    ]
  },
  { id: 54, tipo: 'out', msg: 'Se você é o outro Ademir de uma dimensão que está com a outra Rafaela, como ela lidou com os problemas de estudo?', d: 500, prox: 55 },

  { id: 55, tipo: 'in',  msg: 'Eu vejo que ela é alguém estudiosa e não precisa de mim.', d: 1500, prox: 56 },
  { id: 56, tipo: 'in',  msg: 'Nunca foi de precisar.', d: 1000, prox: 57 },
  { id: 57, tipo: 'in',  msg: 'E o surto dela — várias vezes ela pensou em terminar comigo.', d: 1900, prox: 58 },
  { id: 58, tipo: 'in',  msg: 'Mas eu não enchi o saco dela que nem esse teu ex que mal conseguia te ver longe sem ficar chorando.', d: 2300, prox: 59 },
  { id: 59, tipo: 'in',  msg: 'Eu expliquei que você só consegue concentrada sozinha — e seus amigos né 😊', d: 2100, prox: 60 },

  {
    id: 60, esp: 'raf', d: 700,
    ops: [
      { t: 'Então tá bom Ademir, entendi. Quero saber mais sobre como vocês quase terminaram — o que ela disse?', ok: true,  prox: 61 },
      { t: 'Hmm, ok...', ok: false, prox: 61 },
      { t: 'Faz sentido...', ok: false, prox: 61 }
    ]
  },
  { id: 61, tipo: 'out', msg: 'Então tabom Ademir, entendi já, tenho o que fazer. Quero saber mais sobre como vcs terminaram quase, o que ela disse?', d: 500, prox: 62 },

  { id: 62, tipo: 'in',  msg: 'Ela me deu uma chance e me disse:', d: 1200, prox: 63 },
  { id: 63, tipo: 'in',  msg: '"Ademir, eu amo você, não estou feliz. Pode me dar esse espaço? Não estou suportando e estou CANSADÍSSIMA. Poderia fazer isso por mim?"', d: 2700, prox: 64 },
  { id: 64, tipo: 'in',  msg: 'E eu respondi como um cavaleiro:', d: 1200, prox: 65 },
  { id: 65, tipo: 'in',  msg: '"Meu amor, desculpe por tudo. Eu nunca mais vou fazer isso. Pode esperar que assim que estiver bem, pode descansar — eu confio em você, mais que qualquer pessoa."', d: 2900, prox: 66 },
  { id: 66, tipo: 'in',  msg: 'Esse foi nosso diálogo. Está bom por você? 💙', d: 1500, prox: 67 },

  {
    id: 67, esp: 'raf', d: 800,
    ops: [
      { t: 'Entendi. Eu me senti mal. Eu não sou ela. Preciso estudar, tempo livre, amigos, missa. O Ademir seria insuportável com isso.', ok: true,  prox: 68 },
      { t: 'Ok, que lindo...', ok: false, prox: 68 },
      { t: 'Entendi...', ok: false, prox: 68 }
    ]
  },
  { id: 68, tipo: 'out', msg: 'Entendi, assim, eu me senti mal, e eu disse no jornal né algumas coisas. Não vou repetir mas dizer: eu não sou ela. Preciso estudar, ter meu tempo livre, ver meus amigos, a Angel, minha família, ir na missa. Quando estávamos juntos, você queria fazer coisas que eu não queria, e fui cansando. Você me disse que era assim o namoro e eu aceitei mesmo não acreditando, pq eu amava você...', d: 500, prox: 69 },

  { id: 69, tipo: 'in',  msg: 'Princesa, eu confio em você.', d: 1500, prox: 70 },
  { id: 70, tipo: 'in',  msg: 'Deus sabe das coisas. Quando eu rezei, eu pensei nisso.', d: 1900, prox: 71 },
  { id: 71, tipo: 'in',  msg: 'Caso você esteja indo para o caminho que ele não deseja para mim, eu não seguiria atrás de você.', d: 2100, prox: 72 },
  { id: 72, tipo: 'in',  msg: 'Mas quando ele me mostrou e deu os sinais, eu acredito que seja certo você.', d: 1900, prox: 73 },
  { id: 73, tipo: 'in',  msg: 'Eu confio. Sei que você chora e não me diz.', d: 1500, prox: 74 },
  { id: 74, tipo: 'in',  msg: 'Li suas msgs quando dormia, e eu me arrependia a cada dia.', d: 1900, prox: 75 },
  { id: 75, tipo: 'in',  msg: 'Mas a gente acabou terminando, então agora... eu não tenho como estar com você.', d: 2100, prox: 76 },
  { id: 76, tipo: 'in',  msg: 'E você nunca teve a obrigação de ser minha posse. Agora é dife....', d: 1700, prox: 77 },

  {
    id: 77, esp: 'raf', d: 700,
    ops: [
      { t: 'NÃO! Eu disse NÃO. Por que você não desiste cara? Eu disse que não quero namorar.', ok: true,  prox: 78 },
      { t: 'Pode continuar...', ok: false, prox: 78 },
      { t: 'Ok...', ok: false, prox: 78 }
    ]
  },
  { id: 78, tipo: 'out', msg: 'NÃO, eu disse NÃO, pq você não desiste cara? Eu disse que não quero namorar.', d: 500, prox: 79 },

  { id: 79, tipo: 'in',  msg: 'Desculpa Rafa, não queremos te incomodar.', d: 1500, prox: 80 },
  { id: 80, tipo: 'in',  msg: 'Apenas ele ama você, e eu quero ajudar ele.', d: 1500, prox: 81 },
  { id: 81, tipo: 'in',  msg: 'Eu sou católico e, depois de você ter feito a confissão no meu mundo, eu confessei e a partir daí, eu respeitei você para sempre.', d: 2600, prox: 82 },
  { id: 82, tipo: 'in',  msg: 'Se precisar, posso te mostrar como eu e ela somos...', d: 1700, prox: 83 },
  { id: 83, tipo: 'in',  msg: '...vamos nos casar. Posso te mostrar nossa foto de casamento? 💍', d: 1900, prox: 84 },

  {
    id: 84, esp: 'raf', d: 800,
    ops: [
      { t: 'Não quero ver. Estou cansada — vocês não sabem do que fiz essa semana. Parem. Eu te amo Ademir, mas meus sentimentos estão bloqueados. Preciso de um tempo.', ok: true,  prox: 85 },
      { t: 'Pode mostrar...', ok: false, prox: 85 },
      { t: 'Ok...', ok: false, prox: 85 }
    ]
  },
  { id: 85, tipo: 'out', msg: 'Não quero ver. Eu me sinto cansada e essa semana eu não contei para vocês, então vocês não têm como saber do que eu fiz. Quero que vocês parem. Eu disse que eu te amo Ademir, mas você precisa entender — para voltar, meus sentimentos estão bloqueados. Preciso de um tempo.', d: 500, prox: 86 },

  { id: 86, tipo: 'in',  msg: 'Princesa, somente amor não pode consertar corações machucados.', d: 1700, prox: 87 },
  { id: 87, tipo: 'in',  msg: 'Às vezes, abraços quentinhos, colos e beijos valem mais de mil palavras.', d: 1900, prox: 88 },
  { id: 88, tipo: 'in',  msg: 'Se você me permitisse, eu iria te ver agora — mesmo que por 30 minutos.', d: 1900, prox: 89 },
  { id: 89, tipo: 'in',  msg: 'Só para abraçá-la e depois voltar para casa.', d: 1500, prox: 90 },
  { id: 90, tipo: 'in',  msg: 'Jogaria 99 Nights com você. Jogaríamos Minecraftinho com todo coração 🎮❤️', d: 2100, prox: 91 },

  {
    id: 91, esp: 'raf', d: 800,
    ops: [
      { t: 'Eu tenho muito que estudar. No tempo livre quero meus amigos, minha família, a missa. Você queria coisas que eu não queria e fui cansando. Esse sentimento que aperta meu peito diz que não estava no caminho que Deus desejava...', ok: true,  prox: 92 },
      { t: 'Que fofo...', ok: false, prox: 92 },
      { t: 'Hmm...', ok: false, prox: 92 }
    ]
  },
  { id: 92, tipo: 'out', msg: 'Eu tenho muita coisa para estudar, e no meu tempo livre eu não posso só ficar com você. Quero ver meus amigos, a Angel, minha família e ir na missa. Quando estávamos, você queria fazer coisas que eu não queria, e fui cansando. Você me disse que era assim o namoro e eu aceitei mesmo não acreditando, pq eu amava você... esse sentimento que aperta meu peito diz que não estava no caminho correto que Deus desejava.......', d: 500, prox: 93 },

  { id: 93, tipo: 'in',  msg: 'Espero que por mensagens você não esteja chorando.', d: 1500, prox: 94 },
  { id: 94, tipo: 'in',  msg: 'Não quero que você veja por esse lado.', d: 1300, prox: 95 },
  { id: 95, tipo: 'in',  msg: 'Eu esperei todos os momentos que poderia para te ver, rezar por você.', d: 1900, prox: 96 },
  { id: 96, tipo: 'in',  msg: 'Eu errei, e admito. Fui ruim em muitas coisas.', d: 1500, prox: 97 },
  { id: 97, tipo: 'in',  msg: 'E eu confessei e curei disso. Meus pecados foram perdoados.', d: 1700, prox: 98 },
  { id: 98, tipo: 'in',  msg: 'Me sinto bem comigo mesmo — mas quero que você se sinta.', d: 1700, prox: 99 },
  { id: 99, tipo: 'in',  msg: 'EU AMO VOCÊ, de todas as maneiras. O verdadeiro amor é amar todas as faces.', d: 2100, prox: 100 },
  { id: 100, tipo: 'in', msg: 'Vi você brava, chorando, com fome, cansada e sonolenta — e todas eu amei.', d: 2300, prox: 101 },
  { id: 101, tipo: 'in', msg: 'Tal qual você agora que não é mais meu amor.', d: 1500, prox: 102 },
  { id: 102, tipo: 'in', msg: 'Perdão, mas só posso oferecer isso que Deus permitiu.', d: 1700, prox: 103 },
  { id: 103, tipo: 'in', msg: 'Que a vontade Dele seja superior.', d: 1200, prox: 104 },
  { id: 104, tipo: 'in', msg: 'Mas preciso só do seu Sim para o futuro — que eu vou fazer para a gente sem você se estressar. 💙', d: 2400, prox: 105 },

  {
    id: 105, esp: 'raf', d: 800,
    ops: [
      { t: 'Não pera — eu disse que não existe isso de esperar. Eu acredito em você, o sentimento realmente cansa, mas para voltar... não seria errado você fazer tudo isso por uma garota de 15?', ok: true,  prox: 106 },
      { t: 'Tá bem...', ok: false, prox: 106 },
      { t: 'Hmm...', ok: false, prox: 106 }
    ]
  },
  { id: 106, tipo: 'out', msg: 'não pera, eu te disse que não existe isso de esperar. Eu acredito em você, o sentimento realmente cansa, mas para voltar, não seria errado você fazer tudo isso por uma garota de 15?', d: 500, prox: 107 },

  { id: 107, tipo: 'in', msg: 'Não é errado fazer por quem ama.', d: 1500, prox: 108 },
  { id: 108, tipo: 'in', msg: 'Eu fiz esse jogo porque quero você de volta, mais do que qualquer coisa.', d: 1900, prox: 109 },
  { id: 109, tipo: 'in', msg: 'Quero você sorrindo e te vendo quando puder — respeitando tudo e correto por Deus.', d: 2100, prox: 110 },
  { id: 110, tipo: 'in', msg: 'Eu confessei e me sinto o melhor Ademiro que já fui.', d: 1700, prox: 111 },
  { id: 111, tipo: 'in', msg: 'Por você, eu espero.', d: 1000, prox: 112 },
  { id: 112, tipo: 'in', msg: 'Por você, eu só preciso que conversemos.', d: 1500, prox: 113 },
  { id: 113, tipo: 'in', msg: 'Sei que você está sentindo seu coração turbulento...', d: 1700, prox: 114 },
  { id: 114, tipo: 'in', msg: '...não sabendo se quer voltar comigo ou seguir com outra pessoa.', d: 1900, prox: 115 },
  { id: 115, tipo: 'in', msg: 'Mas pós eu ler o journal e escrever nele, meus sentimentos por você aumentaram.', d: 2100, prox: 116 },
  { id: 116, tipo: 'in', msg: 'E genuinamente quero que você seja feliz.', d: 1500, prox: 117 },
  { id: 117, tipo: 'in', msg: 'Quero saber se pode ser comigo.', d: 1200, prox: 118 },
  { id: 118, tipo: 'in', msg: 'Pode deixar eu segurar a sua mão?', d: 1400, prox: 119 },
  { id: 119, tipo: 'in', msg: 'Para eu fugir dessa terrível escuridão 🐉✨', d: 1400, prox: 120 },
  { id: 120, tipo: 'in', msg: 'Eu fiz isso para você ter uma pequena diferença no seu final de semana.', d: 1900, prox: 121 },
  { id: 121, tipo: 'in', msg: 'A história é da minha cabeça — enfim, obrigado. ❤️', d: 1700, prox: 122 },

  // ── RESPOSTA FINAL RAFAELA ────────────────────────────
  {
    id: 122, esp: 'raf', d: 800,
    ops: [
      { t: 'Hora de conversarmos pessoalmente, Ademir. ❤️', ok: true,  prox: 123 },
      { t: 'Obrigada...', ok: false, prox: 123 },
      { t: 'Ok...', ok: false, prox: 123 }
    ]
  },
  { id: 123, tipo: 'out', msg: 'Hora de conversarmos pessoalmente Ademir ❤️', d: 500, prox: 124 },

  // ── FIM ───────────────────────────────────────────────
  { id: 124, esp: 'fim', d: 2200 }
];

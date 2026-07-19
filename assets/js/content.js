/* ============================================================
   content.js — conteúdo do curso que acompanha o app.

   Baseado na "Apostila de Inglês Básico — Inglês para o Ambiente
   Industrial (Nível Iniciante A1)" da Teacher Gabriella Ferraz.
   10 aulas, cada uma com:
     - vocabulary (inclui vocabulário corporativo/industrial)
     - videos  (YouTube verificados: no ar e incorporáveis)
     - dialogue (ÁUDIO: pessoas conversando sobre o tema — o app lê
       em voz alta com a voz do navegador — + exercícios de áudio)
     - reading  (texto curto + exercícios de leitura)
     - exercises (gramática/vocabulário)
   Todos os exercícios são de correção automática (mcq/fill/truefalse).

   A professora pode adicionar mais vídeos/exercícios no modo Admin.
   ============================================================ */
window.GSE = window.GSE || {};

window.GSE.SEED = {
  "generatedAt": "2026-07-18",
  "source": "Apostila de Inglês Básico — Inglês para o Ambiente Industrial (A1) · Teacher Gabriella Ferraz",
  "units": [
    {
      "id": "alphabet-greetings",
      "title": "The Alphabet & Greetings",
      "titlePt": "Aula 1 · O Alfabeto e os Cumprimentos",
      "level": "A1",
      "emoji": "👋",
      "description": "Aprenda o alfabeto, a soletrar o seu nome e a cumprimentar, se apresentar e se despedir no trabalho.",
      "searchQuery": "english alphabet and greetings for beginners",
      "vocabulary": [
        {
          "en": "Hello / Hi",
          "pt": "Olá / Oi"
        },
        {
          "en": "Good morning",
          "pt": "Bom dia"
        },
        {
          "en": "Good afternoon",
          "pt": "Boa tarde"
        },
        {
          "en": "Good evening",
          "pt": "Boa noite (ao chegar)"
        },
        {
          "en": "Good night",
          "pt": "Boa noite (ao se despedir)"
        },
        {
          "en": "How are you?",
          "pt": "Como você está?"
        },
        {
          "en": "I'm fine, thank you",
          "pt": "Estou bem, obrigado(a)"
        },
        {
          "en": "Nice to meet you",
          "pt": "Prazer em conhecer você"
        },
        {
          "en": "What's your name?",
          "pt": "Qual é o seu nome?"
        },
        {
          "en": "My name is...",
          "pt": "Meu nome é..."
        },
        {
          "en": "Goodbye / Bye",
          "pt": "Tchau / Adeus"
        },
        {
          "en": "See you tomorrow",
          "pt": "Até amanhã"
        },
        {
          "en": "to spell",
          "pt": "soletrar"
        },
        {
          "en": "PPCP Analyst",
          "pt": "Analista de PPCP"
        },
        {
          "en": "Production Planning and Control",
          "pt": "Planejamento, Programação e Controle da Produção"
        },
        {
          "en": "Shipping Coordinator",
          "pt": "Coordenador(a) de Expedição"
        },
        {
          "en": "Manager",
          "pt": "Gerente"
        },
        {
          "en": "Supervisor",
          "pt": "Supervisor(a)"
        },
        {
          "en": "Colleague",
          "pt": "Colega de trabalho"
        },
        {
          "en": "Department / Sector",
          "pt": "Departamento / Setor"
        },
        {
          "en": "Company",
          "pt": "Empresa"
        }
      ],
      "videos": [
        {
          "title": "English Greetings and Introductions - Spoken English",
          "channel": "Oxford Online English",
          "youtubeId": "sp3xU5WvRjA",
          "url": "https://www.youtube.com/watch?v=sp3xU5WvRjA"
        },
        {
          "title": "Learn Canadian English | Greetings, Introductions, and Goodbyes",
          "channel": "Right Start Newcomer Services",
          "youtubeId": "b_EosOqIQfA",
          "url": "https://www.youtube.com/watch?v=b_EosOqIQfA"
        },
        {
          "title": "Alphabet ABC | Learn and Practice Phonic Sounds",
          "channel": "Shaw English Online",
          "youtubeId": "lU6f9qGusjI",
          "url": "https://www.youtube.com/watch?v=lU6f9qGusjI"
        },
        {
          "title": "English Alphabet Pronunciation - Practical ABC Lesson",
          "channel": "English Like A Native",
          "youtubeId": "3rlPI1kIxAM",
          "url": "https://www.youtube.com/watch?v=3rlPI1kIxAM"
        }
      ],
      "dialogue": {
        "title": "A First Conversation",
        "lines": [
          {
            "s": "Carlos",
            "en": "Hello! Good morning.",
            "pt": "Olá! Bom dia."
          },
          {
            "s": "Ana",
            "en": "Good morning! How are you?",
            "pt": "Bom dia! Como você está?"
          },
          {
            "s": "Carlos",
            "en": "I'm fine, thank you. And you?",
            "pt": "Estou bem, obrigado. E você?"
          },
          {
            "s": "Ana",
            "en": "I'm fine too. What's your name?",
            "pt": "Estou bem também. Qual é o seu nome?"
          },
          {
            "s": "Carlos",
            "en": "My name is Carlos. Nice to meet you.",
            "pt": "Meu nome é Carlos. Prazer em conhecer você."
          },
          {
            "s": "Ana",
            "en": "Nice to meet you, Carlos. My name is Ana.",
            "pt": "Prazer em conhecer você, Carlos. Meu nome é Ana."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "What is the man's name?",
            "options": [
              "Carlos",
              "Ana",
              "Paulo"
            ],
            "answer": 0,
            "explanation": "Ele diz: 'My name is Carlos'."
          },
          {
            "type": "truefalse",
            "question": "They meet in the morning.",
            "answer": true,
            "explanation": "Eles dizem 'Good morning', então é de manhã."
          },
          {
            "type": "mcq",
            "question": "How does Ana feel?",
            "options": [
              "fine",
              "tired",
              "sad"
            ],
            "answer": 0,
            "explanation": "Ela diz 'I'm fine too' (Estou bem também)."
          }
        ]
      },
      "reading": {
        "title": "Ana at the factory",
        "textEn": "Ana works in a factory. Every morning she says \"Good morning\" to her colleagues. She is friendly and she likes her team. At the end of the day, she says \"Goodbye\" and \"See you tomorrow\".",
        "textPt": "Ana trabalha em uma fábrica. Toda manhã ela diz \"Bom dia\" aos colegas. Ela é simpática e gosta da sua equipe. No fim do dia, ela diz \"Tchau\" e \"Até amanhã\".",
        "questions": [
          {
            "type": "mcq",
            "question": "Where does Ana work?",
            "options": [
              "in a factory",
              "in a school",
              "at home"
            ],
            "answer": 0,
            "explanation": "O texto diz 'Ana works in a factory'."
          },
          {
            "type": "truefalse",
            "question": "Ana says \"Good morning\" to her colleagues.",
            "answer": true,
            "explanation": "Sim: 'she says Good morning to her colleagues'."
          },
          {
            "type": "mcq",
            "question": "What does Ana say at the end of the day?",
            "options": [
              "Good morning",
              "Goodbye",
              "Hello"
            ],
            "answer": 1,
            "explanation": "No fim do dia ela diz 'Goodbye'."
          }
        ]
      },
      "exercises": [
        {
          "type": "mcq",
          "question": "You arrive at work at 8 a.m. What do you say?",
          "options": [
            "Good night",
            "Good morning",
            "Goodbye"
          ],
          "answer": 1,
          "explanation": "De manhã usamos 'Good morning' (Bom dia). 'Good night' é só ao se despedir à noite."
        },
        {
          "type": "mcq",
          "question": "Someone says 'Nice to meet you.' A good reply is:",
          "options": [
            "Nice to meet you, too",
            "You're welcome",
            "Goodbye"
          ],
          "answer": 0,
          "explanation": "Respondemos 'Nice to meet you, too' (Prazer em conhecer você também)."
        },
        {
          "type": "fill",
          "question": "Hello! My name ___ Ana.",
          "answer": "is",
          "explanation": "'My name is...' (Meu nome é...). O verbo correto é 'is'."
        },
        {
          "type": "fill",
          "question": "To ask a colleague's name: '___ your name?'",
          "answer": "what's",
          "explanation": "A pergunta é 'What's your name?'. 'What's' é a forma curta de 'What is'."
        },
        {
          "type": "truefalse",
          "question": "'Good night' is used when you arrive at work in the morning.",
          "answer": false,
          "explanation": "Falso. 'Good night' é uma despedida à noite. De manhã use 'Good morning'."
        },
        {
          "type": "mcq",
          "question": "How do you say 'colega de trabalho' in English?",
          "options": [
            "manager",
            "colleague",
            "company"
          ],
          "answer": 1,
          "explanation": "'Colega de trabalho' é 'colleague'. 'Manager' é gerente e 'company' é empresa."
        },
        {
          "type": "fill",
          "question": "When you leave and say bye, you say '___'.",
          "answer": "goodbye",
          "explanation": "'Goodbye' (Tchau/Adeus) é usado ao se despedir e ir embora."
        },
        {
          "type": "truefalse",
          "question": "To spell a word in English, you say the letters one by one.",
          "answer": true,
          "explanation": "Verdadeiro. Soletrar (to spell) é dizer as letras uma a uma."
        }
      ],
      "speaking": {
        "prompt": "Cumprimente um colega, diga o seu nome e como você está. Ex.: use 'Good morning', 'My name is...', 'I am fine'.",
        "example": "Good morning. My name is Ana. Nice to meet you. I am fine, thank you.",
        "keywords": [
          "morning",
          "name",
          "nice",
          "fine"
        ]
      }
    },
    {
      "id": "numbers",
      "title": "Numbers",
      "titlePt": "Aula 2 · Os Números",
      "level": "A1",
      "emoji": "🔢",
      "description": "Conte de 0 a 1.000.000 e use números no trabalho: caixas, peças, paletes, quantidades e pedidos.",
      "searchQuery": "english numbers 0 to 1000000 for beginners",
      "vocabulary": [
        {
          "en": "zero, one, two, three",
          "pt": "0, 1, 2, 3"
        },
        {
          "en": "four, five, six, seven",
          "pt": "4, 5, 6, 7"
        },
        {
          "en": "eight, nine, ten",
          "pt": "8, 9, 10"
        },
        {
          "en": "eleven, twelve, thirteen",
          "pt": "11, 12, 13"
        },
        {
          "en": "fourteen … nineteen",
          "pt": "14 … 19"
        },
        {
          "en": "twenty / thirty / forty",
          "pt": "20 / 30 / 40"
        },
        {
          "en": "fifty / sixty / seventy",
          "pt": "50 / 60 / 70"
        },
        {
          "en": "eighty / ninety",
          "pt": "80 / 90"
        },
        {
          "en": "one hundred",
          "pt": "cem"
        },
        {
          "en": "one thousand",
          "pt": "mil"
        },
        {
          "en": "one million",
          "pt": "um milhão"
        },
        {
          "en": "Unit(s)",
          "pt": "Unidade(s)"
        },
        {
          "en": "Piece(s)",
          "pt": "Peça(s)"
        },
        {
          "en": "Box(es)",
          "pt": "Caixa(s)"
        },
        {
          "en": "Pallet",
          "pt": "Palete"
        },
        {
          "en": "Quantity",
          "pt": "Quantidade"
        },
        {
          "en": "Total",
          "pt": "Total"
        },
        {
          "en": "Weight",
          "pt": "Peso"
        },
        {
          "en": "Order",
          "pt": "Pedido"
        },
        {
          "en": "Stock / Inventory",
          "pt": "Estoque"
        },
        {
          "en": "Item number",
          "pt": "Número do item / código"
        }
      ],
      "videos": [
        {
          "title": "Learn English Numbers + Practice | Complete Course for Beginners",
          "channel": "Shaw English Online",
          "youtubeId": "jf6wSTcscxs",
          "url": "https://www.youtube.com/watch?v=jf6wSTcscxs"
        },
        {
          "title": "6 Minute Vocabulary: First, second, third: Ordinal numbers",
          "channel": "BBC Learning English",
          "youtubeId": "iLbNZLQwk74",
          "url": "https://www.youtube.com/watch?v=iLbNZLQwk74"
        }
      ],
      "dialogue": {
        "title": "Numbers at Work",
        "lines": [
          {
            "s": "Ana",
            "en": "Good morning, Paulo. How many boxes are ready?",
            "pt": "Bom dia, Paulo. Quantas caixas estão prontas?"
          },
          {
            "s": "Paulo",
            "en": "Good morning. There are fifty boxes.",
            "pt": "Bom dia. Há cinquenta caixas."
          },
          {
            "s": "Ana",
            "en": "And how many pieces in each box?",
            "pt": "E quantas peças em cada caixa?"
          },
          {
            "s": "Paulo",
            "en": "Twenty pieces in each box.",
            "pt": "Vinte peças em cada caixa."
          },
          {
            "s": "Ana",
            "en": "Perfect. We send one thousand products today.",
            "pt": "Perfeito. Enviamos mil produtos hoje."
          },
          {
            "s": "Paulo",
            "en": "OK. The order is for one thousand.",
            "pt": "Ok. O pedido é de mil."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "How many boxes are ready?",
            "options": [
              "fifteen",
              "fifty",
              "five"
            ],
            "answer": 1,
            "explanation": "Paulo diz 'There are fifty boxes' (cinquenta)."
          },
          {
            "type": "truefalse",
            "question": "Each box has twenty pieces.",
            "answer": true,
            "explanation": "Sim: 'Twenty pieces in each box'."
          },
          {
            "type": "mcq",
            "question": "How many products do they send today?",
            "options": [
              "one hundred",
              "one thousand",
              "one million"
            ],
            "answer": 1,
            "explanation": "'We send one thousand products today' (mil)."
          }
        ]
      },
      "reading": {
        "title": "The warehouse",
        "textEn": "The warehouse is big. There are fifty boxes on the shelf. Each box has twenty pieces. Today the team sends one thousand products to the client. The order is very important.",
        "textPt": "O armazém é grande. Há cinquenta caixas na prateleira. Cada caixa tem vinte peças. Hoje a equipe envia mil produtos ao cliente. O pedido é muito importante.",
        "questions": [
          {
            "type": "mcq",
            "question": "How many boxes are on the shelf?",
            "options": [
              "fifteen",
              "fifty",
              "five"
            ],
            "answer": 1,
            "explanation": "'There are fifty boxes on the shelf'."
          },
          {
            "type": "truefalse",
            "question": "Each box has twenty pieces.",
            "answer": true,
            "explanation": "Sim: 'Each box has twenty pieces'."
          },
          {
            "type": "mcq",
            "question": "How many products does the team send today?",
            "options": [
              "one hundred",
              "one thousand",
              "one million"
            ],
            "answer": 1,
            "explanation": "'the team sends one thousand products'."
          }
        ]
      },
      "exercises": [
        {
          "type": "mcq",
          "question": "How do you write the number 3 in English?",
          "options": [
            "two",
            "three",
            "four"
          ],
          "answer": 1,
          "explanation": "3 é 'three'. 'Two' é 2 e 'four' é 4."
        },
        {
          "type": "fill",
          "question": "50 in English is ___.",
          "answer": "fifty",
          "explanation": "50 = 'fifty'. Cuidado para não confundir com 'fifteen' (15)."
        },
        {
          "type": "fill",
          "question": "The word for 100 is 'one ___'.",
          "answer": "hundred",
          "explanation": "100 = 'one hundred' (cem)."
        },
        {
          "type": "mcq",
          "question": "125 in English is:",
          "options": [
            "one hundred and twenty-five",
            "one hundred twelve",
            "twelve five"
          ],
          "answer": 0,
          "explanation": "125 = 'one hundred and twenty-five'."
        },
        {
          "type": "truefalse",
          "question": "In English, '1,000' (with a comma) means 'mil'.",
          "answer": true,
          "explanation": "Verdadeiro. Em inglês o ponto e a vírgula são trocados: mil = 1,000."
        },
        {
          "type": "mcq",
          "question": "Each pallet has 48 units. '48' in English is:",
          "options": [
            "fourteen",
            "forty",
            "forty-eight"
          ],
          "answer": 2,
          "explanation": "48 = 'forty-eight' (forty + eight)."
        },
        {
          "type": "mcq",
          "question": "'Caixa' in English is:",
          "options": [
            "piece",
            "box",
            "pallet"
          ],
          "answer": 1,
          "explanation": "'Caixa' é 'box'. 'Piece' é peça e 'pallet' é palete."
        },
        {
          "type": "truefalse",
          "question": "'Thirty' means 13.",
          "answer": false,
          "explanation": "Falso. 'Thirty' é 30. 13 é 'thirteen'."
        }
      ],
      "speaking": {
        "prompt": "Fale sobre números no seu trabalho: quantas caixas, peças ou produtos há.",
        "example": "There are fifty boxes. Each box has twenty pieces. We ship one thousand products.",
        "keywords": [
          "boxes",
          "pieces",
          "products",
          "thousand"
        ]
      }
    },
    {
      "id": "days-time",
      "title": "Days, Months & Time",
      "titlePt": "Aula 3 · Dias, Meses e Horas",
      "level": "A1",
      "emoji": "🗓️",
      "description": "Diga os dias da semana, os meses do ano e as horas — incluindo turnos e horários de trabalho.",
      "searchQuery": "days months and telling time in english for beginners",
      "vocabulary": [
        {
          "en": "Monday, Tuesday, Wednesday",
          "pt": "segunda, terça, quarta"
        },
        {
          "en": "Thursday, Friday",
          "pt": "quinta, sexta"
        },
        {
          "en": "Saturday, Sunday",
          "pt": "sábado, domingo"
        },
        {
          "en": "January … June",
          "pt": "janeiro … junho"
        },
        {
          "en": "July … December",
          "pt": "julho … dezembro"
        },
        {
          "en": "What time is it?",
          "pt": "Que horas são?"
        },
        {
          "en": "It's seven o'clock",
          "pt": "São sete em ponto"
        },
        {
          "en": "half past seven",
          "pt": "sete e meia"
        },
        {
          "en": "a quarter past / to",
          "pt": "e quinze / quinze para"
        },
        {
          "en": "a.m. / p.m.",
          "pt": "manhã / tarde-noite"
        },
        {
          "en": "noon / midnight",
          "pt": "meio-dia / meia-noite"
        },
        {
          "en": "Schedule",
          "pt": "Cronograma / agenda"
        },
        {
          "en": "Shift",
          "pt": "Turno"
        },
        {
          "en": "Morning / Night shift",
          "pt": "Turno da manhã / noite"
        },
        {
          "en": "Working hours",
          "pt": "Horário de trabalho"
        },
        {
          "en": "Deadline",
          "pt": "Prazo final"
        },
        {
          "en": "Delivery date",
          "pt": "Data de entrega"
        },
        {
          "en": "Meeting",
          "pt": "Reunião"
        },
        {
          "en": "Break",
          "pt": "Intervalo / pausa"
        },
        {
          "en": "On time / Late",
          "pt": "No prazo / atrasado"
        },
        {
          "en": "Overtime",
          "pt": "Hora extra"
        }
      ],
      "videos": [
        {
          "title": "Beginner 2 English Course: Calendar Vocabulary - Days, Weeks, Months, Years, and Seasons",
          "channel": "Shaw English Online",
          "youtubeId": "To6NiejpCzk",
          "url": "https://www.youtube.com/watch?v=To6NiejpCzk"
        },
        {
          "title": "How to Talk About Time in English - Time Prepositions and Phrases",
          "channel": "Oxford Online English",
          "youtubeId": "ViVuOsdaHHs",
          "url": "https://www.youtube.com/watch?v=ViVuOsdaHHs"
        },
        {
          "title": "How to tell the time in English | Learn English with Cambridge",
          "channel": "Learn English with Cambridge",
          "youtubeId": "oB3eiXCJbwA",
          "url": "https://www.youtube.com/watch?v=oB3eiXCJbwA"
        }
      ],
      "dialogue": {
        "title": "My Work Schedule",
        "lines": [
          {
            "s": "Supervisor",
            "en": "Hi, Ana. What time do you start work?",
            "pt": "Oi, Ana. Que horas você começa a trabalhar?"
          },
          {
            "s": "Ana",
            "en": "I start at seven o'clock in the morning.",
            "pt": "Começo às sete em ponto de manhã."
          },
          {
            "s": "Supervisor",
            "en": "And when is the meeting?",
            "pt": "E quando é a reunião?"
          },
          {
            "s": "Ana",
            "en": "The meeting is at ten, on Friday.",
            "pt": "A reunião é às dez, na sexta-feira."
          },
          {
            "s": "Supervisor",
            "en": "What time do you finish?",
            "pt": "Que horas você termina?"
          },
          {
            "s": "Ana",
            "en": "I finish at five thirty.",
            "pt": "Termino às cinco e meia."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "What time does Ana start work?",
            "options": [
              "six o'clock",
              "seven o'clock",
              "ten o'clock"
            ],
            "answer": 1,
            "explanation": "'I start at seven o'clock'."
          },
          {
            "type": "mcq",
            "question": "When is the meeting?",
            "options": [
              "Monday",
              "Friday",
              "Sunday"
            ],
            "answer": 1,
            "explanation": "'The meeting is at ten, on Friday'."
          },
          {
            "type": "truefalse",
            "question": "Ana finishes at five thirty.",
            "answer": true,
            "explanation": "Sim: 'I finish at five thirty'."
          }
        ]
      },
      "reading": {
        "title": "Paulo's schedule",
        "textEn": "Paulo works the morning shift. He starts at seven o'clock and finishes at five thirty. On Friday, he has a meeting at ten. He never works on Sunday.",
        "textPt": "Paulo trabalha no turno da manhã. Ele começa às sete em ponto e termina às cinco e meia. Na sexta-feira, ele tem uma reunião às dez. Ele nunca trabalha no domingo.",
        "questions": [
          {
            "type": "mcq",
            "question": "What time does Paulo start?",
            "options": [
              "six",
              "seven",
              "ten"
            ],
            "answer": 1,
            "explanation": "'He starts at seven o'clock'."
          },
          {
            "type": "truefalse",
            "question": "Paulo works on Sunday.",
            "answer": false,
            "explanation": "Falso: 'He never works on Sunday'."
          },
          {
            "type": "mcq",
            "question": "When is Paulo's meeting?",
            "options": [
              "Monday at nine",
              "Friday at ten",
              "Sunday at five"
            ],
            "answer": 1,
            "explanation": "'On Friday, he has a meeting at ten'."
          }
        ]
      },
      "exercises": [
        {
          "type": "mcq",
          "question": "Which day comes after Monday?",
          "options": [
            "Sunday",
            "Tuesday",
            "Friday"
          ],
          "answer": 1,
          "explanation": "Depois de Monday (segunda) vem Tuesday (terça)."
        },
        {
          "type": "fill",
          "question": "There are seven days in a ___.",
          "answer": "week",
          "explanation": "Uma semana ('week') tem sete dias."
        },
        {
          "type": "truefalse",
          "question": "There are twelve months in a year.",
          "answer": true,
          "explanation": "Verdadeiro. Um ano tem doze meses ('months')."
        },
        {
          "type": "mcq",
          "question": "'What time is it?' — 7:30 (jeito digital) →",
          "options": [
            "seven thirty",
            "seven three",
            "half seven"
          ],
          "answer": 0,
          "explanation": "No estilo digital lemos os números na ordem: 7:30 = 'seven thirty'."
        },
        {
          "type": "fill",
          "question": "7:15 = 'a quarter ___ seven'.",
          "answer": "past",
          "explanation": "'a quarter past seven' = sete e quinze. 'past' = passado da hora."
        },
        {
          "type": "mcq",
          "question": "'Turno da noite' in English is:",
          "options": [
            "night shift",
            "night schedule",
            "deadline"
          ],
          "answer": 0,
          "explanation": "'Turno da noite' é 'night shift'. 'Shift' = turno."
        },
        {
          "type": "fill",
          "question": "The final date to finish a job is the ___.",
          "answer": "deadline",
          "explanation": "'Deadline' é o prazo final para terminar algo."
        },
        {
          "type": "truefalse",
          "question": "'Noon' means midnight (meia-noite).",
          "answer": false,
          "explanation": "Falso. 'Noon' é meio-dia. Meia-noite é 'midnight'."
        }
      ],
      "speaking": {
        "prompt": "Fale sobre o seu horário de trabalho: que horas começa, quando é a reunião e que horas termina.",
        "example": "I start work at seven o'clock. The meeting is on Friday. I finish at five thirty.",
        "keywords": [
          "start",
          "work",
          "meeting",
          "finish"
        ]
      }
    },
    {
      "id": "to-be",
      "title": "Personal Information — Verb to be",
      "titlePt": "Aula 4 · Informações Pessoais — Verbo to be",
      "level": "A1",
      "emoji": "🪪",
      "description": "Use am / is / are para dizer quem você é, sua profissão e idade, e para se apresentar no trabalho.",
      "searchQuery": "verb to be am is are personal information english beginners",
      "vocabulary": [
        {
          "en": "I am (I'm)",
          "pt": "eu sou / estou"
        },
        {
          "en": "you are / he is / she is",
          "pt": "você é/está · ele é/está · ela é/está"
        },
        {
          "en": "it is / we are / they are",
          "pt": "isto é · nós somos · eles são"
        },
        {
          "en": "I'm not / isn't / aren't",
          "pt": "eu não sou · não é · não são"
        },
        {
          "en": "Are you...? / Is he...?",
          "pt": "Você é...? / Ele é...?"
        },
        {
          "en": "full name",
          "pt": "nome completo"
        },
        {
          "en": "first name",
          "pt": "primeiro nome"
        },
        {
          "en": "last name / surname",
          "pt": "sobrenome"
        },
        {
          "en": "age",
          "pt": "idade"
        },
        {
          "en": "nationality",
          "pt": "nacionalidade"
        },
        {
          "en": "date of birth",
          "pt": "data de nascimento"
        },
        {
          "en": "address",
          "pt": "endereço"
        },
        {
          "en": "phone number",
          "pt": "número de telefone"
        },
        {
          "en": "e-mail",
          "pt": "e-mail"
        },
        {
          "en": "marital status",
          "pt": "estado civil"
        },
        {
          "en": "single / married",
          "pt": "solteiro(a) / casado(a)"
        },
        {
          "en": "department / section",
          "pt": "departamento / setor"
        },
        {
          "en": "I work in / at...",
          "pt": "Eu trabalho em..."
        },
        {
          "en": "I am responsible for...",
          "pt": "Eu sou responsável por..."
        },
        {
          "en": "My position is...",
          "pt": "Meu cargo é..."
        },
        {
          "en": "I am in charge of...",
          "pt": "Estou encarregado(a) de..."
        },
        {
          "en": "I report to...",
          "pt": "Eu me reporto a..."
        },
        {
          "en": "Team / Staff",
          "pt": "Equipe"
        },
        {
          "en": "Headquarters",
          "pt": "Sede / matriz"
        },
        {
          "en": "Branch",
          "pt": "Filial"
        }
      ],
      "videos": [
        {
          "title": "Basic English Grammar | Be verbs AM IS ARE",
          "channel": "Acquire English",
          "youtubeId": "5kjCcBsBzUs",
          "url": "https://www.youtube.com/watch?v=5kjCcBsBzUs"
        },
        {
          "title": "\"TO BE\" Verb - Am / Is / Are - Exercise 1",
          "channel": "GrammarBank",
          "youtubeId": "n71cJHjH0_w",
          "url": "https://www.youtube.com/watch?v=n71cJHjH0_w"
        },
        {
          "title": "Introduction to the Verb 'To Be' | ESL Lessons | EasyTeaching",
          "channel": "EasyTeaching",
          "youtubeId": "Rstjd4ipXvc",
          "url": "https://www.youtube.com/watch?v=Rstjd4ipXvc"
        }
      ],
      "dialogue": {
        "title": "Introducing Myself",
        "lines": [
          {
            "s": "Ana",
            "en": "Hello, my name is Ana. I am a shipping coordinator.",
            "pt": "Olá, meu nome é Ana. Eu sou coordenadora de expedição."
          },
          {
            "s": "Carlos",
            "en": "Nice to meet you. I am Carlos. I am a PPCP analyst.",
            "pt": "Prazer. Eu sou o Carlos. Sou analista de PPCP."
          },
          {
            "s": "Ana",
            "en": "Are you from Brazil?",
            "pt": "Você é do Brasil?"
          },
          {
            "s": "Carlos",
            "en": "Yes, I am. And you?",
            "pt": "Sim, sou. E você?"
          },
          {
            "s": "Ana",
            "en": "I am from Brazil too. We are a good team!",
            "pt": "Eu sou do Brasil também. Nós somos uma boa equipe!"
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "What is Carlos's job?",
            "options": [
              "shipping coordinator",
              "PPCP analyst",
              "manager"
            ],
            "answer": 1,
            "explanation": "'I am a PPCP analyst', diz Carlos."
          },
          {
            "type": "truefalse",
            "question": "Ana is from Brazil.",
            "answer": true,
            "explanation": "'I am from Brazil too', diz Ana."
          },
          {
            "type": "mcq",
            "question": "What is Ana's job?",
            "options": [
              "PPCP analyst",
              "shipping coordinator",
              "supervisor"
            ],
            "answer": 1,
            "explanation": "'I am a shipping coordinator', diz Ana."
          }
        ]
      },
      "reading": {
        "title": "My colleague and me",
        "textEn": "Hello! My name is Carlos. I am from Brazil. I am a PPCP analyst. I am thirty-five years old. My colleague Ana is a shipping coordinator. We are a good team.",
        "textPt": "Olá! Meu nome é Carlos. Eu sou do Brasil. Sou analista de PPCP. Tenho trinta e cinco anos. Minha colega Ana é coordenadora de expedição. Nós somos uma boa equipe.",
        "questions": [
          {
            "type": "mcq",
            "question": "What is Carlos's job?",
            "options": [
              "PPCP analyst",
              "shipping coordinator",
              "manager"
            ],
            "answer": 0,
            "explanation": "'I am a PPCP analyst'."
          },
          {
            "type": "truefalse",
            "question": "Carlos is from Brazil.",
            "answer": true,
            "explanation": "'I am from Brazil'."
          },
          {
            "type": "mcq",
            "question": "Who is a shipping coordinator?",
            "options": [
              "Carlos",
              "Ana",
              "the manager"
            ],
            "answer": 1,
            "explanation": "'My colleague Ana is a shipping coordinator'."
          }
        ]
      },
      "exercises": [
        {
          "type": "mcq",
          "question": "Complete: I ___ a coordinator.",
          "options": [
            "am",
            "is",
            "are"
          ],
          "answer": 0,
          "explanation": "Com 'I' usamos sempre 'am': I am a coordinator."
        },
        {
          "type": "mcq",
          "question": "Complete: She ___ an analyst.",
          "options": [
            "am",
            "is",
            "are"
          ],
          "answer": 1,
          "explanation": "Com he/she/it usamos 'is': She is an analyst."
        },
        {
          "type": "mcq",
          "question": "Complete: ___ you Brazilian?",
          "options": [
            "Am",
            "Is",
            "Are"
          ],
          "answer": 2,
          "explanation": "Com 'you' usamos 'are'. Na pergunta o verbo vem antes: Are you Brazilian?"
        },
        {
          "type": "fill",
          "question": "We ___ a good team.",
          "answer": "are",
          "explanation": "Com 'we' usamos 'are': We are a good team."
        },
        {
          "type": "fill",
          "question": "They ___ in the warehouse.",
          "answer": "are",
          "explanation": "Com 'they' usamos 'are': They are in the warehouse."
        },
        {
          "type": "truefalse",
          "question": "This sentence is correct: \"He are tall.\"",
          "answer": false,
          "explanation": "Falso. Com 'he' usamos 'is'. O certo é 'He is tall'."
        },
        {
          "type": "mcq",
          "question": "Negative form: I ___ tired.",
          "options": [
            "am not",
            "is not",
            "are not"
          ],
          "answer": 0,
          "explanation": "Para negar com 'I' usamos 'am not': I am not tired."
        },
        {
          "type": "fill",
          "question": "Make it a question: 'You are a manager.' → '___ you a manager?'",
          "answer": "are",
          "explanation": "Na pergunta o 'to be' vem antes do pronome: Are you a manager?"
        }
      ],
      "speaking": {
        "prompt": "Apresente-se: diga o seu nome, de onde você é e a sua profissão (use 'I am').",
        "example": "My name is Carlos. I am from Brazil. I am a PPCP analyst.",
        "keywords": [
          "name",
          "from",
          "brazil",
          "analyst"
        ]
      }
    },
    {
      "id": "present-simple",
      "title": "Daily Routine — Present Simple",
      "titlePt": "Aula 5 · Rotina Diária — Presente Simples",
      "level": "A1",
      "emoji": "⏰",
      "description": "Fale da sua rotina de trabalho com o presente simples, o -s da 3ª pessoa (he/she/it) e advérbios de frequência.",
      "searchQuery": "present simple daily routine english for beginners",
      "vocabulary": [
        {
          "en": "to wake up / to get up",
          "pt": "acordar / levantar da cama"
        },
        {
          "en": "to have breakfast",
          "pt": "tomar café da manhã"
        },
        {
          "en": "to go to work",
          "pt": "ir ao trabalho"
        },
        {
          "en": "to start / to finish",
          "pt": "começar / terminar"
        },
        {
          "en": "to work",
          "pt": "trabalhar"
        },
        {
          "en": "to check",
          "pt": "verificar / conferir"
        },
        {
          "en": "to send",
          "pt": "enviar"
        },
        {
          "en": "to have lunch",
          "pt": "almoçar"
        },
        {
          "en": "to come back home",
          "pt": "voltar para casa"
        },
        {
          "en": "to study / to watch TV",
          "pt": "estudar / assistir TV"
        },
        {
          "en": "to go to bed",
          "pt": "ir dormir"
        },
        {
          "en": "always / usually",
          "pt": "sempre / geralmente"
        },
        {
          "en": "often / frequently",
          "pt": "frequentemente / com frequência"
        },
        {
          "en": "sometimes / occasionally",
          "pt": "às vezes / ocasionalmente"
        },
        {
          "en": "rarely / hardly ever / never",
          "pt": "raramente / quase nunca / nunca"
        },
        {
          "en": "to plan / to control",
          "pt": "planejar / controlar"
        },
        {
          "en": "to organize",
          "pt": "organizar"
        },
        {
          "en": "to deliver / to ship",
          "pt": "entregar / expedir"
        },
        {
          "en": "to schedule",
          "pt": "agendar / programar"
        },
        {
          "en": "to report",
          "pt": "reportar / relatar"
        },
        {
          "en": "Task / Report",
          "pt": "Tarefa / Relatório"
        },
        {
          "en": "Production order",
          "pt": "Ordem de produção"
        },
        {
          "en": "Routine",
          "pt": "Rotina"
        },
        {
          "en": "Daily / Weekly",
          "pt": "Diário / semanal"
        }
      ],
      "videos": [
        {
          "title": "Learn English Tenses: The Present Simple",
          "channel": "Learn English with Bob the Canadian",
          "youtubeId": "dAz3UmAKvDU",
          "url": "https://www.youtube.com/watch?v=dAz3UmAKvDU"
        },
        {
          "title": "Present Simple Tense | Learn English | EasyTeaching",
          "channel": "EasyTeaching",
          "youtubeId": "uV8DQjQ4jLM",
          "url": "https://www.youtube.com/watch?v=uV8DQjQ4jLM"
        },
        {
          "title": "How to Talk About Daily Routines in English - Basic English Phrases",
          "channel": "Learn English with EnglishClass101.com",
          "youtubeId": "ngqCXqzYKhY",
          "url": "https://www.youtube.com/watch?v=ngqCXqzYKhY"
        }
      ],
      "dialogue": {
        "title": "My Work Day",
        "lines": [
          {
            "s": "Ana",
            "en": "What time do you wake up?",
            "pt": "Que horas você acorda?"
          },
          {
            "s": "Paulo",
            "en": "I usually wake up at six. I always have breakfast.",
            "pt": "Geralmente acordo às seis. Sempre tomo café da manhã."
          },
          {
            "s": "Ana",
            "en": "Do you go to work by bus?",
            "pt": "Você vai para o trabalho de ônibus?"
          },
          {
            "s": "Paulo",
            "en": "No, I go by car. I start at seven.",
            "pt": "Não, vou de carro. Começo às sete."
          },
          {
            "s": "Ana",
            "en": "Do you work on Saturday?",
            "pt": "Você trabalha no sábado?"
          },
          {
            "s": "Paulo",
            "en": "No, I don't. I never work on Sunday.",
            "pt": "Não. Eu nunca trabalho no domingo."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "How does Paulo go to work?",
            "options": [
              "by bus",
              "by car",
              "on foot"
            ],
            "answer": 1,
            "explanation": "'No, I go by car'."
          },
          {
            "type": "truefalse",
            "question": "Paulo works on Sunday.",
            "answer": false,
            "explanation": "Falso: 'I never work on Sunday'."
          },
          {
            "type": "mcq",
            "question": "What time does Paulo start work?",
            "options": [
              "six",
              "seven",
              "eight"
            ],
            "answer": 1,
            "explanation": "'I start at seven'."
          }
        ]
      },
      "reading": {
        "title": "Ana's routine",
        "textEn": "Ana usually wakes up at six. She always has breakfast and goes to work by car. She starts at seven and checks the production orders. She never works on Sunday.",
        "textPt": "Ana geralmente acorda às seis. Ela sempre toma café da manhã e vai para o trabalho de carro. Ela começa às sete e confere as ordens de produção. Ela nunca trabalha no domingo.",
        "questions": [
          {
            "type": "mcq",
            "question": "How does Ana go to work?",
            "options": [
              "by bus",
              "by car",
              "on foot"
            ],
            "answer": 1,
            "explanation": "'goes to work by car'."
          },
          {
            "type": "truefalse",
            "question": "Ana works every Sunday.",
            "answer": false,
            "explanation": "Falso: 'She never works on Sunday'."
          },
          {
            "type": "mcq",
            "question": "What does Ana check at work?",
            "options": [
              "the emails",
              "the production orders",
              "the trucks"
            ],
            "answer": 1,
            "explanation": "'checks the production orders'."
          }
        ]
      },
      "exercises": [
        {
          "type": "mcq",
          "question": "Choose the correct sentence.",
          "options": [
            "She work in the office.",
            "She works in the office.",
            "She working in the office."
          ],
          "answer": 1,
          "explanation": "Com he/she/it acrescentamos -s: 'She works'."
        },
        {
          "type": "fill",
          "question": "I ___ coffee every morning. (drink)",
          "answer": "drink",
          "explanation": "Com 'I' o verbo fica na forma base, sem -s: 'I drink'."
        },
        {
          "type": "fill",
          "question": "He ___ to work by car. (go → 3ª pessoa)",
          "answer": "goes",
          "explanation": "Verbo terminado em -o: he/she/it recebe -es. 'go' vira 'goes'."
        },
        {
          "type": "mcq",
          "question": "Negative with he: 'He ___ like fish.'",
          "options": [
            "don't",
            "doesn't",
            "isn't"
          ],
          "answer": 1,
          "explanation": "Com he/she/it a negativa usa 'doesn't': He doesn't like fish."
        },
        {
          "type": "mcq",
          "question": "Complete: '___ you work on Saturday?'",
          "options": [
            "Do",
            "Does",
            "Are"
          ],
          "answer": 0,
          "explanation": "Com 'you' a pergunta usa 'Do': Do you work on Saturday?"
        },
        {
          "type": "fill",
          "question": "She ___ the orders. (check → 3ª pessoa)",
          "answer": "checks",
          "explanation": "Com 'she' acrescentamos -s: 'She checks the orders'."
        },
        {
          "type": "truefalse",
          "question": "The adverb comes before common verbs: 'I always check the orders.'",
          "answer": true,
          "explanation": "Verdadeiro. Advérbio de frequência vem antes do verbo comum (mas depois do verbo to be)."
        },
        {
          "type": "truefalse",
          "question": "The sentence 'They plays football' is correct.",
          "answer": false,
          "explanation": "Falso. Com 'they' não usamos -s. O certo é 'They play football'."
        }
      ],
      "speaking": {
        "prompt": "Fale sobre a sua rotina de trabalho usando o presente simples (I wake up, I start, I work...).",
        "example": "I usually wake up at six. I always have breakfast. I start work at seven.",
        "keywords": [
          "wake",
          "breakfast",
          "start",
          "work"
        ]
      }
    },
    {
      "id": "there-is-are",
      "title": "At the Workplace — There is / There are",
      "titlePt": "Aula 6 · No Trabalho — There is / There are",
      "level": "A1",
      "emoji": "🏭",
      "description": "Diga o que existe no seu trabalho com there is / there are e use preposições de lugar (in, on, at, under...).",
      "searchQuery": "there is there are prepositions of place english beginners",
      "vocabulary": [
        {
          "en": "There is / There are",
          "pt": "Há (singular) / Há (plural)"
        },
        {
          "en": "There isn't / There aren't",
          "pt": "Não há (sing.) / Não há (pl.)"
        },
        {
          "en": "Is there...? / Are there...?",
          "pt": "Há...? (sing. / pl.)"
        },
        {
          "en": "in / on / at",
          "pt": "dentro / sobre / em um ponto"
        },
        {
          "en": "under / over",
          "pt": "embaixo / por cima"
        },
        {
          "en": "above / below",
          "pt": "acima (sem contato) / abaixo"
        },
        {
          "en": "next to / between",
          "pt": "ao lado de / entre"
        },
        {
          "en": "in front of / behind",
          "pt": "em frente a / atrás de"
        },
        {
          "en": "near",
          "pt": "perto de"
        },
        {
          "en": "Warehouse",
          "pt": "Armazém / galpão"
        },
        {
          "en": "Shop floor",
          "pt": "Chão de fábrica"
        },
        {
          "en": "Office",
          "pt": "Escritório"
        },
        {
          "en": "Loading dock",
          "pt": "Doca de carga"
        },
        {
          "en": "Forklift",
          "pt": "Empilhadeira"
        },
        {
          "en": "Shelf / Rack",
          "pt": "Prateleira / rack"
        },
        {
          "en": "Conveyor belt",
          "pt": "Esteira transportadora"
        },
        {
          "en": "Production line",
          "pt": "Linha de produção"
        },
        {
          "en": "Truck",
          "pt": "Caminhão"
        },
        {
          "en": "Equipment",
          "pt": "Equipamento"
        }
      ],
      "videos": [
        {
          "title": "THERE IS - THERE ARE in English | Sentences & Questions | Woodward English",
          "channel": "Woodward English",
          "youtubeId": "xCrsoRmPFok",
          "url": "https://www.youtube.com/watch?v=xCrsoRmPFok"
        },
        {
          "title": "AT, IN, ON - Prepositions of Place - Basic English Grammar",
          "channel": "Learn English Lab",
          "youtubeId": "Oi3KwhIWVrY",
          "url": "https://www.youtube.com/watch?v=Oi3KwhIWVrY"
        }
      ],
      "dialogue": {
        "title": "My Workplace",
        "lines": [
          {
            "s": "Supervisor",
            "en": "Is there a forklift in the warehouse?",
            "pt": "Há uma empilhadeira no armazém?"
          },
          {
            "s": "Ana",
            "en": "Yes, there is. It is near the door.",
            "pt": "Sim, há. Ela está perto da porta."
          },
          {
            "s": "Supervisor",
            "en": "Are there many boxes?",
            "pt": "Há muitas caixas?"
          },
          {
            "s": "Ana",
            "en": "Yes, there are. The boxes are on the shelves.",
            "pt": "Sim, há. As caixas estão nas prateleiras."
          },
          {
            "s": "Supervisor",
            "en": "Where are the trucks?",
            "pt": "Onde estão os caminhões?"
          },
          {
            "s": "Ana",
            "en": "The trucks are in front of the warehouse.",
            "pt": "Os caminhões estão em frente ao armazém."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "Where is the forklift?",
            "options": [
              "near the door",
              "on the shelf",
              "in the box"
            ],
            "answer": 0,
            "explanation": "'It is near the door'."
          },
          {
            "type": "truefalse",
            "question": "The boxes are on the shelves.",
            "answer": true,
            "explanation": "'The boxes are on the shelves'."
          },
          {
            "type": "mcq",
            "question": "Where are the trucks?",
            "options": [
              "behind the office",
              "in front of the warehouse",
              "under the table"
            ],
            "answer": 1,
            "explanation": "'in front of the warehouse'."
          }
        ]
      },
      "reading": {
        "title": "The company warehouse",
        "textEn": "There is a big warehouse in the company. There are many shelves, and the boxes are on the shelves. There is a forklift near the door. The trucks are in front of the warehouse.",
        "textPt": "Há um grande armazém na empresa. Há muitas prateleiras, e as caixas estão nas prateleiras. Há uma empilhadeira perto da porta. Os caminhões estão em frente ao armazém.",
        "questions": [
          {
            "type": "mcq",
            "question": "Where is the forklift?",
            "options": [
              "near the door",
              "on the shelf",
              "behind the truck"
            ],
            "answer": 0,
            "explanation": "'There is a forklift near the door'."
          },
          {
            "type": "truefalse",
            "question": "The boxes are under the shelves.",
            "answer": false,
            "explanation": "Falso: as caixas estão SOBRE (on) as prateleiras."
          },
          {
            "type": "mcq",
            "question": "Where are the trucks?",
            "options": [
              "inside the warehouse",
              "in front of the warehouse",
              "on the shelf"
            ],
            "answer": 1,
            "explanation": "'The trucks are in front of the warehouse'."
          }
        ]
      },
      "exercises": [
        {
          "type": "mcq",
          "question": "___ a forklift in the warehouse. (só uma)",
          "options": [
            "There is",
            "There are",
            "There be"
          ],
          "answer": 0,
          "explanation": "No singular usamos 'There is': There is a forklift."
        },
        {
          "type": "mcq",
          "question": "___ ten boxes on the shelf.",
          "options": [
            "There is",
            "There are",
            "Is there"
          ],
          "answer": 1,
          "explanation": "No plural usamos 'There are': There are ten boxes."
        },
        {
          "type": "fill",
          "question": "The parts are ___ the box. (dentro)",
          "answer": "in",
          "explanation": "'in' = dentro de algo (caixa, sala, cidade): in the box."
        },
        {
          "type": "fill",
          "question": "The boxes are ___ the shelf. (em cima, com contato)",
          "answer": "on",
          "explanation": "'on' = sobre uma superfície: on the shelf, on the table."
        },
        {
          "type": "fill",
          "question": "He is ___ the loading dock. (ponto específico)",
          "answer": "at",
          "explanation": "'at' = um ponto exato / local: at the loading dock, at work."
        },
        {
          "type": "mcq",
          "question": "'Empilhadeira' in English is:",
          "options": [
            "forklift",
            "shelf",
            "truck"
          ],
          "answer": 0,
          "explanation": "'Empilhadeira' é 'forklift'. 'Shelf' é prateleira e 'truck' é caminhão."
        },
        {
          "type": "truefalse",
          "question": "'There isn't' is the negative of 'There is'.",
          "answer": true,
          "explanation": "Verdadeiro. Negativa: There isn't (singular) / There aren't (plural)."
        },
        {
          "type": "mcq",
          "question": "The pallet is ___ the table. (diretamente embaixo)",
          "options": [
            "under",
            "over",
            "next to"
          ],
          "answer": 0,
          "explanation": "'under' = diretamente embaixo: The pallet is under the table."
        }
      ],
      "speaking": {
        "prompt": "Descreva o seu local de trabalho usando there is / there are e preposições (in, on, near...).",
        "example": "There is a forklift near the door. There are many boxes on the shelves.",
        "keywords": [
          "there",
          "forklift",
          "boxes",
          "shelves"
        ]
      }
    },
    {
      "id": "describing",
      "title": "Describing People and Things",
      "titlePt": "Aula 7 · Descrevendo Pessoas e Coisas",
      "level": "A1",
      "emoji": "🎨",
      "description": "Use adjetivos, cores e intensificadores (very, too) para descrever produtos, pessoas e a qualidade no trabalho.",
      "searchQuery": "english adjectives colors describing things for beginners",
      "vocabulary": [
        {
          "en": "big / small",
          "pt": "grande / pequeno"
        },
        {
          "en": "new / old",
          "pt": "novo / velho"
        },
        {
          "en": "fast / slow",
          "pt": "rápido / lento"
        },
        {
          "en": "heavy / light",
          "pt": "pesado / leve"
        },
        {
          "en": "good / bad",
          "pt": "bom / ruim"
        },
        {
          "en": "easy / difficult",
          "pt": "fácil / difícil"
        },
        {
          "en": "long / short",
          "pt": "comprido / curto"
        },
        {
          "en": "thick / thin",
          "pt": "grosso / fino"
        },
        {
          "en": "strong / weak",
          "pt": "forte / fraco"
        },
        {
          "en": "clean / dirty",
          "pt": "limpo / sujo"
        },
        {
          "en": "safe / dangerous",
          "pt": "seguro / perigoso"
        },
        {
          "en": "expensive / cheap",
          "pt": "caro / barato"
        },
        {
          "en": "full / empty",
          "pt": "cheio / vazio"
        },
        {
          "en": "hot / cold",
          "pt": "quente / frio"
        },
        {
          "en": "friendly / polite",
          "pt": "simpático / educado"
        },
        {
          "en": "hardworking / experienced",
          "pt": "trabalhador / experiente"
        },
        {
          "en": "careful / smart",
          "pt": "cuidadoso / inteligente"
        },
        {
          "en": "busy / tired",
          "pt": "ocupado / cansado"
        },
        {
          "en": "very / so / really",
          "pt": "muito / tão / realmente"
        },
        {
          "en": "quite / a little / too",
          "pt": "bastante / um pouco / demais"
        },
        {
          "en": "red, blue, green, yellow",
          "pt": "vermelho, azul, verde, amarelo"
        },
        {
          "en": "black, white, grey, brown",
          "pt": "preto, branco, cinza, marrom"
        },
        {
          "en": "orange, purple, pink, silver",
          "pt": "laranja, roxo, rosa, prateado"
        },
        {
          "en": "Quality / Defect",
          "pt": "Qualidade / Defeito"
        },
        {
          "en": "Sample / Product",
          "pt": "Amostra / Produto"
        },
        {
          "en": "Size / Length / Thickness",
          "pt": "Tamanho / Comprimento / Espessura"
        },
        {
          "en": "Cable / Wire",
          "pt": "Cabo / fio"
        },
        {
          "en": "Damaged",
          "pt": "Danificado"
        },
        {
          "en": "Approved / Rejected",
          "pt": "Aprovado / reprovado"
        },
        {
          "en": "Standard",
          "pt": "Padrão"
        },
        {
          "en": "Label",
          "pt": "Etiqueta / rótulo"
        },
        {
          "en": "Packaging / Packing",
          "pt": "Embalagem / Empacotamento"
        },
        {
          "en": "Packing list",
          "pt": "Romaneio (lista da carga)"
        }
      ],
      "videos": [
        {
          "title": "Colours: 10 Easy English Words",
          "channel": "BBC Learning English",
          "youtubeId": "48MDYwdwMvY",
          "url": "https://www.youtube.com/watch?v=48MDYwdwMvY"
        },
        {
          "title": "English Grammar: Beginner Adjectives",
          "channel": "Shaw English Online",
          "youtubeId": "BLJ9pFRy-No",
          "url": "https://www.youtube.com/watch?v=BLJ9pFRy-No"
        }
      ],
      "dialogue": {
        "title": "A Quality Problem",
        "lines": [
          {
            "s": "Ana",
            "en": "Good morning, Carlos. Are the boxes ready?",
            "pt": "Bom dia, Carlos. As caixas estão prontas?"
          },
          {
            "s": "Carlos",
            "en": "Almost. But we have a problem: two boxes are damaged.",
            "pt": "Quase. Mas temos um problema: duas caixas estão danificadas."
          },
          {
            "s": "Ana",
            "en": "Really? Is the product OK?",
            "pt": "Sério? O produto está bom?"
          },
          {
            "s": "Carlos",
            "en": "The cables are fine, but the packaging is old and dirty.",
            "pt": "Os cabos estão bons, mas a embalagem está velha e suja."
          },
          {
            "s": "Ana",
            "en": "Please use new boxes and new labels.",
            "pt": "Por favor, use caixas novas e etiquetas novas."
          },
          {
            "s": "Carlos",
            "en": "No problem. The new boxes are strong.",
            "pt": "Sem problema. As caixas novas são resistentes."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "What is the problem?",
            "options": [
              "two boxes are damaged",
              "the cables are broken",
              "the truck is late"
            ],
            "answer": 0,
            "explanation": "'two boxes are damaged'."
          },
          {
            "type": "truefalse",
            "question": "The packaging is new and clean.",
            "answer": false,
            "explanation": "Falso: 'the packaging is old and dirty'."
          },
          {
            "type": "mcq",
            "question": "What does Ana ask for?",
            "options": [
              "new boxes and labels",
              "a new machine",
              "more cables"
            ],
            "answer": 0,
            "explanation": "'use new boxes and new labels'."
          }
        ]
      },
      "reading": {
        "title": "The new machine",
        "textEn": "The new machine is fast and safe. The boxes are big and clean. But two samples are damaged, and the packaging is old. The client is very important, so everything needs to be perfect.",
        "textPt": "A máquina nova é rápida e segura. As caixas são grandes e limpas. Mas duas amostras estão danificadas, e a embalagem está velha. O cliente é muito importante, então tudo precisa estar perfeito.",
        "questions": [
          {
            "type": "mcq",
            "question": "How is the new machine?",
            "options": [
              "slow and old",
              "fast and safe",
              "small and dirty"
            ],
            "answer": 1,
            "explanation": "'The new machine is fast and safe'."
          },
          {
            "type": "truefalse",
            "question": "Two samples are damaged.",
            "answer": true,
            "explanation": "'two samples are damaged'."
          },
          {
            "type": "mcq",
            "question": "How is the packaging?",
            "options": [
              "new",
              "old",
              "strong"
            ],
            "answer": 1,
            "explanation": "'the packaging is old'."
          }
        ]
      },
      "exercises": [
        {
          "type": "mcq",
          "question": "The opposite of 'big' is:",
          "options": [
            "small",
            "new",
            "heavy"
          ],
          "answer": 0,
          "explanation": "O oposto de 'big' (grande) é 'small' (pequeno)."
        },
        {
          "type": "mcq",
          "question": "Which sentence is correct?",
          "options": [
            "a red box",
            "a box red",
            "box a red"
          ],
          "answer": 0,
          "explanation": "Em inglês o adjetivo vem ANTES do substantivo: 'a red box'."
        },
        {
          "type": "fill",
          "question": "The opposite of 'heavy' is ___.",
          "answer": "light",
          "explanation": "O oposto de 'heavy' (pesado) é 'light' (leve)."
        },
        {
          "type": "fill",
          "question": "The opposite of 'clean' is ___.",
          "answer": "dirty",
          "explanation": "O oposto de 'clean' (limpo) é 'dirty' (sujo)."
        },
        {
          "type": "mcq",
          "question": "'The box is ___ heavy!' (demais — não dá para levantar)",
          "options": [
            "very",
            "too",
            "good"
          ],
          "answer": 1,
          "explanation": "'too' = demais, aponta um problema: The box is too heavy!"
        },
        {
          "type": "truefalse",
          "question": "In English adjectives have a plural form, like 'heavys boxes'.",
          "answer": false,
          "explanation": "Falso. O adjetivo NÃO tem plural: 'the heavy boxes' (e não 'heavys')."
        },
        {
          "type": "fill",
          "question": "'Danificado' in English is ___.",
          "answer": "damaged",
          "explanation": "'Danificado' é 'damaged'. Ex.: The sample is damaged."
        },
        {
          "type": "truefalse",
          "question": "In 'The machine is very fast', 'very' just gives information about the degree.",
          "answer": true,
          "explanation": "Verdadeiro. 'very' apenas informa o grau (muito). 'too' apontaria um problema."
        }
      ],
      "speaking": {
        "prompt": "Descreva um objeto do seu trabalho usando adjetivos e cores (big, new, fast, red...).",
        "example": "The box is big and heavy. The new machine is fast and clean.",
        "keywords": [
          "big",
          "heavy",
          "new",
          "fast",
          "clean"
        ]
      }
    },
    {
      "id": "present-continuous",
      "title": "Actions Now — Present Continuous",
      "titlePt": "Aula 8 · Ações Agora — Presente Contínuo",
      "level": "A1",
      "emoji": "🔧",
      "description": "Use am / is / are + verbo-ing para falar do que está acontecendo agora e neste período na fábrica.",
      "searchQuery": "present continuous am is are ing english beginners",
      "vocabulary": [
        {
          "en": "am / is / are + -ing",
          "pt": "estou/está/estão + -ndo"
        },
        {
          "en": "isn't / aren't + -ing",
          "pt": "não está / não estão + -ndo"
        },
        {
          "en": "now / right now",
          "pt": "agora / agora mesmo"
        },
        {
          "en": "at the moment / currently",
          "pt": "no momento / atualmente"
        },
        {
          "en": "to load / to unload",
          "pt": "carregar / descarregar"
        },
        {
          "en": "to pack",
          "pt": "embalar"
        },
        {
          "en": "to move / to wait",
          "pt": "mover / esperar"
        },
        {
          "en": "to fix / to repair",
          "pt": "consertar"
        },
        {
          "en": "to write / to talk",
          "pt": "escrever / falar"
        },
        {
          "en": "to run / to stop",
          "pt": "operar (máquina) / parar"
        },
        {
          "en": "In progress",
          "pt": "Em andamento"
        },
        {
          "en": "Shipment",
          "pt": "Remessa / carregamento"
        },
        {
          "en": "Production",
          "pt": "Produção"
        },
        {
          "en": "Delay",
          "pt": "Atraso"
        },
        {
          "en": "Downtime",
          "pt": "Parada de máquina"
        }
      ],
      "videos": [
        {
          "title": "Learn English Tenses: The Present Continuous",
          "channel": "Learn English with Bob the Canadian",
          "youtubeId": "rFdhrR6Dpco",
          "url": "https://www.youtube.com/watch?v=rFdhrR6Dpco"
        },
        {
          "title": "How to Use the Present Continuous - English Verb Tenses",
          "channel": "Oxford Online English",
          "youtubeId": "0djfJqWhnpY",
          "url": "https://www.youtube.com/watch?v=0djfJqWhnpY"
        }
      ],
      "dialogue": {
        "title": "What's Happening in the Warehouse?",
        "lines": [
          {
            "s": "Supervisor",
            "en": "Hi, Ana. What's happening in the warehouse right now?",
            "pt": "Oi, Ana. O que está acontecendo no armazém agora?"
          },
          {
            "s": "Ana",
            "en": "We are very busy. The team is loading two trucks.",
            "pt": "Estamos muito ocupados. A equipe está carregando dois caminhões."
          },
          {
            "s": "Supervisor",
            "en": "Is Carlos working on the night shift?",
            "pt": "O Carlos está trabalhando no turno da noite?"
          },
          {
            "s": "Ana",
            "en": "Yes, he is. Right now he is checking the orders.",
            "pt": "Sim, está. Agora ele está conferindo os pedidos."
          },
          {
            "s": "Supervisor",
            "en": "Are we shipping the big order today?",
            "pt": "Vamos expedir o pedido grande hoje?"
          },
          {
            "s": "Ana",
            "en": "We are trying, but we are waiting for the labels.",
            "pt": "Estamos tentando, mas estamos esperando as etiquetas."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "What is the team doing?",
            "options": [
              "loading two trucks",
              "cleaning the office",
              "having lunch"
            ],
            "answer": 0,
            "explanation": "'The team is loading two trucks'."
          },
          {
            "type": "truefalse",
            "question": "Carlos is checking the orders.",
            "answer": true,
            "explanation": "'Right now he is checking the orders'."
          },
          {
            "type": "mcq",
            "question": "Why can't they ship yet?",
            "options": [
              "waiting for the labels",
              "the truck is broken",
              "there are no boxes"
            ],
            "answer": 0,
            "explanation": "'we are waiting for the labels'."
          }
        ]
      },
      "reading": {
        "title": "A busy day",
        "textEn": "The team is very busy today. They are loading two trucks. Carlos is working on the night shift, and right now he is checking the orders. The technician is fixing the machine.",
        "textPt": "A equipe está muito ocupada hoje. Eles estão carregando dois caminhões. Carlos está trabalhando no turno da noite, e agora ele está conferindo os pedidos. O técnico está consertando a máquina.",
        "questions": [
          {
            "type": "mcq",
            "question": "What is the team doing?",
            "options": [
              "loading two trucks",
              "having a meeting",
              "going home"
            ],
            "answer": 0,
            "explanation": "'They are loading two trucks'."
          },
          {
            "type": "truefalse",
            "question": "The technician is fixing the machine.",
            "answer": true,
            "explanation": "'The technician is fixing the machine'."
          },
          {
            "type": "mcq",
            "question": "Which shift is Carlos working?",
            "options": [
              "morning shift",
              "night shift",
              "afternoon shift"
            ],
            "answer": 1,
            "explanation": "'Carlos is working on the night shift'."
          }
        ]
      },
      "exercises": [
        {
          "type": "mcq",
          "question": "Right now he ___ the truck. (load)",
          "options": [
            "load",
            "loads",
            "is loading"
          ],
          "answer": 2,
          "explanation": "Agora = presente contínuo: is + verbo-ing. He is loading the truck."
        },
        {
          "type": "fill",
          "question": "The -ing form of 'make' is ___.",
          "answer": "making",
          "explanation": "Verbo terminado em -e mudo: tira o -e e põe -ing. make → making."
        },
        {
          "type": "fill",
          "question": "The -ing form of 'run' is ___.",
          "answer": "running",
          "explanation": "1 vogal + 1 consoante tônica: dobra a consoante. run → running."
        },
        {
          "type": "mcq",
          "question": "Which sentence is correct for 'now'?",
          "options": [
            "She checks the orders now.",
            "She is checking the orders now.",
            "She check the orders now."
          ],
          "answer": 1,
          "explanation": "Para algo acontecendo agora usamos o contínuo: 'She is checking the orders now'."
        },
        {
          "type": "mcq",
          "question": "Negative: He ___ packing the boxes.",
          "options": [
            "isn't",
            "doesn't",
            "aren't"
          ],
          "answer": 0,
          "explanation": "Negativa do contínuo com 'he': isn't. He isn't packing the boxes."
        },
        {
          "type": "truefalse",
          "question": "We use present continuous for permanent routines, like 'I am working here every day'.",
          "answer": false,
          "explanation": "Falso. Rotina/hábito é present simple: 'I work here every day'. O contínuo é para agora/temporário."
        },
        {
          "type": "fill",
          "question": "'Estou embalando' → I ___ packing.",
          "answer": "am",
          "explanation": "Com 'I' o contínuo usa 'am': I am packing (estou embalando)."
        },
        {
          "type": "truefalse",
          "question": "Stative verbs like 'want' usually do NOT take -ing (not 'I am wanting').",
          "answer": true,
          "explanation": "Verdadeiro. Verbos de estado (want, know, like...) ficam no present simple: 'I want'."
        }
      ],
      "speaking": {
        "prompt": "Diga o que está acontecendo agora no seu setor (use am/is/are + verbo-ing).",
        "example": "Right now the team is loading two trucks. I am checking the orders.",
        "keywords": [
          "loading",
          "checking",
          "team",
          "trucks"
        ]
      }
    },
    {
      "id": "past-simple",
      "title": "Talking About the Past",
      "titlePt": "Aula 9 · Falando sobre o Passado",
      "level": "A1",
      "emoji": "⏮️",
      "description": "Use was / were e o passado simples (-ed e irregulares) para falar do que aconteceu ontem e na semana passada.",
      "searchQuery": "past simple was were regular verbs english beginners",
      "vocabulary": [
        {
          "en": "was / were",
          "pt": "era/estava · eram/estavam"
        },
        {
          "en": "worked / checked (-ed)",
          "pt": "trabalhou / conferiu (regulares)"
        },
        {
          "en": "went (go)",
          "pt": "foi (ir)"
        },
        {
          "en": "had (have)",
          "pt": "teve (ter)"
        },
        {
          "en": "made (make)",
          "pt": "fez (fazer)"
        },
        {
          "en": "sent (send)",
          "pt": "enviou (enviar)"
        },
        {
          "en": "came (come)",
          "pt": "veio (vir)"
        },
        {
          "en": "yesterday",
          "pt": "ontem"
        },
        {
          "en": "last week / month",
          "pt": "semana / mês passado"
        },
        {
          "en": "...days ago",
          "pt": "...dias atrás"
        },
        {
          "en": "Arrived / Delivered",
          "pt": "Chegou / entregue"
        },
        {
          "en": "Shipped",
          "pt": "Expediu / despachou"
        },
        {
          "en": "Delayed",
          "pt": "Atrasado / adiado"
        },
        {
          "en": "Completed",
          "pt": "Concluído"
        },
        {
          "en": "Last shipment",
          "pt": "Última remessa"
        },
        {
          "en": "Previous order",
          "pt": "Pedido anterior"
        },
        {
          "en": "Backorder",
          "pt": "Pedido em atraso / pendente"
        },
        {
          "en": "On schedule",
          "pt": "Dentro do cronograma"
        }
      ],
      "videos": [
        {
          "title": "The past simple tense - 6 Minute Grammar",
          "channel": "BBC Learning English",
          "youtubeId": "PgsG98vByiw",
          "url": "https://www.youtube.com/watch?v=PgsG98vByiw"
        },
        {
          "title": "Verb BE in the Past: WAS, WERE | Easy English Grammar for Beginners (A1)",
          "channel": "English with Jennifer",
          "youtubeId": "lBT0dun2LK8",
          "url": "https://www.youtube.com/watch?v=lBT0dun2LK8"
        }
      ],
      "dialogue": {
        "title": "Yesterday at Work",
        "lines": [
          {
            "s": "Supervisor",
            "en": "What did you do yesterday?",
            "pt": "O que você fez ontem?"
          },
          {
            "s": "Ana",
            "en": "I worked the morning shift. I checked fifty orders.",
            "pt": "Trabalhei no turno da manhã. Conferi cinquenta pedidos."
          },
          {
            "s": "Supervisor",
            "en": "Did you have a meeting?",
            "pt": "Você teve uma reunião?"
          },
          {
            "s": "Ana",
            "en": "Yes, we had a meeting at ten o'clock.",
            "pt": "Sim, tivemos uma reunião às dez."
          },
          {
            "s": "Supervisor",
            "en": "And the truck?",
            "pt": "E o caminhão?"
          },
          {
            "s": "Ana",
            "en": "The truck arrived late, but we shipped the products.",
            "pt": "O caminhão chegou atrasado, mas expedimos os produtos."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "Which shift did Ana work?",
            "options": [
              "morning",
              "night",
              "afternoon"
            ],
            "answer": 0,
            "explanation": "'I worked the morning shift'."
          },
          {
            "type": "truefalse",
            "question": "The truck arrived late.",
            "answer": true,
            "explanation": "'The truck arrived late'."
          },
          {
            "type": "mcq",
            "question": "How many orders did Ana check?",
            "options": [
              "fifteen",
              "fifty",
              "five hundred"
            ],
            "answer": 1,
            "explanation": "'I checked fifty orders'."
          }
        ]
      },
      "reading": {
        "title": "Ana's day yesterday",
        "textEn": "Yesterday Ana worked the morning shift. She checked fifty orders and sent ten emails. The team had a meeting at ten. The truck arrived late, but they shipped the products.",
        "textPt": "Ontem Ana trabalhou no turno da manhã. Ela conferiu cinquenta pedidos e enviou dez e-mails. A equipe teve uma reunião às dez. O caminhão chegou atrasado, mas eles expediram os produtos.",
        "questions": [
          {
            "type": "mcq",
            "question": "How many orders did Ana check?",
            "options": [
              "fifteen",
              "fifty",
              "five"
            ],
            "answer": 1,
            "explanation": "'She checked fifty orders'."
          },
          {
            "type": "truefalse",
            "question": "The truck arrived early.",
            "answer": false,
            "explanation": "Falso: 'The truck arrived late'."
          },
          {
            "type": "mcq",
            "question": "What time was the meeting?",
            "options": [
              "at nine",
              "at ten",
              "at noon"
            ],
            "answer": 1,
            "explanation": "'The team had a meeting at ten'."
          }
        ]
      },
      "exercises": [
        {
          "type": "fill",
          "question": "I ___ at work yesterday.",
          "answer": "was",
          "explanation": "Passado de 'to be' com I/he/she/it é 'was': I was at work."
        },
        {
          "type": "fill",
          "question": "They ___ late.",
          "answer": "were",
          "explanation": "Passado de 'to be' com you/we/they é 'were': They were late."
        },
        {
          "type": "mcq",
          "question": "Past of the regular verb 'work':",
          "options": [
            "worked",
            "worken",
            "working"
          ],
          "answer": 0,
          "explanation": "Verbos regulares no passado recebem -ed: work → worked."
        },
        {
          "type": "mcq",
          "question": "Past of the irregular verb 'go':",
          "options": [
            "goed",
            "went",
            "gone"
          ],
          "answer": 1,
          "explanation": "'go' é irregular: o passado é 'went'."
        },
        {
          "type": "fill",
          "question": "The past of 'have' is ___.",
          "answer": "had",
          "explanation": "'have' é irregular: o passado é 'had' (teve/tinha)."
        },
        {
          "type": "fill",
          "question": "The past of 'send' is ___.",
          "answer": "sent",
          "explanation": "'send' é irregular: o passado é 'sent' (enviou)."
        },
        {
          "type": "truefalse",
          "question": "'Yesterday' means 'ontem'.",
          "answer": true,
          "explanation": "Verdadeiro. 'Yesterday' = ontem."
        },
        {
          "type": "mcq",
          "question": "'The truck ___ late.' (chegou — verbo arrive no passado)",
          "options": [
            "arrive",
            "arrived",
            "arriving"
          ],
          "answer": 1,
          "explanation": "'arrive' é regular: passado 'arrived'."
        }
      ],
      "speaking": {
        "prompt": "Conte o que você fez ontem no trabalho (use o passado: worked, checked, went, had...).",
        "example": "Yesterday I worked the morning shift. I checked fifty orders. The truck arrived late.",
        "keywords": [
          "yesterday",
          "worked",
          "checked",
          "arrived"
        ]
      }
    },
    {
      "id": "can-requests",
      "title": "Communication at Work — Can & Requests",
      "titlePt": "Aula 10 · Comunicação no Trabalho — Can e Pedidos",
      "level": "A1",
      "emoji": "💬",
      "description": "Use can / can't e faça pedidos educados no trabalho e ao telefone.",
      "searchQuery": "can cant ability polite requests english beginners",
      "vocabulary": [
        {
          "en": "can / can't",
          "pt": "poder/saber / não poder"
        },
        {
          "en": "Can you help me?",
          "pt": "Você pode me ajudar?"
        },
        {
          "en": "Could you...?",
          "pt": "Você poderia...?"
        },
        {
          "en": "I would like...",
          "pt": "Eu gostaria..."
        },
        {
          "en": "Please / Thank you",
          "pt": "Por favor / Obrigado(a)"
        },
        {
          "en": "Sorry",
          "pt": "Desculpe"
        },
        {
          "en": "Can you repeat?",
          "pt": "Pode repetir?"
        },
        {
          "en": "Can I speak to...?",
          "pt": "Posso falar com...?"
        },
        {
          "en": "Just a moment",
          "pt": "Só um momento"
        },
        {
          "en": "Of course",
          "pt": "Claro"
        },
        {
          "en": "I'll check and call you back",
          "pt": "Vou verificar e te retorno"
        },
        {
          "en": "Please confirm",
          "pt": "Por favor, confirme"
        },
        {
          "en": "As soon as possible (ASAP)",
          "pt": "O mais rápido possível"
        },
        {
          "en": "Let me know",
          "pt": "Me avise / me informe"
        },
        {
          "en": "Best regards",
          "pt": "Atenciosamente (e-mail)"
        }
      ],
      "videos": [
        {
          "title": "How to Use Can, Could and Be Able To - English Modal Verbs for Ability",
          "channel": "Oxford Online English",
          "youtubeId": "TqES1mwxjpI",
          "url": "https://www.youtube.com/watch?v=TqES1mwxjpI"
        },
        {
          "title": "How to Ask for Permission (Can I, Could I, May I) | Easy English Podcast (A1-A2)",
          "channel": "JISH - Learn English Podcast",
          "youtubeId": "r6F9oqTbQJg",
          "url": "https://www.youtube.com/watch?v=r6F9oqTbQJg"
        }
      ],
      "dialogue": {
        "title": "Useful Phrases at Work",
        "lines": [
          {
            "s": "Ana",
            "en": "Can you help me, please?",
            "pt": "Você pode me ajudar, por favor?"
          },
          {
            "s": "Carlos",
            "en": "Of course. What do you need?",
            "pt": "Claro. Do que você precisa?"
          },
          {
            "s": "Ana",
            "en": "I would like to check this order. Could you send the report?",
            "pt": "Eu gostaria de conferir este pedido. Você poderia enviar o relatório?"
          },
          {
            "s": "Carlos",
            "en": "Sure. Just a moment.",
            "pt": "Claro. Só um momento."
          },
          {
            "s": "Ana",
            "en": "Sorry, I don't understand. Can you repeat, please?",
            "pt": "Desculpe, não entendi. Pode repetir, por favor?"
          },
          {
            "s": "Carlos",
            "en": "No problem. I'll check and call you back.",
            "pt": "Sem problema. Vou verificar e te retorno."
          }
        ],
        "questions": [
          {
            "type": "mcq",
            "question": "What does Ana want to check?",
            "options": [
              "this order",
              "the machine",
              "the truck"
            ],
            "answer": 0,
            "explanation": "'I would like to check this order'."
          },
          {
            "type": "truefalse",
            "question": "Carlos refuses to help Ana.",
            "answer": false,
            "explanation": "Falso: ele diz 'Of course' (Claro)."
          },
          {
            "type": "mcq",
            "question": "What will Carlos do?",
            "options": [
              "check and call back",
              "go home",
              "ship the boxes"
            ],
            "answer": 0,
            "explanation": "'I'll check and call you back'."
          }
        ]
      },
      "reading": {
        "title": "Carlos is polite",
        "textEn": "Carlos is polite at work. He always says \"please\" and \"thank you\". When he needs help, he says \"Can you help me, please?\". On the phone he says \"Can I speak to the manager, please?\".",
        "textPt": "Carlos é educado no trabalho. Ele sempre diz \"por favor\" e \"obrigado\". Quando precisa de ajuda, ele diz \"Você pode me ajudar, por favor?\". Ao telefone ele diz \"Posso falar com o gerente, por favor?\".",
        "questions": [
          {
            "type": "mcq",
            "question": "What does Carlos always say?",
            "options": [
              "please and thank you",
              "goodbye",
              "sorry"
            ],
            "answer": 0,
            "explanation": "'He always says please and thank you'."
          },
          {
            "type": "truefalse",
            "question": "Carlos is polite at work.",
            "answer": true,
            "explanation": "'Carlos is polite at work'."
          },
          {
            "type": "mcq",
            "question": "What does Carlos say on the phone?",
            "options": [
              "Can I speak to the manager, please?",
              "Good night!",
              "See you tomorrow."
            ],
            "answer": 0,
            "explanation": "'Can I speak to the manager, please?'."
          }
        ]
      },
      "exercises": [
        {
          "type": "fill",
          "question": "I ___ speak a little English. (habilidade)",
          "answer": "can",
          "explanation": "'can' = poder/saber (habilidade): I can speak a little English."
        },
        {
          "type": "fill",
          "question": "She ___ come today. She is sick. (não pode)",
          "answer": "can't",
          "explanation": "A negativa de 'can' é 'can't' (não pode): She can't come today."
        },
        {
          "type": "mcq",
          "question": "A polite way to say 'Send the report.' is:",
          "options": [
            "Send report now!",
            "Could you send the report, please?",
            "You send the report."
          ],
          "answer": 1,
          "explanation": "Pedido educado: 'Could you...?, please'."
        },
        {
          "type": "mcq",
          "question": "'Você pode me ajudar?' in English is:",
          "options": [
            "Can you help me?",
            "You help me.",
            "Help me!"
          ],
          "answer": 0,
          "explanation": "'Você pode me ajudar?' = 'Can you help me?'"
        },
        {
          "type": "fill",
          "question": "On the phone: 'Can I ___ to the manager, please?' (falar)",
          "answer": "speak",
          "explanation": "'Can I speak to...?' = Posso falar com...? O verbo é 'speak'."
        },
        {
          "type": "truefalse",
          "question": "'Can' is used for ability and for permission.",
          "answer": true,
          "explanation": "Verdadeiro. 'can' serve para habilidade e permissão."
        },
        {
          "type": "mcq",
          "question": "'O mais rápido possível' (sigla) in English is:",
          "options": [
            "ASAP",
            "FYI",
            "OK"
          ],
          "answer": 0,
          "explanation": "'As soon as possible' = ASAP."
        },
        {
          "type": "fill",
          "question": "'Só um momento' → Just a ___.",
          "answer": "moment",
          "explanation": "'Just a moment' = Só um momento."
        }
      ],
      "speaking": {
        "prompt": "Faça um pedido educado no trabalho (use Can you...? / Could you...? / please).",
        "example": "Can you help me, please? I would like to check this order. Could you send the report?",
        "keywords": [
          "help",
          "please",
          "would",
          "report"
        ]
      }
    }
  ]
};

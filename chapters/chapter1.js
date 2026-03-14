// ============================================================
//  CAPÍTULO 1 – "Las primeras dudas"
//  Contactos: Damián, Marta, Diego, Ana
// ============================================================

ChapterRegistry.register(1, {
    // -- Metadata --
    starsToUnlock: 0,
    contacts: ['damian', 'marta'],
    meta: {
        damian:  { emoji: '👨',   color: '#2a3a5c', order: 1 },
        marta:   { emoji: '👩‍🦰', color: '#5c2a4a', order: 2 },
        diego:   { emoji: '👨‍💼', color: '#2a5c3a', order: 3 },
        ana:     { emoji: '👧',   color: '#5c4a2a', order: 4 },
    },

    // -- Diálogos ES --
    es: {
        title: 'Las primeras dudas',
        desc: 'Damián llega tarde todas las noches. Dice que es el trabajo. ¿Lo es?',
        contactPreviews: {
            damian: 'Tu marido', marta: 'Tu mejor amiga',
            diego: 'Compañero de trabajo de Damián', ana: 'Tu hermana',
        },
        script: {
            damian: [
                // 0 - Primer mensaje
                {
                    messages: [
                        { from: 'damian', text: 'Cariño, voy a llegar tarde otra vez hoy. No me esperes despierta. 😘' }
                    ],
                    choices: [
                        '¿Otra vez? Ya van tres días seguidos...',
                        { text: 'Vale, no te preocupes. ¿Todo bien en el trabajo?', next: 3 }
                    ]
                },
                // 1
                {
                    messages: [
                        { from: 'damian', text: 'Sí bueno, ya sabes cómo es esto... el proyecto nuevo tiene unos plazos imposibles.' }
                    ],
                    choices: [
                        '¿Con quién te quedas trabajando hasta tan tarde?',
                        { text: 'Ya... Pues nada, ten cuidado al volver.', next: 3 }
                    ]
                },
                // 2 - Pregunta sobre quién
                {
                    messages: [
                        { from: 'damian', text: 'Con Diego y un par más del equipo.' },
                        { from: 'damian', text: 'No seas desconfiada, anda 😅' }
                    ],
                    choices: [ 'No es desconfianza... es preocupación.' ],
                    evidence: { title: 'Dice que trabaja con Diego', desc: 'Damián afirma que se queda con Diego y otros compañeros hasta tarde.' },
                    flag: 'asked_who'
                },
                // 3 - Despedida
                {
                    messages: [
                        { from: 'damian', text: 'Lo sé, perdona. Te compenso el finde, ¿vale? ❤️' },
                        { from: 'damian', text: 'Por cierto, ¿has visto mi camiseta azul? La del cuello de pico. No la encuentro.' }
                    ],
                    choices: [
                        'Creo que está en el cesto de la ropa sucia.',
                        '¿Para qué la necesitas a estas horas?'
                    ]
                },
                // 4
                {
                    messages: [
                        { from: 'damian', text: 'Para mañana, mujer. Que tengo una reunión.' },
                        { from: 'damian', text: 'Bueno, tengo que dejarte. Me llaman.' },
                        { from: 'damian', text: 'Te quiero. ❤️' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    unlock: ['marta'],
                    contactHasNew: ['marta'],
                    nextPhase: 1
                },
                // 5 - Damián vuelve a escribir (tras hablar con Diego, fase 4)
                {
                    requires: 4,
                    messages: [
                        { from: 'damian', text: 'Cariño, ya estoy saliendo. ¿Quieres que lleve algo para cenar?' }
                    ],
                    choices: [
                        'Son las 11 de la noche, Damián. No tengo hambre, tengo preguntas.',
                        'Sí, trae lo que sea.'
                    ]
                },
                // 6
                {
                    messages: [
                        { from: 'damian', text: '...' },
                        { from: 'damian', text: '¿Preguntas? ¿Sobre qué?' }
                    ],
                    choices: [
                        'He hablado con Diego. Me ha dicho que te fuiste pronto del trabajo.',
                        { text: 'Nada, déjalo. Trae comida china.', next: 9 }
                    ]
                },
                // 7 - Confrontación
                {
                    messages: [
                        { from: 'damian', text: '...' },
                        { from: 'damian', text: 'Andrea, confía en mí. Por favor.' },
                        { from: 'damian', text: 'Hay cosas que no te puedo contar ahora mismo pero te prometo que todo está bien.' },
                        { from: 'damian', text: 'Te lo voy a explicar todo muy pronto. ¿Vale?' }
                    ],
                    choices: [ 'Me cuesta mucho confiar cuando me mientes, Damián.' ],
                    evidence: { title: 'Damián admite que oculta algo', desc: '"Hay cosas que no te puedo contar ahora." Admite el secretismo pero pide confianza.' },
                    flag: 'confronted_damian'
                },
                // 8
                {
                    messages: [
                        { from: 'damian', text: 'Lo sé y lo siento mucho. De verdad.' },
                        { from: 'damian', text: 'Solo te pido unos días más. Por favor. 🙏' },
                        { from: 'damian', text: 'Te quiero. Más de lo que crees.' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    contactHasNew: ['ana'],
                    unlock: ['ana'],
                    nextPhase: 5
                },
                // 9 - Ruta no-confrontación
                {
                    messages: [
                        { from: 'damian', text: 'Marchando comida china 🥡' },
                        { from: 'damian', text: 'Llego en 20 minutos. Te quiero ❤️' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    contactHasNew: ['ana'],
                    unlock: ['ana'],
                    nextPhase: 5
                }
            ],
            marta: [
                // 0
                {
                    requires: 1,
                    messages: [
                        { from: 'marta', text: 'Tía, ¿cómo estás? Hace días que no sé de ti 💕' }
                    ],
                    choices: [
                        'Marta, necesito hablar contigo. Es sobre Damián.',
                        'Hola guapa, todo bien... bueno, más o menos.'
                    ]
                },
                // 1
                {
                    messages: [
                        { from: 'marta', text: '¿Qué pasa?? Me estás asustando 😰' }
                    ],
                    choices: [
                        'Lleva semanas llegando tardísimo. Siempre "el trabajo". No sé qué pensar.',
                        'Nada grave, solo que le noto raro últimamente.'
                    ]
                },
                // 2
                {
                    messages: [
                        { from: 'marta', text: 'A ver, no te pongas en lo peor...' },
                        { from: 'marta', text: 'Pero ahora que lo dices...' },
                        { from: 'marta', text: 'El otro día le vi en el centro comercial. Solo. Un martes a las 6 de la tarde.' },
                        { from: 'marta', text: 'Me pareció raro pero no le di importancia.' }
                    ],
                    choices: [
                        '¿¿En el centro comercial?? ¿Haciendo qué?',
                        'Puede que fuera a comprar algo...'
                    ],
                    evidence: { title: 'Marta le vio en el centro comercial', desc: 'Marta vio a Damián solo en el centro comercial un martes por la tarde. Él no mencionó nada.' }
                },
                // 3
                {
                    messages: [
                        { from: 'marta', text: 'No lo sé, iba con prisa y no me vio.' },
                        { from: 'marta', text: 'Oye, ¿y no le has mirado el móvil?' }
                    ],
                    choices: [
                        'No, eso me da mal rollo...',
                        'Lo he pensado pero siempre lo tiene con contraseña.'
                    ]
                },
                // 4
                {
                    messages: [
                        { from: 'marta', text: 'Mira, a lo mejor me estoy volviendo loca yo también pero...' },
                        { from: 'marta', text: '¿Te has fijado si huele diferente cuando llega? ¿Perfume nuevo?' }
                    ],
                    choices: [
                        'Ahora que lo dices... el otro día olía a algo dulce. Pensé que era del ambientador del coche.',
                        'No me he fijado... pero ahora me voy a fijar.'
                    ],
                    evidence: { title: 'Posible perfume ajeno', desc: 'Marta sugiere que Damián podría oler a perfume de otra persona. Andrea recuerda un olor dulce.' }
                },
                // 5
                {
                    messages: [
                        { from: 'marta', text: 'Mira, te digo lo que haría yo: habla con alguien de su trabajo. Con Diego o alguien así.' },
                        { from: 'marta', text: 'A lo mejor es verdad que están hasta arriba de curro.' },
                        { from: 'marta', text: 'Pero por si acaso... estate atenta, ¿vale? 👀' }
                    ],
                    choices: [ 'Tienes razón. Voy a hablar con Diego.' ]
                },
                // 6
                {
                    messages: [
                        { from: 'marta', text: 'Cualquier cosa me cuentas. Estoy aquí para ti ❤️' },
                        { from: 'marta', text: 'Y Andrea... no hagas locuras sin hablar conmigo primero, ¿eh?' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    unlock: ['diego'],
                    contactHasNew: ['diego'],
                    nextPhase: 2
                }
            ],
            diego: [
                // 0
                {
                    requires: 2,
                    messages: [],
                    choices: [
                        'Hola Diego, ¿puedo preguntarte algo sobre el trabajo?',
                        'Diego, necesito que seas sincero conmigo.'
                    ]
                },
                // 1
                {
                    messages: [
                        { from: 'diego', text: 'Ey Andrea! No sueles escribirme jaja' },
                        { from: 'diego', text: 'Claro, dime' }
                    ],
                    choices: [ 'Damián me dice que os quedáis hasta tarde por un proyecto. ¿Es verdad?' ]
                },
                // 2
                {
                    messages: [
                        { from: 'diego', text: '...' },
                        { from: 'diego', text: 'A ver, sí que hay un proyecto gordo.' },
                        { from: 'diego', text: 'Pero no te voy a mentir, esta semana Damián se ha ido antes que yo un par de días.' }
                    ],
                    choices: [
                        '¿Que se ha ido antes? ¿Y a dónde va?',
                        '...O sea que me ha mentido.'
                    ],
                    evidence: { title: 'Diego contradice a Damián', desc: 'Diego confirma que Damián se ha marchado pronto del trabajo varios días esta semana.' }
                },
                // 3
                {
                    messages: [
                        { from: 'diego', text: 'No lo sé Andrea, de verdad. Solo sé que sale y no dice a dónde.' },
                        { from: 'diego', text: 'Mira, no quiero meterme en medio pero...' },
                        { from: 'diego', text: 'El otro día vi que le escribía mucho alguien por el móvil. Lo tenía en silencio y lo guardaba rápido.' },
                        { from: 'diego', text: 'No vi el nombre, lo siento.' }
                    ],
                    choices: [ 'Gracias por ser honesto, Diego. De verdad.' ],
                    evidence: { title: 'Mensajes sospechosos en su móvil', desc: 'Diego vio que alguien le escribe mucho a Damián. Él oculta el teléfono y lo pone en silencio.' },
                    flag: 'diego_done'
                },
                // 4
                {
                    messages: [
                        { from: 'diego', text: 'No me des las gracias... espero que no sea nada.' },
                        { from: 'diego', text: 'Oye, una cosa más. El viernes pasado le oí hablar por teléfono en el pasillo.' },
                        { from: 'diego', text: 'Dijo algo como "sí, el sábado 15 es perfecto, a las 8".' },
                        { from: 'diego', text: 'Igual no es nada pero...' }
                    ],
                    choices: [ '¿El sábado 15? Ese es nuestro aniversario...' ],
                    evidence: { title: '"El sábado 15 a las 8"', desc: 'Diego oyó a Damián hablar por teléfono mencionando el sábado 15 a las 8. Es el día de su aniversario.' }
                },
                // 5
                {
                    messages: [
                        { from: 'diego', text: '¿Vuestro aniversario? Pues... mira, seguro que tiene alguna explicación.' },
                        { from: 'diego', text: 'Si necesitas algo, aquí estoy.' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    contactHasNew: ['damian'],
                    nextPhase: 4,
                    // MINIGAME: desbloquear el patrón del móvil viejo de Damián
                    minigame: {
                        type: 'phone-unlock',
                        id: 'ch1_phone',
                        stars: 2,
                        title: '📱 Patrón de desbloqueo',
                        data: {
                            pattern: [0, 1, 2, 5, 8],
                            hint: 'Damián siempre usa patrones en forma de L...'
                        }
                    }
                }
            ],
            ana: [
                // 0
                {
                    requires: 5,
                    messages: [
                        { from: 'ana', text: 'Hermana!! ¿Cómo estás? 🤗' }
                    ],
                    choices: [ 'Ana, creo que Damián me está engañando.' ]
                },
                // 1
                {
                    messages: [
                        { from: 'ana', text: '¿¿QUÉ?? 😱' },
                        { from: 'ana', text: 'A ver, cuéntame todo YA' }
                    ],
                    choices: [ 'Llega tarde, miente sobre el trabajo, oculta el móvil... y Marta le vio solo en el centro comercial.' ]
                },
                // 2
                {
                    messages: [
                        { from: 'ana', text: 'Madre mía...' },
                        { from: 'ana', text: 'Ok. No te voy a mentir, eso pinta mal.' },
                        { from: 'ana', text: 'PERO escúchame. Antes de montar un drama...' },
                        { from: 'ana', text: '¿Has revisado su móvil?' }
                    ],
                    choices: [
                        'No sé si debería... eso es invadir su privacidad.',
                        'Ya he pensado en eso. Me da miedo lo que pueda encontrar.'
                    ]
                },
                // 3
                {
                    messages: [
                        { from: 'ana', text: 'Mira, la confianza ya está rota de su parte, no de la tuya.' },
                        { from: 'ana', text: 'Cuando se duerma, mira las llamadas recientes. Solo eso.' },
                        { from: 'ana', text: 'Y me cuentas. 🫂' }
                    ],
                    choices: [ 'Vale... tienes razón. Lo haré esta noche.' ],
                    flag: 'ana_advice'
                },
                // 4 - Revisión del móvil
                {
                    messages: [
                        { type: 'system', text: 'Esa noche, mientras Damián duerme, revisas su móvil...' },
                        { type: 'system', text: '📱 Llamadas recientes:' },
                        { type: 'system', text: '• Silvia (5 llamadas esta semana)\n• Diego\n• Carlos\n• Mamá\n• Tú' },
                        { type: 'system', text: '¿Quién es Silvia? No conoces a ninguna Silvia.' },
                        { type: 'system', text: 'También ves un WhatsApp de "Carlos" que dice: "Tranquilo hermano, ella no sospecha nada 👍"' }
                    ],
                    choices: [ '¿¿Quién es Silvia?? ¿Y qué sabe Carlos que yo no sé?' ],
                    evidence: { title: '5 llamadas a "Silvia" + mensaje de Carlos', desc: 'Damián ha llamado 5 veces esta semana a una tal "Silvia". Su hermano Carlos le escribió: "Ella no sospecha nada." ¿Quiénes son cómplices?' }
                },
                // 5
                {
                    messages: [
                        { type: 'system', text: 'Has guardado el número de Silvia.' },
                        { type: 'system', text: 'Mañana vas a llegar al fondo de esto.' },
                        { type: 'system', text: '— Fin del Capítulo 1 —' }
                    ],
                    choices: [],
                    flag: 'ch1_complete',
                    nextChapter: 2,
                    // MINIGAME: emparejar pistas
                    minigame: {
                        type: 'memory-match',
                        id: 'ch1_memory',
                        stars: 2,
                        title: '🧩 Conecta las pistas',
                        data: {
                            pairs: [
                                { a: 'Llega tarde', b: 'Proyecto del trabajo', emoji: '🕐' },
                                { a: 'Centro comercial', b: 'Solo un martes', emoji: '🏬' },
                                { a: 'Móvil en silencio', b: 'Mensajes ocultos', emoji: '📱' },
                                { a: '5 llamadas', b: 'Silvia', emoji: '📞' },
                                { a: '"Sábado 15"', b: 'Aniversario', emoji: '💍' },
                                { a: 'Carlos', b: '"Ella no sospecha"', emoji: '🤫' }
                            ]
                        }
                    }
                }
            ]
        }
    },

    // -- Diálogos EN --
    en: {
        title: 'The First Doubts',
        desc: "Damián comes home late every night. He says it's work. Is it?",
        contactPreviews: {
            damian: 'Your husband', marta: 'Your best friend',
            diego: "Damián's coworker", ana: 'Your sister',
        },
        script: {
            damian: [
                {
                    messages: [
                        { from: 'damian', text: "Honey, I'm going to be late again today. Don't wait up. 😘" }
                    ],
                    choices: [
                        'Again? That makes three days in a row...',
                        { text: "OK, don't worry. Everything alright at work?", next: 3 }
                    ]
                },
                {
                    messages: [
                        { from: 'damian', text: "Yeah well, you know how it is... the new project has impossible deadlines." }
                    ],
                    choices: [
                        'Who are you staying late with?',
                        { text: "OK... Well, be careful coming home.", next: 3 }
                    ]
                },
                {
                    messages: [
                        { from: 'damian', text: 'With Diego and a couple others from the team.' },
                        { from: 'damian', text: "Don't be so suspicious 😅" }
                    ],
                    choices: [ "It's not suspicion... it's concern." ],
                    evidence: { title: 'Says he works with Diego', desc: 'Damián claims he stays late with Diego and other coworkers.' },
                    flag: 'asked_who'
                },
                {
                    messages: [
                        { from: 'damian', text: "I know, sorry. I'll make it up to you this weekend, OK? ❤️" },
                        { from: 'damian', text: "By the way, have you seen my blue shirt? The v-neck one. I can't find it." }
                    ],
                    choices: [
                        'I think it\'s in the laundry basket.',
                        'Why do you need it at this hour?'
                    ]
                },
                {
                    messages: [
                        { from: 'damian', text: "For tomorrow, silly. I have a meeting." },
                        { from: 'damian', text: 'OK, gotta go. Someone is calling me.' },
                        { from: 'damian', text: 'Love you. ❤️' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    unlock: ['marta'], contactHasNew: ['marta'], nextPhase: 1
                },
                {
                    requires: 4,
                    messages: [
                        { from: 'damian', text: "Babe, I'm leaving now. Want me to bring something for dinner?" }
                    ],
                    choices: [
                        "It's 11 PM, Damián. I'm not hungry, I have questions.",
                        'Sure, bring whatever.'
                    ]
                },
                {
                    messages: [
                        { from: 'damian', text: '...' },
                        { from: 'damian', text: 'Questions? About what?' }
                    ],
                    choices: [
                        'I talked to Diego. He told me you left work early.',
                        { text: 'Nothing, forget it. Bring Chinese food.', next: 9 }
                    ]
                },
                {
                    messages: [
                        { from: 'damian', text: '...' },
                        { from: 'damian', text: 'Andrea, trust me. Please.' },
                        { from: 'damian', text: "There are things I can't tell you right now but I promise everything is fine." },
                        { from: 'damian', text: "I'll explain everything very soon. OK?" }
                    ],
                    choices: [ "It's really hard to trust you when you lie to me, Damián." ],
                    evidence: { title: 'Damián admits hiding something', desc: '"There are things I can\'t tell you right now." He admits the secrecy but asks for trust.' },
                    flag: 'confronted_damian'
                },
                {
                    messages: [
                        { from: 'damian', text: "I know and I'm so sorry. Really." },
                        { from: 'damian', text: 'I just need a few more days. Please. 🙏' },
                        { from: 'damian', text: 'I love you. More than you think.' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    contactHasNew: ['ana'], unlock: ['ana'], nextPhase: 5
                },
                {
                    messages: [
                        { from: 'damian', text: 'Chinese food coming up 🥡' },
                        { from: 'damian', text: "Be there in 20 minutes. Love you ❤️" },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    contactHasNew: ['ana'], unlock: ['ana'], nextPhase: 5
                }
            ],
            marta: [
                {
                    requires: 1,
                    messages: [ { from: 'marta', text: "Girl, how are you? Haven't heard from you in days 💕" } ],
                    choices: [ "Marta, I need to talk to you. It's about Damián.", 'Hey babe, all good... well, sort of.' ]
                },
                {
                    messages: [ { from: 'marta', text: "What's going on?? You're scaring me 😰" } ],
                    choices: [
                        "He's been coming home super late for weeks. Always \"work\". I don't know what to think.",
                        "Nothing serious, I just think he's been acting weird lately."
                    ]
                },
                {
                    messages: [
                        { from: 'marta', text: "OK, don't assume the worst..." },
                        { from: 'marta', text: 'But now that you mention it...' },
                        { from: 'marta', text: 'The other day I saw him at the mall. Alone. On a Tuesday at 6 PM.' },
                        { from: 'marta', text: "I thought it was weird but didn't think much of it." }
                    ],
                    choices: [ 'At the mall?? Doing what?', 'Maybe he was just buying something...' ],
                    evidence: { title: 'Marta saw him at the mall', desc: 'Marta saw Damián alone at the mall on a Tuesday afternoon. He never mentioned it.' }
                },
                {
                    messages: [
                        { from: 'marta', text: "I don't know, he was in a hurry and didn't see me." },
                        { from: 'marta', text: "Hey, have you checked his phone?" }
                    ],
                    choices: [ "No, that feels wrong...", "I've thought about it but he always has it locked." ]
                },
                {
                    messages: [
                        { from: 'marta', text: "OK maybe I'm going crazy too but..." },
                        { from: 'marta', text: "Have you noticed if he smells different when he comes home? New perfume?" }
                    ],
                    choices: [
                        "Now that you mention it... the other day he smelled sweet. I thought it was the car air freshener.",
                        "I haven't noticed... but now I will."
                    ],
                    evidence: { title: 'Possible foreign perfume', desc: "Marta suggests Damián might smell like someone else's perfume. Andrea recalls a sweet scent." }
                },
                {
                    messages: [
                        { from: 'marta', text: "Look, here's what I'd do: talk to someone from his work. Like Diego." },
                        { from: 'marta', text: 'Maybe they really are swamped with work.' },
                        { from: 'marta', text: 'But just in case... keep your eyes open, OK? 👀' }
                    ],
                    choices: [ "You're right. I'll talk to Diego." ]
                },
                {
                    messages: [
                        { from: 'marta', text: "Whatever happens, tell me. I'm here for you ❤️" },
                        { from: 'marta', text: "And Andrea... don't do anything crazy without talking to me first, OK?" },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    unlock: ['diego'], contactHasNew: ['diego'], nextPhase: 2
                }
            ],
            diego: [
                { requires: 2, messages: [], choices: [ 'Hi Diego, can I ask you something about work?', 'Diego, I need you to be honest with me.' ] },
                {
                    messages: [ { from: 'diego', text: "Hey Andrea! You don't usually text me haha" }, { from: 'diego', text: 'Sure, go ahead' } ],
                    choices: [ "Damián tells me you guys stay late for a project. Is that true?" ]
                },
                {
                    messages: [
                        { from: 'diego', text: '...' },
                        { from: 'diego', text: 'Well, there is a big project.' },
                        { from: 'diego', text: "But I'm not going to lie to you, Damián left earlier than me a couple of days this week." }
                    ],
                    choices: [ 'He left early? Where does he go?', '...So he lied to me.' ],
                    evidence: { title: 'Diego contradicts Damián', desc: "Diego confirms Damián left work early several days this week." }
                },
                {
                    messages: [
                        { from: 'diego', text: "I don't know Andrea, honestly. I just know he leaves and doesn't say where." },
                        { from: 'diego', text: "Look, I don't want to get in the middle but..." },
                        { from: 'diego', text: "The other day I saw someone texting him a lot. He had his phone on silent and kept hiding it." },
                        { from: 'diego', text: "I didn't see the name, sorry." }
                    ],
                    choices: [ 'Thanks for being honest, Diego. Really.' ],
                    evidence: { title: 'Suspicious messages on his phone', desc: 'Diego saw someone texting Damián frequently. He hides his phone and keeps it on silent.' },
                    flag: 'diego_done'
                },
                {
                    messages: [
                        { from: 'diego', text: "Don't thank me... I hope it's nothing." },
                        { from: 'diego', text: "Hey, one more thing. Last Friday I heard him on the phone in the hallway." },
                        { from: 'diego', text: 'He said something like "yes, Saturday the 15th is perfect, at 8."' },
                        { from: 'diego', text: 'Might be nothing but...' }
                    ],
                    choices: [ 'Saturday the 15th? That\'s our anniversary...' ],
                    evidence: { title: '"Saturday the 15th at 8"', desc: "Diego overheard Damián on the phone mentioning Saturday the 15th at 8. That's their anniversary." }
                },
                {
                    messages: [
                        { from: 'diego', text: "Your anniversary? Well... I'm sure there's an explanation." },
                        { from: 'diego', text: "If you need anything, I'm here." },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    contactHasNew: ['damian'], nextPhase: 4,
                    minigame: { type: 'phone-unlock', id: 'ch1_phone', stars: 2, title: '📱 Unlock Pattern',
                        data: { pattern: [0, 1, 2, 5, 8], hint: 'Damián always uses L-shaped patterns...' } }
                }
            ],
            ana: [
                { requires: 5, messages: [ { from: 'ana', text: 'Sis!! How are you? 🤗' } ], choices: [ "Ana, I think Damián is cheating on me." ] },
                {
                    messages: [ { from: 'ana', text: 'WHAT?? 😱' }, { from: 'ana', text: 'OK, tell me everything NOW' } ],
                    choices: [ "He comes home late, lies about work, hides his phone... and Marta saw him alone at the mall." ]
                },
                {
                    messages: [
                        { from: 'ana', text: 'Oh my God...' },
                        { from: 'ana', text: "OK. I'm not going to lie, that looks bad." },
                        { from: 'ana', text: 'BUT listen to me. Before you go nuclear...' },
                        { from: 'ana', text: 'Have you checked his phone?' }
                    ],
                    choices: [ "I don't know if I should... that's invading his privacy.", "I've thought about it. I'm scared of what I might find." ]
                },
                {
                    messages: [
                        { from: 'ana', text: "Look, trust was already broken on his end, not yours." },
                        { from: 'ana', text: 'When he falls asleep, check his recent calls. Just that.' },
                        { from: 'ana', text: 'And then tell me. 🫂' }
                    ],
                    choices: [ "OK... you're right. I'll do it tonight." ],
                    flag: 'ana_advice'
                },
                {
                    messages: [
                        { type: 'system', text: 'That night, while Damián sleeps, you check his phone...' },
                        { type: 'system', text: '📱 Recent calls:' },
                        { type: 'system', text: '• Silvia (5 calls this week)\n• Diego\n• Carlos\n• Mom\n• You' },
                        { type: 'system', text: "Who is Silvia? You don't know any Silvia." },
                        { type: 'system', text: 'You also see a WhatsApp from "Carlos" saying: "Don\'t worry bro, she doesn\'t suspect a thing 👍"' }
                    ],
                    choices: [ "Who is Silvia?? And what does Carlos know that I don't?" ],
                    evidence: { title: '5 calls to "Silvia" + Carlos message', desc: 'Damián called someone named "Silvia" 5 times this week. His brother Carlos wrote: "She doesn\'t suspect a thing." Who are the accomplices?' }
                },
                {
                    messages: [
                        { type: 'system', text: "You've saved Silvia's number." },
                        { type: 'system', text: "Tomorrow you're getting to the bottom of this." },
                        { type: 'system', text: '— End of Chapter 1 —' }
                    ],
                    choices: [],
                    flag: 'ch1_complete', nextChapter: 2,
                    minigame: { type: 'memory-match', id: 'ch1_memory', stars: 2, title: '🧩 Connect the Clues',
                        data: { pairs: [
                            { a: 'Comes home late', b: 'Work project', emoji: '🕐' },
                            { a: 'Mall', b: 'Alone on Tuesday', emoji: '🏬' },
                            { a: 'Phone on silent', b: 'Hidden messages', emoji: '📱' },
                            { a: '5 calls', b: 'Silvia', emoji: '📞' },
                            { a: '"Saturday 15th"', b: 'Anniversary', emoji: '💍' },
                            { a: 'Carlos', b: '"She doesn\'t suspect"', emoji: '🤫' }
                        ] } }
                }
            ]
        }
    }
});

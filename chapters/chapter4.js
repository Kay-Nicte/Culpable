// ============================================================
//  CAPÍTULO 4 – "Crisis"
//  Confrontación, grupo familiar, la verdad se acerca
// ============================================================

ChapterRegistry.register(4, {
    starsToUnlock: 6,
    contacts: ['grupo_familia'],
    meta: {
        grupo_familia: { emoji: '👨‍👩‍👧', color: '#4a3a5c', order: 13, isGroup: true },
    },

    es: {
        title: 'Crisis',
        desc: 'Ya sabes la verdad... pero ¿puedes seguir fingiendo? La tensión estalla.',
        contactPreviews: {
            grupo_familia: 'Damián, Rosa, Carlos y tú',
        },
        script: {
            damian: [
                // Damián escribe tras el cap 3
                {
                    messages: [
                        { from: 'damian', text: 'Andrea... ¿estás bien?' },
                        { from: 'damian', text: 'Llevas unos días muy rara conmigo. Apenas me hablas.' }
                    ],
                    choices: [
                        'Estoy bien. Solo cansada.',
                        'Damián, ¿me estás preparando algo para nuestro aniversario?'
                    ]
                },
                // Ruta 1: evasiva
                {
                    messages: [
                        { from: 'damian', text: 'Andrea, te conozco. "Solo cansada" no existe contigo.' },
                        { from: 'damian', text: '¿He hecho algo mal? Dímelo, por favor.' }
                    ],
                    choices: [
                        'Has hecho muchas cosas que no entiendo últimamente.',
                        { text: 'De verdad que no pasa nada. Vamos a dejarlo.', next: 4 }
                    ]
                },
                // 2 - Confrontación suave
                {
                    messages: [
                        { from: 'damian', text: '¿Como qué? Dime.' }
                    ],
                    choices: [
                        'Como mentirme sobre dónde estás, ocultar el móvil, llamar a gente que no conozco...',
                    ]
                },
                // 3
                {
                    messages: [
                        { from: 'damian', text: 'Joder, Andrea...' },
                        { from: 'damian', text: 'Tienes razón. Te he mentido. Y me siento fatal por ello.' },
                        { from: 'damian', text: 'Pero te JURO que no es lo que piensas.' },
                        { from: 'damian', text: 'Solo necesito que confíes en mí dos semanas más. Solo dos.' },
                        { from: 'damian', text: 'Después de eso, lo vas a entender todo. Y ojalá me perdones.' }
                    ],
                    choices: [
                        'Dos semanas... Hasta el 15.',
                        '¿Y si no puedo esperar dos semanas más, Damián?'
                    ],
                    evidence: { title: 'Damián pide 2 semanas más', desc: 'Damián admite que ha mentido, se siente fatal, pero jura que no es lo que Andrea piensa. Pide 2 semanas más de confianza.' }
                },
                // 4
                {
                    messages: [
                        { from: 'damian', text: 'Andrea...' },
                        { from: 'damian', text: 'Eres lo mejor que me ha pasado en la vida.' },
                        { from: 'damian', text: 'Y si después del 15 quieres dejarme, lo entenderé.' },
                        { from: 'damian', text: 'Pero dame esa oportunidad. Por favor. ❤️' }
                    ],
                    choices: [ 'Vale, Damián. Hasta el 15.' ]
                },
                // 5
                {
                    messages: [
                        { from: 'damian', text: 'Gracias. Te quiero.' },
                        { from: 'damian', text: 'Y Andrea... ese día ponte guapa. Más de lo normal.' },
                        { from: 'damian', text: '😘' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    nextPhase: 14,
                    contactHasNew: ['grupo_familia', 'lucia'],
                    // MINIGAME: descifrar un mensaje entre Carlos y Damián
                    minigame: {
                        type: 'code-breaker',
                        id: 'ch4_code',
                        stars: 2,
                        title: '🔐 Mensaje cifrado',
                        data: {
                            hint: 'Interceptas un mensaje entre Carlos y Damián...',
                            encoded:  'ZH QNFHZ FH BNEH PHNEQB YR QV YB QRY NAVYYB',
                            decoded:  'SE PUSO SU CARA CUANDO LE DI LO DEL ANILLO',
                            revealed: [0, 3, 15, 30]
                        }
                    }
                }
            ],
            grupo_familia: [
                {
                    requires: 14,
                    messages: [
                        { from: 'mama_rosa', text: '¿Quién ha puesto la foto del menú en el grupo? 😂' },
                        { from: 'carlos', text: 'Mamá, este grupo es SOLO para organizar, no para compartir memes 😂' },
                        { type: 'system', text: 'Te das cuenta de que estás en un grupo donde organizan TU fiesta sorpresa.' },
                        { type: 'system', text: 'Alguien te añadió por error.' }
                    ],
                    choices: [ '...Creo que me han añadido a este grupo por error.' ]
                },
                {
                    messages: [
                        { from: 'carlos', text: '¿¿¿¿QUÉ????' },
                        { from: 'carlos', text: '¿¿QUIÉN HA AÑADIDO A ANDREA??' },
                        { from: 'mama_rosa', text: 'Ay... creo que he sido yo 🙈' },
                        { from: 'mama_rosa', text: 'Quería añadir a tu prima Andrea y le di a la Andrea equivocada...' },
                        { from: 'carlos', text: 'MAMÁ 😭😭😭' }
                    ],
                    choices: [
                        'Tranquilos... ya lo sabía todo.',
                        '😂😂😂'
                    ],
                    evidence: { title: 'Grupo de la fiesta sorpresa', desc: 'Rosa añadió a Andrea al grupo por error. Carlos y Rosa organizaban la fiesta junto a Damián. La evidencia es irrefutable.' }
                },
                {
                    messages: [
                        { from: 'carlos', text: 'Andrea... ¿desde cuándo lo sabes? 💀' }
                    ],
                    choices: [ 'Desde hace unos días. He hablado con Silvia, Patricia, Javi, Elena... y con tu madre. 😂' ]
                },
                {
                    messages: [
                        { from: 'carlos', text: 'Dios mío. O sea que TODOS han cantado.' },
                        { from: 'mama_rosa', text: 'Ay hijo, es que tu hermano nos ha puesto en una situación muy difícil 😂' },
                        { from: 'carlos', text: 'Damián va a flipar cuando se entere...' },
                        { from: 'carlos', text: 'Andrea, por favor. HAZ COMO QUE NO SABES NADA.' },
                        { from: 'carlos', text: 'Ha dedicado un mes entero a esto. Le haría mucha ilusión darte la sorpresa.' }
                    ],
                    choices: [
                        'Lo intentaré... pero no prometo nada 😂',
                        'Después de todo lo que he sufrido, se lo merece un poco 😤'
                    ]
                },
                {
                    messages: [
                        { from: 'mama_rosa', text: 'Hija, perdona que te hayamos hecho pasar por esto 🥺' },
                        { from: 'mama_rosa', text: 'Pero cuando veas lo que ha preparado... vas a llorar. Te lo digo yo.' },
                        { from: 'carlos', text: 'Es verdad. Es BRUTAL. El tío se ha gastado...' },
                        { from: 'mama_rosa', text: '¡¡CARLOS, CALLA!!' },
                        { from: 'carlos', text: 'Jajajaja vale vale 😂' },
                        { type: 'system', text: '— Fin del Capítulo 4 —' }
                    ],
                    choices: [],
                    flag: 'ch4_complete',
                    nextChapter: 5
                }
            ],
            lucia: [
                {
                    requires: 14,
                    messages: [
                        { from: 'lucia', text: 'Andrea, ya lo tengo todo claro.' },
                        { from: 'lucia', text: 'Caso cerrado: Damián es 100% inocente. 🔍✅' }
                    ],
                    choices: [ 'Ya lo sé, Lucía. Ya lo sé. 😂' ]
                },
                {
                    messages: [
                        { from: 'lucia', text: 'Resumen del caso:' },
                        { from: 'lucia', text: '🔸 Silvia = catering La Rosaleda\n🔸 Patricia = florista\n🔸 Carlos = cómplice nº1\n🔸 Rosa = peor guardiana de secretos del mundo\n🔸 El "crimen" = fiesta sorpresa de aniversario con renovación de votos' },
                        { from: 'lucia', text: 'Veredicto: NO CULPABLE 😂❤️' }
                    ],
                    choices: [ 'Lucía, eres la mejor detective del mundo. Caso cerrado. ❤️' ],
                    evidence: { title: 'Caso cerrado: NO CULPABLE', desc: 'Lucía resume: Silvia (catering), Patricia (flores), Carlos (cómplice), Rosa (la peor guardando secretos). Todo era una fiesta sorpresa.' }
                },
                {
                    messages: [
                        { from: 'lucia', text: 'Ahora... ¿vas a hacerte la sorprendida o le vas a decir que lo sabes?' },
                        { from: 'lucia', text: 'Porque si te haces la sorprendida, te mereces un Oscar 😂' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                }
            ],
            grupo_amigas: [
                {
                    requires: 14,
                    messages: [
                        { from: 'ana', text: 'Chicas... a que no adivináis quién me ha añadido al grupo de la fiesta sorpresa de Andrea 😂😂😂' },
                        { from: 'marta', text: 'NOOO 😂😂' },
                        { from: 'ana', text: 'La suegra. La suegra la ha añadido POR ERROR. 💀' }
                    ],
                    choices: [ 'Chicas, os juro que esta familia no sabe guardar un secreto 😂' ]
                },
                {
                    messages: [
                        { from: 'marta', text: 'JAJAJAJAJA estoy llorando 😂😂' },
                        { from: 'marta', text: 'O sea, hemos pasado de "mi marido me engaña" a "mi marido me prepara la fiesta del siglo"' },
                        { from: 'ana', text: 'Mejor argumento de telenovela imposible 😂' },
                        { from: 'marta', text: 'Andrea, tienes que hacerte la sorprendida. POR FAVOR.' },
                        { from: 'ana', text: 'TOTALMENTE DE ACUERDO 🎭' }
                    ],
                    choices: [ 'Seré la mejor actriz del mundo. Lo prometo. 🎭😂' ]
                },
                {
                    messages: [
                        { from: 'marta', text: 'Te queremos, loca ❤️' },
                        { from: 'ana', text: 'Familia de locos pero de los buenos 💕' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: []
                }
            ]
        }
    },

    en: {
        title: 'Crisis',
        desc: "You already know the truth... but can you keep pretending? Tensions explode.",
        contactPreviews: { grupo_familia: 'Damián, Rosa, Carlos and you' },
        script: {
            damian: [
                { messages: [ { from: 'damian', text: 'Andrea... are you OK?' }, { from: 'damian', text: "You've been really weird with me these past few days. You barely talk to me." } ],
                    choices: [ "I'm fine. Just tired.", 'Damián, are you planning something for our anniversary?' ] },
                { messages: [ { from: 'damian', text: 'Andrea, I know you. "Just tired" doesn\'t exist with you.' }, { from: 'damian', text: "Have I done something wrong? Tell me, please." } ],
                    choices: [ "You've done a lot of things I don't understand lately.", { text: "Really, it's nothing. Let's drop it.", next: 4 } ] },
                { messages: [ { from: 'damian', text: 'Like what? Tell me.' } ],
                    choices: [ 'Like lying about where you are, hiding your phone, calling people I don\'t know...' ] },
                {
                    messages: [
                        { from: 'damian', text: 'Damn, Andrea...' },
                        { from: 'damian', text: "You're right. I lied to you. And I feel terrible about it." },
                        { from: 'damian', text: "But I SWEAR it's not what you think." },
                        { from: 'damian', text: 'I just need you to trust me for two more weeks. Just two.' },
                        { from: 'damian', text: "After that, you'll understand everything. And hopefully you'll forgive me." }
                    ],
                    choices: [ 'Two weeks... Until the 15th.', "What if I can't wait two more weeks, Damián?" ],
                    evidence: { title: 'Damián asks for 2 more weeks', desc: "Damián admits he lied, feels terrible, but swears it's not what Andrea thinks. Asks for 2 more weeks of trust." }
                },
                { messages: [ { from: 'damian', text: 'Andrea...' }, { from: 'damian', text: "You're the best thing that's ever happened to me." }, { from: 'damian', text: "And if after the 15th you want to leave me, I'll understand." }, { from: 'damian', text: 'But give me that chance. Please. ❤️' } ],
                    choices: [ 'OK, Damián. Until the 15th.' ] },
                {
                    messages: [ { from: 'damian', text: 'Thank you. I love you.' }, { from: 'damian', text: 'And Andrea... look beautiful that day. More than usual.' }, { from: 'damian', text: '😘' }, { type: 'system', text: '{disconnected}' } ],
                    choices: [], nextPhase: 14, contactHasNew: ['grupo_familia', 'lucia'],
                    minigame: { type: 'code-breaker', id: 'ch4_code', stars: 2, title: '🔐 Encrypted Message',
                        data: { hint: 'You intercept a message between Carlos and Damián...',
                            encoded:  'ZH QNFHZ FH BNEH PHNEQB YR QV YB QRY NAVYYB',
                            decoded:  'SE PUSO SU CARA CUANDO LE DI LO DEL ANILLO',
                            revealed: [0, 3, 15, 30] } }
                }
            ],
            grupo_familia: [
                { requires: 14, messages: [ { from: 'mama_rosa', text: 'Who posted the menu photo in the group? 😂' }, { from: 'carlos', text: "Mom, this group is ONLY for planning, not for sharing memes 😂" }, { type: 'system', text: "You realize you're in a group where they're organizing YOUR surprise party." }, { type: 'system', text: 'Someone added you by mistake.' } ], choices: [ "...I think I've been added to this group by mistake." ] },
                { messages: [ { from: 'carlos', text: '????WHAT????' }, { from: 'carlos', text: 'WHO ADDED ANDREA??' }, { from: 'mama_rosa', text: "Oh... I think it was me 🙈" }, { from: 'mama_rosa', text: "I wanted to add your cousin Andrea and clicked the wrong one..." }, { from: 'carlos', text: 'MOM 😭😭😭' } ], choices: [ "It's OK... I already knew everything.", '😂😂😂' ],
                    evidence: { title: 'Surprise party group', desc: 'Rosa added Andrea to the group by mistake. Carlos and Rosa were organizing the party with Damián. The evidence is irrefutable.' } },
                { messages: [ { from: 'carlos', text: "Andrea... how long have you known? 💀" } ], choices: [ "A few days now. I've talked to Silvia, Patricia, Javi, Elena... and your mom. 😂" ] },
                { messages: [ { from: 'carlos', text: "Oh my God. So EVERYONE talked." }, { from: 'mama_rosa', text: "Oh dear, your brother put us in a very difficult situation 😂" }, { from: 'carlos', text: "Damián is going to lose it when he finds out..." }, { from: 'carlos', text: "Andrea, please. PRETEND YOU DON'T KNOW." }, { from: 'carlos', text: "He's spent an entire month on this. It would mean so much to him to surprise you." } ], choices: [ "I'll try... but no promises 😂", "After everything I've been through, he deserves a little payback 😤" ] },
                { messages: [ { from: 'mama_rosa', text: "Sweetheart, I'm sorry we put you through this 🥺" }, { from: 'mama_rosa', text: "But when you see what he's prepared... you're going to cry. Trust me." }, { from: 'carlos', text: "It's true. It's INSANE. The guy has spent..." }, { from: 'mama_rosa', text: 'CARLOS, QUIET!!' }, { from: 'carlos', text: 'Hahaha OK OK 😂' }, { type: 'system', text: '— End of Chapter 4 —' } ],
                    choices: [], flag: 'ch4_complete', nextChapter: 5 }
            ],
            lucia: [
                { requires: 14, messages: [ { from: 'lucia', text: "Andrea, I've got it all figured out." }, { from: 'lucia', text: 'Case closed: Damián is 100% innocent. 🔍✅' } ], choices: [ 'I know, Lucía. I know. 😂' ] },
                { messages: [ { from: 'lucia', text: 'Case summary:' }, { from: 'lucia', text: '🔸 Silvia = La Rosaleda catering\n🔸 Patricia = florist\n🔸 Carlos = accomplice #1\n🔸 Rosa = worst secret keeper ever\n🔸 The "crime" = surprise anniversary party with vow renewal' }, { from: 'lucia', text: 'Verdict: NOT GUILTY 😂❤️' } ],
                    choices: [ "Lucía, you're the best detective ever. Case closed. ❤️" ],
                    evidence: { title: 'Case closed: NOT GUILTY', desc: "Lucía summarizes: Silvia (catering), Patricia (flowers), Carlos (accomplice), Rosa (worst at keeping secrets). It was all a surprise party." } },
                { messages: [ { from: 'lucia', text: "Now... are you going to act surprised or tell him you know?" }, { from: 'lucia', text: 'Because if you act surprised, you deserve an Oscar 😂' }, { type: 'system', text: '{disconnected}' } ], choices: [] }
            ],
            grupo_amigas: [
                { requires: 14, messages: [ { from: 'ana', text: "Girls... guess who got added to Andrea's surprise party group 😂😂😂" }, { from: 'marta', text: 'NOOO 😂😂' }, { from: 'ana', text: "The mother-in-law. She added her BY MISTAKE. 💀" } ], choices: [ "Girls, I swear this family can't keep a secret 😂" ] },
                { messages: [ { from: 'marta', text: "HAHAHA I'm crying 😂😂" }, { from: 'marta', text: 'So we went from "my husband is cheating" to "my husband is throwing the party of the century"' }, { from: 'ana', text: 'Best soap opera plot twist ever 😂' }, { from: 'marta', text: 'Andrea, you HAVE to act surprised. PLEASE.' }, { from: 'ana', text: 'TOTALLY AGREE 🎭' } ], choices: [ "I'll be the best actress ever. Promise. 🎭😂" ] },
                { messages: [ { from: 'marta', text: 'We love you, crazy girl ❤️' }, { from: 'ana', text: 'Crazy family but the good kind 💕' }, { type: 'system', text: '{disconnected}' } ], choices: [] }
            ]
        }
    }
});

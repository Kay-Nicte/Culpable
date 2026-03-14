// ============================================================
//  CAPÍTULO 2 – "Más profundo"
//  Nuevos contactos: Lucía (detective), Carlos (hermano), Javi (gym), grupo amigas
// ============================================================

ChapterRegistry.register(2, {
    starsToUnlock: 2,
    contacts: ['silvia', 'lucia', 'carlos', 'javi', 'grupo_amigas'],
    meta: {
        silvia:   { emoji: '👩‍🍳', color: '#6a2a5c', order: 5 },
        lucia:    { emoji: '🕵️',  color: '#3a2a5c', order: 6 },
        carlos:   { emoji: '👦',   color: '#2a4a5c', order: 7 },
        javi:     { emoji: '💪',   color: '#5c5c2a', order: 8 },
        grupo_amigas: { emoji: '👩‍👩‍👧', color: '#5c2a5c', order: 9, isGroup: true },
    },

    es: {
        title: 'Más profundo',
        desc: '¿Quién es Silvia? ¿Qué oculta Carlos? Es hora de investigar en serio.',
        contactPreviews: {
            silvia: 'Número desconocido', lucia: 'Amiga de la universidad',
            carlos: 'Hermano de Damián', javi: 'Amigo del gimnasio de Damián',
            grupo_amigas: 'Marta, Ana y tú',
        },
        script: {
            silvia: [
                // 0
                {
                    messages: [],
                    choices: [ 'Hola, ¿eres Silvia?', '¿Quién eres y por qué llamas tanto a mi marido?' ]
                },
                // 1
                {
                    messages: [
                        { from: 'silvia', text: '¿Sí? ¿Quién es?' }
                    ],
                    choices: [ 'Soy Andrea. La mujer de Damián.' ]
                },
                // 2
                {
                    messages: [
                        { from: 'silvia', text: '¡Ah, Andrea! 😊' },
                        { from: 'silvia', text: 'Soy Silvia, de Eventos y Catering "La Rosaleda".' },
                        { from: 'silvia', text: 'Tu marido ha contratado nuestros servicios.' },
                        { from: 'silvia', text: 'Pero... ay, creo que no debería decirte más. Él me pidió discreción total. 🤐' }
                    ],
                    choices: [
                        '¿¿Catering?? ¿Para qué evento??',
                        'Por favor Silvia, necesito saber qué está pasando.'
                    ],
                    evidence: { title: 'Silvia = catering "La Rosaleda"', desc: 'Silvia no es "la otra". Trabaja en una empresa de catering. Damián contrató un evento y pidió discreción.' }
                },
                // 3
                {
                    messages: [
                        { from: 'silvia', text: 'Ay madre, me va a matar...' },
                        { from: 'silvia', text: 'Mira, solo te digo que tu marido es un cielo de persona.' },
                        { from: 'silvia', text: 'No puedo decirte más. ¡De verdad! Es una sorpresa.' },
                        { from: 'silvia', text: 'Confía en él. 🤍' }
                    ],
                    choices: [ '...¿Una sorpresa? ¿Qué tipo de sorpresa?' ]
                },
                // 4
                {
                    messages: [
                        { from: 'silvia', text: '¡¡No he dicho nada!! 🙈' },
                        { from: 'silvia', text: 'Perdona Andrea, pero de verdad que no puedo. Se lo prometí.' },
                        { from: 'silvia', text: 'Solo confía en él. De corazón.' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    nextPhase: 7,
                    contactHasNew: ['lucia']
                },
            ],
            lucia: [
                // 0 - Andrea llama a su amiga detective
                {
                    requires: 7,
                    messages: [],
                    choices: [ 'Lucía, necesito tu ayuda. Es personal.' ]
                },
                // 1
                {
                    messages: [
                        { from: 'lucia', text: 'Andrea!! ¡Cuánto tiempo! 😍' },
                        { from: 'lucia', text: '¿Qué pasa? Suena serio.' }
                    ],
                    choices: [ 'Creo que Damián me engaña. Necesito a alguien con tu experiencia.' ]
                },
                // 2
                {
                    messages: [
                        { from: 'lucia', text: 'Uf, Andrea... lo siento mucho.' },
                        { from: 'lucia', text: 'A ver, cuéntame qué sabes hasta ahora. Toda la info.' }
                    ],
                    choices: [ 'Llega tarde, miente, oculta el móvil, tiene 5 llamadas a una tal Silvia que dice ser de un catering, y su hermano Carlos le dijo que yo "no sospecho nada".' ]
                },
                // 3
                {
                    messages: [
                        { from: 'lucia', text: 'Ok. Análisis rápido de detective:' },
                        { from: 'lucia', text: '1️⃣ Lo de Silvia/catering puede ser verdad. Pero necesita verificación.' },
                        { from: 'lucia', text: '2️⃣ Lo de Carlos es MUY sospechoso. Los hermanos siempre cubren.' },
                        { from: 'lucia', text: '3️⃣ Las llegadas tarde + móvil oculto es el patrón clásico.' }
                    ],
                    choices: [ '¿Qué me recomiendas hacer?' ]
                },
                // 4
                {
                    messages: [
                        { from: 'lucia', text: 'Tres cosas:' },
                        { from: 'lucia', text: '1. Habla con Carlos. Directamente. A la cara. Ponle entre la espada y la pared.' },
                        { from: 'lucia', text: '2. Investiga a "La Rosaleda" en redes sociales. Si es un catering real, tendrá perfil.' },
                        { from: 'lucia', text: '3. Habla con Javi, el del gimnasio. Damián le cuenta todo después de entrenar.' }
                    ],
                    choices: [ 'Eres la mejor, Lucía. Voy a hacer las tres cosas.' ],
                    evidence: { title: 'Plan de Lucía', desc: 'Lucía aconseja: hablar con Carlos, investigar La Rosaleda en redes, y hablar con Javi del gimnasio.' }
                },
                // 5
                {
                    messages: [
                        { from: 'lucia', text: 'Y Andrea... ve con cuidado. A veces la realidad no es lo que parece.' },
                        { from: 'lucia', text: 'Ni para bien ni para mal.' },
                        { from: 'lucia', text: 'Te tengo al tanto si descubro algo. 🔍' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    unlock: ['carlos', 'javi'],
                    contactHasNew: ['carlos', 'javi', 'grupo_amigas'],
                    nextPhase: 8,
                    // MINIGAME: investiga perfil de La Rosaleda
                    minigame: {
                        type: 'social-stalking',
                        id: 'ch2_social',
                        stars: 2,
                        title: '📱 Perfil de "La Rosaleda Catering"',
                        data: {
                            profile: {
                                name: 'La Rosaleda Catering & Eventos',
                                avatar: '🌹',
                                bio: 'Bodas · Aniversarios · Fiestas privadas · Madrid 📍',
                                posts: [
                                    { text: '¡Nuevo menú de primavera disponible! 🌸 Reservas abiertas para mayo.', hasClue: false },
                                    { text: '¡Gracias a Damián por confiar en nosotros para su evento especial! Será una noche mágica ✨🎉', hasClue: true, image: '🎉🍽️✨' },
                                    { text: 'Nuestro equipo preparando un evento corporativo en el Hotel Palace.', hasClue: false, image: '👨‍🍳🏨' },
                                    { text: '📍 Montaje en marcha para una fiesta sorpresa de aniversario. ¡El cliente más detallista que hemos tenido! 💍🎂', hasClue: true },
                                    { text: 'Receta del día: risotto de setas con trufa negra 🍄', hasClue: false },
                                    { text: '¡Buscamos camareros para evento privado el sábado 15! Interesados enviar CV.', hasClue: true },
                                ]
                            }
                        }
                    }
                }
            ],
            carlos: [
                // 0
                {
                    requires: 8,
                    messages: [],
                    choices: [ 'Carlos, tenemos que hablar. Ya.' ]
                },
                // 1
                {
                    messages: [
                        { from: 'carlos', text: 'Ey Andrea, ¿qué pasa? 😄' }
                    ],
                    choices: [ 'He visto el mensaje que le mandaste a Damián. "Ella no sospecha nada." ¿Qué estáis ocultando?' ]
                },
                // 2
                {
                    messages: [
                        { from: 'carlos', text: '...' },
                        { from: 'carlos', text: '...' },
                        { from: 'carlos', text: 'Joder.' },
                        { from: 'carlos', text: 'Andrea, escúchame. NO es lo que piensas.' }
                    ],
                    choices: [
                        '¿Y qué es entonces? Porque todo apunta a lo mismo.',
                        'Pues explícame, Carlos. Porque estoy a punto de hacer las maletas.'
                    ]
                },
                // 3
                {
                    messages: [
                        { from: 'carlos', text: 'No puedo contártelo. Damián me mataría.' },
                        { from: 'carlos', text: 'Pero te juro por mis hijos que mi hermano NO te está engañando.' },
                        { from: 'carlos', text: 'Es otra cosa. Algo bueno. MUY bueno.' },
                        { from: 'carlos', text: 'Necesito que confíes en mí aunque sea una vez. 🙏' }
                    ],
                    choices: [
                        '¿Bueno? ¿Qué tiene de bueno mentir durante semanas?',
                        'Carlos, estoy sufriendo mucho. Si sabes algo, dímelo.'
                    ],
                    evidence: { title: 'Carlos jura que Damián es inocente', desc: 'Carlos dice "NO te está engañando" y "Es algo bueno, MUY bueno." Jura por sus hijos pero no puede dar detalles.' }
                },
                // 4
                {
                    messages: [
                        { from: 'carlos', text: 'Lo sé, Andrea. Y lo siento de verdad.' },
                        { from: 'carlos', text: 'Solo te pido que esperes hasta el sábado. Por favor.' },
                        { from: 'carlos', text: 'Después de eso, todo tendrá sentido. Te lo prometo.' },
                        { from: 'carlos', text: 'Y si me equivoco, yo mismo te ayudo con las maletas. 🤝' }
                    ],
                    choices: [ 'Hasta el sábado... nuestro aniversario. Vaya casualidad.' ],
                    evidence: { title: 'Carlos dice "espera al sábado"', desc: 'Carlos pide que espere hasta el sábado 15, su aniversario. Otra coincidencia más.' }
                },
                // 5
                {
                    messages: [
                        { from: 'carlos', text: '...' },
                        { from: 'carlos', text: 'Confía, Andrea. Solo eso te pido.' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    nextPhase: 9,
                    contactHasNew: ['javi']
                }
            ],
            javi: [
                // 0
                {
                    requires: 8,
                    messages: [],
                    choices: [ 'Hola Javi, soy Andrea, la mujer de Damián. ¿Podemos hablar?' ]
                },
                // 1
                {
                    messages: [
                        { from: 'javi', text: 'Ah, hola Andrea! Claro, dime 💪' }
                    ],
                    choices: [ '¿Has notado algo raro en Damián últimamente?' ]
                },
                // 2
                {
                    messages: [
                        { from: 'javi', text: 'Raro... pues no sé.' },
                        { from: 'javi', text: 'Bueno, últimamente ha estado faltando mucho al gym.' },
                        { from: 'javi', text: 'Y el otro día me preguntó si conocía a alguien que vendiera flores. Muchas flores.' },
                        { from: 'javi', text: 'Le dije que mi vecina Patricia tiene una floristería.' }
                    ],
                    choices: [
                        '¿Flores? ¿Para qué quiere flores?',
                        '¿Patricia? ¿Le dio el contacto?'
                    ],
                    evidence: { title: 'Damián pidió contacto de una florista', desc: 'Javi dice que Damián le pidió contacto de una florista. Su vecina Patricia tiene floristería.' }
                },
                // 3
                {
                    messages: [
                        { from: 'javi', text: 'Sí, le pasé el número de Patricia.' },
                        { from: 'javi', text: 'También le noté como... nervioso. Emocionado.' },
                        { from: 'javi', text: 'Dijo que quería que todo saliera "perfecto".' },
                        { from: 'javi', text: '¿Está todo bien entre vosotros? 😕' }
                    ],
                    choices: [
                        'Eso intento averiguar... Gracias Javi.',
                        'Sí, todo bien. Solo curiosidad.'
                    ],
                    evidence: { title: 'Damián quiere que todo sea "perfecto"', desc: 'Javi nota a Damián nervioso y emocionado. Quiere que algo salga "perfecto". Contactó a una florista.' }
                },
                // 4
                {
                    messages: [
                        { from: 'javi', text: 'De nada, Andrea. Damián es buen tío, seguro que no es nada malo.' },
                        { from: 'javi', text: '¡Ah! Y una cosa más. La semana pasada le vi probándose un traje en la tienda del centro. Iba elegantísimo.' },
                        { from: 'javi', text: 'Se compró uno negro con corbata burdeos. Muy chulo la verdad 😂' }
                    ],
                    choices: [ '¿Un traje nuevo? Damián odia los trajes...' ],
                    evidence: { title: 'Traje nuevo', desc: 'Javi vio a Damián comprarse un traje negro con corbata burdeos. Damián nunca se viste así.' }
                },
                // 5
                {
                    messages: [
                        { from: 'javi', text: 'Pues ya ves, la gente cambia 😂' },
                        { from: 'javi', text: 'Oye, me voy a entrenar. ¡Un abrazo!' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    nextPhase: 10,
                    contactHasNew: ['grupo_amigas']
                }
            ],
            grupo_amigas: [
                // 0
                {
                    requires: 10,
                    messages: [
                        { from: 'marta', text: '@Andrea ¿estás bien? Llevas todo el día en silencio 😟' },
                        { from: 'ana', text: '¿Has averiguado algo nuevo??' }
                    ],
                    choices: [
                        'Chicas, me estoy volviendo loca. Os cuento todo.',
                        'No puedo más. Creo que necesito hablar con Damián directamente.'
                    ]
                },
                // 1
                {
                    messages: [
                        { from: 'ana', text: 'Cuéntanos TODO' }
                    ],
                    choices: [ 'Silvia es de un catering. Carlos jura que Damián es inocente. Javi dice que compró flores y un traje. Todo apunta al sábado 15.' ]
                },
                // 2
                {
                    messages: [
                        { from: 'marta', text: 'Espera espera espera' },
                        { from: 'marta', text: '¿Catering + flores + traje + sábado 15 = vuestro aniversario?' },
                        { from: 'marta', text: 'Andrea....... 🤯' },
                        { from: 'ana', text: '¿¿Y SI TE ESTÁ PREPARANDO UNA FIESTA SORPRESA??' }
                    ],
                    choices: [
                        'No puede ser... ¿tanto lío para una fiesta?',
                        '¿Y las mentiras? ¿Y lo del móvil escondido?'
                    ]
                },
                // 3
                {
                    messages: [
                        { from: 'marta', text: 'Tía, piénsalo. Catering, flores, traje nuevo, "que todo sea perfecto", "ella no sospecha nada"...' },
                        { from: 'marta', text: 'TODO encaja con una fiesta sorpresa 🎉' },
                        { from: 'ana', text: 'Dios mío, ¿y si hemos estado montando un drama por nada? 😂😂' },
                        { from: 'marta', text: 'Pero hay que estar seguras. Andrea, ¿puedes verificar lo del catering?' }
                    ],
                    choices: [ 'He visto el perfil de La Rosaleda... Mencionan una fiesta sorpresa de aniversario y el sábado 15. Es real.' ],
                    evidence: { title: 'Las amigas atan cabos', desc: 'Marta y Ana se dan cuenta de que todas las pistas encajan con una fiesta sorpresa de aniversario.' }
                },
                // 4
                {
                    messages: [
                        { from: 'ana', text: 'JAJAJAJAJAJA' },
                        { from: 'ana', text: 'O sea que hemos estado jugando a ser detectives...' },
                        { from: 'ana', text: '...y el "crimen" era una fiesta sorpresa 😂💀' },
                        { from: 'marta', text: 'Andrea, tu marido te adora. Fin.' },
                        { from: 'marta', text: 'Pero ahora la pregunta es... ¿se lo dices? ¿O finges no saber nada? 🤔' }
                    ],
                    choices: [
                        'Necesito hablar con él. No puedo seguir con esta angustia.',
                        'Voy a esperar al sábado... pero necesito una confirmación más.'
                    ]
                },
                // 5
                {
                    messages: [
                        { from: 'ana', text: 'Hagas lo que hagas, estamos contigo ❤️' },
                        { from: 'marta', text: 'Te quiero, loca 💕' },
                        { type: 'system', text: '— Fin del Capítulo 2 —' }
                    ],
                    choices: [],
                    flag: 'ch2_complete',
                    nextChapter: 3
                }
            ]
        }
    },

    en: {
        title: 'Deeper',
        desc: "Who is Silvia? What's Carlos hiding? Time to investigate for real.",
        contactPreviews: {
            silvia: 'Unknown number', lucia: 'University friend',
            carlos: "Damián's brother", javi: "Damián's gym buddy",
            grupo_amigas: 'Marta, Ana and you',
        },
        script: {
            silvia: [
                { messages: [], choices: [ 'Hello, are you Silvia?', 'Who are you and why do you call my husband so much?' ] },
                { messages: [ { from: 'silvia', text: 'Yes? Who is this?' } ], choices: [ "I'm Andrea. Damián's wife." ] },
                {
                    messages: [
                        { from: 'silvia', text: 'Oh, Andrea! 😊' },
                        { from: 'silvia', text: 'I\'m Silvia, from "La Rosaleda" Events & Catering.' },
                        { from: 'silvia', text: 'Your husband hired our services.' },
                        { from: 'silvia', text: "But... oh, I probably shouldn't say more. He asked for total discretion. 🤐" }
                    ],
                    choices: [ 'Catering?? For what event??', "Please Silvia, I need to know what's going on." ],
                    evidence: { title: 'Silvia = "La Rosaleda" catering', desc: 'Silvia isn\'t "the other woman". She works for a catering company. Damián hired them for an event and asked for discretion.' }
                },
                {
                    messages: [
                        { from: 'silvia', text: "Oh God, he's going to kill me..." },
                        { from: 'silvia', text: 'Look, all I can say is your husband is an absolute sweetheart.' },
                        { from: 'silvia', text: "I can't tell you more. Really! It's a surprise." },
                        { from: 'silvia', text: 'Trust him. 🤍' }
                    ],
                    choices: [ '...A surprise? What kind of surprise?' ]
                },
                {
                    messages: [
                        { from: 'silvia', text: "I didn't say anything!! 🙈" },
                        { from: 'silvia', text: "Sorry Andrea, but I really can't. I promised him." },
                        { from: 'silvia', text: 'Just trust him. From the heart.' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [], nextPhase: 7, contactHasNew: ['lucia']
                },
            ],
            lucia: [
                { requires: 7, messages: [], choices: [ "Lucía, I need your help. It's personal." ] },
                { messages: [ { from: 'lucia', text: 'Andrea!! Long time no see! 😍' }, { from: 'lucia', text: 'What\'s up? Sounds serious.' } ], choices: [ "I think Damián is cheating. I need someone with your expertise." ] },
                { messages: [ { from: 'lucia', text: "Oof, Andrea... I'm so sorry." }, { from: 'lucia', text: "OK, tell me everything you know so far." } ], choices: [ "He comes home late, lies, hides his phone, has 5 calls to a Silvia who claims to be from a catering company, and his brother Carlos told him I \"don't suspect a thing.\"" ] },
                {
                    messages: [
                        { from: 'lucia', text: 'OK. Quick detective analysis:' },
                        { from: 'lucia', text: '1️⃣ The Silvia/catering thing could be true. But needs verification.' },
                        { from: 'lucia', text: '2️⃣ The Carlos thing is VERY suspicious. Brothers always cover for each other.' },
                        { from: 'lucia', text: '3️⃣ Late nights + hidden phone is the classic pattern.' }
                    ],
                    choices: [ 'What do you recommend?' ]
                },
                {
                    messages: [
                        { from: 'lucia', text: 'Three things:' },
                        { from: 'lucia', text: '1. Talk to Carlos. Directly. Put him on the spot.' },
                        { from: 'lucia', text: '2. Look up "La Rosaleda" on social media. If it\'s real, they\'ll have a profile.' },
                        { from: 'lucia', text: "3. Talk to Javi from the gym. Damián tells him everything after working out." }
                    ],
                    choices: [ "You're the best, Lucía. I'll do all three." ],
                    evidence: { title: "Lucía's plan", desc: "Lucía advises: talk to Carlos, investigate La Rosaleda on social media, and talk to gym buddy Javi." }
                },
                {
                    messages: [
                        { from: 'lucia', text: "And Andrea... be careful. Sometimes reality isn't what it seems." },
                        { from: 'lucia', text: 'For better or for worse.' },
                        { from: 'lucia', text: "I'll keep you posted if I find anything. 🔍" },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [], unlock: ['carlos', 'javi'], contactHasNew: ['carlos', 'javi', 'grupo_amigas'], nextPhase: 8,
                    minigame: { type: 'social-stalking', id: 'ch2_social', stars: 2, title: '📱 "La Rosaleda Catering" Profile',
                        data: { profile: { name: 'La Rosaleda Catering & Events', avatar: '🌹', bio: 'Weddings · Anniversaries · Private parties · Madrid 📍',
                            posts: [
                                { text: 'New spring menu available! 🌸 Bookings open for May.', hasClue: false },
                                { text: 'Thank you Damián for trusting us with your special event! It\'s going to be a magical night ✨🎉', hasClue: true, image: '🎉🍽️✨' },
                                { text: 'Our team preparing a corporate event at the Palace Hotel.', hasClue: false, image: '👨‍🍳🏨' },
                                { text: '📍 Setting up for a surprise anniversary party. The most detail-oriented client we\'ve ever had! 💍🎂', hasClue: true },
                                { text: 'Recipe of the day: truffle mushroom risotto 🍄', hasClue: false },
                                { text: 'Looking for waiters for private event on Saturday the 15th! Send CV if interested.', hasClue: true },
                            ]
                        } }
                    }
                }
            ],
            carlos: [
                { requires: 8, messages: [], choices: [ 'Carlos, we need to talk. Now.' ] },
                { messages: [ { from: 'carlos', text: "Hey Andrea, what's up? 😄" } ], choices: [ "I saw the message you sent Damián. \"She doesn't suspect a thing.\" What are you two hiding?" ] },
                {
                    messages: [
                        { from: 'carlos', text: '...' }, { from: 'carlos', text: '...' },
                        { from: 'carlos', text: 'Damn.' },
                        { from: 'carlos', text: "Andrea, listen. It's NOT what you think." }
                    ],
                    choices: [ "Then what is it? Because everything points to the same thing.", "Then explain, Carlos. Because I'm about to pack my bags." ]
                },
                {
                    messages: [
                        { from: 'carlos', text: "I can't tell you. Damián would kill me." },
                        { from: 'carlos', text: 'But I swear on my kids that my brother is NOT cheating on you.' },
                        { from: 'carlos', text: "It's something else. Something good. REALLY good." },
                        { from: 'carlos', text: 'I need you to trust me just this once. 🙏' }
                    ],
                    choices: [ "Good? What's good about lying for weeks?", "Carlos, I'm suffering. If you know something, tell me." ],
                    evidence: { title: 'Carlos swears Damián is innocent', desc: "Carlos says \"He's NOT cheating\" and \"It's something good, REALLY good.\" Swears on his kids but can't give details." }
                },
                {
                    messages: [
                        { from: 'carlos', text: "I know, Andrea. And I'm truly sorry." },
                        { from: 'carlos', text: 'I just need you to wait until Saturday. Please.' },
                        { from: 'carlos', text: "After that, everything will make sense. I promise." },
                        { from: 'carlos', text: "And if I'm wrong, I'll help you pack the bags myself. 🤝" }
                    ],
                    choices: [ 'Until Saturday... our anniversary. What a coincidence.' ],
                    evidence: { title: 'Carlos says "wait until Saturday"', desc: "Carlos asks her to wait until Saturday the 15th, their anniversary. Another coincidence." }
                },
                {
                    messages: [ { from: 'carlos', text: '...' }, { from: 'carlos', text: "Trust, Andrea. That's all I ask." }, { type: 'system', text: '{disconnected}' } ],
                    choices: [], nextPhase: 9, contactHasNew: ['javi']
                }
            ],
            javi: [
                { requires: 8, messages: [], choices: [ "Hi Javi, I'm Andrea, Damián's wife. Can we talk?" ] },
                { messages: [ { from: 'javi', text: 'Oh, hi Andrea! Sure, go ahead 💪' } ], choices: [ "Have you noticed anything weird about Damián lately?" ] },
                {
                    messages: [
                        { from: 'javi', text: "Weird... I don't know." },
                        { from: 'javi', text: "Well, he's been missing gym a lot lately." },
                        { from: 'javi', text: 'And the other day he asked me if I knew anyone who sells flowers. Lots of flowers.' },
                        { from: 'javi', text: 'I told him my neighbor Patricia has a flower shop.' }
                    ],
                    choices: [ 'Flowers? What does he want flowers for?', 'Patricia? Did he get her contact?' ],
                    evidence: { title: 'Damián asked for a florist contact', desc: "Javi says Damián asked for a florist contact. His neighbor Patricia has a flower shop." }
                },
                {
                    messages: [
                        { from: 'javi', text: "Yeah, I gave him Patricia's number." },
                        { from: 'javi', text: 'He also seemed like... nervous. Excited.' },
                        { from: 'javi', text: 'He said he wanted everything to be "perfect."' },
                        { from: 'javi', text: 'Is everything OK between you two? 😕' }
                    ],
                    choices: [ "That's what I'm trying to figure out... Thanks Javi.", 'Yeah, all good. Just curious.' ],
                    evidence: { title: 'Damián wants everything to be "perfect"', desc: "Javi notices Damián is nervous and excited. He wants something to be \"perfect\". He contacted a florist." }
                },
                {
                    messages: [
                        { from: 'javi', text: "No problem, Andrea. Damián's a good guy, I'm sure it's nothing bad." },
                        { from: 'javi', text: "Oh! One more thing. Last week I saw him trying on a suit at the store downtown. Looking sharp." },
                        { from: 'javi', text: 'He bought a black one with a burgundy tie. Pretty cool actually 😂' }
                    ],
                    choices: [ 'A new suit? Damián hates suits...' ],
                    evidence: { title: 'New suit', desc: "Javi saw Damián buying a black suit with a burgundy tie. He never dresses up like that." }
                },
                {
                    messages: [ { from: 'javi', text: 'Well, people change 😂' }, { from: 'javi', text: "Hey, gotta go train. Take care!" }, { type: 'system', text: '{disconnected}' } ],
                    choices: [], nextPhase: 10, contactHasNew: ['grupo_amigas']
                }
            ],
            grupo_amigas: [
                {
                    requires: 10,
                    messages: [
                        { from: 'marta', text: "@Andrea are you OK? You've been quiet all day 😟" },
                        { from: 'ana', text: 'Did you find out anything new??' }
                    ],
                    choices: [ "Girls, I'm going crazy. Let me tell you everything.", "I can't take it anymore. I think I need to talk to Damián directly." ]
                },
                { messages: [ { from: 'ana', text: 'Tell us EVERYTHING' } ], choices: [ "Silvia is from a catering company. Carlos swears Damián is innocent. Javi says he bought flowers and a suit. Everything points to Saturday the 15th." ] },
                {
                    messages: [
                        { from: 'marta', text: 'Wait wait wait' },
                        { from: 'marta', text: 'Catering + flowers + suit + Saturday 15th = your anniversary?' },
                        { from: 'marta', text: 'Andrea....... 🤯' },
                        { from: 'ana', text: 'WHAT IF HE\'S PLANNING A SURPRISE PARTY??' }
                    ],
                    choices: [ "No way... all this drama for a party?", "And the lies? And hiding his phone?" ]
                },
                {
                    messages: [
                        { from: 'marta', text: 'Girl, think about it. Catering, flowers, new suit, "everything has to be perfect", "she doesn\'t suspect a thing"...' },
                        { from: 'marta', text: 'It ALL fits a surprise party 🎉' },
                        { from: 'ana', text: 'Oh my God, have we been creating drama over nothing? 😂😂' },
                        { from: 'marta', text: 'But we need to be sure. Andrea, can you verify the catering thing?' }
                    ],
                    choices: [ "I've seen La Rosaleda's profile... They mention a surprise anniversary party and Saturday the 15th. It's real." ],
                    evidence: { title: 'The girls connect the dots', desc: 'Marta and Ana realize all the clues fit a surprise anniversary party.' }
                },
                {
                    messages: [
                        { from: 'ana', text: 'HAHAHAHAHA' },
                        { from: 'ana', text: "So we've been playing detective..." },
                        { from: 'ana', text: '...and the "crime" was a surprise party 😂💀' },
                        { from: 'marta', text: 'Andrea, your husband adores you. Period.' },
                        { from: 'marta', text: "But now the question is... do you tell him? Or pretend you don't know? 🤔" }
                    ],
                    choices: [ "I need to talk to him. I can't keep going with this anxiety.", "I'll wait until Saturday... but I need one more confirmation." ]
                },
                {
                    messages: [
                        { from: 'ana', text: "Whatever you do, we're with you ❤️" },
                        { from: 'marta', text: 'Love you, crazy girl 💕' },
                        { type: 'system', text: '— End of Chapter 2 —' }
                    ],
                    choices: [], flag: 'ch2_complete', nextChapter: 3
                }
            ]
        }
    }
});

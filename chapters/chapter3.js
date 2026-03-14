// ============================================================
//  CAPÍTULO 3 – "Las pruebas se acumulan"
//  Nuevos: Patricia (florista), Elena (compañera), Mama Rosa (suegra)
//  La fiesta es dentro de 2 semanas, no "este sábado"
// ============================================================

ChapterRegistry.register(3, {
    starsToUnlock: 4,
    contacts: ['patricia', 'elena', 'mama_rosa'],
    meta: {
        patricia:  { emoji: '💐', color: '#5c2a3a', order: 10 },
        elena:     { emoji: '👩‍💻', color: '#3a5c5c', order: 11 },
        mama_rosa: { emoji: '👵', color: '#5c4a3a', order: 12 },
    },

    es: {
        title: 'Las pruebas se acumulan',
        desc: 'Una mujer misteriosa, una suegra nerviosa y una compañera cotilla. Las piezas van encajando... ¿o no?',
        contactPreviews: {
            patricia: 'Florista - contacto de Javi', elena: 'Tu compañera de trabajo',
            mama_rosa: 'Madre de Damián',
        },
        script: {
            patricia: [
                {
                    messages: [],
                    choices: [ 'Hola Patricia, me ha dado tu número Javi. Necesito preguntarte algo.' ]
                },
                {
                    messages: [
                        { from: 'patricia', text: '¡Hola! Sí, Javi me dijo que quizás me escribirías.' },
                        { from: 'patricia', text: '¿En qué puedo ayudarte? 🌹' }
                    ],
                    choices: [ '¿Ha contactado contigo un hombre llamado Damián para encargar flores?' ]
                },
                {
                    messages: [
                        { from: 'patricia', text: '¡Sí! Damián, qué majo.' },
                        { from: 'patricia', text: 'Me encargó una decoración floral enorme para un evento privado.' },
                        { from: 'patricia', text: '200 rosas rojas, centros de mesa, un arco de flores para la entrada...' },
                        { from: 'patricia', text: 'Es uno de los encargos más bonitos que me han hecho nunca 🥹' }
                    ],
                    choices: [ '¿200 rosas?? ¿Para qué tipo de evento?', '¿Te dijo para cuándo lo necesita?' ],
                    evidence: { title: '200 rosas rojas', desc: 'Patricia confirma: Damián encargó 200 rosas, centros de mesa y un arco floral para un evento. Es un pedido enorme y caro.' }
                },
                {
                    messages: [
                        { from: 'patricia', text: 'Me dijo que era para una fiesta de aniversario muy especial. Para el día 15 del mes que viene.' },
                        { from: 'patricia', text: 'Quiere que el local esté completamente decorado. Hasta me enseñó fotos de referencia.' },
                        { from: 'patricia', text: 'Nunca había visto a un hombre tan involucrado en la decoración. Se le notaba ilusionadísimo.' },
                        { from: 'patricia', text: '¿Es tu marido? 😄' }
                    ],
                    choices: [
                        'Sí... es mi marido. Y se supone que esto es una sorpresa.',
                        'Sí. Y no sé si reír o llorar ahora mismo.'
                    ],
                    evidence: { title: 'La fiesta es el 15 del mes que viene', desc: 'Patricia confirma: la decoración es para una fiesta de aniversario el 15 del próximo mes. Damián está muy ilusionado.' }
                },
                {
                    messages: [
                        { from: 'patricia', text: '¡Ay, lo sabía! 🥰' },
                        { from: 'patricia', text: 'Mira, no te voy a mentir. He hecho muchos eventos y se nota cuando alguien hace las cosas con amor.' },
                        { from: 'patricia', text: 'Damián quiere que esa noche sea perfecta para ti.' },
                        { from: 'patricia', text: 'Perdona que te lo diga así, pero... ese hombre te quiere de verdad.' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    nextPhase: 11,
                    contactHasNew: ['elena'],
                    // MINIGAME: reconstruir la foto de referencia de la decoración
                    minigame: {
                        type: 'photo-puzzle',
                        id: 'ch3_photo',
                        stars: 2,
                        title: '📸 Foto de la decoración',
                        data: {
                            size: 3,
                            hint: 'Reconstruye la foto que Damián le enseñó a Patricia',
                            image: ['🌹', '🕯️', '💐', '🎀', '💍', '🌸', '✨', '🥂']
                        }
                    }
                }
            ],
            elena: [
                {
                    requires: 11,
                    messages: [
                        { from: 'elena', text: 'Andreaaa, ¿cómo va todo? Oye, tengo un cotilleo 👀' }
                    ],
                    choices: [
                        'Ahora mismo no estoy para cotilleos, Elena...',
                        'Dime, ¿qué has oído?'
                    ]
                },
                {
                    messages: [
                        { from: 'elena', text: 'Es sobre Damián.' },
                        { from: 'elena', text: 'Mi prima trabaja en el restaurante "El Jardín" y dice que un tío que encaja con la descripción de tu marido reservó el salón privado para 40 personas.' },
                        { from: 'elena', text: 'Y que pidió un menú especial de aniversario con tarta personalizada.' }
                    ],
                    choices: [ '¿40 personas? ¿Menú de aniversario?', '¿Cuándo es la reserva?' ],
                    evidence: { title: 'Reserva en "El Jardín" para 40 personas', desc: 'Elena dice que alguien que encaja con Damián reservó un salón privado para 40 personas con menú de aniversario y tarta personalizada.' }
                },
                {
                    messages: [
                        { from: 'elena', text: 'Para el 15 del mes que viene. Un sábado.' },
                        { from: 'elena', text: '¿No es vuestro aniversario? 🤔' },
                        { from: 'elena', text: 'Andrea... ¿te está preparando algo y no lo sabes? 😏' }
                    ],
                    choices: [
                        'Creo que sí... y yo mientras pensando lo peor.',
                        'Puede ser... o puede que la reserva no sea para mí.'
                    ]
                },
                {
                    messages: [
                        { from: 'elena', text: 'Tía, 40 personas, tarta de aniversario, y es justo tu fecha.' },
                        { from: 'elena', text: 'Eso es una fiesta sorpresa de libro 📖' },
                        { from: 'elena', text: '¡Qué envidia me das! Mi ex ni se acordaba de mi cumpleaños 😂' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    nextPhase: 12,
                    contactHasNew: ['mama_rosa']
                }
            ],
            mama_rosa: [
                {
                    requires: 12,
                    messages: [
                        { from: 'mama_rosa', text: 'Hola hija, ¿cómo estás? ❤️' },
                        { from: 'mama_rosa', text: 'Damián me ha dicho que últimamente estás un poco... rara.' }
                    ],
                    choices: [
                        'Rosa, ¿tú sabes algo que yo no sé?',
                        'Hola Rosa, estoy bien. ¿Rara? ¿Qué te ha dicho?'
                    ]
                },
                {
                    messages: [
                        { from: 'mama_rosa', text: 'Ay hija...' },
                        { from: 'mama_rosa', text: 'Mira, yo a ti te quiero como si fueras mi propia hija. Lo sabes.' },
                        { from: 'mama_rosa', text: 'Y mi hijo será muchas cosas pero tonto no es. Sabe lo que tiene.' }
                    ],
                    choices: [ 'Rosa, necesito que seas directa conmigo. ¿Damián está organizando algo?' ]
                },
                {
                    messages: [
                        { from: 'mama_rosa', text: '......' },
                        { from: 'mama_rosa', text: 'Andrea, no me hagas esto que yo no sé mentir 😩' },
                        { from: 'mama_rosa', text: 'Solo te digo una cosa: el día 15 del mes que viene ponte tu vestido más bonito.' },
                        { from: 'mama_rosa', text: 'Y nada más voy a decir.' }
                    ],
                    choices: [ 'O sea que sí hay algo el día 15...' ],
                    evidence: { title: 'Rosa confirma el 15', desc: 'La suegra no sabe mentir. Confirma que hay algo el 15 y le dice a Andrea que se ponga su mejor vestido.' }
                },
                {
                    messages: [
                        { from: 'mama_rosa', text: 'Yo no he dicho nada 🙈' },
                        { from: 'mama_rosa', text: 'Solo que mi hijo te quiere mucho, eso sí lo digo.' },
                        { from: 'mama_rosa', text: 'Y que yo a ti te adoro, eso también 🥰' },
                        { from: 'mama_rosa', text: 'Ay, que me llama Carlos que dice que le has interrogado también 😂' },
                        { from: 'mama_rosa', text: 'Esta familia es un desastre de secretos jajaja' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [],
                    flag: 'ch3_complete',
                    nextChapter: 4,
                    contactHasNew: ['damian', 'grupo_amigas']
                }
            ]
        }
    },

    en: {
        title: 'The Evidence Mounts',
        desc: "A mysterious woman, a nervous mother-in-law, and a gossipy coworker. The pieces are falling into place... or are they?",
        contactPreviews: {
            patricia: "Florist - Javi's contact", elena: 'Your coworker',
            mama_rosa: "Damián's mother",
        },
        script: {
            patricia: [
                { messages: [], choices: [ 'Hi Patricia, Javi gave me your number. I need to ask you something.' ] },
                { messages: [ { from: 'patricia', text: 'Hi! Yes, Javi told me you might write.' }, { from: 'patricia', text: 'How can I help? 🌹' } ], choices: [ 'Has a man named Damián contacted you to order flowers?' ] },
                {
                    messages: [
                        { from: 'patricia', text: 'Yes! Damián, what a sweetheart.' },
                        { from: 'patricia', text: 'He ordered a massive floral decoration for a private event.' },
                        { from: 'patricia', text: '200 red roses, table centerpieces, a flower arch for the entrance...' },
                        { from: 'patricia', text: "It's one of the most beautiful orders I've ever had 🥹" }
                    ],
                    choices: [ '200 roses?? For what kind of event?', 'Did he say when he needs it?' ],
                    evidence: { title: '200 red roses', desc: 'Patricia confirms: Damián ordered 200 roses, centerpieces and a floral arch for an event. Huge and expensive order.' }
                },
                {
                    messages: [
                        { from: 'patricia', text: "He told me it's for a very special anniversary party. For the 15th of next month." },
                        { from: 'patricia', text: 'He wants the venue completely decorated. He even showed me reference photos.' },
                        { from: 'patricia', text: "I've never seen a man so involved in decoration. He was so excited." },
                        { from: 'patricia', text: 'Is he your husband? 😄' }
                    ],
                    choices: [ "Yes... he's my husband. And this is supposed to be a surprise.", "Yes. And I don't know whether to laugh or cry right now." ],
                    evidence: { title: 'The party is the 15th of next month', desc: "Patricia confirms: the decoration is for an anniversary party on the 15th of next month. Damián is very excited." }
                },
                {
                    messages: [
                        { from: 'patricia', text: 'I knew it! 🥰' },
                        { from: 'patricia', text: "Look, I won't lie to you. I've done many events and you can tell when someone does things with love." },
                        { from: 'patricia', text: 'Damián wants that night to be perfect for you.' },
                        { from: 'patricia', text: "Sorry for being so direct, but... that man truly loves you." },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [], nextPhase: 11, contactHasNew: ['elena'],
                    minigame: { type: 'photo-puzzle', id: 'ch3_photo', stars: 2, title: '📸 Decoration Photo',
                        data: { size: 3, hint: 'Reconstruct the photo Damián showed Patricia', image: ['🌹', '🕯️', '💐', '🎀', '💍', '🌸', '✨', '🥂'] } }
                }
            ],
            elena: [
                { requires: 11, messages: [ { from: 'elena', text: "Andreaaa, how's it going? Hey, I have gossip 👀" } ], choices: [ "I'm not in the mood for gossip, Elena...", "Tell me, what did you hear?" ] },
                {
                    messages: [
                        { from: 'elena', text: "It's about Damián." },
                        { from: 'elena', text: 'My cousin works at "El Jardín" restaurant and says a guy matching your husband\'s description booked the private room for 40 people.' },
                        { from: 'elena', text: 'And he ordered a special anniversary menu with a custom cake.' }
                    ],
                    choices: [ '40 people? Anniversary menu?', "When's the reservation?" ],
                    evidence: { title: '"El Jardín" reservation for 40 people', desc: 'Elena says someone matching Damián booked a private room for 40 people with an anniversary menu and custom cake.' }
                },
                {
                    messages: [
                        { from: 'elena', text: 'For the 15th of next month. A Saturday.' },
                        { from: 'elena', text: "Isn't that your anniversary? 🤔" },
                        { from: 'elena', text: "Andrea... is he planning something you don't know about? 😏" }
                    ],
                    choices: [ "I think so... and here I was thinking the worst.", "Maybe... or maybe the reservation isn't for me." ]
                },
                {
                    messages: [
                        { from: 'elena', text: 'Girl, 40 people, anniversary cake, and it\'s exactly your date.' },
                        { from: 'elena', text: "That's a textbook surprise party 📖" },
                        { from: 'elena', text: "I'm so jealous! My ex couldn't even remember my birthday 😂" },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [], nextPhase: 12, contactHasNew: ['mama_rosa']
                }
            ],
            mama_rosa: [
                {
                    requires: 12,
                    messages: [ { from: 'mama_rosa', text: 'Hello dear, how are you? ❤️' }, { from: 'mama_rosa', text: "Damián told me you've been a bit... off lately." } ],
                    choices: [ "Rosa, do you know something I don't?", "Hi Rosa, I'm fine. Off? What did he say?" ]
                },
                {
                    messages: [
                        { from: 'mama_rosa', text: 'Oh dear...' },
                        { from: 'mama_rosa', text: "Look, I love you like my own daughter. You know that." },
                        { from: 'mama_rosa', text: "And my son may be many things but he's not stupid. He knows what he has." }
                    ],
                    choices: [ 'Rosa, I need you to be straight with me. Is Damián planning something?' ]
                },
                {
                    messages: [
                        { from: 'mama_rosa', text: '......' },
                        { from: 'mama_rosa', text: "Andrea, don't do this to me, I can't lie 😩" },
                        { from: 'mama_rosa', text: "I'll only say one thing: on the 15th of next month, wear your prettiest dress." },
                        { from: 'mama_rosa', text: "And that's all I'm going to say." }
                    ],
                    choices: [ 'So there IS something on the 15th...' ],
                    evidence: { title: 'Rosa confirms the 15th', desc: "The mother-in-law can't lie. Confirms something is happening on the 15th and tells Andrea to wear her best dress." }
                },
                {
                    messages: [
                        { from: 'mama_rosa', text: "I didn't say anything 🙈" },
                        { from: 'mama_rosa', text: 'I just said my son loves you very much.' },
                        { from: 'mama_rosa', text: 'And I adore you too 🥰' },
                        { from: 'mama_rosa', text: "Oh, Carlos is calling me saying you interrogated him too 😂" },
                        { from: 'mama_rosa', text: 'This family is a disaster at keeping secrets hahaha' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: [], flag: 'ch3_complete', nextChapter: 4, contactHasNew: ['damian', 'grupo_amigas']
                }
            ]
        }
    }
});

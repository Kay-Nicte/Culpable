// ============================================================
//  CAPÍTULO 5 – "La verdad"
//  Final: la fiesta, la renovación de votos, el cierre
// ============================================================

ChapterRegistry.register(5, {
    starsToUnlock: 8,
    contacts: [],
    meta: {},

    es: {
        title: 'La verdad',
        desc: 'Llega el día 15. Es hora de descubrir lo que Damián ha preparado.',
        contactPreviews: {},
        script: {
            damian: [
                // 0 - El gran día
                {
                    messages: [
                        { type: 'system', text: '📅 Día 15. Vuestro aniversario.' },
                        { type: 'system', text: 'Son las 6 de la tarde. Damián te ha pedido que estés lista a las 7:30.' },
                        { from: 'damian', text: 'Cariño, ¿estás lista? Paso a recogerte a las 7:30 en punto.' },
                        { from: 'damian', text: 'Ponte guapa. Muy guapa. 😘' }
                    ],
                    choices: [ 'Estaré lista. ¿A dónde vamos?', '¿Me vas a decir ya qué está pasando?' ]
                },
                {
                    messages: [
                        { from: 'damian', text: 'Esta vez no te voy a mentir.' },
                        { from: 'damian', text: 'Pero tampoco te lo voy a decir 😏' },
                        { from: 'damian', text: 'Solo confía en mí. Por última vez.' },
                        { from: 'damian', text: 'Te quiero, Andrea. Más que a nada en este mundo.' }
                    ],
                    choices: [ 'Te quiero, Damián. Nos vemos a las 7:30. ❤️' ]
                },
                {
                    messages: [
                        { type: 'system', text: '⏰ 7:30 PM. Damián llega. Lleva un traje negro con corbata burdeos.' },
                        { type: 'system', text: 'Te abre la puerta del coche. No dice a dónde vais.' },
                        { type: 'system', text: 'Llegáis a un restaurante: "El Jardín".' },
                        { type: 'system', text: 'La entrada está decorada con un arco de 200 rosas rojas.' },
                        { from: 'damian', text: '¿Lista?' }
                    ],
                    choices: [ '...Damián, ¿qué es todo esto?' ]
                },
                {
                    messages: [
                        { type: 'system', text: 'Damián abre las puertas del salón privado.' },
                        { type: 'system', text: '🎉 ¡¡¡SORPRESA!!!' },
                        { type: 'system', text: '40 personas: tu familia, tus amigos, sus amigos, todos.' },
                        { type: 'system', text: 'Marta, Ana, Diego, Lucía, Carlos, Rosa, Javi, Elena, Silvia, Patricia...' },
                        { type: 'system', text: 'Todos están ahí. Todos sabían.' },
                        { type: 'system', text: 'El salón está lleno de rosas, velas, fotos vuestras de los últimos 10 años.' },
                    ],
                    choices: [ 'Estoy llorando. No puedo parar de llorar.' ]
                },
                {
                    messages: [
                        { from: 'damian', text: 'Andrea...' },
                        { from: 'damian', text: 'Hace 10 años me casé contigo y fue el mejor día de mi vida.' },
                        { from: 'damian', text: 'Hoy quiero repetirlo.' },
                        { from: 'damian', text: 'He estado un mes entero preparando esto. El catering, las flores, las invitaciones...' },
                        { from: 'damian', text: 'Las mentiras, el móvil escondido, las llamadas a escondidas...' },
                        { from: 'damian', text: 'Todo era para esto.' }
                    ],
                    choices: [ 'Damián... yo pensaba que...' ]
                },
                {
                    messages: [
                        { from: 'damian', text: 'Lo sé. Carlos me lo ha dicho. 😂' },
                        { from: 'damian', text: 'Y mi madre. Y Marta. Y Ana. Y probablemente todo el restaurante a estas alturas.' },
                        { from: 'damian', text: 'Soy el peor organizador de sorpresas del mundo 😂' },
                        { from: 'damian', text: 'Pero Andrea...' },
                    ],
                    choices: [ '¿Sí?' ]
                },
                {
                    messages: [
                        { from: 'damian', text: '💍' },
                        { from: 'damian', text: 'Andrea, ¿quieres renovar nuestros votos conmigo?' },
                        { from: 'damian', text: 'Aquí. Ahora. Delante de todos.' },
                        { from: 'damian', text: 'Porque estos 10 años contigo han sido los mejores de mi vida.' },
                        { from: 'damian', text: 'Y quiero otros 10. Y otros 10 después de esos.' },
                        { from: 'damian', text: 'Para siempre, Andrea.' }
                    ],
                    choices: [ 'Sí. Sí, sí, sí. Mil veces sí. ❤️' ]
                },
                {
                    messages: [
                        { type: 'system', text: '💍 Damián te pone un anillo nuevo. Grabado por dentro: "15-10 ∞"' },
                        { type: 'system', text: '👏 Todo el salón aplaude.' },
                        { type: 'system', text: '😭 Rosa está llorando más que tú.' },
                        { type: 'system', text: '🎭 Y tú finges sorpresa... bastante bien, la verdad.' },
                        { from: 'damian', text: 'Te quiero, Andrea. Para siempre.' }
                    ],
                    choices: [ 'Te quiero, Damián. Para siempre. 💍❤️' ],
                    flag: 'game_complete'
                }
            ],
            marta: [
                {
                    messages: [
                        { from: 'marta', text: '😭😭😭😭😭' },
                        { from: 'marta', text: 'ESTOY LLORANDO DESDE MI MESA' },
                        { from: 'marta', text: 'Eres la mejor actriz del mundo por cierto 🎭😂' },
                        { from: 'marta', text: 'Te quiero amiga ❤️' }
                    ],
                    choices: [ 'Te quiero, Marta. Gracias por todo. ❤️' ]
                },
                {
                    messages: [
                        { from: 'marta', text: 'Ahora a disfrutar de la fiesta!!! 🎉🥂' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: []
                }
            ],
            ana: [
                {
                    messages: [
                        { from: 'ana', text: 'HERMANAAAAAA 😭😭😭❤️' },
                        { from: 'ana', text: 'Os quiero mucho a los dos' },
                        { from: 'ana', text: 'PD: La suegra sigue llorando 😂' }
                    ],
                    choices: [ 'Te quiero, Ana. ❤️' ]
                },
                {
                    messages: [
                        { from: 'ana', text: '❤️❤️❤️' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: []
                }
            ],
            grupo_amigas: [
                {
                    messages: [
                        { from: 'marta', text: '🎉🥂💍❤️😭' },
                        { from: 'ana', text: '🎉🥂💍❤️😭' },
                        { type: 'system', text: 'No hacen falta palabras.' },
                        { type: 'system', text: '❤️' }
                    ],
                    choices: [ '❤️' ]
                },
                {
                    messages: [
                        { type: 'system', text: 'La mejor noche de tu vida.' },
                        { type: 'system', text: '{disconnected}' }
                    ],
                    choices: []
                }
            ]
        }
    },

    en: {
        title: 'The Truth',
        desc: "The 15th arrives. Time to discover what Damián has been planning.",
        contactPreviews: {},
        script: {
            damian: [
                { messages: [ { type: 'system', text: "📅 The 15th. Your anniversary." }, { type: 'system', text: "It's 6 PM. Damián asked you to be ready by 7:30." }, { from: 'damian', text: "Babe, are you ready? I'll pick you up at 7:30 sharp." }, { from: 'damian', text: 'Look beautiful. Very beautiful. 😘' } ],
                    choices: [ "I'll be ready. Where are we going?", 'Are you going to tell me what\'s going on now?' ] },
                { messages: [ { from: 'damian', text: "This time I'm not going to lie to you." }, { from: 'damian', text: "But I'm not going to tell you either 😏" }, { from: 'damian', text: 'Just trust me. One last time.' }, { from: 'damian', text: 'I love you, Andrea. More than anything in this world.' } ],
                    choices: [ 'I love you, Damián. See you at 7:30. ❤️' ] },
                { messages: [ { type: 'system', text: '⏰ 7:30 PM. Damián arrives. Black suit, burgundy tie.' }, { type: 'system', text: "He opens the car door for you. Won't say where you're going." }, { type: 'system', text: 'You arrive at a restaurant: "El Jardín".' }, { type: 'system', text: 'The entrance is decorated with an arch of 200 red roses.' }, { from: 'damian', text: 'Ready?' } ],
                    choices: [ '...Damián, what is all this?' ] },
                { messages: [ { type: 'system', text: 'Damián opens the doors to the private room.' }, { type: 'system', text: '🎉 SURPRISE!!!' }, { type: 'system', text: '40 people: your family, your friends, his friends, everyone.' }, { type: 'system', text: 'Marta, Ana, Diego, Lucía, Carlos, Rosa, Javi, Elena, Silvia, Patricia...' }, { type: 'system', text: 'They\'re all there. They all knew.' }, { type: 'system', text: 'The room is filled with roses, candles, photos of you two from the last 10 years.' } ],
                    choices: [ "I'm crying. I can't stop crying." ] },
                { messages: [ { from: 'damian', text: 'Andrea...' }, { from: 'damian', text: '10 years ago I married you and it was the best day of my life.' }, { from: 'damian', text: 'Today I want to do it again.' }, { from: 'damian', text: "I've spent an entire month preparing this. The catering, the flowers, the invitations..." }, { from: 'damian', text: 'The lies, the hidden phone, the secret calls...' }, { from: 'damian', text: 'It was all for this.' } ],
                    choices: [ 'Damián... I thought that...' ] },
                { messages: [ { from: 'damian', text: 'I know. Carlos told me. 😂' }, { from: 'damian', text: 'And my mom. And Marta. And Ana. And probably the entire restaurant by now.' }, { from: 'damian', text: "I'm the worst surprise planner in the world 😂" }, { from: 'damian', text: 'But Andrea...' } ],
                    choices: [ 'Yes?' ] },
                { messages: [ { from: 'damian', text: '💍' }, { from: 'damian', text: 'Andrea, will you renew our vows with me?' }, { from: 'damian', text: 'Here. Now. In front of everyone.' }, { from: 'damian', text: 'Because these 10 years with you have been the best of my life.' }, { from: 'damian', text: 'And I want 10 more. And 10 more after that.' }, { from: 'damian', text: 'Forever, Andrea.' } ],
                    choices: [ 'Yes. Yes, yes, yes. A thousand times yes. ❤️' ] },
                { messages: [ { type: 'system', text: '💍 Damián puts a new ring on your finger. Engraved inside: "15-10 ∞"' }, { type: 'system', text: '👏 The entire room applauds.' }, { type: 'system', text: "😭 Rosa is crying more than you." }, { type: 'system', text: "🎭 And you fake surprise... pretty convincingly, actually." }, { from: 'damian', text: 'I love you, Andrea. Forever.' } ],
                    choices: [ 'I love you, Damián. Forever. 💍❤️' ], flag: 'game_complete' }
            ],
            marta: [
                { messages: [ { from: 'marta', text: '😭😭😭😭😭' }, { from: 'marta', text: "I'M CRYING FROM MY TABLE" }, { from: 'marta', text: 'Best actress ever by the way 🎭😂' }, { from: 'marta', text: 'Love you friend ❤️' } ], choices: [ 'Love you, Marta. Thanks for everything. ❤️' ] },
                { messages: [ { from: 'marta', text: 'Now enjoy the party!!! 🎉🥂' }, { type: 'system', text: '{disconnected}' } ], choices: [] }
            ],
            ana: [
                { messages: [ { from: 'ana', text: 'SISTERRRRR 😭😭😭❤️' }, { from: 'ana', text: 'I love you both so much' }, { from: 'ana', text: "PS: The mother-in-law is still crying 😂" } ], choices: [ 'Love you, Ana. ❤️' ] },
                { messages: [ { from: 'ana', text: '❤️❤️❤️' }, { type: 'system', text: '{disconnected}' } ], choices: [] }
            ],
            grupo_amigas: [
                { messages: [ { from: 'marta', text: '🎉🥂💍❤️😭' }, { from: 'ana', text: '🎉🥂💍❤️😭' }, { type: 'system', text: 'No words needed.' }, { type: 'system', text: '❤️' } ], choices: [ '❤️' ] },
                { messages: [ { type: 'system', text: 'The best night of your life.' }, { type: 'system', text: '{disconnected}' } ], choices: [] }
            ]
        }
    }
});

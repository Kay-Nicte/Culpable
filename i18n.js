// ============================================================
//  i18n – Sistema de internacionalización para CULPABLE
// ============================================================

const I18N = {
    currentLang: 'es',
    translations: {},

    init() {
        const saved = localStorage.getItem('culpable-lang');
        if (saved && this.translations[saved]) {
            this.currentLang = saved;
        } else {
            // Auto-detect from browser
            const browserLang = navigator.language.slice(0, 2);
            if (this.translations[browserLang]) {
                this.currentLang = browserLang;
            }
        }
    },

    register(lang, data) {
        this.translations[lang] = data;
    },

    setLang(lang) {
        if (!this.translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('culpable-lang', lang);
    },

    t(key) {
        const lang = this.translations[this.currentLang];
        if (!lang) return key;
        // Support nested keys: "ui.chats"
        const parts = key.split('.');
        let val = lang;
        for (const p of parts) {
            if (val && typeof val === 'object' && p in val) {
                val = val[p];
            } else {
                return key; // fallback to key
            }
        }
        return val;
    },

    getAvailableLangs() {
        return Object.keys(this.translations);
    }
};

// ============================================================
//  ESPAÑOL
// ============================================================
I18N.register('es', {
    ui: {
        chats: 'Chats',
        notes: 'Notas',
        messages: 'Mensajes',
        myNotes: 'Mis Notas',
        day: 'Día',
        online: 'en línea',
        disconnected: 'se ha desconectado',
        blocked: 'Bloqueado',
        noClues: 'Aún no has encontrado pistas...',
        newClue: 'Nueva pista',
        you: 'Tú',
        end: 'Fin',
        openPhone: 'Abrir el móvil',
        start: 'COMENZAR',
        langSelect: 'Idioma',
    },
    start: {
        title: 'CULPABLE',
        subtitle: '¿Está tu marido siendo infiel?',
        desc: 'Investiga. Interroga. Descubre la verdad.',
    },
    intro: [
        'Me llamo <span class="highlight">Andrea</span>.',
        'Llevo 10 años casada con <span class="highlight">Damián</span>.',
        'Siempre pensé que teníamos el matrimonio perfecto.',
        'Hasta que empezó a llegar tarde.',
        'A esconder el móvil.',
        'A mentirme.',
        'Esta noche voy a descubrir la verdad.',
    ],
    contacts: {
        damian:      { preview: 'Tu marido' },
        marta:       { preview: 'Tu mejor amiga' },
        diego:       { preview: 'Compañero de trabajo de Damián' },
        ana:         { preview: 'Tu hermana' },
        desconocido: { preview: '+34 612 XXX XXX' },
        silvia:      { preview: 'Contacto nuevo' },
    },
    // ---- DIÁLOGOS ----
    script: {
        damian: [
            {
                messages: [
                    { from: 'damian', text: 'Cariño, voy a llegar tarde otra vez hoy. No me esperes despierta. 😘' }
                ],
                choices: [
                    '¿Otra vez? Ya van tres días seguidos...',
                    'Vale, no te preocupes. ¿Todo bien en el trabajo?'
                ]
            },
            {
                messages: [
                    { from: 'damian', text: 'Sí sí, es el proyecto nuevo. El jefe está insoportable con los plazos.' },
                    { from: 'damian', text: 'Ya sabes cómo es esto...' }
                ],
                choices: [
                    '¿Con quién te quedas trabajando?',
                    'Ok. Te quiero. No tardes mucho.'
                ]
            },
            {
                messages: [
                    { from: 'damian', text: 'Con Diego y un par más del equipo.' },
                    { from: 'damian', text: 'No seas desconfiada, anda 😅' }
                ],
                choices: [ 'No es desconfianza... es preocupación.' ],
                evidence: { title: 'Dice que trabaja con Diego', desc: 'Damián afirma que se queda con Diego y otros compañeros hasta tarde.' }
            },
            {
                messages: [
                    { from: 'damian', text: 'Lo sé, perdona. Te compenso el finde, ¿vale? ❤️' },
                    { from: 'damian', text: 'Tengo que dejarte, me llaman.' },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            },
            // Día 2
            {
                messages: [
                    { from: 'damian', text: 'Buenos días mi vida ❤️' },
                    { from: 'damian', text: '¿Dormiste bien?' }
                ],
                choices: [
                    'Damián, ¿dónde estuviste ayer realmente?',
                    'Sí. ¿Hoy también llegas tarde?'
                ]
            },
            {
                messages: [
                    { from: 'damian', text: 'En el trabajo, ya te dije...' },
                    { from: 'damian', text: '¿A qué viene eso?' }
                ],
                choices: [
                    'He hablado con Diego. Me ha dicho que te fuiste pronto.',
                    'Nada, déjalo.'
                ]
            },
            {
                messages: [
                    { from: 'damian', text: '...' },
                    { from: 'damian', text: 'Andrea, confía en mí. Por favor.' },
                    { from: 'damian', text: 'Hay cosas que no te puedo contar ahora pero te prometo que todo está bien.' },
                    { from: 'damian', text: 'Te lo voy a explicar todo pronto. ¿Vale?' }
                ],
                choices: [ 'Me cuesta mucho confiar cuando me mientes, Damián.' ],
                evidence: { title: 'Damián admite que oculta algo', desc: '"Hay cosas que no te puedo contar ahora." Admite el secretismo pero pide confianza.' }
            },
            {
                messages: [
                    { from: 'damian', text: 'Lo sé y lo siento mucho. De verdad.' },
                    { from: 'damian', text: 'Solo te pido unos días más. Por favor. 🙏' },
                    { from: 'damian', text: 'Te quiero. Más de lo que crees.' },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            },
            // Final
            {
                messages: [
                    { type: 'system', text: 'Decides enfrentar a Damián...' },
                    { from: 'you', text: 'Damián, lo sé todo.' }
                ],
                choices: [ 'Sé lo de Silvia. Sé lo del catering. Sé lo de la joyería.' ]
            },
            {
                messages: [
                    { from: 'damian', text: '...' },
                    { from: 'damian', text: '¿Cómo...?' },
                    { from: 'damian', text: 'Andrea, ¿has hablado con Silvia??' }
                ],
                choices: [ 'Sí. Pensaba que me engañabas, Damián. Me estaba volviendo loca.' ]
            },
            {
                messages: [
                    { from: 'damian', text: 'Dios mío... Andrea...' },
                    { from: 'damian', text: 'Lo siento TANTÍSIMO' },
                    { from: 'damian', text: 'No me di cuenta de cómo se veía todo desde fuera' },
                    { from: 'damian', text: 'Las llegadas tarde, el móvil escondido, las mentiras...' },
                    { from: 'damian', text: 'Soy un idiota. 😔' }
                ],
                choices: [
                    'No, yo soy la idiota por no confiar en ti.',
                    'Los dos hemos sido idiotas.'
                ]
            },
            {
                messages: [
                    { from: 'damian', text: 'Quería que fuese perfecto.' },
                    { from: 'damian', text: 'Llevo un mes organizando una fiesta sorpresa para nuestro aniversario.' },
                    { from: 'damian', text: 'El catering, la decoración, las invitaciones a todos nuestros amigos...' },
                    { from: 'damian', text: 'Y esto...' },
                    { from: 'damian', text: '💍' },
                    { from: 'damian', text: 'Iba a renovar nuestros votos, Andrea.' },
                    { from: 'damian', text: 'Porque estos 10 años contigo han sido los mejores de mi vida.' },
                    { from: 'damian', text: 'Y quería decírtelo delante de todos.' }
                ],
                choices: [ 'Damián... te quiero. Perdóname.' ]
            },
            {
                messages: [
                    { from: 'damian', text: 'No hay nada que perdonar. ❤️' },
                    { from: 'damian', text: 'Bueno... la sorpresa se ha ido a la porra 😂' },
                    { from: 'damian', text: 'Pero la fiesta sigue en pie.' },
                    { from: 'damian', text: 'Este sábado. 8 de la noche. Y más te vale hacerte la sorprendida delante de mi madre.' },
                    { from: 'damian', text: '😂❤️' }
                ],
                choices: [ '😂❤️ Soy la mejor actriz del mundo, ya verás.' ]
            }
        ],
        marta: [
            {
                messages: [
                    { from: 'marta', text: 'Tía, ¿cómo estás? Hace días que no sé de ti 💕' }
                ],
                choices: [
                    'Marta, necesito hablar contigo. Es sobre Damián.',
                    'Hola guapa, todo bien... bueno, más o menos.'
                ]
            },
            {
                messages: [
                    { from: 'marta', text: '¿Qué pasa?? Me estás asustando 😰' }
                ],
                choices: [
                    'Lleva semanas llegando tardísimo. Siempre "el trabajo". No sé qué pensar.',
                    'Nada grave, solo que le noto raro últimamente.'
                ]
            },
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
            {
                messages: [
                    { from: 'marta', text: 'No lo sé, iba con prisa y no me vio.' },
                    { from: 'marta', text: 'Mira, ¿has probado a hablar con alguien de su trabajo? Con Diego o alguien así.' },
                    { from: 'marta', text: 'A lo mejor es verdad que están hasta arriba de curro.' },
                    { from: 'marta', text: 'Pero por si acaso... estate atenta, ¿vale? 👀' }
                ],
                choices: [ 'Tienes razón. Voy a hablar con Diego.' ]
            },
            {
                messages: [
                    { from: 'marta', text: 'Cualquier cosa me cuentas. Estoy aquí para ti ❤️' },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            }
        ],
        diego: [
            {
                messages: [
                    { from: 'diego', text: 'Ey Andrea, ¿qué tal? ¿Todo bien?' },
                    { from: 'diego', text: 'No sueles escribirme jaja' }
                ],
                choices: [
                    'Hola Diego, ¿puedo preguntarte algo sobre el trabajo?',
                    'Diego, necesito que seas sincero conmigo.'
                ]
            },
            {
                messages: [
                    { from: 'diego', text: 'Claro, dime' }
                ],
                choices: [ 'Damián me dice que os quedáis hasta tarde por un proyecto. ¿Es verdad?' ]
            },
            {
                messages: [
                    { from: 'diego', text: '...' },
                    { from: 'diego', text: 'A ver, sí que hay un proyecto gordo' },
                    { from: 'diego', text: 'Pero no te voy a mentir, esta semana Damián se ha ido antes que yo un par de días' }
                ],
                choices: [
                    '¿Que se ha ido antes? ¿Y a dónde va?',
                    '...O sea que me ha mentido.'
                ],
                evidence: { title: 'Diego contradice a Damián', desc: 'Diego confirma que Damián se ha marchado pronto del trabajo varios días esta semana. No se quedaba hasta tarde como decía.' }
            },
            {
                messages: [
                    { from: 'diego', text: 'No lo sé Andrea, de verdad. Solo sé que sale y no dice a dónde.' },
                    { from: 'diego', text: 'Mira, no quiero meterme en medio pero...' },
                    { from: 'diego', text: 'El otro día vi que le escribía mucho alguien por el móvil. Lo tenía en silencio y lo guardaba rápido.' },
                    { from: 'diego', text: 'No vi el nombre, lo siento.' }
                ],
                choices: [ 'Gracias por ser honesto, Diego. De verdad.' ],
                evidence: { title: 'Mensajes sospechosos', desc: 'Diego vio que alguien le escribe mucho a Damián. Él oculta el teléfono y lo pone en silencio.' }
            },
            {
                messages: [
                    { from: 'diego', text: 'No me des las gracias... espero que no sea nada.' },
                    { from: 'diego', text: 'Si necesitas algo, aquí estoy.' },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            }
        ],
        ana: [
            {
                messages: [
                    { from: 'ana', text: 'Hermanita!! ¿Cómo estás? 🤗' }
                ],
                choices: [ 'Ana, creo que Damián me está engañando.' ]
            },
            {
                messages: [
                    { from: 'ana', text: '¿¿QUÉ?? 😱' },
                    { from: 'ana', text: 'A ver, cuéntame todo YA' }
                ],
                choices: [ 'Llega tarde, miente sobre el trabajo, oculta el móvil... y Marta le vio solo en el centro comercial.' ]
            },
            {
                messages: [
                    { from: 'ana', text: 'Madre mía...' },
                    { from: 'ana', text: 'Ok. No te voy a mentir, eso pinta mal.' },
                    { from: 'ana', text: 'PERO escúchame. Antes de montar un drama...' },
                    { from: 'ana', text: 'Mira su móvil.' },
                    { from: 'ana', text: '¿Puedes revisar su historial de llamadas o algo?' }
                ],
                choices: [
                    'No sé si debería... eso es invadir su privacidad.',
                    'Ya he pensado en eso. Me da miedo lo que pueda encontrar.'
                ]
            },
            {
                messages: [
                    { from: 'ana', text: 'Mira, la confianza ya está rota de su parte, no de la tuya.' },
                    { from: 'ana', text: 'Cuando se duerma, mira las llamadas recientes. Solo eso.' },
                    { from: 'ana', text: 'Y me cuentas. 🫂' }
                ],
                choices: [ 'Vale... tienes razón. Lo haré esta noche.' ]
            },
            {
                messages: [
                    { type: 'system', text: 'Esa noche, mientras Damián duerme, revisas su móvil...' },
                    { type: 'system', text: '📱 Llamadas recientes:' },
                    { type: 'system', text: '• Silvia (5 llamadas esta semana)\n• Diego\n• Mamá\n• Tú' },
                    { type: 'system', text: '¿Quién es Silvia?' }
                ],
                choices: [ '¿¿Quién es Silvia?? Voy a buscar ese número.' ],
                evidence: { title: '5 llamadas a "Silvia"', desc: 'Damián ha llamado 5 veces esta semana a alguien llamada "Silvia". No conoces a ninguna Silvia.' }
            },
            {
                messages: [
                    { type: 'system', text: 'Has guardado el número de Silvia...' },
                    { type: 'system', text: 'Mañana investigarás.' }
                ],
                choices: []
            }
        ],
        desconocido: [
            {
                messages: [
                    { type: 'system', text: 'Llamas al número desconocido...' }
                ],
                choices: [ 'Hola, ¿eres Silvia?' ]
            },
            {
                messages: [
                    { from: 'desconocido', text: '¿Sí? ¿Quién es?' }
                ],
                choices: [
                    'Soy Andrea. La mujer de Damián. ¿Puedes explicarme por qué le llamas tanto?',
                    'Perdona, ¿de qué conoces a Damián?'
                ]
            },
            {
                messages: [
                    { from: 'desconocido', text: '¡Ah, Andrea! 😊' },
                    { from: 'desconocido', text: 'Soy Silvia, de Eventos y Catering "La Rosaleda".' },
                    { from: 'desconocido', text: 'Tu marido ha contratado nuestros servicios.' },
                    { from: 'desconocido', text: 'Pero... ay, creo que no debería decirte más. Él me pidió discreción 🤐' }
                ],
                choices: [
                    '¿¿Catering?? ¿Para qué??',
                    'Por favor, necesito saber qué está pasando.'
                ],
                evidence: { title: 'Silvia = catering "La Rosaleda"', desc: 'Silvia no es "la otra". Es de una empresa de catering. Damián ha contratado un evento y le pidió discreción.' }
            },
            {
                messages: [
                    { from: 'desconocido', text: 'Ay madre, me va a matar...' },
                    { from: 'desconocido', text: 'Mira, solo te digo que tu marido es un cielo de persona.' },
                    { from: 'desconocido', text: 'No puedo decirte más. ¡De verdad! Es una sorpresa.' },
                    { from: 'desconocido', text: 'Confía en él. 🤍' }
                ],
                choices: [ '...¿Una sorpresa?' ]
            },
            {
                messages: [
                    { from: 'desconocido', text: '¡¡No he dicho nada!! 🙈' },
                    { from: 'desconocido', text: 'Háblalo con él, pero no le digas que yo te conté. ¡Por favoooor!' },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            }
        ],
        silvia: [
            {
                messages: [
                    { from: 'silvia', text: 'Andrea, ¿no le has dicho nada a Damián, verdad? 😰' },
                    { from: 'silvia', text: 'Es que lleva semanas organizándolo todo con mucho cariño...' }
                ],
                choices: [
                    '¿Organizando qué exactamente?',
                    'Tranquila, no he dicho nada. Pero necesito entender.'
                ]
            },
            {
                messages: [
                    { from: 'silvia', text: 'Mira, ya la he liado así que...' },
                    { from: 'silvia', text: 'Tu marido lleva un mes preparándote una fiesta sorpresa de aniversario. 🎉' },
                    { from: 'silvia', text: 'El catering, la decoración, ha invitado a toda tu familia y amigos...' },
                    { from: 'silvia', text: 'Por eso iba al centro comercial, por eso las llamadas, por eso llegaba tarde.' },
                    { from: 'silvia', text: 'También ha comprado algo en una joyería pero eso sí que no te lo digo 😤💍' }
                ],
                choices: [ 'Dios mío... soy la peor persona del mundo.' ],
                evidence: { title: '🎉 LA VERDAD: Fiesta sorpresa de aniversario', desc: 'Damián preparaba una fiesta sorpresa de aniversario con catering, decoración e invitados. También compró algo en una joyería. Nunca hubo infidelidad.' }
            },
            {
                messages: [
                    { from: 'silvia', text: 'Nooo, no digas eso. Es normal sospechar con tantas señales.' },
                    { from: 'silvia', text: 'Pero te prometo que ese hombre te quiere con locura.' },
                    { from: 'silvia', text: 'Anda, ve a hablar con él. 🤍' },
                    { type: 'system', text: 'Es hora de hablar con Damián...' }
                ],
                choices: []
            }
        ]
    },
    ending: {
        emoji: '💍',
        title: 'No era culpable.',
        lines: [
            'Damián nunca te fue infiel.',
            'Las llegadas tarde, los mensajes ocultos, las mentiras...',
            'Todo era para preparar la <span class="ending-highlight">fiesta sorpresa de vuestro aniversario</span>.',
        ],
        reflection: [
            'A veces, el miedo y la desconfianza nos hacen ver cosas que no existen.',
            'A veces, la persona que más dudamos es la que más nos quiere.',
        ],
        verdict: 'Damián era inocente.',
        epilogue: 'Y la fiesta, por cierto, fue increíble. 🎉',
        brandLine: 'Un juego de chat',
    }
});

// ============================================================
//  ENGLISH
// ============================================================
I18N.register('en', {
    ui: {
        chats: 'Chats',
        notes: 'Notes',
        messages: 'Messages',
        myNotes: 'My Notes',
        day: 'Day',
        online: 'online',
        disconnected: 'has disconnected',
        blocked: 'Blocked',
        noClues: "You haven't found any clues yet...",
        newClue: 'New clue',
        you: 'You',
        end: 'End',
        openPhone: 'Open the phone',
        start: 'START',
        langSelect: 'Language',
    },
    start: {
        title: 'GUILTY',
        subtitle: 'Is your husband cheating on you?',
        desc: 'Investigate. Question. Discover the truth.',
    },
    intro: [
        'My name is <span class="highlight">Andrea</span>.',
        "I've been married to <span class=\"highlight\">Damián</span> for 10 years.",
        'I always thought we had the perfect marriage.',
        'Until he started coming home late.',
        'Hiding his phone.',
        'Lying to me.',
        "Tonight I'm going to find out the truth.",
    ],
    contacts: {
        damian:      { preview: 'Your husband' },
        marta:       { preview: 'Your best friend' },
        diego:       { preview: "Damián's coworker" },
        ana:         { preview: 'Your sister' },
        desconocido: { preview: '+34 612 XXX XXX' },
        silvia:      { preview: 'New contact' },
    },
    script: {
        damian: [
            {
                messages: [
                    { from: 'damian', text: "Honey, I'm going to be late again today. Don't wait up. 😘" }
                ],
                choices: [
                    'Again? That makes three days in a row...',
                    "OK, don't worry. Everything alright at work?"
                ]
            },
            {
                messages: [
                    { from: 'damian', text: "Yeah yeah, it's the new project. The boss is unbearable with deadlines." },
                    { from: 'damian', text: 'You know how it is...' }
                ],
                choices: [
                    'Who are you staying late with?',
                    "OK. Love you. Don't be too late."
                ]
            },
            {
                messages: [
                    { from: 'damian', text: 'With Diego and a couple others from the team.' },
                    { from: 'damian', text: "Don't be so suspicious 😅" }
                ],
                choices: [ "It's not suspicion... it's concern." ],
                evidence: { title: 'Says he works with Diego', desc: 'Damián claims he stays late with Diego and other coworkers.' }
            },
            {
                messages: [
                    { from: 'damian', text: "I know, sorry. I'll make it up to you this weekend, OK? ❤️" },
                    { from: 'damian', text: 'Gotta go, someone is calling me.' },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            },
            {
                messages: [
                    { from: 'damian', text: 'Good morning my love ❤️' },
                    { from: 'damian', text: 'Did you sleep well?' }
                ],
                choices: [
                    'Damián, where were you yesterday really?',
                    'Yeah. Are you going to be late again today?'
                ]
            },
            {
                messages: [
                    { from: 'damian', text: 'At work, I told you...' },
                    { from: 'damian', text: "What's this about?" }
                ],
                choices: [
                    'I talked to Diego. He told me you left early.',
                    'Nothing, forget it.'
                ]
            },
            {
                messages: [
                    { from: 'damian', text: '...' },
                    { from: 'damian', text: 'Andrea, trust me. Please.' },
                    { from: 'damian', text: "There are things I can't tell you right now but I promise everything is fine." },
                    { from: 'damian', text: "I'll explain everything soon. OK?" }
                ],
                choices: [ "It's really hard to trust you when you lie to me, Damián." ],
                evidence: { title: 'Damián admits hiding something', desc: '"There are things I can\'t tell you right now." He admits the secrecy but asks for trust.' }
            },
            {
                messages: [
                    { from: 'damian', text: "I know and I'm so sorry. Really." },
                    { from: 'damian', text: 'I just need a few more days. Please. 🙏' },
                    { from: 'damian', text: 'I love you. More than you think.' },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            },
            {
                messages: [
                    { type: 'system', text: 'You decide to confront Damián...' },
                    { from: 'you', text: 'Damián, I know everything.' }
                ],
                choices: [ 'I know about Silvia. I know about the catering. I know about the jewelry.' ]
            },
            {
                messages: [
                    { from: 'damian', text: '...' },
                    { from: 'damian', text: 'How...?' },
                    { from: 'damian', text: 'Andrea, did you talk to Silvia??' }
                ],
                choices: [ 'Yes. I thought you were cheating on me, Damián. I was losing my mind.' ]
            },
            {
                messages: [
                    { from: 'damian', text: 'Oh my God... Andrea...' },
                    { from: 'damian', text: "I'm SO sorry" },
                    { from: 'damian', text: "I didn't realize how it all looked from the outside" },
                    { from: 'damian', text: 'The late nights, the hidden phone, the lies...' },
                    { from: 'damian', text: "I'm an idiot. 😔" }
                ],
                choices: [
                    "No, I'm the idiot for not trusting you.",
                    "We've both been idiots."
                ]
            },
            {
                messages: [
                    { from: 'damian', text: 'I wanted it to be perfect.' },
                    { from: 'damian', text: "I've been planning a surprise anniversary party for a month." },
                    { from: 'damian', text: 'The catering, the decorations, invitations to all our friends...' },
                    { from: 'damian', text: 'And this...' },
                    { from: 'damian', text: '💍' },
                    { from: 'damian', text: 'I was going to renew our vows, Andrea.' },
                    { from: 'damian', text: 'Because these 10 years with you have been the best of my life.' },
                    { from: 'damian', text: 'And I wanted to say it in front of everyone.' }
                ],
                choices: [ 'Damián... I love you. Forgive me.' ]
            },
            {
                messages: [
                    { from: 'damian', text: "There's nothing to forgive. ❤️" },
                    { from: 'damian', text: 'Well... the surprise is ruined 😂' },
                    { from: 'damian', text: 'But the party is still on.' },
                    { from: 'damian', text: "This Saturday. 8 PM. And you better act surprised in front of my mom." },
                    { from: 'damian', text: '😂❤️' }
                ],
                choices: [ "😂❤️ I'm the best actress in the world, you'll see." ]
            }
        ],
        marta: [
            {
                messages: [
                    { from: 'marta', text: "Girl, how are you? Haven't heard from you in days 💕" }
                ],
                choices: [
                    "Marta, I need to talk to you. It's about Damián.",
                    'Hey babe, all good... well, sort of.'
                ]
            },
            {
                messages: [
                    { from: 'marta', text: "What's going on?? You're scaring me 😰" }
                ],
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
                choices: [
                    'At the mall?? Doing what?',
                    'Maybe he was just buying something...'
                ],
                evidence: { title: 'Marta saw him at the mall', desc: 'Marta saw Damián alone at the mall on a Tuesday afternoon. He never mentioned it.' }
            },
            {
                messages: [
                    { from: 'marta', text: "I don't know, he was in a hurry and didn't see me." },
                    { from: 'marta', text: "Have you tried talking to someone from his work? Like Diego?" },
                    { from: 'marta', text: 'Maybe they really are swamped with work.' },
                    { from: 'marta', text: 'But just in case... keep your eyes open, OK? 👀' }
                ],
                choices: [ "You're right. I'll talk to Diego." ]
            },
            {
                messages: [
                    { from: 'marta', text: "Whatever happens, tell me. I'm here for you ❤️" },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            }
        ],
        diego: [
            {
                messages: [
                    { from: 'diego', text: 'Hey Andrea, how are you? Everything OK?' },
                    { from: 'diego', text: "You don't usually text me haha" }
                ],
                choices: [
                    'Hi Diego, can I ask you something about work?',
                    'Diego, I need you to be honest with me.'
                ]
            },
            {
                messages: [
                    { from: 'diego', text: 'Sure, go ahead' }
                ],
                choices: [ "Damián tells me you guys stay late for a project. Is that true?" ]
            },
            {
                messages: [
                    { from: 'diego', text: '...' },
                    { from: 'diego', text: 'Well, there is a big project' },
                    { from: 'diego', text: "But I'm not going to lie to you, Damián left earlier than me a couple of days this week" }
                ],
                choices: [
                    'He left early? Where does he go?',
                    '...So he lied to me.'
                ],
                evidence: { title: 'Diego contradicts Damián', desc: "Diego confirms Damián left work early several days this week. He wasn't staying late like he said." }
            },
            {
                messages: [
                    { from: 'diego', text: "I don't know Andrea, honestly. I just know he leaves and doesn't say where." },
                    { from: 'diego', text: "Look, I don't want to get in the middle but..." },
                    { from: 'diego', text: "The other day I saw someone texting him a lot. He had his phone on silent and kept hiding it." },
                    { from: 'diego', text: "I didn't see the name, sorry." }
                ],
                choices: [ 'Thanks for being honest, Diego. Really.' ],
                evidence: { title: 'Suspicious messages', desc: 'Diego saw someone texting Damián frequently. He hides his phone and keeps it on silent.' }
            },
            {
                messages: [
                    { from: 'diego', text: "Don't thank me... I hope it's nothing." },
                    { from: 'diego', text: "If you need anything, I'm here." },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            }
        ],
        ana: [
            {
                messages: [
                    { from: 'ana', text: 'Sis!! How are you? 🤗' }
                ],
                choices: [ "Ana, I think Damián is cheating on me." ]
            },
            {
                messages: [
                    { from: 'ana', text: 'WHAT?? 😱' },
                    { from: 'ana', text: 'OK, tell me everything NOW' }
                ],
                choices: [ "He comes home late, lies about work, hides his phone... and Marta saw him alone at the mall." ]
            },
            {
                messages: [
                    { from: 'ana', text: 'Oh my God...' },
                    { from: 'ana', text: "OK. I'm not going to lie, that looks bad." },
                    { from: 'ana', text: 'BUT listen to me. Before you go nuclear...' },
                    { from: 'ana', text: 'Check his phone.' },
                    { from: 'ana', text: 'Can you look at his recent calls or something?' }
                ],
                choices: [
                    "I don't know if I should... that's invading his privacy.",
                    "I've thought about it. I'm scared of what I might find."
                ]
            },
            {
                messages: [
                    { from: 'ana', text: "Look, trust was already broken on his end, not yours." },
                    { from: 'ana', text: 'When he falls asleep, check his recent calls. Just that.' },
                    { from: 'ana', text: 'And then tell me. 🫂' }
                ],
                choices: [ "OK... you're right. I'll do it tonight." ]
            },
            {
                messages: [
                    { type: 'system', text: 'That night, while Damián sleeps, you check his phone...' },
                    { type: 'system', text: '📱 Recent calls:' },
                    { type: 'system', text: '• Silvia (5 calls this week)\n• Diego\n• Mom\n• You' },
                    { type: 'system', text: 'Who is Silvia?' }
                ],
                choices: [ "Who is Silvia?? I'm going to look up that number." ],
                evidence: { title: '5 calls to "Silvia"', desc: 'Damián called someone named "Silvia" 5 times this week. You don\'t know any Silvia.' }
            },
            {
                messages: [
                    { type: 'system', text: "You've saved Silvia's number..." },
                    { type: 'system', text: "Tomorrow you'll investigate." }
                ],
                choices: []
            }
        ],
        desconocido: [
            {
                messages: [
                    { type: 'system', text: 'You call the unknown number...' }
                ],
                choices: [ 'Hello, are you Silvia?' ]
            },
            {
                messages: [
                    { from: 'desconocido', text: 'Yes? Who is this?' }
                ],
                choices: [
                    "I'm Andrea. Damián's wife. Can you explain why you call him so much?",
                    "Sorry, how do you know Damián?"
                ]
            },
            {
                messages: [
                    { from: 'desconocido', text: 'Oh, Andrea! 😊' },
                    { from: 'desconocido', text: 'I\'m Silvia, from "La Rosaleda" Events & Catering.' },
                    { from: 'desconocido', text: 'Your husband hired our services.' },
                    { from: 'desconocido', text: "But... oh, I probably shouldn't say more. He asked me to be discreet 🤐" }
                ],
                choices: [
                    'Catering?? For what??',
                    "Please, I need to know what's going on."
                ],
                evidence: { title: 'Silvia = "La Rosaleda" catering', desc: 'Silvia isn\'t "the other woman". She works for a catering company. Damián hired them for an event and asked for discretion.' }
            },
            {
                messages: [
                    { from: 'desconocido', text: "Oh God, he's going to kill me..." },
                    { from: 'desconocido', text: "Look, all I can say is your husband is an absolute sweetheart." },
                    { from: 'desconocido', text: "I can't tell you more. Really! It's a surprise." },
                    { from: 'desconocido', text: 'Trust him. 🤍' }
                ],
                choices: [ '...A surprise?' ]
            },
            {
                messages: [
                    { from: 'desconocido', text: "I didn't say anything!! 🙈" },
                    { from: 'desconocido', text: "Talk to him, but don't tell him I told you. Pleeeease!" },
                    { type: 'system', text: '{disconnected}' }
                ],
                choices: []
            }
        ],
        silvia: [
            {
                messages: [
                    { from: 'silvia', text: "Andrea, you haven't told Damián anything, right? 😰" },
                    { from: 'silvia', text: "He's been organizing everything with so much love..." }
                ],
                choices: [
                    'Organizing what exactly?',
                    "Don't worry, I haven't said anything. But I need to understand."
                ]
            },
            {
                messages: [
                    { from: 'silvia', text: "Look, I've already messed up so..." },
                    { from: 'silvia', text: "Your husband has been planning a surprise anniversary party for you for a month. 🎉" },
                    { from: 'silvia', text: 'The catering, the decorations, he invited all your family and friends...' },
                    { from: 'silvia', text: "That's why he went to the mall, that's why the calls, that's why he came home late." },
                    { from: 'silvia', text: "He also bought something at a jewelry store but I'm NOT telling you that 😤💍" }
                ],
                choices: [ "Oh my God... I'm the worst person in the world." ],
                evidence: { title: '🎉 THE TRUTH: Surprise anniversary party', desc: 'Damián was planning a surprise anniversary party with catering, decorations and guests. He also bought something at a jewelry store. There was never any cheating.' }
            },
            {
                messages: [
                    { from: 'silvia', text: "Nooo, don't say that. It's normal to be suspicious with so many signs." },
                    { from: 'silvia', text: "But I promise you that man loves you like crazy." },
                    { from: 'silvia', text: 'Go talk to him. 🤍' },
                    { type: 'system', text: "It's time to talk to Damián..." }
                ],
                choices: []
            }
        ]
    },
    ending: {
        emoji: '💍',
        title: 'Not guilty.',
        lines: [
            'Damián never cheated on you.',
            'The late nights, the hidden messages, the lies...',
            'It was all to prepare a <span class="ending-highlight">surprise anniversary party</span>.',
        ],
        reflection: [
            'Sometimes, fear and distrust make us see things that aren\'t there.',
            'Sometimes, the person we doubt the most is the one who loves us the most.',
        ],
        verdict: 'Damián was innocent.',
        epilogue: 'And the party, by the way, was incredible. 🎉',
        brandLine: 'A chat game',
    }
});

I18N.init();

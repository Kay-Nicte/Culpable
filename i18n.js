// ============================================================
//  i18n – Sistema de internacionalización para CULPABLE
//  Solo strings de UI. Los diálogos viven en chapters/*.js
// ============================================================

const I18N = {
    currentLang: 'es',
    translations: {},

    init() {
        const saved = localStorage.getItem('culpable-lang');
        if (saved && this.translations[saved]) {
            this.currentLang = saved;
        } else {
            const browserLang = navigator.language.slice(0, 2);
            if (this.translations[browserLang]) this.currentLang = browserLang;
        }
    },

    register(lang, data) {
        if (this.translations[lang]) {
            // Deep merge (para que chapters puedan añadir)
            this.translations[lang] = deepMerge(this.translations[lang], data);
        } else {
            this.translations[lang] = data;
        }
    },

    setLang(lang) {
        if (!this.translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('culpable-lang', lang);
    },

    t(key) {
        const lang = this.translations[this.currentLang];
        if (!lang) return key;
        const parts = key.split('.');
        let val = lang;
        for (const p of parts) {
            if (val && typeof val === 'object' && p in val) val = val[p];
            else return key;
        }
        return val;
    },

    getAvailableLangs() { return Object.keys(this.translations); }
};

function deepMerge(target, source) {
    const out = { ...target };
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key]) {
            out[key] = deepMerge(target[key], source[key]);
        } else {
            out[key] = source[key];
        }
    }
    return out;
}

// ============================================================
//  ESPAÑOL – UI Strings
// ============================================================
I18N.register('es', {
    ui: {
        chats: 'Chats', notes: 'Notas', chapters: 'Caps', settings: 'Ajustes',
        messages: 'Mensajes', myNotes: 'Mis Notas', chaptersTitle: 'Capítulos', settingsTitle: 'Ajustes',
        day: 'Día', chapter: 'Capítulo', online: 'en línea', disconnected: 'se ha desconectado',
        blocked: 'Bloqueado', noClues: 'Aún no has encontrado pistas...',
        newClue: 'Nueva pista', you: 'Tú', end: 'Fin',
        openPhone: 'Abrir el móvil', start: 'COMENZAR', continue: 'Continuar',
        continueGame: 'CONTINUAR', newGame: 'Nueva partida',
        langSelect: 'Idioma', timerMode: 'Modo tiempo real',
        timerWait: 'Nuevo capítulo disponible en',
        perfect: '¡Perfecto!', completed: '¡Completado!',
        retry: 'Reintentar', wrongPattern: 'Patrón incorrecto',
        patternHint: 'Pista: mira los puntos dorados',
        flips: 'Intentos', moves: 'Movimientos', goal: 'Objetivo',
        findClues: 'Toca las publicaciones sospechosas', useHint: 'Usar pista',
        starsNeeded: 'Necesitas {n} ⭐ para desbloquear',
        groupChat: 'Chat grupal',
        writing: 'escribiendo...',
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
        damian:   { name: 'Damián (Marido)' },
        marta:    { name: 'Marta (Mejor amiga)' },
        diego:    { name: 'Diego (Compañero de Damián)' },
        ana:      { name: 'Ana (Hermana)' },
        silvia:   { name: 'Silvia (Desconocida)' },
        lucia:    { name: 'Lucía (Detective privada)' },
        carlos:   { name: 'Carlos (Hermano de Damián)' },
        javi:     { name: 'Javi (Amigo del gym)' },
        patricia: { name: 'Patricia (Florista)' },
        mama_rosa:{ name: 'Rosa (Suegra)' },
        elena:    { name: 'Elena (Compañera de trabajo)' },
        grupo_amigas: { name: '👩‍👩‍👧 Nosotras' },
        grupo_familia: { name: '👨‍👩‍👧 Familia' },
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
//  ENGLISH – UI Strings
// ============================================================
I18N.register('en', {
    ui: {
        chats: 'Chats', notes: 'Notes', chapters: 'Chaps', settings: 'Settings',
        messages: 'Messages', myNotes: 'My Notes', chaptersTitle: 'Chapters', settingsTitle: 'Settings',
        day: 'Day', chapter: 'Chapter', online: 'online', disconnected: 'has disconnected',
        blocked: 'Blocked', noClues: "You haven't found any clues yet...",
        newClue: 'New clue', you: 'You', end: 'End',
        openPhone: 'Open the phone', start: 'START', continue: 'Continue',
        continueGame: 'CONTINUE', newGame: 'New game',
        langSelect: 'Language', timerMode: 'Real-time mode',
        timerWait: 'New chapter available in',
        perfect: 'Perfect!', completed: 'Completed!',
        retry: 'Retry', wrongPattern: 'Wrong pattern',
        patternHint: 'Hint: look at the golden dots',
        flips: 'Flips', moves: 'Moves', goal: 'Goal',
        findClues: 'Tap the suspicious posts', useHint: 'Use hint',
        starsNeeded: 'You need {n} ⭐ to unlock',
        groupChat: 'Group chat',
        writing: 'typing...',
    },
    start: {
        title: 'GUILTY',
        subtitle: 'Is your husband cheating on you?',
        desc: 'Investigate. Question. Discover the truth.',
    },
    intro: [
        'My name is <span class="highlight">Andrea</span>.',
        'I\'ve been married to <span class="highlight">Damián</span> for 10 years.',
        'I always thought we had the perfect marriage.',
        'Until he started coming home late.',
        'Hiding his phone.',
        'Lying to me.',
        'Tonight I\'m going to find out the truth.',
    ],
    contacts: {
        damian:   { name: 'Damián (Husband)' },
        marta:    { name: 'Marta (Best friend)' },
        diego:    { name: "Diego (Damián's Coworker)" },
        ana:      { name: 'Ana (Sister)' },
        silvia:   { name: 'Silvia (Unknown)' },
        lucia:    { name: 'Lucía (Private investigator)' },
        carlos:   { name: "Carlos (Damián's Brother)" },
        javi:     { name: 'Javi (Gym buddy)' },
        patricia: { name: 'Patricia (Florist)' },
        mama_rosa:{ name: 'Rosa (Mother-in-law)' },
        elena:    { name: 'Elena (Coworker)' },
        grupo_amigas: { name: '👩‍👩‍👧 The Girls' },
        grupo_familia: { name: '👨‍👩‍👧 Family' },
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

// ============================================================
//  CULPABLE – Motor del juego v2
//  Capítulos, minijuegos, guardado, estrellas, i18n
// ============================================================

// ---- Chapter Registry ----
const ChapterRegistry = {
    chapters: {},
    register(num, data) { this.chapters[num] = data; },
    get(num) { return this.chapters[num]; },
    getAll() { return Object.keys(this.chapters).map(Number).sort((a,b) => a - b); }
};

// Make it global before chapter files load (they call ChapterRegistry.register)
window.ChapterRegistry = ChapterRegistry;

// ---- State ----
const DEFAULT_STATE = {
    chapter: 1, day: 1, phase: 0, stars: 0,
    evidence: [], unlockedContacts: [],
    chatHistory: {}, contactProgress: {},
    contactHasNew: {}, flags: {},
    completedMinigames: [], ended: false,
    settings: { timerMode: false }
};

let STATE = JSON.parse(JSON.stringify(DEFAULT_STATE));

// ---- DOM helpers ----
const $ = id => document.getElementById(id);
const t = key => I18N.t(key);
let currentContact = null;
let messageQueue = [];

// ---- Contacts metadata (aggregated from all chapters) ----
function getAllContactsMeta() {
    const meta = {};
    for (const num of ChapterRegistry.getAll()) {
        const ch = ChapterRegistry.get(num);
        if (ch.meta) Object.assign(meta, ch.meta);
    }
    return meta;
}

function getContactName(key) {
    const name = t('contacts.' + key + '.name');
    return (name && name !== 'contacts.' + key + '.name') ? name : key;
}

function getContactPreview(key) {
    const lang = I18N.currentLang;
    // Try current chapter, then all chapters
    for (const num of ChapterRegistry.getAll()) {
        const ch = ChapterRegistry.get(num);
        const langData = ch[lang] || ch['es'];
        if (langData && langData.contactPreviews && langData.contactPreviews[key]) {
            return langData.contactPreviews[key];
        }
    }
    return '';
}

function getScript(contactKey) {
    const lang = I18N.currentLang;
    // Find script in current chapter first, then any chapter
    for (const num of ChapterRegistry.getAll()) {
        const ch = ChapterRegistry.get(num);
        const langData = ch[lang] || ch['es'];
        if (langData && langData.script && langData.script[contactKey]) {
            return langData.script[contactKey];
        }
    }
    return [];
}

function getFullScript(contactKey) {
    // Concatenate scripts from all chapters for this contact
    const lang = I18N.currentLang;
    let full = [];
    for (const num of ChapterRegistry.getAll()) {
        const ch = ChapterRegistry.get(num);
        const langData = ch[lang] || ch['es'];
        if (langData && langData.script && langData.script[contactKey]) {
            full = full.concat(langData.script[contactKey]);
        }
    }
    return full;
}

// ---- Save/Load ----
function saveGame() {
    localStorage.setItem('culpable-save', JSON.stringify(STATE));
}

function loadGame() {
    const saved = localStorage.getItem('culpable-save');
    if (saved) {
        STATE = { ...JSON.parse(JSON.stringify(DEFAULT_STATE)), ...JSON.parse(saved) };
        return true;
    }
    return false;
}

function newGame() {
    localStorage.removeItem('culpable-save');
    STATE = JSON.parse(JSON.stringify(DEFAULT_STATE));
    initChapter(1);
}

function initChapter(num) {
    STATE.chapter = num;
    const ch = ChapterRegistry.get(num);
    if (!ch) return;
    // Unlock initial contacts for this chapter
    if (ch.contacts) {
        ch.contacts.forEach(c => {
            if (!STATE.unlockedContacts.includes(c)) STATE.unlockedContacts.push(c);
        });
    }
    saveGame();
}

// ============================================================
//  Init
// ============================================================
function init() {
    // Set initial contacts from chapter 1
    const ch1 = ChapterRegistry.get(1);
    if (ch1 && STATE.unlockedContacts.length === 0) {
        STATE.unlockedContacts = [...(ch1.contacts || [])];
    }

    buildLangSelector();
    applyLangToUI();

    // Check for saved game
    const hasSave = loadGame();
    if (hasSave && !STATE.ended) {
        $('btn-continue').style.display = 'block';
        $('btn-continue').addEventListener('click', () => {
            showScreen('phone-screen');
            renderContacts();
        });
    }

    $('btn-start').addEventListener('click', () => {
        newGame();
        showIntro();
    });
    $('btn-back').addEventListener('click', showContacts);

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            switchView(btn.dataset.tab);
        });
    });

    $('mg-skip').addEventListener('click', () => MinigameEngine.skip());

    // Settings
    $('setting-timer').addEventListener('change', (e) => {
        STATE.settings.timerMode = e.target.checked;
        saveGame();
    });
    $('btn-new-game').addEventListener('click', () => {
        if (confirm(I18N.currentLang === 'es' ? '¿Empezar nueva partida? Se perderá el progreso.' : 'Start new game? Progress will be lost.')) {
            newGame();
            showScreen('start-screen');
            applyLangToUI();
        }
    });

    updateClock();
    setInterval(updateClock, 60000);
}

function buildLangSelector() {
    const containers = [$('lang-selector'), $('setting-lang-btns')];
    const langs = I18N.getAvailableLangs();
    const labels = { es: '🇪🇸 ES', en: '🇬🇧 EN' };
    containers.forEach(container => {
        if (!container) return;
        container.innerHTML = '';
        for (const lang of langs) {
            const btn = document.createElement('button');
            btn.className = 'lang-btn' + (lang === I18N.currentLang ? ' active' : '');
            btn.textContent = labels[lang] || lang.toUpperCase();
            btn.addEventListener('click', () => {
                I18N.setLang(lang);
                applyLangToUI();
                buildLangSelector();
            });
            container.appendChild(btn);
        }
    });
}

function applyLangToUI() {
    document.querySelector('.start-title').textContent = t('start.title');
    document.querySelector('.start-subtitle').textContent = t('start.subtitle');
    document.querySelector('.start-desc').textContent = t('start.desc');
    $('btn-start').textContent = t('ui.start');
    $('btn-continue').textContent = t('ui.continueGame');
    $('btn-new-game').textContent = t('ui.newGame');
    $('setting-timer-label').textContent = t('ui.timerMode');
    $('setting-lang-label').textContent = t('ui.langSelect');
    $('contacts-header-title').textContent = t('ui.messages');
    $('evidence-header-title').textContent = t('ui.myNotes');
    $('chapters-title').textContent = t('ui.chaptersTitle');
    $('settings-header-title').textContent = t('ui.settingsTitle');
    const tabs = document.querySelectorAll('.tab-btn');
    if (tabs[0]) tabs[0].querySelector('span').textContent = t('ui.chats');
    if (tabs[1]) tabs[1].querySelector('span').textContent = t('ui.notes');
    if (tabs[2]) tabs[2].querySelector('span').textContent = t('ui.chapters');
    if (tabs[3]) tabs[3].querySelector('span').textContent = t('ui.settings');
}

function updateClock() {
    const now = new Date();
    $('clock').textContent = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
}

// ============================================================
//  Screens
// ============================================================
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
}

function showIntro() {
    showScreen('intro-screen');
    const lines = I18N.translations[I18N.currentLang].intro;
    let i = 0;
    const introText = $('intro-text');
    introText.innerHTML = '';
    const btnNext = $('btn-intro-next');
    btnNext.style.display = 'none';

    function showLine() {
        if (i < lines.length) {
            introText.innerHTML += (i > 0 ? '<br><br>' : '') + lines[i];
            introText.scrollTop = introText.scrollHeight;
            i++;
            if (i < lines.length) {
                setTimeout(showLine, 1800);
            } else {
                btnNext.style.display = 'inline-block';
                btnNext.textContent = t('ui.openPhone');
                btnNext.onclick = () => {
                    showChapterTransition(1, () => {
                        showScreen('phone-screen');
                        STATE.contactHasNew['damian'] = true;
                        renderContacts();
                        saveGame();
                    });
                };
            }
        }
    }
    showLine();
}

function showChapterTransition(chNum, callback) {
    const ch = ChapterRegistry.get(chNum);
    const lang = I18N.currentLang;
    const langData = ch[lang] || ch['es'];
    $('ct-chapter-num').textContent = t('ui.chapter') + ' ' + chNum;
    $('ct-chapter-title').textContent = langData.title;
    $('ct-chapter-desc').textContent = langData.desc;
    showScreen('chapter-transition');
    $('ct-continue').onclick = () => {
        initChapter(chNum);
        callback();
    };
}

// ============================================================
//  Contacts
// ============================================================
function renderContacts() {
    const list = $('contacts-list');
    list.innerHTML = '';
    const allMeta = getAllContactsMeta();
    const sortedKeys = Object.keys(allMeta).sort((a,b) => allMeta[a].order - allMeta[b].order);

    for (const key of sortedKeys) {
        const meta = allMeta[key];
        const unlocked = STATE.unlockedContacts.includes(key);
        if (!unlocked) continue; // Only show unlocked contacts
        const hasNew = STATE.contactHasNew[key];
        const div = document.createElement('div');
        div.className = 'contact-item' + (hasNew ? ' has-new' : '') + (meta.isGroup ? ' is-group' : '');

        const preview = getChatPreview(key) || getContactPreview(key);
        div.innerHTML = `
            <div class="contact-avatar" style="background:${meta.color}">${meta.emoji}</div>
            <div class="contact-info">
                <div class="contact-name">${getContactName(key)}</div>
                <div class="contact-preview">${preview}</div>
            </div>
        `;
        div.addEventListener('click', () => openChat(key));
        list.appendChild(div);
    }

    $('day-indicator').textContent = t('ui.day') + ' ' + STATE.day;
    $('chapter-indicator').textContent = 'Cap. ' + STATE.chapter;
    $('star-count').textContent = STATE.stars;
    updateProgressBar();
}

function getChatPreview(contactKey) {
    const hist = STATE.chatHistory[contactKey];
    if (!hist || hist.length === 0) return null;
    const last = hist[hist.length - 1];
    if (last.type === 'system') return last.text.substring(0, 40);
    const prefix = last.from === 'you' ? (t('ui.you') + ': ') : '';
    return prefix + last.text.substring(0, 35) + (last.text.length > 35 ? '...' : '');
}

function updateProgressBar() {
    // Calculate progress based on completed steps in current chapter
    const ch = ChapterRegistry.get(STATE.chapter);
    if (!ch) return;
    const lang = I18N.currentLang;
    const langData = ch[lang] || ch['es'];
    if (!langData || !langData.script) return;

    let totalSteps = 0, completedSteps = 0;
    for (const [contact, steps] of Object.entries(langData.script)) {
        totalSteps += steps.length;
        completedSteps += Math.min(STATE.contactProgress[contact] || 0, steps.length);
    }
    const pct = totalSteps > 0 ? (completedSteps / totalSteps * 100) : 0;
    $('progress-fill').style.width = pct + '%';
}

// ============================================================
//  Chat
// ============================================================
function openChat(contactKey) {
    currentContact = contactKey;
    const allMeta = getAllContactsMeta();
    const meta = allMeta[contactKey] || { emoji: '?', color: '#333' };
    $('chat-name').textContent = getContactName(contactKey);
    $('chat-avatar').textContent = meta.emoji;
    $('chat-avatar').style.background = meta.color;
    $('chat-status').textContent = t('ui.online');
    $('chat-choices').innerHTML = '';
    STATE.contactHasNew[contactKey] = false;

    switchView('chat');
    renderChatHistory(contactKey);

    const progress = STATE.contactProgress[contactKey] || 0;
    const script = getFullScript(contactKey);
    if (progress < script.length) {
        const step = script[progress];
        if (step.requires !== undefined && step.requires > STATE.phase) return;
        processStep(contactKey, progress);
    }
}

function renderChatHistory(contactKey) {
    const container = $('chat-messages');
    container.innerHTML = '';
    const hist = STATE.chatHistory[contactKey] || [];
    for (const msg of hist) appendMessageDOM(msg, false);
    container.scrollTop = container.scrollHeight;
}

function processStep(contactKey, stepIndex) {
    const script = getFullScript(contactKey);
    if (stepIndex >= script.length) return;
    const step = script[stepIndex];

    messageQueue = [...(step.messages || [])];
    showNextMessage(contactKey, step, stepIndex);
}

function resolveText(text) {
    return text.replace('{disconnected}', getContactName(currentContact) + ' ' + t('ui.disconnected'));
}

function showNextMessage(contactKey, step, stepIndex) {
    if (messageQueue.length === 0) {
        // Apply step effects
        if (step.evidence) addEvidence(step.evidence);
        if (step.unlock) step.unlock.forEach(c => {
            if (!STATE.unlockedContacts.includes(c)) STATE.unlockedContacts.push(c);
        });
        if (step.contactHasNew) step.contactHasNew.forEach(c => STATE.contactHasNew[c] = true);
        if (step.flag) STATE.flags[step.flag] = true;
        if (step.nextPhase !== undefined) STATE.phase = step.nextPhase;
        if (step.nextDay) STATE.day = step.nextDay;

        STATE.contactProgress[contactKey] = stepIndex + 1;
        saveGame();

        // Check for minigame
        if (step.minigame && !STATE.completedMinigames.includes(step.minigame.id)) {
            launchMinigame(step.minigame, () => {
                afterStepComplete(contactKey, step, stepIndex);
            });
            return;
        }

        afterStepComplete(contactKey, step, stepIndex);
        return;
    }

    const msg = messageQueue.shift();
    const resolved = { ...msg, text: msg.text ? resolveText(msg.text) : '' };

    if (msg.from && msg.from !== 'you') {
        $('typing-indicator').style.display = 'flex';
        $('chat-messages').scrollTop = $('chat-messages').scrollHeight;
        const delay = 800 + Math.random() * 1200;
        setTimeout(() => {
            $('typing-indicator').style.display = 'none';
            const stored = { ...resolved, time: getCurrentTime() };
            addToHistory(contactKey, stored);
            appendMessageDOM(stored, true);
            showNextMessage(contactKey, step, stepIndex);
        }, delay);
    } else {
        const stored = { ...resolved, time: getCurrentTime() };
        addToHistory(contactKey, stored);
        appendMessageDOM(stored, true);
        setTimeout(() => showNextMessage(contactKey, step, stepIndex), 400);
    }
}

function afterStepComplete(contactKey, step, stepIndex) {
    if (step.choices && step.choices.length > 0) {
        showChoices(contactKey, step.choices, stepIndex);
    }

    // Check for chapter transition
    if (step.nextChapter) {
        const nextCh = step.nextChapter;
        const chData = ChapterRegistry.get(nextCh);
        if (chData && STATE.stars >= chData.starsToUnlock) {
            setTimeout(() => {
                showChapterTransition(nextCh, () => {
                    showScreen('phone-screen');
                    renderContacts();
                });
            }, 1500);
        } else if (chData) {
            const needed = chData.starsToUnlock - STATE.stars;
            showNotification(t('ui.starsNeeded').replace('{n}', needed));
        }
    }

    if (STATE.flags['game_complete']) {
        setTimeout(showEnding, 2000);
    }
}

function showChoices(contactKey, choices, currentStepIndex) {
    const container = $('chat-choices');
    container.innerHTML = '';
    choices.forEach((choice, idx) => {
        const choiceText = typeof choice === 'string' ? choice : choice.text;
        const choiceNext = typeof choice === 'object' && choice.next !== undefined ? choice.next : null;

        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choiceText;
        btn.addEventListener('click', () => {
            container.innerHTML = '';
            const msg = { from: 'you', text: choiceText, time: getCurrentTime() };
            addToHistory(contactKey, msg);
            appendMessageDOM(msg, true);

            const nextStep = choiceNext !== null ? choiceNext : currentStepIndex + 1;
            setTimeout(() => processStep(contactKey, nextStep), 300);
        });
        container.appendChild(btn);
    });
}

function appendMessageDOM(msg, animate) {
    const container = $('chat-messages');
    const div = document.createElement('div');

    if (msg.type === 'system') {
        div.className = 'message system';
        div.innerHTML = msg.text;
    } else if (msg.type === 'photo') {
        div.className = 'message ' + (msg.from === 'you' ? 'sent' : 'received') + ' msg-photo';
        div.innerHTML = `<div class="msg-photo-content">${msg.emoji || '📷'}</div>` +
            (msg.caption ? `<div class="msg-photo-caption">${msg.caption}</div>` : '') +
            (msg.time ? `<span class="msg-time">${msg.time}</span>` : '');
    } else if (msg.type === 'voice') {
        div.className = 'message ' + (msg.from === 'you' ? 'sent' : 'received');
        div.innerHTML = `<div class="msg-voice">
            <span class="msg-voice-btn">▶</span>
            <div class="msg-voice-bars">${'<div class="msg-voice-bar" style="height:${Math.random()*12+6}px"></div>'.repeat(5).replace(/\$\{Math\.random\(\)\*12\+6\}/g, () => Math.random()*12+6)}</div>
            <span class="msg-voice-duration">${msg.duration || '0:15'}</span>
        </div>` + (msg.time ? `<span class="msg-time">${msg.time}</span>` : '');
    } else if (msg.type === 'location') {
        div.className = 'message ' + (msg.from === 'you' ? 'sent' : 'received');
        div.innerHTML = `<div class="msg-location"><span class="msg-location-pin">📍</span><span class="msg-location-name">${msg.place}</span></div>` +
            (msg.time ? `<span class="msg-time">${msg.time}</span>` : '');
    } else {
        div.className = 'message ' + (msg.from === 'you' ? 'sent' : 'received');
        div.innerHTML = msg.text + (msg.time ? `<span class="msg-time">${msg.time}</span>` : '');
    }

    if (!animate) div.style.animation = 'none';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function addToHistory(contactKey, msg) {
    if (!STATE.chatHistory[contactKey]) STATE.chatHistory[contactKey] = [];
    STATE.chatHistory[contactKey].push(msg);
}

// ============================================================
//  Minigames
// ============================================================
function launchMinigame(config, callback) {
    MinigameEngine.launch(config, (starsEarned) => {
        STATE.stars += starsEarned;
        STATE.completedMinigames.push(config.id);
        $('star-count').textContent = STATE.stars;
        saveGame();
        callback();
    });
}

// ============================================================
//  Evidence
// ============================================================
function addEvidence(ev) {
    if (STATE.evidence.find(e => e.title === ev.title)) return;
    STATE.evidence.push({ ...ev, time: t('ui.day') + ' ' + STATE.day + ' · Cap. ' + STATE.chapter });
    showNotification('🔍 ' + t('ui.newClue') + ': ' + ev.title);
    saveGame();
}

function renderEvidence() {
    const list = $('evidence-list');
    list.innerHTML = '';
    if (STATE.evidence.length === 0) {
        list.innerHTML = `<div style="text-align:center;color:#444;margin-top:60px;font-size:14px;">${t('ui.noClues')}</div>`;
        return;
    }
    for (const ev of STATE.evidence) {
        const div = document.createElement('div');
        div.className = 'evidence-item';
        div.innerHTML = `<div class="ev-title">${ev.title}</div><div class="ev-desc">${ev.desc}</div><div class="ev-time">${ev.time}</div>`;
        list.appendChild(div);
    }
}

// ============================================================
//  Chapters view
// ============================================================
function renderChapters() {
    const list = $('chapters-list');
    list.innerHTML = '';
    for (const num of ChapterRegistry.getAll()) {
        const ch = ChapterRegistry.get(num);
        const lang = I18N.currentLang;
        const langData = ch[lang] || ch['es'];
        const isCurrent = STATE.chapter === num;
        const isDone = STATE.flags['ch' + num + '_complete'];
        const isLocked = STATE.stars < ch.starsToUnlock && !isDone && !isCurrent;

        const div = document.createElement('div');
        div.className = 'chapter-item' + (isLocked ? ' chapter-locked' : '') + (isCurrent ? ' chapter-current' : '') + (isDone ? ' chapter-done' : '');
        div.innerHTML = `
            <div class="chapter-num">${t('ui.chapter')} ${num}</div>
            <div class="chapter-title">${langData.title}</div>
            <div class="chapter-desc">${langData.desc}</div>
            ${isDone ? '<div class="chapter-stars">✅ ' + t('ui.completed') + '</div>' : ''}
            ${isLocked ? '<div class="chapter-lock-msg">🔒 ' + t('ui.starsNeeded').replace('{n}', ch.starsToUnlock) + '</div>' : ''}
        `;
        list.appendChild(div);
    }
}

// ============================================================
//  Ending
// ============================================================
function showEnding() {
    STATE.ended = true;
    saveGame();
    const e = I18N.translations[I18N.currentLang].ending;
    setTimeout(() => {
        showScreen('ending-screen');
        $('ending-content').innerHTML = `
            <div class="ending-emoji">${e.emoji}</div>
            <h1>${e.title}</h1>
            ${e.lines.map(l => `<p>${l}</p>`).join('')}
            <div class="ending-msg">
                ${e.reflection.map(l => `<p>${l}</p>`).join('')}
                <br><p><span class="ending-highlight">${e.verdict}</span></p>
                <p style="margin-top:14px;font-size:13px;color:#666;">${e.epilogue}</p>
            </div>
            <p style="margin-top:30px;font-size:20px;letter-spacing:6px;color:#ff3366;font-weight:700;">${t('start.title')}</p>
            <p style="font-size:11px;color:#444;margin-top:6px;">${e.brandLine} · ${t('ui.end')}</p>
        `;
    }, 500);
}

// ============================================================
//  Utils
// ============================================================
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    if (viewName === 'contacts') {
        $('contacts-view').classList.add('active');
        renderContacts();
    } else if (viewName === 'chat') {
        $('chat-view').classList.add('active');
    } else if (viewName === 'evidence') {
        $('evidence-view').classList.add('active');
        renderEvidence();
    } else if (viewName === 'chapters') {
        $('chapters-view').classList.add('active');
        renderChapters();
    } else if (viewName === 'settings') {
        $('settings-view').classList.add('active');
        $('setting-timer').checked = STATE.settings.timerMode;
    }
}

function showContacts() {
    currentContact = null;
    $('chat-choices').innerHTML = '';
    $('typing-indicator').style.display = 'none';
    switchView('contacts');
}

function getCurrentTime() {
    const h = new Date().getHours().toString().padStart(2,'0');
    const m = new Date().getMinutes().toString().padStart(2,'0');
    return h + ':' + m;
}

function showNotification(text) {
    const badge = $('notification-badge');
    $('notif-text').textContent = text;
    badge.style.display = 'block';
    badge.style.animation = 'none';
    badge.offsetHeight;
    badge.style.animation = 'slideDown 0.4s ease, fadeOut 0.4s ease 2.6s forwards';
    setTimeout(() => badge.style.display = 'none', 3200);
}

// ---- GO ----
init();

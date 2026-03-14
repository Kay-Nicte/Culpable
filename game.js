// ============================================================
//  CULPABLE – Motor del juego (usa i18n.js para textos)
// ============================================================

const STATE = {
    day: 1,
    phase: 0,
    evidence: [],
    unlockedContacts: ['marta', 'damian'],
    chatHistory: {},
    contactProgress: {},
    contactHasNew: {},
    flags: {},
    ended: false
};

const CONTACTS_META = {
    damian:      { emoji: '👨',    color: '#2a3a5c', order: 1 },
    marta:       { emoji: '👩‍🦰',  color: '#5c2a4a', order: 2 },
    diego:       { emoji: '👨‍💼',  color: '#2a5c3a', order: 3 },
    ana:         { emoji: '👧',    color: '#5c4a2a', order: 4 },
    desconocido: { emoji: '❓',    color: '#444',    order: 5 },
    silvia:      { emoji: '👩‍🍳',  color: '#6a2a5c', order: 6 },
};

const CONTACT_NAMES = {
    damian: 'Damián', marta: 'Marta', diego: 'Diego',
    ana: 'Ana', desconocido: '???', silvia: 'Silvia'
};

// Flow control: which global phase unlocks each contact's script progression
// [contactKey]: array of { atStep, unlock[], contactHasNew[], nextPhaseGlobal, nextDay, flag }
const FLOW = {
    damian: [
        { atStep: 0 },
        { atStep: 1, flagOnChoice: { 0: 'asked_who' } },
        { atStep: 2 },
        { atStep: 3, unlock: ['marta'], contactHasNew: ['marta'], nextPhaseGlobal: 1, flag: 'damian_day1_done' },
        // Day 2 steps (indices 4-7) require phase 3
        { atStep: 4, requires: 3 },
        { atStep: 5, flagOnChoice: { 0: 'confronted_damian' } },
        { atStep: 6 },
        { atStep: 7 },
        // Final (indices 8-12) require phase 6
        { atStep: 8, requires: 6 },
        { atStep: 9 },
        { atStep: 10 },
        { atStep: 11 },
        { atStep: 12, flag: 'game_complete' },
    ],
    marta: [
        { atStep: 0, requires: 1 },
        { atStep: 1 },
        { atStep: 2 },
        { atStep: 3, unlock: ['diego'], contactHasNew: ['diego'], flag: 'marta_day1_done' },
        { atStep: 4, nextPhaseGlobal: 2 },
    ],
    diego: [
        { atStep: 0, requires: 2 },
        { atStep: 1 },
        { atStep: 2 },
        { atStep: 3, flag: 'diego_done' },
        { atStep: 4, unlock: ['ana'], contactHasNew: ['ana', 'damian'], nextPhaseGlobal: 3, nextDay: 2 },
    ],
    ana: [
        { atStep: 0, requires: 3 },
        { atStep: 1 },
        { atStep: 2 },
        { atStep: 3, flag: 'ana_advice' },
        { atStep: 4 },
        { atStep: 5, unlock: ['desconocido'], contactHasNew: ['desconocido'], nextPhaseGlobal: 4, nextDay: 3, flag: 'found_silvia' },
    ],
    desconocido: [
        { atStep: 0, requires: 4 },
        { atStep: 1 },
        { atStep: 2 },
        { atStep: 3 },
        { atStep: 4, unlock: ['silvia'], flag: 'silvia_talked', nextPhaseGlobal: 5, contactHasNew: ['damian', 'marta'] },
    ],
    silvia: [
        { atStep: 0, requires: 5 },
        { atStep: 1 },
        { atStep: 2, nextPhaseGlobal: 6, contactHasNew: ['damian'], flag: 'truth_revealed' },
    ],
};

// ============================================================
//  Helpers
// ============================================================
const $ = id => document.getElementById(id);
const t = key => I18N.t(key);
let currentContact = null;
let messageQueue = [];

function getScript(contactKey) {
    const scripts = I18N.translations[I18N.currentLang].script;
    return scripts[contactKey] || [];
}

function getFlowMeta(contactKey, stepIndex) {
    const flowArr = FLOW[contactKey] || [];
    return flowArr.find(f => f.atStep === stepIndex) || {};
}

function getContactName(key) {
    return CONTACT_NAMES[key] || key;
}

function getContactPreview(key) {
    return t('contacts.' + key + '.preview');
}

// ============================================================
//  Init
// ============================================================
function init() {
    buildLangSelector();
    applyLangToUI();
    $('btn-start').addEventListener('click', showIntro);
    $('btn-back').addEventListener('click', showContacts);
    $('btn-back-evidence').addEventListener('click', () => switchView('contacts'));

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            switchView(btn.dataset.tab);
        });
    });

    updateClock();
    setInterval(updateClock, 60000);
}

function buildLangSelector() {
    const container = $('lang-selector');
    const langs = I18N.getAvailableLangs();
    const labels = { es: '🇪🇸 ES', en: '🇬🇧 EN' };
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
}

function applyLangToUI() {
    document.querySelector('.start-title').textContent = t('start.title');
    document.querySelector('.start-subtitle').textContent = t('start.subtitle');
    document.querySelector('.start-desc').textContent = t('start.desc');
    $('btn-start').textContent = t('ui.start');
    // Update tab labels
    const tabs = document.querySelectorAll('.tab-btn');
    tabs[0].querySelector('span').textContent = t('ui.chats');
    tabs[1].querySelector('span').textContent = t('ui.notes');
    // Evidence view header
    document.querySelector('#evidence-view .view-header h2').textContent = t('ui.myNotes');
    // Contacts view header
    document.querySelector('#contacts-view .view-header h2').textContent = t('ui.messages');
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
                    showScreen('phone-screen');
                    STATE.contactHasNew['damian'] = true;
                    renderContacts();
                };
            }
        }
    }
    showLine();
}

// ============================================================
//  Contacts
// ============================================================
function renderContacts() {
    const list = $('contacts-list');
    list.innerHTML = '';
    const sortedKeys = Object.keys(CONTACTS_META).sort((a,b) => CONTACTS_META[a].order - CONTACTS_META[b].order);

    for (const key of sortedKeys) {
        const meta = CONTACTS_META[key];
        const unlocked = STATE.unlockedContacts.includes(key);
        const hasNew = STATE.contactHasNew[key];
        const div = document.createElement('div');
        div.className = 'contact-item' + (unlocked ? '' : ' locked') + (hasNew ? ' has-new' : '');

        const preview = unlocked ? (getChatPreview(key) || getContactPreview(key)) : t('ui.blocked');
        div.innerHTML = `
            <div class="contact-avatar" style="background:${meta.color}">${unlocked ? meta.emoji : '🔒'}</div>
            <div class="contact-info">
                <div class="contact-name">${unlocked ? getContactName(key) : '???'}</div>
                <div class="contact-preview">${preview}</div>
            </div>
        `;
        if (unlocked) div.addEventListener('click', () => openChat(key));
        list.appendChild(div);
    }
    $('day-indicator').textContent = t('ui.day') + ' ' + STATE.day;
}

function getChatPreview(contactKey) {
    const hist = STATE.chatHistory[contactKey];
    if (!hist || hist.length === 0) return null;
    const last = hist[hist.length-1];
    if (last.type === 'system') return last.text.substring(0, 40);
    const prefix = last.from === 'you' ? (t('ui.you') + ': ') : '';
    return prefix + last.text.substring(0, 35) + (last.text.length > 35 ? '...' : '');
}

// ============================================================
//  Chat
// ============================================================
function openChat(contactKey) {
    currentContact = contactKey;
    const meta = CONTACTS_META[contactKey];
    $('chat-name').textContent = getContactName(contactKey);
    $('chat-avatar').textContent = meta.emoji;
    $('chat-avatar').style.background = meta.color;
    $('chat-status').textContent = t('ui.online');
    $('chat-choices').innerHTML = '';
    STATE.contactHasNew[contactKey] = false;

    switchView('chat');
    renderChatHistory(contactKey);

    const progress = STATE.contactProgress[contactKey] || 0;
    const script = getScript(contactKey);
    if (progress < script.length) {
        const flowMeta = getFlowMeta(contactKey, progress);
        if (flowMeta.requires !== undefined && flowMeta.requires > STATE.phase) return;
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
    const script = getScript(contactKey);
    if (stepIndex >= script.length) return;
    const step = script[stepIndex];
    const flowMeta = getFlowMeta(contactKey, stepIndex);

    messageQueue = [...step.messages];
    showNextMessage(contactKey, step, stepIndex, flowMeta);
}

function resolveText(text) {
    // Replace {disconnected} with i18n
    return text.replace('{disconnected}', getContactName(currentContact) + ' ' + t('ui.disconnected'));
}

function showNextMessage(contactKey, step, stepIndex, flowMeta) {
    if (messageQueue.length === 0) {
        // Apply flow effects
        if (step.evidence) addEvidence(step.evidence);
        if (flowMeta.unlock) flowMeta.unlock.forEach(c => {
            if (!STATE.unlockedContacts.includes(c)) STATE.unlockedContacts.push(c);
        });
        if (flowMeta.contactHasNew) flowMeta.contactHasNew.forEach(c => STATE.contactHasNew[c] = true);
        if (flowMeta.flag) STATE.flags[flowMeta.flag] = true;
        if (flowMeta.nextPhaseGlobal !== undefined) STATE.phase = flowMeta.nextPhaseGlobal;
        if (flowMeta.nextDay) STATE.day = flowMeta.nextDay;

        STATE.contactProgress[contactKey] = stepIndex + 1;

        if (step.choices && step.choices.length > 0) {
            showChoices(contactKey, step.choices, stepIndex, flowMeta);
        }

        if (STATE.flags['game_complete']) {
            setTimeout(showEnding, 2000);
        }
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
            showNextMessage(contactKey, step, stepIndex, flowMeta);
        }, delay);
    } else {
        const stored = { ...resolved, time: getCurrentTime() };
        addToHistory(contactKey, stored);
        appendMessageDOM(stored, true);
        setTimeout(() => showNextMessage(contactKey, step, stepIndex, flowMeta), 400);
    }
}

function showChoices(contactKey, choices, currentStepIndex, flowMeta) {
    const container = $('chat-choices');
    container.innerHTML = '';
    choices.forEach((choiceText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choiceText;
        btn.addEventListener('click', () => {
            container.innerHTML = '';
            const msg = { from: 'you', text: choiceText, time: getCurrentTime() };
            addToHistory(contactKey, msg);
            appendMessageDOM(msg, true);

            if (flowMeta.flagOnChoice && flowMeta.flagOnChoice[idx]) {
                STATE.flags[flowMeta.flagOnChoice[idx]] = true;
            }

            const nextStep = currentStepIndex + 1;
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
//  Evidence
// ============================================================
function addEvidence(ev) {
    if (STATE.evidence.find(e => e.title === ev.title)) return;
    STATE.evidence.push({ ...ev, time: t('ui.day') + ' ' + STATE.day });
    showNotification('🔍 ' + t('ui.newClue') + ': ' + ev.title);
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
        div.innerHTML = `
            <div class="ev-title">${ev.title}</div>
            <div class="ev-desc">${ev.desc}</div>
            <div class="ev-time">${ev.time}</div>
        `;
        list.appendChild(div);
    }
}

// ============================================================
//  Ending
// ============================================================
function showEnding() {
    STATE.ended = true;
    const e = I18N.translations[I18N.currentLang].ending;
    setTimeout(() => {
        showScreen('ending-screen');
        $('ending-content').innerHTML = `
            <div class="ending-emoji">${e.emoji}</div>
            <h1>${e.title}</h1>
            ${e.lines.map(l => `<p>${l}</p>`).join('')}
            <div class="ending-msg">
                ${e.reflection.map(l => `<p>${l}</p>`).join('')}
                <br>
                <p><span class="ending-highlight">${e.verdict}</span></p>
                <p style="margin-top:14px; font-size:13px; color:#666;">${e.epilogue}</p>
            </div>
            <p style="margin-top:30px; font-size:20px; letter-spacing:6px; color:#ff3366; font-weight:700;">${t('start.title')}</p>
            <p style="font-size:11px; color:#444; margin-top:6px;">${e.brandLine} · ${t('ui.end')}</p>
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

init();

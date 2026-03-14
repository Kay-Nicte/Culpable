// ============================================================
//  Minigame: Code Breaker – Descifra un mensaje codificado
// ============================================================

MinigameEngine.register('code-breaker', {
    init(container, config, onDone) {
        const { encoded, decoded, revealed } = config.data;
        // encoded: "XYZABC..." (the cipher text)
        // decoded: "HOLAMU..." (the answer)
        // revealed: [0, 3, 7] indices already revealed as hints

        let guesses = {}; // cipherChar -> guessedChar
        let hintsUsed = 0;
        const cipherChars = [...new Set(encoded.replace(/[^A-Z]/g, '').split(''))];

        // Build mapping from cipher to real
        const realMap = {};
        for (let i = 0; i < encoded.length; i++) {
            if (/[A-Z]/.test(encoded[i])) {
                realMap[encoded[i]] = decoded[i];
            }
        }

        // Pre-fill revealed
        revealed.forEach(i => {
            if (/[A-Z]/.test(encoded[i])) {
                guesses[encoded[i]] = decoded[i];
            }
        });

        let selectedCipher = null;

        function render() {
            const cipherHTML = encoded.split('').map((ch, i) => {
                if (!/[A-Z]/.test(ch)) return `<span class="mg-cb-space">${ch}</span>`;
                const isRevealed = revealed.includes(i);
                const guess = guesses[ch] || '';
                const correct = guess && guess === realMap[ch];
                const wrong = guess && guess !== realMap[ch];
                return `<span class="mg-cb-char ${isRevealed ? 'mg-cb-revealed' : ''} ${correct ? 'mg-cb-correct' : ''} ${wrong ? 'mg-cb-wrong' : ''} ${selectedCipher === ch ? 'mg-cb-selected' : ''}" data-cipher="${ch}">${guess || '_'}</span>`;
            }).join('');

            const keyboardHTML = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').map(ch =>
                `<button class="mg-cb-key" data-letter="${ch}">${ch}</button>`
            ).join('');

            container.innerHTML = `
                <div class="mg-codebreaker">
                    <p class="mg-hint">${config.data.hint || ''}</p>
                    <div class="mg-cb-message" id="mg-cb-message">${cipherHTML}</div>
                    <div class="mg-cb-keyboard" id="mg-cb-keyboard">${keyboardHTML}</div>
                    <button class="mg-cb-hint-btn" id="mg-cb-hint">${I18N.t('ui.useHint')}</button>
                </div>
            `;

            // Events
            document.getElementById('mg-cb-message').addEventListener('click', (e) => {
                const charEl = e.target.closest('.mg-cb-char');
                if (!charEl || charEl.classList.contains('mg-cb-revealed')) return;
                selectedCipher = charEl.dataset.cipher;
                render();
            });

            document.getElementById('mg-cb-keyboard').addEventListener('click', (e) => {
                const keyEl = e.target.closest('.mg-cb-key');
                if (!keyEl || !selectedCipher) return;
                guesses[selectedCipher] = keyEl.dataset.letter;
                selectedCipher = null;
                render();
                checkWin();
            });

            document.getElementById('mg-cb-hint').addEventListener('click', () => {
                hintsUsed++;
                // Reveal one unrevealed cipher char
                const unrevealed = cipherChars.filter(c => guesses[c] !== realMap[c]);
                if (unrevealed.length > 0) {
                    const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)];
                    guesses[pick] = realMap[pick];
                    render();
                    checkWin();
                }
            });
        }

        function checkWin() {
            const allCorrect = cipherChars.every(c => guesses[c] === realMap[c]);
            if (allCorrect) {
                setTimeout(() => onDone(hintsUsed === 0 ? 2 : 1), 600);
            }
        }

        render();
    }
});

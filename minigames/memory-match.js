// ============================================================
//  Minigame: Memory Match – Emparejar evidencias
// ============================================================

MinigameEngine.register('memory-match', {
    init(container, config, onDone) {
        const pairs = config.data.pairs; // [{ a: 'text', b: 'text', emoji: '📞' }, ...]
        let cards = [];
        pairs.forEach((pair, i) => {
            cards.push({ id: i, side: 'a', text: pair.a, emoji: pair.emoji || '🔍', matched: false });
            cards.push({ id: i, side: 'b', text: pair.b, emoji: pair.emoji || '🔍', matched: false });
        });
        // Shuffle
        cards = cards.sort(() => Math.random() - 0.5);

        let flipped = [];
        let totalFlips = 0;
        let matchesFound = 0;
        let locked = false;
        const cols = cards.length <= 8 ? 4 : cards.length <= 12 ? 4 : 4;

        container.innerHTML = `
            <div class="mg-memory">
                <div class="mg-memory-info">
                    <span id="mg-flips">${I18N.t('ui.flips')}: 0</span>
                    <span id="mg-matches">${matchesFound}/${pairs.length}</span>
                </div>
                <div class="mg-memory-grid" id="mg-memory-grid" style="grid-template-columns: repeat(${cols}, 1fr);">
                    ${cards.map((c, idx) => `
                        <div class="mg-card" data-idx="${idx}">
                            <div class="mg-card-inner">
                                <div class="mg-card-front">?</div>
                                <div class="mg-card-back">
                                    <span class="mg-card-emoji">${c.emoji}</span>
                                    <span class="mg-card-text">${c.text}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const gridEl = document.getElementById('mg-memory-grid');
        const flipsEl = document.getElementById('mg-flips');
        const matchesEl = document.getElementById('mg-matches');
        const cardEls = gridEl.querySelectorAll('.mg-card');

        gridEl.addEventListener('click', (e) => {
            if (locked) return;
            const cardEl = e.target.closest('.mg-card');
            if (!cardEl) return;
            const idx = Number(cardEl.dataset.idx);
            const card = cards[idx];

            if (card.matched || flipped.includes(idx)) return;

            cardEl.classList.add('mg-card-flipped');
            flipped.push(idx);
            totalFlips++;
            flipsEl.textContent = `${I18N.t('ui.flips')}: ${totalFlips}`;

            if (flipped.length === 2) {
                locked = true;
                const [i1, i2] = flipped;
                const c1 = cards[i1], c2 = cards[i2];

                if (c1.id === c2.id && c1.side !== c2.side) {
                    // Match!
                    c1.matched = true;
                    c2.matched = true;
                    matchesFound++;
                    matchesEl.textContent = `${matchesFound}/${pairs.length}`;
                    cardEls[i1].classList.add('mg-card-matched');
                    cardEls[i2].classList.add('mg-card-matched');
                    flipped = [];
                    locked = false;

                    if (matchesFound === pairs.length) {
                        setTimeout(() => {
                            const maxFlips = pairs.length * 3;
                            onDone(totalFlips <= maxFlips ? 2 : 1);
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        cardEls[i1].classList.remove('mg-card-flipped');
                        cardEls[i2].classList.remove('mg-card-flipped');
                        flipped = [];
                        locked = false;
                    }, 800);
                }
            }
        });
    }
});

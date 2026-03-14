// ============================================================
//  Minigame: Photo Puzzle – Puzzle deslizante (sliding tiles)
// ============================================================

MinigameEngine.register('photo-puzzle', {
    init(container, config, onDone) {
        const size = config.data.size || 3; // 3x3
        const image = config.data.image; // Array of emojis representing the image pieces
        const total = size * size;
        let moves = 0;

        // Build solved state
        let tiles = [];
        for (let i = 0; i < total - 1; i++) {
            tiles.push({ idx: i, content: image[i] || `${i+1}` });
        }
        tiles.push({ idx: total - 1, content: '', empty: true });

        // Shuffle by doing random valid moves
        let emptyPos = total - 1;
        const getNeighbors = (pos) => {
            const neighbors = [];
            const row = Math.floor(pos / size), col = pos % size;
            if (row > 0) neighbors.push(pos - size);
            if (row < size - 1) neighbors.push(pos + size);
            if (col > 0) neighbors.push(pos - 1);
            if (col < size - 1) neighbors.push(pos + 1);
            return neighbors;
        };

        // Do 100+ random swaps for good shuffle
        for (let i = 0; i < 150; i++) {
            const neighbors = getNeighbors(emptyPos);
            const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
            [tiles[emptyPos], tiles[pick]] = [tiles[pick], tiles[emptyPos]];
            emptyPos = pick;
        }

        container.innerHTML = `
            <div class="mg-photo-puzzle">
                <p class="mg-hint">${config.data.hint || ''}</p>
                <div class="mg-puzzle-info">
                    <span id="mg-moves">${I18N.t('ui.moves')}: 0</span>
                </div>
                <div class="mg-puzzle-grid" id="mg-puzzle-grid"
                     style="grid-template-columns: repeat(${size}, 1fr);">
                </div>
                <div class="mg-puzzle-preview">
                    <span class="mg-preview-label">${I18N.t('ui.goal')}:</span>
                    <div class="mg-preview-grid" style="grid-template-columns: repeat(${size}, 1fr);">
                        ${image.slice(0, total - 1).map(e => `<div class="mg-preview-tile">${e}</div>`).join('')}
                        <div class="mg-preview-tile"></div>
                    </div>
                </div>
            </div>
        `;

        const grid = document.getElementById('mg-puzzle-grid');
        const movesEl = document.getElementById('mg-moves');

        function render() {
            grid.innerHTML = '';
            tiles.forEach((tile, pos) => {
                const div = document.createElement('div');
                div.className = 'mg-puzzle-tile' + (tile.empty ? ' mg-puzzle-empty' : '');
                div.textContent = tile.content;
                div.dataset.pos = pos;
                if (!tile.empty) {
                    div.addEventListener('click', () => tryMove(pos));
                }
                grid.appendChild(div);
            });
        }

        function tryMove(pos) {
            const neighbors = getNeighbors(pos);
            if (!neighbors.includes(emptyPos)) return;

            [tiles[pos], tiles[emptyPos]] = [tiles[emptyPos], tiles[pos]];
            emptyPos = pos;
            moves++;
            movesEl.textContent = `${I18N.t('ui.moves')}: ${moves}`;
            render();
            checkWin();
        }

        function checkWin() {
            const solved = tiles.every((tile, i) => tile.idx === i);
            if (solved) {
                grid.classList.add('mg-success');
                const maxMoves = size * size * 5;
                setTimeout(() => onDone(moves <= maxMoves ? 2 : 1), 600);
            }
        }

        render();
    }
});

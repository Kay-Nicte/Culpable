// ============================================================
//  Minigame: Phone Unlock – Adivina el patrón de desbloqueo
// ============================================================

MinigameEngine.register('phone-unlock', {
    init(container, config, onDone) {
        const solution = config.data.pattern; // Array of dot indices [0-8]
        const hint = config.data.hint || '';
        let attempts = 0;
        let selected = [];
        let isDrawing = false;

        container.innerHTML = `
            <div class="mg-phone-unlock">
                <p class="mg-hint">${hint}</p>
                <div class="mg-dots-grid" id="mg-dots-grid">
                    ${Array.from({length: 9}, (_, i) => `<div class="mg-dot" data-idx="${i}"><div class="mg-dot-inner"></div></div>`).join('')}
                    <svg class="mg-lines" id="mg-lines"></svg>
                </div>
                <div class="mg-attempts" id="mg-attempts"></div>
                <button class="mg-reset-btn" id="mg-reset">${I18N.t('ui.retry')}</button>
            </div>
        `;

        const grid = document.getElementById('mg-dots-grid');
        const dots = grid.querySelectorAll('.mg-dot');
        const svg = document.getElementById('mg-lines');
        const attemptsEl = document.getElementById('mg-attempts');

        function resetSelection() {
            selected = [];
            dots.forEach(d => d.classList.remove('mg-dot-selected'));
            svg.innerHTML = '';
        }

        function getDotCenter(idx) {
            const dot = dots[idx];
            const rect = dot.getBoundingClientRect();
            const gridRect = grid.getBoundingClientRect();
            return {
                x: rect.left - gridRect.left + rect.width / 2,
                y: rect.top - gridRect.top + rect.height / 2
            };
        }

        function drawLines() {
            svg.innerHTML = '';
            for (let i = 1; i < selected.length; i++) {
                const from = getDotCenter(selected[i-1]);
                const to = getDotCenter(selected[i]);
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', from.x); line.setAttribute('y1', from.y);
                line.setAttribute('x2', to.x); line.setAttribute('y2', to.y);
                line.setAttribute('stroke', '#ff3366');
                line.setAttribute('stroke-width', '3');
                line.setAttribute('stroke-linecap', 'round');
                svg.appendChild(line);
            }
        }

        function selectDot(idx) {
            if (selected.includes(idx)) return;
            selected.push(idx);
            dots[idx].classList.add('mg-dot-selected');
            drawLines();
        }

        function checkSolution() {
            attempts++;
            if (JSON.stringify(selected) === JSON.stringify(solution)) {
                grid.classList.add('mg-success');
                setTimeout(() => onDone(attempts === 1 ? 2 : 1), 600);
            } else {
                grid.classList.add('mg-fail');
                attemptsEl.textContent = `${I18N.t('ui.wrongPattern')} (${attempts}/3)`;
                setTimeout(() => {
                    grid.classList.remove('mg-fail');
                    resetSelection();
                    if (attempts >= 3) {
                        // Give a bigger hint or auto-solve
                        attemptsEl.textContent = I18N.t('ui.patternHint');
                        // Highlight first 2 dots of solution
                        solution.slice(0, 2).forEach(idx => {
                            dots[idx].classList.add('mg-dot-hint');
                        });
                    }
                }, 800);
            }
        }

        // Touch/mouse events
        function handleStart(e) {
            e.preventDefault();
            isDrawing = true;
            resetSelection();
            const touch = e.touches ? e.touches[0] : e;
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            if (el && el.closest('.mg-dot')) {
                selectDot(Number(el.closest('.mg-dot').dataset.idx));
            }
        }

        function handleMove(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            if (el && el.closest('.mg-dot')) {
                selectDot(Number(el.closest('.mg-dot').dataset.idx));
            }
        }

        function handleEnd(e) {
            if (!isDrawing) return;
            isDrawing = false;
            if (selected.length >= 2) checkSolution();
            else resetSelection();
        }

        grid.addEventListener('mousedown', handleStart);
        grid.addEventListener('mousemove', handleMove);
        grid.addEventListener('mouseup', handleEnd);
        grid.addEventListener('touchstart', handleStart, {passive: false});
        grid.addEventListener('touchmove', handleMove, {passive: false});
        grid.addEventListener('touchend', handleEnd);

        document.getElementById('mg-reset').addEventListener('click', resetSelection);
    }
});

// ============================================================
//  Minigame Engine – Framework para todos los minijuegos
// ============================================================

const MinigameEngine = {
    current: null,
    registry: {},
    onComplete: null,

    register(type, handler) {
        this.registry[type] = handler;
    },

    launch(config, callback) {
        // config: { type, id, stars, data }
        this.onComplete = callback;
        this.current = config;

        const overlay = document.getElementById('minigame-overlay');
        const container = document.getElementById('minigame-container');
        const title = document.getElementById('minigame-title');

        container.innerHTML = '';
        title.textContent = config.title || '';
        overlay.classList.add('active');

        const handler = this.registry[config.type];
        if (handler) {
            handler.init(container, config, (starsEarned) => {
                this.complete(starsEarned);
            });
        }
    },

    complete(starsEarned) {
        const overlay = document.getElementById('minigame-overlay');
        const container = document.getElementById('minigame-container');

        // Show result
        const maxStars = this.current.stars || 2;
        const earned = Math.min(starsEarned, maxStars);

        container.innerHTML = `
            <div class="mg-result">
                <div class="mg-result-stars">${'⭐'.repeat(earned)}${'☆'.repeat(maxStars - earned)}</div>
                <div class="mg-result-text">${earned === maxStars ? I18N.t('ui.perfect') : I18N.t('ui.completed')}</div>
                <button class="mg-result-btn" id="mg-continue">${I18N.t('ui.continue')}</button>
            </div>
        `;

        document.getElementById('mg-continue').addEventListener('click', () => {
            overlay.classList.remove('active');
            if (this.onComplete) this.onComplete(earned);
            this.current = null;
        });
    },

    skip() {
        const overlay = document.getElementById('minigame-overlay');
        overlay.classList.remove('active');
        if (this.onComplete) this.onComplete(0);
        this.current = null;
    }
};

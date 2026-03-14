// ============================================================
//  Minigame: Social Stalking – Encuentra pistas en un perfil
// ============================================================

MinigameEngine.register('social-stalking', {
    init(container, config, onDone) {
        const profile = config.data.profile;
        // profile: { name, bio, posts: [{ text, hasClue, clueId }], avatar }
        const totalClues = profile.posts.filter(p => p.hasClue).length;
        let foundClues = [];
        let wrongTaps = 0;

        container.innerHTML = `
            <div class="mg-social">
                <div class="mg-social-header">
                    <div class="mg-social-avatar">${profile.avatar}</div>
                    <div class="mg-social-info">
                        <div class="mg-social-name">${profile.name}</div>
                        <div class="mg-social-bio">${profile.bio}</div>
                    </div>
                </div>
                <div class="mg-social-hint">${I18N.t('ui.findClues')} (${totalClues})</div>
                <div class="mg-social-progress" id="mg-social-progress">0/${totalClues}</div>
                <div class="mg-social-feed" id="mg-social-feed">
                    ${profile.posts.map((post, i) => `
                        <div class="mg-social-post ${post.hasClue ? 'mg-has-clue' : ''}" data-idx="${i}">
                            <div class="mg-post-header">
                                <span class="mg-post-avatar">${profile.avatar}</span>
                                <span class="mg-post-name">${profile.name}</span>
                            </div>
                            <div class="mg-post-body">${post.text}</div>
                            ${post.image ? `<div class="mg-post-image">${post.image}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const feed = document.getElementById('mg-social-feed');
        const progressEl = document.getElementById('mg-social-progress');

        feed.addEventListener('click', (e) => {
            const postEl = e.target.closest('.mg-social-post');
            if (!postEl) return;
            const idx = Number(postEl.dataset.idx);
            const post = profile.posts[idx];

            if (post.hasClue && !foundClues.includes(idx)) {
                foundClues.push(idx);
                postEl.classList.add('mg-clue-found');
                progressEl.textContent = `${foundClues.length}/${totalClues}`;

                if (foundClues.length === totalClues) {
                    setTimeout(() => onDone(wrongTaps <= 2 ? 2 : 1), 600);
                }
            } else if (!post.hasClue) {
                wrongTaps++;
                postEl.classList.add('mg-wrong-tap');
                setTimeout(() => postEl.classList.remove('mg-wrong-tap'), 500);
            }
        });
    }
});

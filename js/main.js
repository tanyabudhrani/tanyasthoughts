document.addEventListener('DOMContentLoaded', () => {
  const isArticlePage = document.body.classList.contains('article-page');

  // ─────────────────────────────────────────────────────────
  // HOMEPAGE LOGIC
  // ─────────────────────────────────────────────────────────
  if (!isArticlePage) {
    const hero = document.querySelector('#hero');
    const heroTitle = document.querySelector('.hero-title');
    const heroSheet = document.querySelector('.sheet-wrapper');

    window.addEventListener('scroll', () => {
      if (!heroSheet) return;
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const frac = Math.min(scrollY / maxScroll, 1);
      heroSheet.style.clipPath = `inset(0 0 ${frac * 100}% 0)`;
    });

    if ('IntersectionObserver' in window && hero) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            document.body.classList.remove('scrolled');
            heroTitle.style.transform = 'scale(1)';
            heroTitle.style.opacity = '1';
          } else {
            document.body.classList.add('scrolled');
            heroTitle.style.transform = 'scale(0.8)';
            heroTitle.style.opacity = '0';
          }
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(hero);
    }

    const intro = document.querySelector('#intro');
    if ('IntersectionObserver' in window && intro) {
      const introObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            document.body.classList.add('show-intro');
            introObserver.unobserve(intro);
          }
        },
        { threshold: 0.3 }
      );
      introObserver.observe(intro);
    }

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        const article = document.querySelector(card.dataset.target);
        if (article) {
          document.querySelectorAll('.article').forEach(a => a.classList.remove('active'));
          article.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    document.querySelectorAll('.close').forEach(btn => {
      btn.addEventListener('click', () => {
        const article = btn.closest('.article');
        if (article) {
          article.classList.remove('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    if (document.querySelector('.feature-img')) {
      window.addEventListener('scroll', () => {
        const offset = window.scrollY * 0.25;
        document.querySelectorAll('.feature-img img')
          .forEach(img => img.style.transform = `translateY(${offset}px)`);
      });
    }

    return; // skip article logic
  }

  // ─────────────────────────────────────────────────────────
  // ARTICLE PAGE LOGIC
  // ─────────────────────────────────────────────────────────
  const articleSheet = document.querySelector('.article-sheet');
  const featureImageWrapper = document.querySelector('.feature-img.parallax');
  const featureImage = featureImageWrapper?.querySelector('img');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 1. Clip the white background block on scroll
    const clipValue = Math.min(scrollY / windowHeight, 1);
    articleSheet.style.clipPath = `inset(0 0 ${clipValue * 100}% 0)`;

    // 2. Parallax the image
    if (featureImage) {
      featureImage.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  });
});

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 600px)');
  const layers = [...document.querySelectorAll('[data-parallax]')];
  let frame = 0;
  const render = () => {
    frame = 0;
    layers.forEach(layer => {
      if (reduced.matches || narrow.matches) { layer.style.transform = ''; return; }
      const scene = layer.closest('.parallax-scene');
      const rect = scene.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const offset = Math.max(-75, Math.min(75, -rect.top * Number(layer.dataset.parallax)));
      layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('seen'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.feature-grid article,.workflow li,.campaign-copy,.campaign-board,.demo-heading,.price-card').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
  document.documentElement.classList.add('motion-ready');
  schedule();
})();

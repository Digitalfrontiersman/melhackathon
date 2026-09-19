const examples = {
  jarvis: { name: 'JARVIS / STRATEGY', title: 'One product. A sharper next move.', description: 'Start with the everyday carry bag. Tighten the offer, build three creative angles, and give the launch a clear test plan.', tasks: ['Clarify the audience', 'Shape the offer', 'Brief the crew'] },
  launch: { name: 'LAUNCH / CAMPAIGNS', title: 'Give the launch a clear hypothesis.', description: 'Test the everyday-carry angle against the weekend-escape angle. Set a budget proposal and agree on success criteria before spending.', tasks: ['Define the audience', 'Draft a test plan', 'Review the budget'] },
  goblin: { name: 'GOBLIN / CREATIVE', title: 'One bag. Three different stories.', description: 'The desk-to-departure transition. The everything-fits demonstration. The one-bag weekend. Turn each angle into a clear creative brief.', tasks: ['Explore three hooks', 'Draft a UGC script', 'Outline the shots'] },
  radar: { name: 'RADAR / ANALYSIS', title: 'Better questions. Better next steps.', description: 'Bring the campaign results. Compare spend, clicks, and purchases, check the gaps in the evidence, then decide what deserves another test.', tasks: ['Review supplied data', 'Flag missing context', 'Propose the next test'] }
};
document.querySelectorAll('[data-agent]').forEach(button => button.addEventListener('click', () => {
  const example = examples[button.dataset.agent];
  document.querySelectorAll('[data-agent]').forEach(item => { const selected = item === button; item.classList.toggle('selected', selected); item.setAttribute('aria-pressed', String(selected)); });
  document.getElementById('agent-name').textContent = example.name;
  document.getElementById('agent-title').textContent = example.title;
  document.getElementById('agent-description').textContent = example.description;
  const tasks = document.getElementById('agent-tasks'); tasks.replaceChildren();
  example.tasks.forEach((task, index) => { const span = document.createElement('span'); const number = document.createElement('i'); number.textContent = `0${index + 1}`; span.append(number, document.createTextNode(task)); tasks.append(span); });
}));
let billing = 'monthly';
document.querySelectorAll('[data-billing]').forEach(button => button.addEventListener('click', () => {
  billing = button.dataset.billing;
  document.querySelectorAll('[data-billing]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const annual = billing === 'yearly';
  document.getElementById('price').textContent = annual ? '$997' : '$97';
  document.getElementById('period').textContent = annual ? '/ year' : '/ month';
  document.getElementById('billing-description').textContent = annual ? '$997 billed annually. Equivalent to $83.08/month. Save $167.' : '$97 billed monthly. $1,164 over 12 months.';
  document.getElementById('plan-button').firstChild.textContent = annual ? 'Explore the annual plan ' : 'Explore the monthly plan ';
}));
const dialog = document.getElementById('plan-dialog');
document.getElementById('plan-button').addEventListener('click', () => {
  document.getElementById('dialog-title').textContent = billing === 'yearly' ? 'A year with your crew.' : 'The monthly crew.';
  document.getElementById('dialog-price').textContent = billing === 'yearly' ? '$997 per year, paid upfront' : '$97 per month';
  dialog.showModal();
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.getElementById('dialog-demo').addEventListener('click', () => { dialog.close(); document.querySelector('[data-agent="jarvis"]').focus({ preventScroll: true }); document.getElementById('demo').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); });

const API_URL = 'https://api.sheety.co/ac6a020fab729985f64a3f30b8b8763f/psily/sheet1';

document.getElementById('submitScroll').addEventListener('click', async () => {
  const scrollText = document.getElementById('scrollText').value.trim();
  const scrollName = document.getElementById('scrollName').value.trim();

  if (!scrollText) return alert("Your scroll is empty.");

  const scrollData = {
    sheet1: {
      scroll: scrollText,
      name: scrollName || "Anonymous",
      timestamp: new Date().toLocaleString()
    }
  };

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(scrollData),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.getElementById('scrollText').value = '';
  document.getElementById('scrollName').value = '';
  loadScrolls();
});

async function loadScrolls() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const scrolls = data.sheet1;

  const feed = document.getElementById('scrollFeed');
  feed.innerHTML = '';

  scrolls.reverse().forEach(scroll => {
    const card = document.createElement('div');
    card.className = 'scroll-card';
    card.innerHTML = `
      <p class="scroll-text">"${scroll.scroll}"</p>
      <p class="scroll-meta">— ${scroll.name} @ ${scroll.timestamp}</p>
    `;
    feed.appendChild(card);
  });
}

loadScrolls();

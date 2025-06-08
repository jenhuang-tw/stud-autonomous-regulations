document.addEventListener('DOMContentLoaded', async () => {
  const lawList = document.getElementById('law-list');

  try {
    const response = await fetch('file/index.json');
    const organizations = await response.json();

    for (const org of organizations) {
      const section = document.createElement('div');
      const heading = document.createElement('h3');
      heading.textContent = org.fullname;
      section.appendChild(heading);

      const lawRes = await fetch(`file/${org.id}/index.json`);
      const laws = await lawRes.json();
      const ul = document.createElement('ul');

      for (const law of laws) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `${org.id}/${law.id}/`;
        link.textContent = law.fullname;
        li.appendChild(link);
        ul.appendChild(li);
      }

      section.appendChild(ul);
      lawList.appendChild(section);
    }
  } catch (err) {
    lawList.innerHTML = '<p>資料載入失敗。</p>';
  }

  document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});

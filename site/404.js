async function getJSON(filename) {
  const text = await (await fetch(filename)).json();
  return text;
}

(async () => {
  const projects = await getJSON("/site/projects.json");
  let notFound = true;

  // project pages in projects.json
  for (const project in projects) {
    console.log(`https://${location.hostname}/projects/${project}`);
    if (
      location.href === `https://${location.hostname}/projects/${project}` ||
      location.href === `https://${location.hostname}/projects/${project}/`
    ) {
      notFound = false;
      const name = projects[project]["name"];
      const date = projects[project]["date"];
      const img = projects[project]["img"];
      const releasePost = projects[project]["release-post"];
      const sourceCode = projects[project]["source-code"];

      $("head").append(`
        <link rel="stylesheet" href="/site/site.css" />
        <link rel="stylesheet" href="/site/projects.css" />
        <link rel="stylesheet" href="/site/project.css" />
        <script src="/site/site.js" defer></script>
      `);

      $("#main").append(`
      <div class="project">
        <div class="img-card">
          <img src="/site/img/${img}" alt="" />
        </div>

        <div class="big-title">${name}</div>
      </div>

      <br />

      <div class="date">${date}</div>
  
      <br /><br />
  
      <div class="project-desc">
        <a href="${releasePost}" target="_blank">Release Post</a>
        <br />
        <a href="${sourceCode}" target="_blank">Source Code</a>
      </div>
      `);

      document.title = name;
    }
  }

  // actual 404
  if (notFound) {
    $("head").append(`
      <link rel="stylesheet" href="/css/1-site.css" />
      <link rel="stylesheet" href="/css/404.css" />
      <script src="/js/1-site.js" defer></script>
    `);

    $(".main").append(`
    <h1 class="title">404</h1>
    <div class="typewriter-text"></div>
    `);

    new TypeIt(".typewriter-text", {
      strings: "Page not found...",
      speed: 150,
      // loop: true,
    }).go();

    document.title = "BypassSpace - 404";
  }
})();

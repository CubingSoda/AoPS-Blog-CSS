async function getJSON(filename) {
  const text = await (await fetch(filename)).json();
  return text;
}

const mainloop = async () => {
  const projects = await await getJSON("/site/projects.json");

  for (const project in projects) {
    const projectData = projects[project];

    $(".projects").append(`
    <a class="project-wrapper" href="/projects/${project}">
      <div class="project" id="${project}">
        <div class="img-card">
          <img src="/site/img/${projectData["img"]}" />
        </div>
    
        <div class="text">
          ${projectData["name"]} | ${projectData["date"]}
    
          <br />
          <br />
    
          <div>
            <a class="pl-visit visit" href="/projects/${project}"
              ><i class="fas fa-chevron-circle-right"></i> VISIT</a
            >
          </div>
        </div>
      </div>
    </a>
      `);
  }
};

mainloop();

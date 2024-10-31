const mobilebar = document.getElementById("popup");

function showTab() {
  if (mobilebar.classList.contains("active")) {
    mobilebar.classList.remove("active");
  } else {
    mobilebar.classList.add("active");
  }
}

function navigate(path) {
  window.location = path;
}

    


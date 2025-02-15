import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./localstorage.js";

invalidText.className = "d-none";

statusText.innerText = "Status";
priorityText.innerText = "Priority";
let priority = "";
let stat = "";
todoBtn.addEventListener("click", () => {
  statusText.innerText = "to-do";
  stat = "to-do";
});
progBtn.addEventListener("click", () => {
  statusText.innerText = "in progress";
  stat = "in progress";
});
compBtn.addEventListener("click", () => {
  statusText.innerText = "completed";
  stat = "completed";
});
lowBtn.addEventListener("click", () => {
  priorityText.innerText = "low";
  priority = "low";
});
medBtn.addEventListener("click", () => {
  priorityText.innerText = "medium";
  priority = "medium";
});
highBtn.addEventListener("click", () => {
  priorityText.innerText = "high";
  priority = "high";
});

addBtn.addEventListener("click", () => {
  let task = [nameInput.value, desInput.value, dayInput.value, priorityText.innerText, statusText.innerText];
  let empty = false;
  for (let i = 0; i < task.length; i++) {
    console.log(task[i])
    if (task[i].trim() == "") {
      empty = true;
    }
  }
  if (empty || priorityText.innerText == "Priority" || statusText.innerText == "Status") {
    invalidText.className = "d-block";
    invalidText.innerText = "Please enter valid inputs.";
  } else {
    saveToLocalStorage(task);
    createEntry(task);
    warningText.className = "d-none";
    invalidText.className = "d-none";
  }
  statusText.innerText = "Status";
  priorityText.innerText = "Priority";
  nameInput.value = "";
  desInput.value = "";
  dayInput.value = "";
});

//creating tasks
let createEntry = (task) => {
  let entryDiv = document.createElement("div");
  entryDiv.id = "entry";
  let titleDiv = document.createElement("div");
  titleDiv.className = "d-flex justify-content-between";
  let editDiv = document.createElement("div");
  editDiv.className = "d-flex justify-content-between";
  let checkDiv = document.createElement("div");
  checkDiv.className = "d-flex justify-content-between";
  let h2 = document.createElement("h2");
  let h3des = document.createElement("h3");
  let h3date = document.createElement("h3");
  let h3p = document.createElement("h3");
  let editBtn = document.createElement("button");
  editBtn.setAttribute("data-bs-toggle", "offcanvas");
  editBtn.setAttribute("data-bs-target", "#staticBackdrop");
  editBtn.setAttribute("aria-controls", "staticBackdrop");
  let checkBtn = document.createElement("button");
  h2.innerHTML = `<b>${task[0]}</b>`;
  h3des.innerText = `- ${task[1]}`;
  h3date.innerText = task[2];
  h3p.innerHTML = `Priority: <b>${task[3]}</b>`;
  checkBtn.className = "btn btn-success d-none";
  checkBtn.innerHTML = `<ion-icon name="checkmark-done-outline"></ion-icon>`;
  editBtn.className = "btn btn-primary";
  editBtn.innerHTML = `<ion-icon name="pencil-outline"></ion-icon>`;
  let removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger";
  removeBtn.innerText = "X";
  removeBtn.addEventListener("click", async () => {
    removeFromLocalStorage(task);
    entryDiv.remove();
    let taskArr = await getFromLocalStorage();
    if (taskArr.length == 0) {
      warningText.className = "d-block";
    }
  });
  if (task[4] != "completed") {
    if (task[4] == "in progress") {
      checkBtn.className = "btn btn-success d-block";
    } else {
      checkBtn.className = "btn btn-warning d-block";
    }
    checkBtn.addEventListener("click", () => {
      removeFromLocalStorage(task);
      if (task[4] == "in progress") {
        task[4] = "completed";
      } else {
        task[4] = "in progress";
      }
      entryDiv.remove();
      saveToLocalStorage(task);
      createEntry(task);
    });
  }
  editBtn.addEventListener("click", () => {
    removeFromLocalStorage(task)
    entryDiv.remove();
    staticBackdrop.classList.toggle("show");
    staticBackdrop.setAttribute("aria-model", "true");
    staticBackdrop.setAttribute("role", "dialog");
    editEntry(task);
  });
  checkDiv.appendChild(h3p);
  checkDiv.appendChild(checkBtn);
  editDiv.appendChild(h3date);
  editDiv.appendChild(editBtn);
  titleDiv.appendChild(h2);
  titleDiv.appendChild(removeBtn);
  entryDiv.appendChild(titleDiv);
  entryDiv.appendChild(h3des);
  entryDiv.appendChild(editDiv);
  editDiv.appendChild(editBtn);
  entryDiv.appendChild(editDiv);
  entryDiv.appendChild(checkDiv);
  switch (task[4]) {
    case "to-do":
      entryDiv.style.backgroundColor = "pink";
      todoCol.appendChild(entryDiv);
      break;
    case "in progress":
      entryDiv.style.backgroundColor = "yellow";
      progCol.appendChild(entryDiv);
      break;
    case "completed":
      entryDiv.style.backgroundColor = "green";
      compCol.appendChild(entryDiv);
      break;
    default:
      break;
  }
};

let generateOnLoad = () => {
  let taskArr = getFromLocalStorage();
  warningText.className =
    taskArr.length === 0 ? "d-block text-center" : "d-none";
  console.log(taskArr);
  taskArr.map((entry) => {
    createEntry(entry);
  });
};

let editEntry = (task) => {
  nameInput.value = task[0];
  desInput.value = task[1];
  dayInput.value = task[2];
  priorityText.innerText = task[3];
  statusText.innerText = task[4];
  task[0] = nameInput.value;
  task[1] = desInput.value;
  task[2] = dayInput.value;
  task[3] = priorityText.innerText;
  task[4] = statusText.innerText;
  console.log(task)
};
generateOnLoad();

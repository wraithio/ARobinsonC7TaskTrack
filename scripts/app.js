import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./localstorage.js";

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
  let task = [nameInput.value, desInput.value, dayInput.value, priority, stat];
  createEntry(task);
});


//creating tasks
let createEntry = (task) => {
  saveToLocalStorage(task);
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
  let checkBtn = document.createElement("button");
  h2.innerText = task[0];
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
  });
  if (task[4] != "completed") {
    checkBtn.className = "btn btn-primary d-block";
    checkBtn.addEventListener("click", () => {
      if (task[4] == "in progress") {
        task[4] == "completed";
      } else {
        task[4] == "in progress";
      }
      createEntry(task)
    });
  }
  editDiv.appendChild(h3date)
  editDiv.appendChild(editBtn)
  titleDiv.appendChild(h2);
  titleDiv.appendChild(removeBtn);
  entryDiv.appendChild(titleDiv);
  entryDiv.appendChild(h3des);
  entryDiv.appendChild(editDiv);
  editDiv.appendChild(h3p);
  editDiv.appendChild(editBtn);
  entryDiv.appendChild(editDiv);
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
  taskArr.map((entry) => {
    createEntry(entry);
  });
};

generateOnLoad();

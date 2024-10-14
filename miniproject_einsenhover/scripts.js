const form = document.querySelector(".form-addTask");
const pendingTasks = document.querySelector(".pending-tasks");

// --------------------------
// FUNCTIONS
// --------------------------
function getYear() {
  const yearElement = document.querySelector(".year");
  yearElement.textContent = new Date().getFullYear();
}

function storage() {
  window.localStorage.pendingTasksStorage = pendingTasks.innerHTML;
  window.localStorage.dueDateStorage =
    document.querySelector(".due-date").value;
  window.localStorage.priorityLevelStorage = document.querySelector(
    "#priorityLevelSelector"
  ).value;
}
function getStorage() {
  const pendingTasks = document.querySelector(".pending-tasks");
  if (window.localStorage.pendingTasksStorage) {
    pendingTasks.innerHTML = window.localStorage.pendingTasksStorage;
  }
}

// -------------------------
// EVENTS
// -------------------------
window.addEventListener("load", () => {
  getYear();
  getStorage();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTodoInput = document.querySelector("#task");

  const today = new Date().toISOString().split("T")[0];

  pendingTasks.innerHTML += `
    <li class="pending-task">
      <p contenteditable="">${taskTodoInput.value}</p>
      <input type="date" name="due-date" id="due-date" class="due-date" />
      <select for="" id="PriorityLevelSelector">
        <option class="priorityLevel1-color" value="⭐⭐⭐⭐⭐">Urgence n1</option>
        <option class="priorityLevel2-color" value="⭐⭐⭐⭐">High level</option>
        <option class="priorityLevel3-color" value="⭐⭐⭐" selected>Medium level</option>
        <option class="priorityLevel4-color" value="⭐⭐">Low level</option>
        <option class="priorityLevel5-color" value="⭐">Very low Level</option>
      </select>
    </li>`;

  taskTodoInput.value = "";

  const dueDateInput = document.querySelector(".due-date");
  dueDateInput.value = today;

  storage();
});

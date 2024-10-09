// ++++++++++++++++++++ TASKS MANAGEMENT +++++++++++++++++++++++++
const form = document.querySelector("form");

// ------------------------------------------------------------
//FUNCTIONS
// ------------------------------------------------------------

function setCurrentYear() {
  // Set current year in footer
  const yearElement = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;
}
function loadPendingTasksFromStorage() {
  const pendingTasksElement = document.querySelector("#pending-tasks ul");

  if (localStorage.pendingTasksStorage) {
    pendingTasksElement.innerHTML = localStorage.pendingTasksStorage;
  }
}

// ------------------------------------------------------------
//EVENTS
// ------------------------------------------------------------

window.addEventListener("load", () => {
  loadPendingTasksFromStorage();
  setCurrentYear();
});

// ------------------ WAITING TASKS
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pendingTasks = document.querySelector("#pending-tasks ul");
  pendingTasks.innerHTML += `
            <li class="task-item" >
                <p contenteditable>
                    ${e.target.task.value}
                </p>
                <input type="date" name="date" class="due-date">
                <select name="priority" id="priority" required>
                    <option class="priority-level-5" value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                    <option class="priority-level-4" value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                    <option class="priority-level-3" value="⭐⭐⭐" selected>⭐⭐⭐</option>
                    <option class="priority-level-2" value="⭐⭐">⭐⭐</option>
                    <option class="priority-level-1" value="⭐">⭐</option>
                </select>
            </li>
        `;
  task.value = "";
  window.localStorage.pendingTasksStorage = pendingTasks.innerHTML;
});

// ------------------ SAVE CHANGES PENDING TASK NAME
document.querySelector("#pending-tasks ul").addEventListener("input", (e) => {
  if (e.target.tagName === "P") {
    window.localStorage.pendingTasksStorage =
      e.target.parentNode.parentNode.innerHTML;
  }
});
function moveDueDateElement() {
  const dueDateElements = document.querySelectorAll(
    "#pending-tasks ul li .due-date"
  );
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
  dueDateElements.forEach((dueDateElement) => {
    if (new Date(dueDateElement.value) > twoDaysFromNow) {
      const todoList = document.querySelector("#eisenhower-container-todo ul");
      todoList.appendChild(dueDateElement.parentNode);
    }
  });
}

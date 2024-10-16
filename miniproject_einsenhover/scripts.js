document.title = "SuperTask | The Eisenhower Matrix for everyone";
const projectName = document.querySelectorAll(".project-title");
projectName.forEach((name) => (name.textContent = "SuperTask"));

const form = document.querySelector(".form-addTask");
const pendingTasks = document.querySelector(".pending-tasks");

// --------------------------
// FUNCTIONS
// --------------------------
/**
 * Get the current year and set it to the footer
 */
function getYear() {
  const yearElement = document.querySelector(".year");
  yearElement.textContent = new Date().getFullYear();
}

/**
 * Save all tasks to localStorage
 */
function saveTasks() {
  const tasks = Array.from(pendingTasks.children).map((task) => ({
    content: task.querySelector("p").textContent,
    dueDate: task.querySelector(".due-date").value,
    priority: task.querySelector("select").value,
    dayLeft: task.querySelector(".remaining-day").textContent,
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage and add them to the DOM
 */
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  pendingTasks.innerHTML = "";
  tasks.forEach((task) => {
    addTaskToDOM(task.content, task.dueDate, task.priority, task.dayLeft);
  });
}

/**
 * Add a task to the DOM
 * @param {string} content
 * @param {date} dueDate
 * @param {string} priority
 * @param {string} dayLeft
 */
function addTaskToDOM(content, dueDate, priority) {
  const li = document.createElement("li");
  li.className = "pending-task";
  li.innerHTML = `
    <p contenteditable>${content}</p>
    <input type="date" name="due-date" class="due-date" value="${dueDate}" />
    <select>
      <option class="priorityLevel1-color" value="5">Urgence n1</option>
      <option class="priorityLevel2-color" value="4">High level</option>
      <option class="priorityLevel3-color" value="3">Medium level</option>
      <option class="priorityLevel4-color" value="2">Low level</option>
      <option class="priorityLevel5-color" value="1">Undefined</option>
    </select>
    <p class="remaining-day"></p>
  `;
  li.querySelector("select").value = priority;
  pendingTasks.appendChild(li);
  updateRemainingDay(li, dueDate);
}

function updateRemainingDay(taskElement, dueDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDueDate = new Date(dueDate);
  taskDueDate.setHours(0, 0, 0, 0);

  const diffTime = taskDueDate.getTime() - today.getTime();
  const dayLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const remainingDayElement = taskElement.querySelector(".remaining-day");

  if (dayLeft < 0) {
    if (Math.abs(dayLeft) === 1) {
      remainingDayElement.textContent = ` ${Math.abs(dayLeft)} day late`;
    } else {
      remainingDayElement.textContent = ` ${Math.abs(dayLeft)} day(s) late`;
    }
    remainingDayElement.style.color = "red";
  } else if (dayLeft === 0) {
    remainingDayElement.textContent = "Due today";
    remainingDayElement.style.color = "orange";
  } else if (isNaN(dayLeft)) {
    remainingDayElement.textContent = "no date";
    remainingDayElement.style.color = "salmon";
  } else {
    if (dayLeft === 1) {
      remainingDayElement.textContent = `${dayLeft} day left`;
    } else {
      remainingDayElement.textContent = `${dayLeft} days left`;
    }
    remainingDayElement.style.color = "var(--text-color)";
  }
}

function dispatchingTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const pendingTaskElements = document.querySelector(".pending-task");
  const todoElements = document.querySelector(".todo-list");
  const delegateElements = document.querySelector(".delegate-list");
  const scheduleElements = document.querySelector(".schedule-list");

  tasks.forEach((task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDueDate = new Date(task.dueDate);
    taskDueDate.setHours(0, 0, 0, 0);

    const diffTime = taskDueDate.getTime() - today.getTime();
    const dayLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    task.dayLeft = dayLeft;

    const taskElement = document.createElement("li");

    if (task.dayLeft <= 3 && task.priority >= 3) {
      taskElement.textContent = `${task.content}  ${task.dayLeft} day(s) left`;
      todoElements.appendChild(taskElement);

      console.log(
        "to do => " +
          task.content +
          " | " +
          task.dayLeft +
          " | " +
          task.priority
      );
    } else if (
      (task.dayLeft <= 4 && task.priority <= 3) ||
      (task.dayLeft <= 30 && task.priority >= 3)
    ) {
      taskElement.textContent = `${task.content}  ${task.dayLeft} day(s) left`;
      delegateElements.appendChild(taskElement);

      console.log(
        "to delegate => " +
          task.content +
          " | " +
          task.dayLeft +
          " | " +
          task.priority
      );
    } else if (task.dayLeft <= 14 && task.priority >= 3) {
      console.log(
        "to schedule => " +
          task.content +
          " | " +
          task.dayLeft +
          " | " +
          task.priority
      );
    } else if (isNaN(task.dayLeft) || task.priority === 1) {
      console.log("is NaN");
      taskElement.style.border = "solid red 2px";
    } else {
      console.log(
        "to ignore => " +
          task.content +
          " | " +
          task.dayLeft +
          " | " +
          task.priority
      );
    }
  });
  // console.log(tasks);
  // console.log(pendingTaskElements);
  //   console.log(todoElements);
  //   console.log(delegateElements);
  //   console.log(scheduleElements);
}
dispatchingTask();

function remainingDay() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const pendingTaskElements = document.querySelectorAll(".pending-task");

  tasks.forEach((task, index) => {
    if (index < pendingTaskElements.length) {
      updateRemainingDay(pendingTaskElements[index], task.dueDate);
    }
  });
}

// -------------------------
// EVENTS
// -------------------------
/**
 * When the window is loaded, get the current year and load tasks from localStorage
 */
window.addEventListener("load", () => {
  getYear();
  loadTasks();
  remainingDay();
  dispatchingTask();
});

/**
 * When the form is submitted, add the task to the DOM and save all tasks to localStorage
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTodoInput = document.querySelector("#task");

  addTaskToDOM(taskTodoInput.value, false, "1");

  taskTodoInput.value = "";
  saveTasks();
  remainingDay();
  dispatchingTask();
});

/**
 * When the content of a task is changed, save all tasks to localStorage
 */
pendingTasks.addEventListener("input", (e) => {
  if (
    e.target.matches(
      'p[contenteditable], input[type="date"], select, .remaining-day'
    )
  ) {
    saveTasks();
    remainingDay();
  }
});

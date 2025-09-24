// ELEMENTS
const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const incompleteCounter = document.getElementById("incomplete-counter");

// Add task (called by button onclick)
function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  // create a fresh li for each task
  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox" class="task-checkbox" />
      <span class="task-text">${escapeHtml(task)}</span>
    </label>
    <button class="edit-btn" title="Edit">✏️</button>
    <button class="delete-btn" title="Delete">🗑️</button>
  `;

  // query the newly created elements (per li)
  const checkbox = li.querySelector(".task-checkbox");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");
  const taskSpan = li.querySelector(".task-text");

  // mark complete
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  // edit
  editBtn.addEventListener("click", function () {
    const updated = prompt("Edit task:", taskSpan.textContent);
    if (updated !== null) {
      const trimmed = updated.trim();
      if (trimmed) taskSpan.textContent = trimmed;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  // delete
  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });

  // append and clear input
  listContainer.appendChild(li);
  inputBox.value = "";
  updateCounters();
}

// update counters (reads from the current DOM)
function updateCounters() {
  const completedTasks = listContainer.querySelectorAll("li.completed").length;
  const uncompletedTasks = listContainer.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  incompleteCounter.textContent = uncompletedTasks;
}

// small helper to prevent HTML injection
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// allow Enter key to add task
inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

// initial counters
updateCounters();

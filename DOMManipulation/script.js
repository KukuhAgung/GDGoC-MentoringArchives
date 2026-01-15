// === BAGIAN 1: DOM SELECTION ===
const body = document.body;
const modeToggleBtn = document.getElementById("mode-toggle");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoListContainer = document.getElementById("todo-list");

// === BAGIAN 2: DATA STATE (ARRAY) ===
let todos = [
  { id: 1, text: "Aku mau makan" },
  { id: 2, text: "Aku mau minum"}
]

// SAVE TO LOCAL STORAGE
function saveToLocalStorage() {
  localStorage.setItem("myTodos", JSON.stringify(todos));
}

// Ubah balik jadi Array JS (Parse) -> Atau pakai array kosong [] kalau belum ada data
const dataTersimpan = localStorage.getItem("myTodos");

if (dataTersimpan) {
  todos = JSON.parse(dataTersimpan);
}

// === BAGIAN 3: FUNCTION RENDER (ARRAY MAPPING) ===
function renderTodoList() {
  // 1. Array Mapping: Mengubah array object menjadi array string HTML
  // Contoh: [{text: 'A'}] menjadi ["<li>A</li>"]
  const todoHTML = todos.map((item, index) => {
    const delay = index * 0.1;
    return `
            <li style="animation-delay: ${delay}s">
                <span>${item.text}</span>
            </li>
        `;
  });

  // 2. Menggabungkan array string menjadi satu string panjang
  const htmlString = todoHTML.join("");

  // 3. Memasukkan string tersebut ke dalam container di HTML
  todoListContainer.innerHTML = htmlString;
}

// Panggil fungsi render saat pertama kali web dibuka
renderTodoList();

// === BAGIAN 4: EVENT LISTENER & DOM MANIPULATION ===
// A. Fitur Dark Mode
modeToggleBtn.addEventListener("click", () => {
  // Toggle class 'dark-mode' pada body
  body.classList.toggle("dark-mode");

  // Ubah teks tombol tergantung mode
  const isDarkMode = body.classList.contains("dark-mode");
  if (isDarkMode) {
    modeToggleBtn.innerText = "☀️ Light Mode"
  } else {
    modeToggleBtn.innerText = "🌙 Dark Mode"
  }
});

// B. Fitur Tambah Todo
addBtn.addEventListener("click", () => {
  const textBaru = todoInput.value;

  // Jangan jalankan jika input kosong
  if (textBaru === "") {
    alert("Tulis dulu tugasnya!");
    return;
  }

  // Menambahkan data baru ke dalam Array 'todos'
  const newTodo = {
    id: todos.length + 1,
    text: textBaru,
  };

  todos.push(newTodo);

  // Reset input field agar bersih kembali
  todoInput.value = "";

  // PENTING: Panggil ulang render agar tampilan update sesuai data array terbaru
  renderTodoList();
  saveToLocalStorage();
});

// Tüm Elementeri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners(); // eventListeners function'ını çalıştırır

// Tüm eventListener'lar
function eventListeners() {
  form.addEventListener("submit", addTodo); // form değişkeninde submit olayı gerçekleşirse addTodo ismindeki function çalışacak
}

function addTodo(e) {
  const newTodo = todoInput.value.trim(); // todoInput değişkenindeki değeri value ile alıp newTodo değişkenine atadık. // trim özellği sayesinde sağdan soldan boşluklar kaldırıldı

  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin..."); // inputtaki değer boş ise danger alert çalışacak
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo Oluşturuldu..."); // inputtaki değer dolu ise success çalışacak
  }

  e.preventDefault(); // Elementin varsayılan özelliğini engeller
}
function getTodosFromStorage() {
  // storage dan tüm todoarı alma
  let todos;
  if (localStroge.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`; // typedan gelen değeri kullnaacak
  alert.textContent = message; // messagedan gelen değeri kullanacak
  firstCardBody.appendChild(alert); // alert değişkenini firstCardBody nin child ı olarak ekleycek

  //  setTimeout metodu  // işlemin beli bir süre sonra gerçekleşmesini sağlayacak
  setTimeout(function () {
    alert.remove(); // alert divini kaldırır
  }, 2000); // 2 saniye sonra divi kaldıracak
}

// string değerini UI'a ekleyecek.
function addTodoToUI(newTodo) {
  // List Item Oluşturma
  const listItem = document.createElement("li");

  // Link Oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";

  listItem.appendChild(document.createTextNode(newTodo)); // Text Node Ekleme
  listItem.appendChild(link); // link elementini listItem içine child olarak ekler

  // Todo List'e List Item'ı Ekleme
  todoList.appendChild(listItem); //listItem elementini todoList içine child olarak ekler
  todoInput.value = ""; // submit olduktan sonra inputu sıfırlar
}

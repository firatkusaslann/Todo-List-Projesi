// Tüm Elementeri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

// Tüm eventListener'lar
function eventListeners() {
  form.addEventListener("submit", addTodo); // form değişkeninde submit olayı gerçekleşirse addTodo ismindeki function çalışacak
}

function addTodo(e) {
  const newTodo = todoInput.value.trim(); // todoInput değişkenindeki değeri value ile alıp newTodo değişkenine atadık. // trim özellği sayesinde sağdan soldan boşluklar kaldırıldı

  if (newTodo === "") {
    //<div class="alert alert-danger" role="alert">This is a danger alert—check it out!</div>
    showAlert("danger", "Lütfen bir todo girin...");
  } else {
    addTodoToUI(newTodo);
    showAlert("success", "Todo Oluşturuldu...");
  }

  e.preventDefault(); // Elementin varsayılan özelliğini engeller
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  //  setTimeout metodu
  setTimeout(function () {
    alert.remove();
  }, 2000);
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
  listItem.appendChild(link);

  // Todo List'e List Item'ı Ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";
}

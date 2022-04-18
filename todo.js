const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelectorAll("#filter");
const clearTodos = document.querySelector("#clear-todos");

eventListeners(); // eventListeners içindeki event'leri burada çalıştırıyoruz.

function eventListeners() { // Tüm eventListener'ları burada vereceğiz. bu yüzden eventListeners isminde bir funtion açtık.
  form.addEventListener("submit", addTodo); // form elementinin içinde her hangi bir submit gerçekleştiğinde addTodo function'ı çalışsın dedik. 
}

function addTodo(e) { 
  const newTodo = todoInput.value.trim();// todoInput'taki değeri aldık ve sağından solundan boşlukları temizleyerek newTodo değişkenine atadık.

  addTodoToUI(newTodo);

  e.preventDefault(); // Tarayıcının varsayılan özelliklerini engelledik. 
}

function addTodoToUI(newTodo) { // newTodo değişkeninden gelen string değerini list item olarak UI'a ekleyecek.
 
  //List Item Oluşturma.
  const listItem = document.createElement("li"); // Bir liste elemanı oluşturmak için listItem adında bir değişken ve li adında bir html elementi oluşturup birbirine eşitledik.
  listItem.className = "list-group-item d-flex justify-content-between"; // li elementinin class özelliklerini verdik.
  
  //Text Node Ekleme.
  listItem.appendChild(document.createTextNode(newTodo)); // listItem elemenına string bir child olarak newTodo'dan gelen değeri atadık.

  //Link Oluşturma.
  const link = document.createElement("a"); // Bir link oluşturmak için link adında bir değişken ve a adında bir html elemanı oluşturup birbirine eşitledik.
  link.href = "#"; // li elementinin href özelliğini tanımladık.
  link.className = "delete-item"; // li elementinin class özelliklerini tanımladık
  link.innerHTML = " <i class = 'fa fa-remove'></i>"; // Linkin içine ikon ekledik

  // link değişkenini listItem değişkenine child olarak ekleme.
  listItem.appendChild(link);  // ekleme yeri-appendchild-eklenen.
  
  //listItem değişkenini todoList değişkenine child olarak ekleme.
  todoList.appendChild(listItem);

  // İnput alanını sıfırlama.
  todoInput.value = "";
}
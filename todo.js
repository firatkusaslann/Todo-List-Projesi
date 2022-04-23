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
  const newTodo = todoInput.value.trim(); // todoInput'taki değeri aldık ve sağından solundan boşlukları temizleyerek newTodo değişkenine atadık.

  if (newTodo === "") { // eger input boş submit edilirse
    showalert("danger", "Lütfen Bir Todo Girin!"); // showAlert fonksiyonunu çalıştır -- danger gösterir
  } else {
    addTodoToUI(newTodo); // input dolu submit edilirse addTodoToUI fonsiyonunu çalıştır

    addTodoToStorage(newTodo); // burada sumbit olduğunda todoları aynı zamanda storage a da eklemek için addTodoToStorage function ını çağırdık

    showalert("success", "Todo Başarıyla Eklendi!"); // ve showAlert fonksiyonunu çalıştır -- success gösterir
  }

  e.preventDefault(); // Tarayıcının varsayılan özelliklerini engelledik.
}

function getTodosFromStorage() { // Storage'dan todoları almak için kullanacağımız bir function
  let todos; // burada bir key oluşturuyoruz çünkü newTododan gelen değeri buraya valu olarak ekleyeceğiz.
  if (localStorage.getItem("todos") === null) { // burada todos keyi null bir değer mi diye kontrol ediyoruz
    todos = []; // yukarıdaki if blogundaki sonuç null ise boş bir array başlatıyoruz.... bunu daha sonra newTodo dan gelen değerli array içine yazmak içi başlattık. çünkü normal şartlarda string olarak gidiyor
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // yazılan string değerini arraya çevirmek için JSON.parse kullanılır............
  }
  return todos; // bu function sonucunu başka bir yerde kullanmak gerekiyorsa o zaman return kullanmalıyım...
}

function addTodoToStorage(newTodo) { 
  let todos = getTodosFromStorage(); // neden burada çağırdık araştır ---------------------------
  todos.push(newTodo);  // push metodu, dizinin sonuna yeni değerler eklemek için kullanılır. İşlem sonucunda ise, dizinin yeni uzunluğunu geriye döner.
  localStorage.setItem("todos", JSON.stringify(todos)); // arrayleri string veriye çevirmek için JSON.stringify kulllanılır
}

function showalert(type, message) { // alert mesajı göstermek için fonksiyon oluşturduk
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`; //burada temlate literal kullanarak değişkeni div e className olarak ekledik
  alert.textContent = message;
  firstCardBody.appendChild(alert); 
  setTimeout(function () {// setTimeout - bu özellik 2 tane değer alır birincisi function ve ikincici çalışmak için beklediği saniye
    alert.remove();
  }, 1500);
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
  listItem.appendChild(link); // ekleme yeri-appendchild-eklenen.

  //listItem değişkenini todoList değişkenine child olarak ekleme.
  todoList.appendChild(listItem);

  // İnput alanını sıfırlama.
  todoInput.value = "";
}

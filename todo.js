const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners(); // eventListeners içindeki event'leri burada çalıştırıyoruz.

function eventListeners() { // Tüm eventListener'ları burada vereceğiz. bu yüzden eventListeners isminde bir funtion açtık.
  form.addEventListener("submit", addTodo); // form elementinin içinde her hangi bir submit gerçekleştiğinde addTodo function'ı çalışsın dedik.
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI); // DOMContentLoaded eventi sayfa içeriği yüklendiğinde oluşur. bu yüzden burada sayfa yüklendiğinde loadAllTodosToUI funtion'ını çalıştırıp local storgae daki verileri documana yazdıracağız
  secondCardBody.addEventListener("click", deleteTodo); // secondCardBody elementine bir click eventi olduğunda deleteTodo function'u çalışacak.
  filter.addEventListener("keyup",filterTodos); // inputtaki her karakteri almak için keyboard eventlerinden keyup'ı kullandık.
  clearButton.addEventListener("click",clearAllTodos); // tüm todoları hem UI'dan hem de storagedan silmek için botona click eventi verdik
}

function clearAllTodos() { // hem UI'dan hem de storagedan silmek için bir funtion açtık
  if (confirm("Tümünü silmek istediğinize emin misiniz?")); { // onaylama kurtusundan gelecek olan komuta göre işlem yapmak için oluşturuldu ve if sorgusuna alındı
    // todoları UI'dan kaldırma
   // todoList.innerHTML = ""; // yavaş yöntem 
    while (todoList.firstElementChild != null) {  // todoList listesinin ilk child elementi null bir değer OLMADIĞI sürece 
      todoList.removeChild(todoList.firstElementChild); // her döngüde todoList'in first elementini silecek ve döndürecek 
    }
    localStorage.removeItem("todos"); // tüm todoları locxalStoragedan silmek için key'ini  silmek yeterli oluyor.
  }
}


function filterTodos(e) {  // todoları filtrelemek için bir funtion açtık
  const filterValue = e.target.value.toLowerCase(); // inputun girilen değeri küçük harfe çevirerek filterValue değişkenine atadık
  const listItems = document.querySelectorAll(".list-group-item"); // tüm liste elemenlerını seçtik ve listItems değişkenine atadık
  
  listItems.forEach(function (listItem) { // listItems içindeki tüm liste elementlerinin üzerinde tek tek gezinmek için forEach döngüsü açtık.
    const text = listItem.textContent.toLowerCase(); // listItem içindeki text contentleri almak için listItem içindeki contentleri küçük harfe çevirip text değişkenine atadık
     if (text.indexOf(filterValue) === -1) { // indexOf ile filterValue değişkenindeki indexleri text değişkenindeki indexler ile kıyasladık. ve eğer -1!e eşitse yani bulamadıysa display özelliklerini none yapsın dedik
       // bulamadı
       listItem.setAttribute("style", "display : none !important" ); //listItem değişkenine statik olarak attribute ekledik ve important ile önemli olduğunu belirttik.
    }
     else {
       listItem.setAttribute("style", "display : block"); // index değerleri bulunursa bulunan elementlerin display özelliklerii block yap dedik
    }
  });
}

function deleteTodo(e) { // todolaro uıdan silmek içinfunction açtık.
  if (e.target.className === "fa fa-remove") { // tıklanan yerin className i fa fa-remove ise 
    e.target.parentElement.parentElement.remove(); // tıklanan yerin parent elementinin parent elementi yani li yi sil
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showalert("success", "Todo Başarıyla Silindi") // silindikten sonra success göster
  }
}

function deleteTodoFromStorage(deletetodo) {  // todoları storagedan silmek için bu function'ı açtık
  let todos = getTodosFromStorage(); // arrayi aldık

  todos.forEach(function (todo, index) {
    if (todo.trim() === deletetodo.trim()) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}  

function loadAllTodosToUI() { // sayfa yüklendiğinde verileri ekrana yazmak içn bu function açtık
  let todos = getTodosFromStorage(); // Arrayi aldık
  todos.forEach(function (todo) { // arrayin içindeki her bir elemanın üzerinde gezip değerlerini documana aktarmak için forEach döngüsünü kullandık
    addTodoToUI(todo); // todoları addTodoToUI ile document a ekledik
  })
}

function addTodo(e) { // girilen todoları buradaki işlemlerden geçtikten sonra  eklemek için bu function'ı açtık.
  const newTodo = todoInput.value.trim(); // todoInput'taki değeri aldık ve sağından solundan boşlukları temizleyerek newTodo değişkenine atadık.

  let todos = getTodosFromStorage();
  if (todos.includes(newTodo)) { // eğer storageda newTododan alınan değer varsa ekleme (include)
    showalert("danger", "Aynı Todoları giremezsiniz!")
  }
  else {
      if (newTodo === "") { // eger input boş submit edilirse
    showalert("danger", "Lütfen Bir Todo Girin!"); // showAlert fonksiyonunu çalıştır -- danger gösterir
  } else {
    addTodoToUI(newTodo); // input dolu submit edilirse addTodoToUI fonsiyonunu çalıştır

    addTodoToStorage(newTodo); // burada sumbit olduğunda todoları aynı zamanda storage a da eklemek için addTodoToStorage function ını çağırdık

    showalert("success", "Todo Başarıyla Eklendi!"); // ve showAlert fonksiyonunu çalıştır -- success gösterir
  }

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

function addTodoToStorage(newTodo) { // todoları storage'a eklemek için bu function'ı açtık
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

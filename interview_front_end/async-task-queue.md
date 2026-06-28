# AsyncTaskQueue - Asynchronous Task Management dərsi

## 1. Mövzu

Bu dərsdə JavaScript-də asinxron task-ları idarə edən bir `AsyncTaskQueue` sistemi quracağıq.

Məqsəd:

* Task-ları sıraya salmaq
* FIFO prinsipini qorumaq
* Eyni anda maksimum müəyyən sayda task işlətmək
* Error olduqda sistemi dayandırmamaq

Misal:

```ts
const queue = new AsyncTaskQueue(2);

queue.add(task1);
queue.add(task2);
queue.add(task3);
queue.add(task4);
```

Nəticə:

```
Task 1  ────────✓
Task 2  ────────✓

Task 3  ────────✓
Task 4  ────────✓
```

Heç vaxt:

```
Task 1
Task 2
Task 3  ❌
```

olmayacaq.

---

# 2. Problemi analiz etmək

Belə problemlərdə ilk olaraq kod yazmırıq.

Əvvəl sual veririk:

## Nəyi yadda saxlamalıyıq?

Cavab:

### 1. Gözləyən task-lar

```ts
queue = []
```

Məsələn:

```ts
[
 task1,
 task2,
 task3
]
```

---

### 2. Hazırda işləyən task sayı

```ts
running = 0
```

Bu bizə deyir:

"Neçə task hazırda aktivdir?"

---

### 3. Limit

```ts
limit = 3
```

Məsələn:

```ts
running <= limit
```

həmişə doğru olmalıdır.

---

# 3. FIFO nədir?

FIFO:

First In First Out

Yəni:

İlk gələn ilk işləyir.

JavaScript-də:

Əlavə etmək:

```ts
array.push(item)
```

Götürmək:

```ts
array.shift()
```

Misal:

```ts
queue.push(task1)
queue.push(task2)
queue.push(task3)
```

Queue:

```
task1
task2
task3
```

Çıxış:

```ts
queue.shift()
```

nəticə:

```
task1
```

---

# 4. Promise lifecycle

Async queue üçün Promise davranışı vacibdir.

Task:

```ts
const task = () => {
    return fetch('/api')
}
```

Bu hələ işləməyib.

İşlətmək:

```ts
task()
```

Bu Promise qaytarır:

```ts
Promise<Response>
```

---

# 5. Əsas alqoritm

Yeni task gələndə:

```
Task gəldi

      |
      v

Queue-ya əlavə et

      |
      v

Boş yer var?

      |
   yes       no

 Başlat    gözlə
```

---

Task bitəndə:

```
Task başladı

running++

      |

Task bitdi

running--

      |

Növbəti task başla
```

---

# 6. Implementasiya

```ts
class AsyncTaskQueue {

    private limit:number;
    private queueList:(()=>Promise<void>)[];
    private running:number;


    constructor(concurrency:number){

        this.limit = concurrency;
        this.queueList = [];
        this.running = 0;

    }


    add(task:()=>Promise<void>){

        this.queueList.push(task);

        this.process();

    }


    private process(){

        if(
            this.running >= this.limit ||
            this.queueList.length === 0
        ){
            return;
        }


        const task = this.queueList.shift();


        if(!task){
            return;
        }


        this.running++;


        task()
        .catch(()=>{

            // error ignore edilir

        })
        .finally(()=>{

            this.running--;

            this.process();

        });


        this.process();

    }

}
```

---

# 7. İstifadə

```ts
const queue = new AsyncTaskQueue(2);


queue.add(async()=>{

    console.log("Task 1");

});


queue.add(async()=>{

    console.log("Task 2");

});


queue.add(async()=>{

    console.log("Task 3");

});
```

Nəticə:

```
Task 1
Task 2

Task 3
```

Çünki limit:

```ts
2
```

idi.

---

# 8. Ən çox edilən səhvlər

## Səhv 1

```ts
Promise.all(queue)
```

Niyə səhvdir?

Çünki queue-da Promise yox, function var.

Səndə:

```ts
[
 ()=>fetch()
]
```

var.

---

## Səhv 2

```ts
task()
```

çağırıb gözləməmək.

Səhv:

```ts
task();
running++;
```

Düz:

```ts
await task();
```

və ya:

```ts
task()
.finally()
```

---

# 9. Senior səviyyə düşüncə

Bu problem əslində:

"Promise yaz"

deyil.

Bu:

"Mini scheduler dizayn et"

problemidir.

Eyni məntiq:

* API rate limiter
* Upload manager
* Background jobs
* Browser request queue
* Worker pool

sistemlərində istifadə olunur.

---

# 10. Öyrəniləcək əsas mövzular

Bu problemi rahat həll etmək üçün:

* Promise
* async/await
* Promise chaining
* finally
* event loop
* queue data structure
* concurrency
* recursion

bilmək lazımdır.

Bu mövzu frontend interview-larda senior səviyyədə çox istifadə olunur.

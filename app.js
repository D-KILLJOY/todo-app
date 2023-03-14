const body = document.body;
const themeBtn = document.querySelector(".theme");

const lightBtn = document.querySelector(".light-btn");
const darkBtn = document.querySelector(".dark-btn");

const todoInput = document.querySelector(".todo-input");
const itemCount = document.querySelector(".item-count");

const toDo = document.querySelector(".todo-ul");

const todoItem = document.querySelectorAll(".list-item");

const filterBtn = document.querySelectorAll(".filter-nav");

let todoItems = [];

todoInput.value = "";

//! THEME TOGGLE

let selectedTheme = localStorage.getItem("themeSelection");

if (selectedTheme) {
	body.classList.add("dark-theme");
	lightBtn.style.display = "block";
	darkBtn.style.display = "none";
}

themeBtn.addEventListener("click", () => {
	let darkTh = body.classList.contains("dark-theme");

	if (darkTh) {
		body.classList.remove("dark-theme");
		lightBtn.style.display = "none";
		darkBtn.style.display = "block";
		localStorage.removeItem("themeSelection");
	} else {
		body.classList.add("dark-theme");
		lightBtn.style.display = "block";
		darkBtn.style.display = "none";
		localStorage.setItem("themeSelection", "dark-THEME");
	}
});

//! THEME TOGGLE

const getFromLocalStorage = () => {
	let itemsFromLocalStorage = JSON.parse(localStorage.getItem("todoItems"));

	if (itemsFromLocalStorage) {
		todoItems = [];

		for (let i = 0; i < itemsFromLocalStorage.length; i++) {
			todoItems.push(itemsFromLocalStorage[i]);
		}
	}
	display();
	dispItemCount();

	console.log(todoItems);
};

todoInput.addEventListener("keydown", (e) => {
	let todoInVal = todoInput.value;
	if (e.key == "Enter") {
		if (todoInput.value.trim(" ").length === 0) {
			alert("CAN'T ADD EMPTY SPACES TO LIST ");
		} else {
			todoItems.push(todoInVal);

			localStorage.setItem("todoItems", JSON.stringify(todoItems));

			createItemfromInput(todoInVal, todoItems.length - 1);
			todoInput.value = "";
		}
		dispItemCount();
		console.log(todoItems);
	}
});

function spanBtns(item, index) {
	const checkBtn = item.querySelector(".check");
	const crossBtn = item.querySelector(".cross");

	checkBtn.addEventListener("click", () => {
		if (item.classList.contains("done")) {
			item.classList.remove("done");
		} else {
			item.classList.add("done");
		}
	});
	//! create function that removes item from array

	crossBtn.addEventListener("click", () => {
		if (!item.classList.contains("done")) {
			if (
				confirm(
					`this item has not been marked done do you still want to delete`
				)
			) {
				delItem();
			}
		} else {
			delItem();
		}
	});

	const delItem = () => {
		todoItems.splice(index, 1);
		item.remove();
		localStorage.setItem("todoItems", JSON.stringify(todoItems));
		dispItemCount();
	};
}

const display = () => {
	for (let i = 0; i < todoItems.length; i++) {
		createItem(todoItems, i);
		dispItemCount();
	}
};

const createItemfromInput = (todoIn, i) => {
	const item = document.createElement("li");
	item.classList.add("list-item");

	item.innerHTML = `<span class="check"><img src="./images/icon-check.svg" alt="" /></span>
              <span class="text">${todoIn}</span>
              <span class="cross"
                ><img src="./images/icon-cross.svg" alt=""
              /></span>
            `;

	toDo.appendChild(item);
	spanBtns(item, i);
};
const createItem = (todoItems, i) => {
	const item = document.createElement("li");
	item.classList.add("list-item");

	item.innerHTML = `<span class="check"><img src="./images/icon-check.svg" alt="" /></span>
              <span class="text">${todoItems[i]}</span>
              <span class="cross"
                ><img src="./images/icon-cross.svg" alt=""
              /></span>
            `;

	toDo.appendChild(item);
	spanBtns(item, i);
	// filterFunc(item);
};

const dispItemCount = () => {
	const listStat = document.querySelector(".empty-list");
	if (todoItems.length == 0) {
		itemCount.textContent = `${todoItems.length} item left`;
		listStat.style.display = "block";
	} else if (todoItems.length === 1) {
		itemCount.textContent = `${todoItems.length} item left`;
		listStat.style.display = "none";

		console.log(todoItems.length);
	} else if (todoItems.length > 1) {
		itemCount.textContent = `${todoItems.length} items left`;
		listStat.style.display = "none";
	}
};

getFromLocalStorage();

// //! fix code below
// const filterFunc = (item) => {
// 	const done = item.classList.contains("done");
// 	filterBtn.forEach((i) => {
// 		i.addEventListener("click", () => {
// 			filterBtn.forEach((e) => {
// 				e.classList.remove("selected");
// 			});
// 			if (i.classList.contains("all")) {
// 				console.log("show all");
// 				i.classList.add("selected");
// 			} else if (i.classList.contains("active")) {
// 				console.log("active");
// 				i.classList.add("selected");
// 			} else if (i.classList.contains("completed")) {
// 				console.log("completed");
// 				i.classList.add("selected");
// 				if (done) {
// 					item.style.display = "flex";
// 				} else {
// 					item.style.display = "none";
// 				}
// 			}
// 			getFromLocalStorage();
// 		});
// 	});
// };
// //! fix code above

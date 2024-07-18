// Selectors
let dropDownTop = document.querySelector(".drop__down");
let showMoreBtn = document.querySelector(".show__more__icon");
let addNoteBtn = document.querySelector("#addNoteBtn");
let editor = document.querySelector(".down__editor");
let title = document.querySelector(".title");
let description = document.querySelector(".description");
let doneBtn = document.querySelector("#doneBtn");
let deleteAll = document.querySelector("#deleteAll");
let mode = document.querySelector("#mode");

showMoreBtn?.addEventListener("click", () => {
    if (dropDownTop.style.display == "block") {
        dropDownTop.style.display = "none";
    } else {
        dropDownTop.style.display = "block";
    }
});


addNoteBtn?.addEventListener("click", () => {
    editor.style.display = "block";
});

doneBtn?.addEventListener("click", () => {
    let notes = localStorage.getItem("notes");

    if (notes) {
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }
    notes.push({ title: title.value, description: description.value });

    localStorage.setItem("notes", JSON.stringify(notes));
    title.value = "";
    description.value = "";
    editor.style.display = "none";
    showNotes();

});

// show Notes

const showNotes = () => {
    let notes = localStorage.getItem("notes");

    if (notes) {
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }

    let html = "";

    notes.forEach((element, index) => {
        html += `<div class="note__item">
        <div class="note__item__bar">
            <h4>${element.title}</h4>
            <div class="show__more">
                <div class="note__drop_">
                    <img
                        src="./icons/trash.svg"
                        width="15"
                        class="invert"
                        alt=""
                        onclick="deleteNote(${index})"
                    />
                    <img
                        src="./icons/edit.svg"
                        width="15"
                        alt=""
                        class="invert"
                        onclick="editNote(${index})"
                    />
                </div>

            </div>
        </div>
        <div class="note__description">
            ${element.description}        </div>
    </div>`;
    });
    
    document.querySelector(".notes__container").innerHTML = html;
};



const deleteNote = (index) => {
    let notes = localStorage.getItem("notes");

    if (notes) {
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }

    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
};

const editNote = (index) => {
    let notes = localStorage.getItem("notes");

    if (notes) {
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }
    editor.style.display = "block";
    title.value = notes[index].title;
    description.value = notes[index].description;
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
};

// Searching here

let searchQuery = document.querySelector("#query");

searchQuery.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();
    let notes = localStorage.getItem("notes");

    if (notes) {
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }

    let html = "";

    notes.forEach((element, index) => {
        if (
            element.title.toLowerCase().includes(value) ||
            element.description.toLowerCase().includes(value)
        ) {
            html += `<div class="note__item">
            <div class="note__item__bar">
                <h4>${element.title}</h4>
                <div class="show__more">
                    <div class="note__drop_">
                        <img
                            src="./icons/trash.svg"
                            width="15"
                            class="invert"
                            alt=""
                            onclick="deleteNote(${index})"
                        />
                        <img
                            src="./icons/edit.svg"
                            width="15"
                            alt=""
                            class="invert"
                            onclick="editNote(${index})"
                        />
                    </div>
    
                </div>
            </div>
            <div class="note__description">
                ${element.description}        </div>
        </div>`;
        }
    });
    document.querySelector(".notes__container").innerHTML = html;
});

// change theme -- task

// delete all

deleteAll.addEventListener("click", () => {
    localStorage.clear();
    showNotes();
});

showNotes();
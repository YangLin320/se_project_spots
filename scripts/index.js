const editButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__new-post");

const editModal = document.querySelector("#edit-profile-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");

const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-btn");

editButton.addEventListener("click", function(){
    editModal.classList.add("modal_is-opened");
});

editCloseButton.addEventListener("click", function(){
    editModal.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", function(){
    newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", function(){
    newPostModal.classList.remove("modal_is-opened");
});
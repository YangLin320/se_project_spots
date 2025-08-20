/* For Buttons on Main Page */
const editProfileButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__new-post");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

/*For Edit Profile Modal */
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-btn");
const editProfileName = editProfileModal.querySelector("#profile_name_input");
const editProfileDescription = editProfileModal.querySelector("#profile_description_input");
const editProfileForm = editProfileModal.querySelector(".modal__form");

/* For New Post Modal */
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-btn");
const newPostLink = newPostModal.querySelector("#profile_image_input");
const newPostCaption = newPostModal.querySelector("#profile_caption_input");
const newPostForm = newPostModal.querySelector(".modal__form");

/* Profile Functions */
editProfileButton.addEventListener("click", function(){
    openModal(editProfileModal);
    editProfileName.value = profileName.textContent;
    editProfileDescription.value = profileDescription.textContent;
});

editProfileCloseButton.addEventListener("click", function(){
    closeModal(editProfileModal)
});

editProfileForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    profileName.textContent = editProfileName.value;
    profileDescription.textContent = editProfileDescription.value;
    closeModal(editProfileModal)
});

/* New Post Functions */ 
newPostButton.addEventListener("click", function(){
    openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function(){
    closeModal(newPostModal);
});

newPostForm.addEventListener("submit",function(evt){
    evt.preventDefault();
    console.log(newPostLink.value);
    console.log(newPostCaption.value);
    closeModal(newPostModal);
    evt.target.reset();
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
} 
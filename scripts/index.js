/* Array of Objects */
const image1 = {
  name: "Val Thorens",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
};

const image2 = {
  name: "Restaurant terrace",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
};

const image3 = {
  name: "An outdoor cafe",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
};

const image4 = {
  name: "A very long bridge, over the forest and through the trees",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
};

const image5 = {
  name: "Tunnel with morning light",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
};

const image6 = {
  name: "Mountain house",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
};

const image7 = {
  name: "Photo by Griffin Goldridge",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
};

const initialCards = [image1, image2, image3, image4, image5, image6, image7];

/* For Card Generation */
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cards = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__description");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__trash-btn");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__liked-btn");
  });

  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    previewModalImage.setAttribute("src", data.link);
    previewModalImage.setAttribute("alt", data.name);
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  cards.prepend(cardElement);

  return cardElement;
}

/* For Preview Modal */
const previewModal = document.querySelector("#preview__modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

/* For Buttons on Main Page */
const editProfileButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__new-post");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

/*For Edit Profile Modal */
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton =
  editProfileModal.querySelector(".modal__close-btn");
const editProfileName = editProfileModal.querySelector("#profile_name_input");
const editProfileDescription = editProfileModal.querySelector(
  "#profile_description_input"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");

/* For New Post Modal */
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-btn");
const newPostLink = newPostModal.querySelector("#profile_image_input");
const newPostCaption = newPostModal.querySelector("#profile_caption_input");
const newPostForm = newPostModal.querySelector(".modal__form");

/* Profile Functions */
editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;

  resetValidation(editProfileForm, settings);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeModal(editProfileModal);
});

/* New Post Functions */
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newPost = {
    link: newPostLink.value,
    name: newPostCaption.value,
  };
  getCardElement(newPost);
  closeModal(newPostModal);
  evt.target.reset();
  disableButton(evt.target.querySelector(".modal__save-btn"));
});

function openModal(modal){
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape(modal));
}

const handleEscape = (evt, modal) =>{
  if(evt.key == 'Escape'){
    closeModal(modal);
  }
}


function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("keydown", handleEscape);
}

initialCards.forEach(function (card) {
  getCardElement(card);
});

//For closing when clicking on card overlay
const setModalListeners = () =>{
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    modal.addEventListener("click", function(evt){
      if(evt.target == modal){
        closeModal(modal);
      }
    })
  })
}

setModalListeners();

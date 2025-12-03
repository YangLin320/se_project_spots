import {
  settings,
  enableValidation,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";

/* Array of Objects
const valImage =
  "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg";
const restaurantImage =
  "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg";
const cafeImage =
  "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg";
const bridgeImage =
  "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg";
const tunnelImage =
  "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg";
const mountainHouseImage =
  "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg";
const griffinGoldridgeImage =
  "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg";

const image1 = {
  name: "Val Thorens",
  link: valImage,
};

const image2 = {
  name: "Restaurant terrace",
  link: restaurantImage,
};

const image3 = {
  name: "An outdoor cafe",
  link: cafeImage,
};

const image4 = {
  name: "A very long bridge, over the forest and through the trees",
  link: bridgeImage,
};

const image5 = {
  name: "Tunnel with morning light",
  link: tunnelImage,
};

const image6 = {
  name: "Mountain house",
  link: mountainHouseImage,
};

const image7 = {
  name: "Photo by Griffin Goldridge",
  link: griffinGoldridgeImage,
};

const initialCards = [image1, image2, image3, image4, image5, image6, image7];
*/

/*API Shenanigans */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "acc74d26-2117-446b-b5d5-2f15c775e065",
    "Content-Type": "application/json",
  },
});

// Avatar
const userAvatar = document.querySelector(".profile__image");

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
  
  if(data.isLiked){
    cardLikeBtn.classList.add("card__liked-btn");
  }
  
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  cardLikeBtn.addEventListener("click", (evt)=>{
    handleLikeCard(evt.target, data._id);
  })

  cardDeleteBtn.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data);
  });

  cardImage.addEventListener("click", function () {
    previewModalImage.setAttribute("src", data.link);
    previewModalImage.setAttribute("alt", data.name);
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });
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
const newAvatarButton = document.querySelector(".profile__avatar-btn");

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

/* For New Avatar Modal */
const newAvatarModal = document.querySelector("#new-avatar-modal");
const newAvatarCloseButton = newAvatarModal.querySelector(".modal__close-btn");
const newAvatarLink = newAvatarModal.querySelector("#profile_avatar_input");
const newAvatarForm = newAvatarModal.querySelector(".modal__form");

/* For Delete Card Modal */

const deleteModal = document.querySelector("#delete-card-modal");
const deleteModalCloseButton = deleteModal.querySelector(".modal__close-btn");
const deleteModalCancelButton = deleteModal.querySelector(".modal__save-btn-cancel-btn");
const deleteForm = deleteModal.querySelector(".modal__form");
let selectedCard, selectedCardId;

deleteModalCloseButton.addEventListener("click", ()=>{
  closeModal(deleteModal);
});

deleteModalCancelButton.addEventListener("click", ()=>{
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", (evt) => {
  handleDeleteSubmit(evt);
});

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(()=>{
      submitBtn.textContent = "Delete";
    });
}

/* For Liking Cards */
function handleLikeCard(cardLikeElement, cardID) {
  api.handleLike(cardLikeElement.classList.contains("card__liked-btn"), cardID)
  .then((res)=>{
    cardLikeElement.classList.toggle("card__liked-btn");
  }).catch(console.error);
}

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
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving..."
  api
    .editUserInfo({
      name: editProfileName.value,
      about: editProfileDescription.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(()=>{
      submitBtn.textContent = "Save"
    });
});

/* New Avatar Functions */
newAvatarButton.addEventListener("click", function () {
  openModal(newAvatarModal);
});

newAvatarCloseButton.addEventListener("click", function () {
  closeModal(newAvatarModal);
});

newAvatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  api
    .editAvatarLink(newAvatarLink.value)
    .then((data) => {
      userAvatar.src = data.avatar;
      evt.target.reset();
      closeModal(newAvatarModal);
      disableButton(submitBtn);
    })
    .catch(console.error)
    .finally(()=>{
      submitBtn.textContent = "Save";
    });
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
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  const newPost = {
    link: newPostLink.value,
    name: newPostCaption.value,
  };
  api
    .postCard({ name: newPost.name, link: newPost.link })
    .then((data) => {
      cards.prepend(getCardElement(data));
      evt.target.reset();
      closeModal(newPostModal);
      disableButton(submitBtn);
    })
    .catch(console.error)
    .finally(()=>{
      submitBtn.textContent = "Save";
    });
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function handleEscape(evt){
  if (evt.key == "Escape") {
    const openedPopup = document.querySelector('.modal_is-opened');
    closeModal(openedPopup);
  }
};

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

/* Legacy
initialCards.forEach(function (card) {
  getCardElement(card);
});
*/

//For closing when clicking on card overlay
const setModalListeners = () => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", function (evt) {
      if (evt.target == modal) {
        closeModal(modal);
      }
    });
  });
};

api
  .getAppInfo()
  .then(([initialCards, user]) => {
    initialCards.forEach((card) => {
      cards.append(getCardElement(card));
    });
    profileDescription.textContent = user.about;
    profileName.textContent = user.name;
    userAvatar.src = user.avatar;
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

setModalListeners();
enableValidation(settings);

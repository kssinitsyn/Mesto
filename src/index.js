import Card from './blocks/place-card/place-card';
import Api from './scripts/api';
import Popup from './blocks/popup/popup';
import CardList from './blocks/places-list/card-list';

import './style.css';

let url

if (NODE_ENV === 'development') {
    url = 'http://praktikum.tk/cohort1';
} else {
    url = 'https://praktikum.tk/cohort1';
}

// Переменные
// Карточки
const cardList = document.querySelector('.places-list')

// Попап с новой карточкой
const popup = document.querySelector('.popup')
const openAddCardPopup = document.querySelector('.user-info__button')
const closeAddPopupBtn = document.querySelector('.popup__close')
const popupForm = document.querySelector('.popup__form')
const postBtn = document.querySelector('.popup__button')
const placeName = document.querySelector('.popup__input_type_name')
const placeImage = document.querySelector('.popup__input_type_link-url')

// Попап с редактированием профиля
const popupEdit = document.querySelector('.popup-edit')
const openEditPopup = document.querySelector('.user-info__button-edit')
const closeEditPopupBtn = document.querySelector('.popup-edit__close')
const popupEditForm = document.querySelector('.popup-edit__form')
const userName = document.querySelector('.user-info__name')
const userJob = document.querySelector('.user-info__job')
const inputUserName = document.querySelector('.popup-edit__input_type_name')
const inputUserAbout = document.querySelector('.popup-edit__input_type_about')
const editBtn = document.querySelector('.popup-edit__button')

// Попап с увеличением картинки
const popupBigImg = document.querySelector('.popup-bigimg')
const popupBigImgSrc = document.querySelector('.popup-bigimg__image')

// Попап с с редактированием аватара
const popupAvatar = document.querySelector('.popup-avatar')
const userAvatar = document.querySelector('.user-info__photo')
const postAvatar = document.querySelector('.popup-avatar__button')
const closeAvatarPopup = document.querySelector('.popup-avatar__close')
const popupAvatarForm = document.querySelector('.popup-avatar__form')
const inputAvatarUrl = document.querySelector('.popup-avatar__input_type_name')

// Элементы для валидации
const expression = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/

// Использование классов
const editFormPopup = new Popup(popupEdit, 'popup-edit_is-opened', closeEditPopupBtn)
const newCardFormPopup = new Popup(popup, 'popup_is-opened', closeAddPopupBtn)
const editAvatarPopup = new Popup(popupAvatar, 'popup-avatar_is-opened', closeAvatarPopup)
const regex = new RegExp(expression)

const api = new Api('a22615e2-6b60-43bf-b944-bd524da74e3e')
const cardListRender = new CardList('a22615e2-6b60-43bf-b944-bd524da74e3e')

cardListRender.getInitialCards(url, 'GET')
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      const initialCards = {}
      initialCards.name = result[i].name
      initialCards.link = result[i].link
      initialCards.id = result[i]._id
      const authorId = result[i].owner._id

      const card = new Card(initialCards.name, initialCards.link, initialCards.id, authorId)
      const cardElement = card.element
      cardList.appendChild(cardElement)
    }
  })
  .then(() => {
    api.likeSum(url, 'GET')
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          const likeSum = document.createElement('span')
          likeSum.classList.add('place-card__like-sum')
          likeSum.textContent = result[i].likes.length

          const descriptionContainer = document.querySelectorAll('.place-card__description')
          descriptionContainer[i].appendChild(likeSum)
        }
      })
  })
  .catch((err) => {
    console.log(err)
  })


api.getUserInfo(url, 'GET')
  .then((result) => {
    const userName = document.querySelector('.user-info__name')
    userName.textContent = result.name
    const about = document.querySelector('.user-info__job')
    about.textContent = result.about
    const avatar = document.querySelector('.user-info__photo')
    avatar.style.backgroundImage = `url('${result.avatar}')`
  })
  .catch((err) => {
    console.log(err)
  })

// Слушатели
// Открыть попап редактирования профиля
openEditPopup.addEventListener('click', () => {
  editFormPopup.open()
  inputUserName.value = userName.textContent
  inputUserAbout.value = userJob.textContent
})

// Открыть попап редактирования аватара
userAvatar.addEventListener('click', () => {
  editAvatarPopup.open()

  // Очистка полей вода
  postAvatar.classList.remove('popup-avatar__button_enabled')
  postAvatar.setAttribute('disabled', true)

  popupAvatarForm.reset()
})

// Открыть попап добавления карточки
openAddCardPopup.addEventListener('click', () => {
  newCardFormPopup.open()

  // Очистка полей вода
  postBtn.classList.remove('popup__button_enabled')
  postBtn.setAttribute('disabled', true)

  popupForm.reset()
})

// Submit формы на click и enter
popupForm.addEventListener('submit', function (event) {
  event.preventDefault()

  api.postCard(url, 'POST', placeName.value, placeImage.value)
    .then((res) => {
      postBtn.textContent = 'Сохранить'
      postBtn.classList.remove('popup__button_enabled')
      postBtn.setAttribute('disabled', true)
      postBtn.textContent = '+'
      popup.classList.remove('popup_is-opened')

      const authorId = res.owner._id
      const cardId = res._id

      const card = new Card(placeName.value, placeImage.value, cardId, authorId)

      const cardElement = card.element
      cardList.appendChild(cardElement)
    })
    .catch((err) => {
      console.log(err)
    })
})

// Лайк и удаление
cardList.addEventListener('click', function (event) {
  // Поставить/снять лайк
  // if (event.target.classList.contains('place-card__like-icon')) {
  //   Card.like(event.target)
  // }
  // Удалить карточку
  if (event.target.classList.contains('place-card__delete-icon')) {
    if (confirm(`Вы уверены что хотите удалить карточку под номером: ${event.target.getAttribute('card-id')}`)) {
          // const authorIdCard = event.target.getAttribute('author-id')
        const cardId = event.target.getAttribute('card-id')
          api.deleteCard(url, cardId, 'DELETE')
              .then(() => {
                  Card.remove()
              })
              .catch((err) => {
                  console.log(err)
              })
      }
  }
})

// Изменение имени в профиле
popupEditForm.addEventListener('submit', function (event) {
  event.preventDefault()

  api.changeUserInfo(url, 'PATCH')
    .then((result) => {
      editBtn.textContent = 'Сохранить'
      popupEdit.classList.remove('popup-edit_is-opened')

      userName.textContent = result.name
      userJob.textContent = result.about
      userAvatar.style.backgroundImage = `url('${result.avatar}')`
    })
    .catch((err) => {
      console.log(err)
    })
})

// Изменине аватара
popupAvatarForm.addEventListener('submit', function (event) {
  event.preventDefault()

  api.changeAvatar(url, 'PATCH')
    .then((result) => {
      postAvatar.textContent = 'Сохранить'
      postAvatar.classList.remove('popup-avatar__button_enabled')
      postAvatar.setAttribute('disabled', true)
      popupAvatar.classList.remove('popup-avatar_is-opened')

      userAvatar.style.backgroundImage = `url('${result.avatar}')`
    })
    .catch((err) => {
      console.log(err)
    })
})

// Открытие попапа с увеличением картинки
cardList.addEventListener('click', function (event) {
  const url = event.target.getAttribute('style')
  const startUrlSlice = 22
  const endUrlSlice = -1

  if (event.target.classList.contains('place-card__image')) {
    const urlSlice = url.slice(startUrlSlice, endUrlSlice)
    popupBigImg.classList.add('popup-bigimg_is-opened')
    popupBigImgSrc.setAttribute('src', `${urlSlice}`)
  }
})

// Закрытие попапа с увеличением картинки
popupBigImg.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup-bigimg__close')) {
    popupBigImg.classList.remove('popup-bigimg_is-opened')
  }
})

// Валидация
// Валидация изменения данных пользователя
popupEdit.addEventListener('input', function () {
  if (inputUserName.value.length >= 2 && inputUserAbout.value.length >= 2) {
    editBtn.classList.add('popup-edit__button_enabled')
  } else {
    editBtn.classList.remove('popup-edit__button_enabled')
  }
})

// Валидация кнопки новое место
popup.addEventListener('input', function () {
  if (placeName.value.length !== 0 && placeImage.value.length !== 0) {
    postBtn.classList.add('popup__button_enabled')
    postBtn.removeAttribute('disabled')
  } else {
    postBtn.classList.remove('popup__button_enabled')
    postBtn.setAttribute('disabled', true)
  }
})

// Валидация формы смены аватара
popupAvatar.addEventListener('input', function () {
  if (inputAvatarUrl.value.length !== 0 && !!inputAvatarUrl.value.match(regex)) {
    postAvatar.classList.add('popup-avatar__button_enabled')
    postAvatar.removeAttribute('disabled')
  } else {
    postAvatar.classList.remove('popup-avatar__button_enabled')
  }
})

inputUserName.addEventListener('input', handleValidate)
inputUserAbout.addEventListener('input', handleValidate)
inputAvatarUrl.addEventListener('input', avatarValidate)

// Колбэк для слушателей валидации
function handleValidate (event) {
  validate(event.target)
}

function avatarValidate (event) {
  validateAvatarUrl(event.target)
}

// Активация ошибки валидации
function activateError (element) {
  const errorMessage = document.querySelector(`#${element.id}`)
  errorMessage.classList.add('error-message_active')
}

// Функции валидации
function validate (element) {
  const errorElement = document.querySelector(`#error-${element.id}`)
  if (element.value.length === 0) {
    const errorMessage = 'Это обязательное поле'
    errorElement.textContent = errorMessage
    activateError(errorElement)
    return false
  } else if (element.value.length <= 1 || element.value.length >= 30) {
    const errorMessage = 'Должно быть от 2 до 30 символов'
    errorElement.textContent = errorMessage
    activateError(errorElement)
    return false
  }

  errorElement.classList.remove('error-message_active')
  errorElement.textContent = ''
  return true
}

function validateAvatarUrl (element) {
  const errorElement = document.querySelector(`#error-${element.id}`)
  if (element.value.length === 0) {
    const errorMessage = 'Это обязательное поле'
    errorElement.textContent = errorMessage
    activateError(errorElement)
    return false
  } else if (!element.value.match(regex)) {
    const errorMessage = 'Здесь должна быть ссылка'
    errorElement.textContent = errorMessage
    activateError(errorElement)
    return false
  }

  errorElement.classList.remove('error-message_active')
  errorElement.textContent = ''
  return true
}

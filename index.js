class CardListClass {
  constructor (container, arrayData) {
    this.container = container
    this.arrayData = arrayData
    this.render()
  }

  addCard (nameCard, linkCard) {
    this.container.appendChild(Card.create(nameCard, linkCard))
  }
}

class Card {
  constructor (name, linkPic, cardId, authorId) {
    this.name = name
    this.linkPic = linkPic
    this.cardId = cardId
    this.authorId = authorId
    this.element = Card.create(this.name, this.linkPic, this.cardId, this.authorId)
  }

  static create (name, linkPic, cardId, authorId) {
    const myId = 'e02e6975b9ecfc5e75a38b25'

    const card = document.createElement('div')
    // Создаем основной div
    const newCard = document.createElement('div')
    newCard.classList.add('place-card')

    card.appendChild(newCard)

    // Создаем div для фона и кнопки "удалить карту"
    const imageContainer = document.createElement('div')
    imageContainer.classList.add('place-card__image')
    newCard.appendChild(imageContainer)
    imageContainer.setAttribute('style', `background-image: url(${linkPic})`)

    if (authorId === myId) {
      const deleteBtn = document.createElement('button')
      deleteBtn.classList.add('place-card__delete-icon')
      deleteBtn.setAttribute('card-id', `${cardId}`)
      newCard.setAttribute('author-id', `${authorId}`)
      imageContainer.appendChild(deleteBtn)
    }

    // Создаем div для контейнера имени и кнопки "лайк"
    const descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('place-card__description')
    newCard.appendChild(descriptionContainer)

    // Создаем имя карточки
    const newName = document.createElement('h3')
    newName.classList.add('place-card__name')
    newName.textContent = `${name}`
    descriptionContainer.appendChild(newName)

    // Создаем кнопку "лайк"
    const likeBtn = document.createElement('button')
    likeBtn.classList.add('place-card__like-icon')
    descriptionContainer.appendChild(likeBtn)

    return newCard
  }

  static like (element) {
    element.classList.toggle('place-card__like-icon_liked')
  }

  static remove () {
    const card = event.target.closest('.place-card')
    card.parentElement.removeChild(card)
  }
}

class Popup {
  constructor (element, openClassName, closeElement) {
    this.element = element
    this.openClassName = openClassName
    closeElement.addEventListener('click', () => this.close())
  }

  open () {
    this.element.classList.add(this.openClassName)
  }

  close () {
    this.element.classList.remove(this.openClassName)
  }
}

class Api {
  constructor (authorization) {
    this.authorization = authorization
  }

  getInitialCards (baseUrl, method) {
    return fetch(`http://95.216.175.5/cohort1/${baseUrl}`, {
      method: `${method}`,
      headers: {
        authorization: `${this.authorization}`
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getUserInfo (baseUrl, method) {
    return fetch(`http://95.216.175.5/cohort1/${baseUrl}`, {
      method: `${method}`,
      headers: {
        authorization: `${this.authorization}`
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  changeUserInfo (baseUrl, method) {
    editBtn.textContent = 'Загрузка...'
    return fetch(`http://95.216.175.5/cohort1/${baseUrl}`, {
      method: `${method}`,
      headers: {
        authorization: `${this.authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${inputUserName.value}`,
        about: `${inputUserAbout.value}`
      })
    })

      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  postCard (baseUrl, method, nameCard, linkCard) {
    postBtn.textContent = 'Загрузка...'
    return fetch(`http://95.216.175.5/cohort1/${baseUrl}`, {
      method: `${method}`,
      headers: {
        authorization: `${this.authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${nameCard}`,
        link: `${linkCard}`
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  likeSum (baseUrl, method) {
    return fetch(`http://95.216.175.5/cohort1/${baseUrl}`, {
      method: `${method}`,
      headers: {
        authorization: `${this.authorization}`
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  changeAvatar (baseUrl, method) {
    postAvatar.textContent = 'Загрузка...'
    return fetch(`http://95.216.175.5/cohort1/${baseUrl}`, {
      method: `${method}`,
      headers: {
        authorization: `${this.authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${inputAvatarUrl.value}`
      })
    })

      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  deleteCard (cardId, method) {
    return fetch(`http://95.216.175.5/cohort1/cards/${cardId}`, {
      method: `${method}`,
      headers: {
        authorization: `${this.authorization}`
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
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

api.getInitialCards('cards', 'GET')
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
    api.likeSum('cards', 'GET')
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

api.getUserInfo('users/me', 'GET')
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

  api.postCard('cards', 'POST', placeName.value, placeImage.value)
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
  if (event.target.classList.contains('place-card__like-icon')) {
    Card.like(event.target)
  }
  // Удалить карточку
  if (event.target.classList.contains('place-card__delete-icon')) {
    if (confirm(`Вы уверены что хотите удалить карточку под номером: ${event.target.getAttribute('card-id')}`)) {
      // const deleteCard = event.target.querySelector(`[data-id='${deleteCardId}']`)

      api.deleteCard(deleteCardId, 'DELETE')
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

  api.changeUserInfo('users/me', 'PATCH')
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

  api.changeAvatar('users/me/avatar', 'PATCH')
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

export default class Card {
        constructor(name, linkPic, cardId, authorId) {
            this.name = name
            this.linkPic = linkPic
            this.cardId = cardId
            this.authorId = authorId
            this.element = Card.create(this.name, this.linkPic, this.cardId, this.authorId)
        }

        static create(name, linkPic, cardId, authorId) {
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
                deleteBtn.setAttribute('author-id', `${authorId}`)
                // newCard.setAttribute('author-id', `${authorId}`)
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

        static like(element) {
            element.classList.toggle('place-card__like-icon_liked')
        }

        static remove(event) {
            const card = event.target.closest('.place-card')
            card.parentElement.removeChild(card)
        }
    }
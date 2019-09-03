import Card from '../place-card/place-card'

export default class CardList{
    constructor (container, item) {
        this.container = container
        this.item = item
        this.render()
    }

    render() {
        const newCards = new Card(this.item.name, this.item.link,this.item._id,this.item.owner._id)
        this.container.appendChild(newCards.create())
    }
}
import BlueDot from "./blueDot.js"

export default class PetFactory {
    constructor() {
        this.registeredPets = {
            "blueDot": BlueDot
        }
    }

    create(petName) {
        return this.registeredPets[petName]
    }
}
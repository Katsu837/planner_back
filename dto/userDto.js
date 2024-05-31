module.exports = class UserDto {
    id;
    email;
    isActivation;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.isActivation = model.isActivation;
    }
}
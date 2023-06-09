import { Schema, Model, HydratedDocument, model } from "mongoose";
import { Password } from "../services/password";

interface UserInterface {
    email: string;
    password: String;
}

type UserDoc = HydratedDocument<UserInterface>;

interface UserModel extends Model<UserDoc> {
    build(user: UserInterface): UserDoc;
}

const userSchema = new Schema<UserInterface>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// have to handle error in case Password.toHah() etc fails
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword);
    }
    next();
});

userSchema.statics.build = (user: UserInterface) => {
    return new User(user);
}

const User = model<UserInterface, UserModel>('Users', userSchema);

export { User };
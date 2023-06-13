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
}, {
    /* 
        if any object has toJSON() function property then JSON.stringy() uses the
        toJSON() function to convert object into json. similar thing can be acheived by
        toJSON option inside Schema().
        Now when we use JSON.stringfy on user object given by model() function, stringy()
        will use option inside toJSON to convert object to json
    */
    toJSON: {
        // transform object returned by toJSON()
        // doc --> doc taken by schema
        // ret --> object returned by schema/model
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
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
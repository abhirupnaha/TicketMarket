import bcrypt from 'bcrypt'

export class Password {
    static async toHash(password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const isValid = await bcrypt.compare(suppliedPassword, storedPassword);
        return isValid;
    }
}
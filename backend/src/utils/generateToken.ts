import jwt from 'jsonwebtoken';

// base64 encoding of "comp307secrets"
// Put this in the env file
const generateToken = (id: string) => {
    const token = jwt.sign({ id }, "Y29tcDMwN3NlY3JldHM=" as string);
    return token;
}

export default generateToken;
import authRepository from "./auth.repository.js";
import { comparePassword } from "../../utils/password.js";
import {
    generateAccessToken,
    generateRefreshToken
} from "../../utils/jwt.js";

class AuthService {

async login(email, password) {

    const user = await authRepository.findByEmail(email);

    if (!user) {
        throw new Error("Correo o contraseña incorrectos.");
    }

    if (!user.active) {
        throw new Error("La cuenta está deshabilitada.");
    }

    const validPassword = await comparePassword(
        password,
        user.password
    );

    if (!validPassword) {
        throw new Error("Correo o contraseña incorrectos.");
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    await authRepository.saveRefreshToken(
        user.id,
        refreshToken,
        expiresAt
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        accessToken,
        refreshToken
    };

}
async refresh(token) {

    const storedToken = await authRepository.findRefreshToken(token);

    if (!storedToken) {
        throw new Error("Refresh Token inválido.");
    }

    if (storedToken.revoked) {
        throw new Error("Refresh Token revocado.");
    }

    if (storedToken.expiresAt < new Date()) {
        throw new Error("Refresh Token expirado.");
    }

    const accessToken = generateAccessToken(storedToken.user);

    return {
        accessToken
    };

}
}

export default new AuthService();
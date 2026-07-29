import authService from "./auth.service.js";

class AuthController {

    async login(req, res, next) {

        try {

            const { email, password } = req.body;

            const result = await authService.login(
                email,
                password
            );

            res.json(result);

        } catch (error) {
            next(error);
        }

    }
    async refresh(req, res, next) {

    try {

        const { refreshToken } = req.body;

        const result = await authService.refresh(
            refreshToken
        );

        res.json(result);

    } catch (error) {

        next(error);

    }

}

}

export default new AuthController();
import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
    try {
        console.log("Authorization:", req.headers.authorization);

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No autorizado."
            });
        }

        const [type, token] = authHeader.split(" ");

        console.log("Token:", token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Usuario decodificado:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Token expirado o inválido."
        });
    }
}
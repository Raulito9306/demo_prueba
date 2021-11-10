const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";
exports.login = (req, res) => {
    const users = [{
        username: "admin",
        password: "admin123",
        role: "admin"
    }];
    // Leyendo datos del body
    const { username, password } = req.body;

    // Filtrando datos del usuario
    const user = users.find(u => {
        return u.username === username && u.password === password;
    });

    if (user) {
        // Generando el token
        const accessToken = jwt.sign({ username: user.username, role: user.role },
            accessTokenSecret
        );

        res.json({
            accessToken
        });
    } else {
        res.send("Usuario o contraseña incorrecta");
    }
};

//Metodo para comprobar si el usuario esta autenticado
exports.authenticateJWT = (req, res, next) => {
    let tokenTemp = req.headers["authorization"];
    if (!tokenTemp) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    let token = tokenTemp.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
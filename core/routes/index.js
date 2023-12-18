const router = require('express').Router();
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../src/hub.html'))
});

// Definir una ruta dinámica para usuarios
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    // Lógica para manejar la ruta específica del usuario, por ejemplo, renderizar una página
    res.sendFile(path.join(__dirname, '/../../src/index.html'))
});

// Ruta principal que muestra enlaces a cada cliente
router.get('/clientList', (req, res) => {
    // Renderiza una página que muestra enlaces a las páginas personales de cada cliente
    res.sendFile(path.join(__dirname, '/../../src/HUB/clientList.html'));
});

module.exports = router;

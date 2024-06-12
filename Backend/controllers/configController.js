const systemConfig = {
    maxUsers: '100',
    sessionTimeout: '30',
    maintenanceMode: 'false'
};

const getConfig = (req, res) => {
    res.json(systemConfig);
};

const updateConfig = (req, res) => {
    const { maxUsers, sessionTimeout, maintenanceMode } = req.body;
    systemConfig.maxUsers = maxUsers;
    systemConfig.sessionTimeout = sessionTimeout;
    systemConfig.maintenanceMode = maintenanceMode;
    res.json({ message: 'Configuración actualizada correctamente.' });
};

module.exports = { getConfig, updateConfig };


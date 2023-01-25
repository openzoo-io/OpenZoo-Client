const { override, addDecoratorsLegacy, disableChunk } = require('customize-cra');
module.exports = override(addDecoratorsLegacy(), disableChunk(false));

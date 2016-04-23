if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const key = process.env.CSE_API_KEY;
const engineId = process.env.CSE_ENGINE_ID;

module.exports = {
  key,
  engineId
};

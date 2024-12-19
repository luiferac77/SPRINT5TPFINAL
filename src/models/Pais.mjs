import mongoose from "mongoose";
const {collection} = mongoose;

const paisSchema = new mongoose.Schema({
name: {
    common: { type: String },
    official: { type: String },
    nativeName: {
        type: Object,
            properties: {
            grn: {
                official: { type: String },
                common: { type: String }
            },
            spa: {
                official: { type: String },
                common: { type: String }
            }
        }
    }
},
independent: { type: Boolean },
status: { type: String },
unMember: { type: Boolean },
currencies: {
    type: Object,
        properties: {
            ARS: {
            name: { type: String },
            symbol: { type: String }
        }
    }
},
capital: [{ type: String }],
region: { type: String },
subregion: { type: String },
languages: {
    type: Object,
    properties: {
        grn: { type: String },
        spa: { type: String }
    }
},
latlng: [{ type: Number }],
landlocked: { type: Boolean },
borders: [{ type: String }],
area: { type: Number },
flag: { type: String },
maps: {
    type: Object,
    properties: {
        googleMaps: { type: String },
        openStreetMaps: { type: String }
    }
},
population: { type: Number },
gini: {
    type: Object,
    properties: {
        2019: { type: Number }
    }
},
fifa: { type: String },
timezones: [{ type: String }],
continents: [{ type: String }],
flags: {
    type: Object,
    properties: {
        png: { type: String },
        svg: { type: String },
        alt: { type: String }
    }
},
startOfWeek: { type: String },
capitalInfo: {
    type: Object,
    properties: {
        latlng: [{ type: Number }]
    }
},
    creador: { type: String, default:'LFA' }
}, {collection: 'Grupo-12'});

console.log('pasa por /models/Pais.mjs');

export default mongoose.model('Pais', paisSchema);
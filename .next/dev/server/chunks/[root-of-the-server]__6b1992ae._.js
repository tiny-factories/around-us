module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/inaturalist.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// iNaturalist API integration
__turbopack_context__.s([
    "getRecentObservations",
    ()=>getRecentObservations,
    "getSeasonalHistogram",
    ()=>getSeasonalHistogram,
    "getSpeciesDetails",
    ()=>getSpeciesDetails,
    "getSpeciesForLocation",
    ()=>getSpeciesForLocation
]);
const BASE_URL = 'https://api.inaturalist.org/v1';
// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
function getCached(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }
    return null;
}
function setCache(key, data) {
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
}
async function getSpeciesForLocation(coords, month, radius = 10, limit = 50) {
    const cacheKey = `species-${coords.lat}-${coords.lng}-${month}-${radius}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;
    const params = new URLSearchParams({
        lat: coords.lat.toString(),
        lng: coords.lng.toString(),
        radius: radius.toString(),
        month: month.toString(),
        quality_grade: 'research,needs_id',
        per_page: limit.toString(),
        order_by: 'observations_count',
        order: 'desc',
        locale: 'en'
    });
    const response = await fetch(`${BASE_URL}/observations/species_counts?${params}`);
    if (!response.ok) {
        throw new Error(`iNaturalist API error: ${response.status}`);
    }
    const data = await response.json();
    const species = data.results.map((result)=>({
            id: result.taxon.id,
            name: result.taxon.name,
            commonName: result.taxon.preferred_common_name || result.taxon.name,
            photoUrl: result.taxon.default_photo?.medium_url || null,
            observationCount: result.count,
            iconicTaxon: result.taxon.iconic_taxon_name || 'unknown',
            wikipediaUrl: result.taxon.wikipedia_url,
            rank: result.taxon.rank || 'species'
        }));
    const result = {
        species,
        totalCount: data.total_results
    };
    setCache(cacheKey, result);
    return result;
}
async function getRecentObservations(coords, radius = 5, limit = 100, month) {
    const cacheKey = `obs-${coords.lat}-${coords.lng}-${radius}-${month || 'all'}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;
    const params = new URLSearchParams({
        lat: coords.lat.toString(),
        lng: coords.lng.toString(),
        radius: radius.toString(),
        quality_grade: 'research,needs_id',
        per_page: limit.toString(),
        order_by: 'observed_on',
        order: 'desc',
        photos: 'true',
        locale: 'en'
    });
    // If month is specified, filter by that month in the current year
    if (month !== undefined && month >= 1 && month <= 12) {
        const currentYear = new Date().getFullYear();
        const monthStart = new Date(currentYear, month - 1, 1);
        const monthEnd = new Date(currentYear, month, 0, 23, 59, 59);
        params.append('d1', monthStart.toISOString().split('T')[0]);
        params.append('d2', monthEnd.toISOString().split('T')[0]);
        params.append('month', month.toString());
    } else {
        // Default: Get observations from the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        params.append('d1', thirtyDaysAgo.toISOString().split('T')[0]);
    }
    const response = await fetch(`${BASE_URL}/observations?${params}`);
    if (!response.ok) {
        throw new Error(`iNaturalist API error: ${response.status}`);
    }
    const data = await response.json();
    const observations = data.results.filter((obs)=>obs.taxon && obs.geojson?.coordinates).map((obs)=>({
            id: obs.id,
            speciesId: obs.taxon.id,
            speciesName: obs.taxon.name,
            commonName: obs.taxon.preferred_common_name || obs.taxon.name,
            photoUrl: obs.photos?.[0]?.url?.replace('square', 'medium') || null,
            lng: obs.geojson.coordinates[0],
            lat: obs.geojson.coordinates[1],
            observedOn: obs.observed_on_string || '',
            placeGuess: obs.place_guess || '',
            iconicTaxon: obs.taxon.iconic_taxon_name || undefined
        }));
    const result = {
        observations,
        totalCount: data.total_results
    };
    setCache(cacheKey, result);
    return result;
}
async function getSpeciesDetails(taxonId) {
    const cacheKey = `taxon-${taxonId}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;
    const response = await fetch(`${BASE_URL}/taxa/${taxonId}?locale=en`);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    const taxon = data.results[0];
    if (!taxon) return null;
    const species = {
        id: taxon.id,
        name: taxon.name,
        commonName: taxon.preferred_common_name || taxon.name,
        photoUrl: taxon.default_photo?.medium_url || null,
        observationCount: taxon.observations_count || 0,
        iconicTaxon: taxon.iconic_taxon_name || 'unknown',
        wikipediaUrl: taxon.wikipedia_url,
        rank: taxon.rank || 'species'
    };
    setCache(cacheKey, species);
    return species;
}
async function getSeasonalHistogram(taxonId, coords, radius = 25) {
    const cacheKey = `histogram-${taxonId}-${coords.lat}-${coords.lng}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;
    const params = new URLSearchParams({
        taxon_id: taxonId.toString(),
        lat: coords.lat.toString(),
        lng: coords.lng.toString(),
        radius: radius.toString(),
        date_field: 'observed',
        interval: 'month_of_year'
    });
    const response = await fetch(`${BASE_URL}/observations/histogram?${params}`);
    if (!response.ok) {
        return Array(12).fill(0);
    }
    const data = await response.json();
    const monthData = data.results?.month_of_year || {};
    // Convert to array indexed 0-11
    const histogram = Array(12).fill(0);
    for(let month = 1; month <= 12; month++){
        histogram[month - 1] = monthData[month] || 0;
    }
    setCache(cacheKey, histogram);
    return histogram;
}
}),
"[project]/src/lib/mockData.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock data for demonstration when API is unavailable
__turbopack_context__.s([
    "MOCK_OBSERVATIONS",
    ()=>MOCK_OBSERVATIONS,
    "MOCK_SPECIES",
    ()=>MOCK_SPECIES,
    "getMockSpeciesForMonth",
    ()=>getMockSpeciesForMonth
]);
const MOCK_SPECIES = [
    {
        id: 144351,
        name: 'Junco hyemalis',
        commonName: 'Dark-eyed Junco',
        photoUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/1234/medium.jpg',
        observationCount: 2847,
        iconicTaxon: 'Aves',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Dark-eyed_junco',
        rank: 'species'
    },
    {
        id: 47219,
        name: 'Taraxacum officinale',
        commonName: 'Common Dandelion',
        photoUrl: null,
        observationCount: 2156,
        iconicTaxon: 'Plantae',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Taraxacum_officinale',
        rank: 'species'
    },
    {
        id: 18205,
        name: 'Corvus brachyrhynchos',
        commonName: 'American Crow',
        photoUrl: null,
        observationCount: 1932,
        iconicTaxon: 'Aves',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/American_crow',
        rank: 'species'
    },
    {
        id: 47126,
        name: 'Sciurus griseus',
        commonName: 'Western Gray Squirrel',
        photoUrl: null,
        observationCount: 1654,
        iconicTaxon: 'Mammalia',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Western_gray_squirrel',
        rank: 'species'
    },
    {
        id: 55745,
        name: 'Agaricus campestris',
        commonName: 'Field Mushroom',
        photoUrl: null,
        observationCount: 876,
        iconicTaxon: 'Fungi',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Agaricus_campestris',
        rank: 'species'
    },
    {
        id: 47588,
        name: 'Vanessa atalanta',
        commonName: 'Red Admiral',
        photoUrl: null,
        observationCount: 743,
        iconicTaxon: 'Insecta',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Red_admiral',
        rank: 'species'
    },
    {
        id: 26716,
        name: 'Sceloporus occidentalis',
        commonName: 'Western Fence Lizard',
        photoUrl: null,
        observationCount: 621,
        iconicTaxon: 'Reptilia',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Western_fence_lizard',
        rank: 'species'
    },
    {
        id: 65832,
        name: 'Pseudacris regilla',
        commonName: 'Pacific Tree Frog',
        photoUrl: null,
        observationCount: 534,
        iconicTaxon: 'Amphibia',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Pacific_tree_frog',
        rank: 'species'
    },
    {
        id: 48978,
        name: 'Helix aspersa',
        commonName: 'Garden Snail',
        photoUrl: null,
        observationCount: 412,
        iconicTaxon: 'Mollusca',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Cornu_aspersum',
        rank: 'species'
    },
    {
        id: 43584,
        name: 'Argiope aurantia',
        commonName: 'Yellow Garden Spider',
        photoUrl: null,
        observationCount: 298,
        iconicTaxon: 'Arachnida',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Argiope_aurantia',
        rank: 'species'
    }
];
const MOCK_OBSERVATIONS = [
    {
        id: 1,
        speciesId: 144351,
        speciesName: 'Junco hyemalis',
        commonName: 'Dark-eyed Junco',
        photoUrl: null,
        lat: 37.7749,
        lng: -122.4194,
        observedOn: '2024-01-15',
        placeGuess: 'Golden Gate Park, San Francisco',
        iconicTaxon: 'Aves'
    },
    {
        id: 2,
        speciesId: 47219,
        speciesName: 'Taraxacum officinale',
        commonName: 'Common Dandelion',
        photoUrl: null,
        lat: 37.7685,
        lng: -122.4836,
        observedOn: '2024-01-14',
        placeGuess: 'Ocean Beach, San Francisco',
        iconicTaxon: 'Plantae'
    },
    {
        id: 3,
        speciesId: 18205,
        speciesName: 'Corvus brachyrhynchos',
        commonName: 'American Crow',
        photoUrl: null,
        lat: 37.8024,
        lng: -122.4058,
        observedOn: '2024-01-13',
        placeGuess: 'Crissy Field, San Francisco',
        iconicTaxon: 'Aves'
    }
];
function getMockSpeciesForMonth(month) {
    // Shuffle and vary counts slightly based on month
    return MOCK_SPECIES.map((species, index)=>({
            ...species,
            observationCount: Math.floor(species.observationCount * (0.5 + Math.sin((month + index) * 0.5) * 0.5))
        })).sort((a, b)=>b.observationCount - a.observationCount);
}
}),
"[project]/src/app/api/observations/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$inaturalist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/inaturalist.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mockData.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const lat = parseFloat(searchParams.get('lat') || '');
    const lng = parseFloat(searchParams.get('lng') || '');
    const radius = parseInt(searchParams.get('radius') || '5');
    const limit = parseInt(searchParams.get('limit') || '100');
    const monthParam = searchParams.get('month');
    const month = monthParam ? parseInt(monthParam) : undefined;
    if (isNaN(lat) || isNaN(lng)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid coordinates. Provide lat and lng.'
        }, {
            status: 400
        });
    }
    if (month !== undefined && (month < 1 || month > 12)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Month must be between 1 and 12.'
        }, {
            status: 400
        });
    }
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$inaturalist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecentObservations"])({
            lat,
            lng
        }, radius, limit, month);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        console.error('Observations API error:', error);
        // Fallback to mock data
        // Generate some mock observations around the given coordinates
        const mockObs = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MOCK_OBSERVATIONS"].map((obs, i)=>({
                ...obs,
                id: i + 1,
                lat: lat + (Math.random() - 0.5) * 0.05,
                lng: lng + (Math.random() - 0.5) * 0.05
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            observations: mockObs,
            totalCount: mockObs.length,
            isMock: true
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6b1992ae._.js.map
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useGeolocation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGeolocation",
    ()=>useGeolocation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
// Default to San Francisco for demo/fallback
const DEFAULT_COORDS = {
    lat: 37.7749,
    lng: -122.4194
};
function useGeolocation() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        coordinates: DEFAULT_COORDS,
        error: null,
        loading: true
    });
    const requestLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGeolocation.useCallback[requestLocation]": ()=>{
            setState({
                "useGeolocation.useCallback[requestLocation]": (prev)=>({
                        ...prev,
                        loading: true,
                        error: null
                    })
            }["useGeolocation.useCallback[requestLocation]"]);
            if (!navigator.geolocation) {
                setState({
                    coordinates: DEFAULT_COORDS,
                    error: 'Geolocation not supported. Using San Francisco as default.',
                    loading: false
                });
                return;
            }
            navigator.geolocation.getCurrentPosition({
                "useGeolocation.useCallback[requestLocation]": (position)=>{
                    setState({
                        coordinates: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        error: null,
                        loading: false
                    });
                }
            }["useGeolocation.useCallback[requestLocation]"], {
                "useGeolocation.useCallback[requestLocation]": (error)=>{
                    let errorMessage = 'Unable to get location.';
                    switch(error.code){
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Location permission denied. Using San Francisco as default.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Location unavailable. Using San Francisco as default.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Location request timed out. Using San Francisco as default.';
                            break;
                    }
                    setState({
                        coordinates: DEFAULT_COORDS,
                        error: errorMessage,
                        loading: false
                    });
                }
            }["useGeolocation.useCallback[requestLocation]"], {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000
            });
        }
    }["useGeolocation.useCallback[requestLocation]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGeolocation.useEffect": ()=>{
            requestLocation();
        }
    }["useGeolocation.useEffect"], [
        requestLocation
    ]);
    const setManualLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGeolocation.useCallback[setManualLocation]": (coords)=>{
            setState({
                coordinates: coords,
                error: null,
                loading: false
            });
        }
    }["useGeolocation.useCallback[setManualLocation]"], []);
    return {
        ...state,
        requestLocation,
        setManualLocation,
        isDefault: state.coordinates?.lat === DEFAULT_COORDS.lat && state.coordinates?.lng === DEFAULT_COORDS.lng
    };
}
_s(useGeolocation, "B+9GgBdqroWcg8MENIEMUAXEQBM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TitleCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TitleCard",
    ()=>TitleCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function TitleCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-4 left-4 z-50 bg-white border border-black px-4 py-3 pointer-events-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-sm font-medium uppercase tracking-wider text-black",
                children: "Around Me on Earth"
            }, void 0, false, {
                fileName: "[project]/src/components/TitleCard.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-600 mt-0.5 uppercase tracking-wide",
                children: "Discover wildlife around you"
            }, void 0, false, {
                fileName: "[project]/src/components/TitleCard.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TitleCard.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = TitleCard;
var _c;
__turbopack_context__.k.register(_c, "TitleCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Core types for the Species Neighbor app
__turbopack_context__.s([
    "ICONIC_TAXON_EMOJI",
    ()=>ICONIC_TAXON_EMOJI,
    "ICONIC_TAXON_LABELS",
    ()=>ICONIC_TAXON_LABELS,
    "MONTH_NAMES",
    ()=>MONTH_NAMES
]);
const ICONIC_TAXON_LABELS = {
    Plantae: 'Plants',
    Aves: 'Birds',
    Mammalia: 'Mammals',
    Reptilia: 'Reptiles',
    Amphibia: 'Amphibians',
    Insecta: 'Insects',
    Arachnida: 'Spiders',
    Mollusca: 'Mollusks',
    Actinopterygii: 'Fish',
    Fungi: 'Fungi',
    unknown: 'Other'
};
const ICONIC_TAXON_EMOJI = {
    Plantae: '🌿',
    Aves: '🐦',
    Mammalia: '🦊',
    Reptilia: '🦎',
    Amphibia: '🐸',
    Insecta: '🦋',
    Arachnida: '🕷️',
    Mollusca: '🐌',
    Actinopterygii: '🐟',
    Fungi: '🍄',
    unknown: '🔬'
};
const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SeasonSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeasonSelector",
    ()=>SeasonSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
'use client';
;
;
function SeasonSelector({ selectedMonth, onMonthChange }) {
    const currentMonth = new Date().getMonth() + 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium uppercase tracking-wider text-black",
                        children: "Season"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SeasonSelector.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    selectedMonth !== currentMonth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onMonthChange(currentMonth),
                        className: "text-xs text-black hover:underline uppercase tracking-wide",
                        children: "Back to now"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SeasonSelector.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SeasonSelector.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-1",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MONTH_NAMES"].map((name, index)=>{
                    const month = index + 1;
                    const isSelected = month === selectedMonth;
                    const isCurrent = month === currentMonth;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onMonthChange(month),
                        className: `
                px-2 py-1.5 border text-xs font-medium uppercase tracking-wide
                transition-all duration-150
                ${isSelected ? 'bg-black text-white border-black' : isCurrent ? 'bg-white text-black border-black hover:bg-black hover:text-white' : 'bg-white text-black border-black hover:bg-black hover:text-white'}
              `,
                        children: name.slice(0, 3)
                    }, month, false, {
                        fileName: "[project]/src/components/SeasonSelector.tsx",
                        lineNumber: 34,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/SeasonSelector.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SeasonSelector.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = SeasonSelector;
var _c;
__turbopack_context__.k.register(_c, "SeasonSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TaxonFilter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaxonFilter",
    ()=>TaxonFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
'use client';
;
;
const TAXON_ORDER = [
    'all',
    'Aves',
    'Mammalia',
    'Plantae',
    'Insecta',
    'Reptilia',
    'Amphibia',
    'Fungi',
    'Arachnida',
    'Mollusca',
    'Actinopterygii'
];
function TaxonFilter({ selected, onSelect, counts }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-1",
        children: TAXON_ORDER.map((taxon)=>{
            const isAll = taxon === 'all';
            const isSelected = taxon === selected;
            const count = isAll ? Object.values(counts || {}).reduce((a, b)=>a + b, 0) : counts?.[taxon] || 0;
            if (!isAll && count === 0 && !isSelected) return null;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onSelect(taxon),
                className: `
              flex items-center gap-1.5 px-2 py-1.5 border
              text-xs font-medium uppercase tracking-wide transition-all duration-150
              ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-black border-black hover:bg-black hover:text-white'}
            `,
                children: [
                    !isAll && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONIC_TAXON_EMOJI"][taxon]
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaxonFilter.tsx",
                        lineNumber: 51,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: isAll ? 'All' : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONIC_TAXON_LABELS"][taxon]
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaxonFilter.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this),
                    count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `
                text-xs px-1.5
                ${isSelected ? 'bg-white text-black' : 'bg-black text-white'}
              `,
                        children: count
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaxonFilter.tsx",
                        lineNumber: 57,
                        columnNumber: 15
                    }, this)
                ]
            }, taxon, true, {
                fileName: "[project]/src/components/TaxonFilter.tsx",
                lineNumber: 38,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/TaxonFilter.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = TaxonFilter;
var _c;
__turbopack_context__.k.register(_c, "TaxonFilter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FiltersPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FiltersPanel",
    ()=>FiltersPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SeasonSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SeasonSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TaxonFilter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TaxonFilter.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function FiltersPanel({ selectedMonth, selectedTaxon, onMonthChange, onTaxonChange, taxonCounts }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-4 left-4 z-50 bg-white border border-black p-4 pointer-events-auto w-[244px]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SeasonSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeasonSelector"], {
                        selectedMonth: selectedMonth,
                        onMonthChange: onMonthChange
                    }, void 0, false, {
                        fileName: "[project]/src/components/FiltersPanel.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/FiltersPanel.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-1.5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium uppercase tracking-wider text-black",
                                children: "Type"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FiltersPanel.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/FiltersPanel.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TaxonFilter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaxonFilter"], {
                            selected: selectedTaxon,
                            onSelect: onTaxonChange,
                            counts: taxonCounts
                        }, void 0, false, {
                            fileName: "[project]/src/components/FiltersPanel.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/FiltersPanel.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FiltersPanel.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/FiltersPanel.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = FiltersPanel;
var _c;
__turbopack_context__.k.register(_c, "FiltersPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ChatInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatInterface",
    ()=>ChatInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ChatInterface({ selectedSpecies }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Scroll to bottom when messages change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatInterface.useEffect"], [
        messages
    ]);
    // Initialize with species info when selectedSpecies changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            if (selectedSpecies && messages.length === 0) {
                const emoji = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONIC_TAXON_EMOJI"][selectedSpecies.iconicTaxon] || '🔬';
                const welcomeMessage = `I see you're interested in the ${selectedSpecies.commonName} (${selectedSpecies.name}). 
I can help you learn more about this species - its habitat, behavior, identification tips, and more. What would you like to know?`;
                setMessages([
                    {
                        role: 'assistant',
                        content: welcomeMessage
                    }
                ]);
            } else if (!selectedSpecies && messages.length > 0) {
                // Clear messages when no species is selected
                setMessages([]);
            }
        }
    }["ChatInterface.useEffect"], [
        selectedSpecies
    ]);
    const handleSend = async ()=>{
        if (!input.trim() || loading || !selectedSpecies) return;
        const userMessage = input.trim();
        setInput('');
        setLoading(true);
        // Add user message
        const newMessages = [
            ...messages,
            {
                role: 'user',
                content: userMessage
            }
        ];
        setMessages(newMessages);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: newMessages,
                    speciesData: selectedSpecies
                })
            });
            if (!response.ok) {
                throw new Error('Failed to get response');
            }
            const data = await response.json();
            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content: data.content
                }
            ]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again.'
                }
            ]);
        } finally{
            setLoading(false);
            inputRef.current?.focus();
        }
    };
    const handleKeyPress = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    const emoji = selectedSpecies ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONIC_TAXON_EMOJI"][selectedSpecies.iconicTaxon] || '🔬' : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute right-4 top-4 bottom-4 w-[400px] bg-white border border-black shadow-lg z-50 pointer-events-auto flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-black",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xs font-medium uppercase tracking-wider text-black mb-1",
                        children: "Species AI"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    selectedSpecies ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex items-start gap-3",
                        children: [
                            selectedSpecies.photoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 relative bg-gray-100 border border-black overflow-hidden shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: selectedSpecies.photoUrl,
                                    alt: selectedSpecies.commonName,
                                    fill: true,
                                    className: "object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatInterface.tsx",
                                    lineNumber: 116,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatInterface.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 flex items-center justify-center bg-gray-100 border border-black shrink-0 text-2xl",
                                children: emoji
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatInterface.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium uppercase tracking-wide text-black truncate",
                                        children: selectedSpecies.commonName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatInterface.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-600 italic truncate mt-0.5",
                                        children: selectedSpecies.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatInterface.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatInterface.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600 uppercase tracking-wide mt-2",
                        children: "Click on a species observation to start chatting"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatInterface.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-6 space-y-4",
                children: [
                    messages.length === 0 && selectedSpecies ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-600 uppercase tracking-wide",
                            children: "Ask me anything about this species!"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatInterface.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this) : messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-600 uppercase tracking-wide",
                            children: "Select a species observation to learn more"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatInterface.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this) : messages.map((msg, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-[80%] p-3 border border-black ${msg.role === 'user' ? 'bg-black text-white' : 'bg-white text-black'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs leading-relaxed whitespace-pre-wrap",
                                    children: msg.content
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatInterface.tsx",
                                    lineNumber: 171,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatInterface.tsx",
                                lineNumber: 164,
                                columnNumber: 15
                            }, this)
                        }, idx, false, {
                            fileName: "[project]/src/components/ChatInterface.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border border-black p-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-black animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatInterface.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-black animate-pulse",
                                        style: {
                                            animationDelay: '0.2s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatInterface.tsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-black animate-pulse",
                                        style: {
                                            animationDelay: '0.4s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatInterface.tsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatInterface.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatInterface.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatInterface.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatInterface.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            selectedSpecies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-t border-black",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            type: "text",
                            value: input,
                            onChange: (e)=>setInput(e.target.value),
                            onKeyPress: handleKeyPress,
                            placeholder: "Ask about this species...",
                            disabled: loading,
                            className: "flex-1 px-4 py-2 border border-black bg-white text-black text-xs placeholder-gray-500 uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatInterface.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSend,
                            disabled: !input.trim() || loading,
                            className: "px-6 py-2 bg-black text-white border border-black text-xs font-medium uppercase tracking-wide hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                            children: "Send"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatInterface.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ChatInterface.tsx",
                    lineNumber: 195,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChatInterface.tsx",
                lineNumber: 194,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChatInterface.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_s(ChatInterface, "1DTMb8gmE5J8UQvzkUXdhA5Aw4Q=");
_c = ChatInterface;
var _c;
__turbopack_context__.k.register(_c, "ChatInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/inaturalist.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SpeciesModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SpeciesPanel",
    ()=>SpeciesPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$inaturalist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/inaturalist.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function SpeciesPanel({ species, coordinates, onClose }) {
    _s();
    const [histogram, setHistogram] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const emoji = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONIC_TAXON_EMOJI"][species.iconicTaxon] || '🔬';
    const taxonLabel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONIC_TAXON_LABELS"][species.iconicTaxon] || 'Species';
    const currentMonth = new Date().getMonth();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpeciesPanel.useEffect": ()=>{
            async function loadHistogram() {
                setLoading(true);
                try {
                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$inaturalist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSeasonalHistogram"])(species.id, coordinates);
                    setHistogram(data);
                } catch (error) {
                    console.error('Failed to load histogram:', error);
                }
                setLoading(false);
            }
            loadHistogram();
        }
    }["SpeciesPanel.useEffect"], [
        species.id,
        coordinates
    ]);
    // Find peak months
    const maxObs = histogram ? Math.max(...histogram) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50 pointer-events-auto",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/src/components/SpeciesModal.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative bg-white border border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-64 bg-gray-100 border-b border-black",
                        children: [
                            species.photoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: species.photoUrl.replace('medium', 'large'),
                                alt: species.commonName,
                                fill: true,
                                className: "object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full flex items-center justify-center text-6xl",
                                children: emoji
                            }, void 0, false, {
                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "absolute top-4 right-4 w-10 h-10 bg-white border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    strokeWidth: 2,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SpeciesModal.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SpeciesModal.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-3 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-medium uppercase tracking-wider text-black mb-1",
                                                children: species.commonName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                                lineNumber: 79,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600 italic",
                                                children: species.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                                lineNumber: 82,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 px-3 py-1.5 border border-black bg-white text-xs text-black uppercase tracking-wide flex items-center gap-1.5",
                                        children: [
                                            emoji,
                                            " ",
                                            taxonLabel
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 border border-black p-4 bg-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-3xl font-medium text-black",
                                                children: species.observationCount.toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600 mt-1 uppercase tracking-wide",
                                                children: "observations nearby"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                                lineNumber: 96,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 border border-black p-4 bg-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-3xl font-medium text-black capitalize",
                                                children: species.rank
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                                lineNumber: 99,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600 mt-1 uppercase tracking-wide",
                                                children: "taxonomic rank"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                                lineNumber: 102,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-medium uppercase tracking-wider text-black mb-4",
                                        children: "When to spot nearby"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-32 flex items-center justify-center border border-black",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-5 h-5 border-2 border-black border-t-transparent animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SpeciesModal.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this) : histogram ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-end gap-1 h-32 border border-black p-2",
                                        children: histogram.map((count, index)=>{
                                            const height = maxObs > 0 ? count / maxObs * 100 : 0;
                                            const isCurrent = index === currentMonth;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 flex flex-col items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-full transition-all ${isCurrent ? 'bg-black' : count > 0 ? 'bg-gray-400' : 'bg-gray-200'}`,
                                                        style: {
                                                            height: `${Math.max(height, 4)}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[10px] uppercase tracking-wide ${isCurrent ? 'text-black font-medium' : 'text-gray-600'}`,
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MONTH_NAMES"][index].slice(0, 1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                                lineNumber: 123,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-600 uppercase tracking-wide border border-black p-4",
                                        children: "No seasonal data available"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    species.wikipediaUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: species.wikipediaUrl,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "flex-1 py-3 px-4 border border-black bg-white text-black text-xs font-medium text-center uppercase tracking-wide hover:bg-black hover:text-white transition",
                                        children: "Wikipedia"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `https://www.inaturalist.org/taxa/${species.id}`,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "flex-1 py-3 px-4 border border-black bg-black text-white text-xs font-medium text-center uppercase tracking-wide hover:bg-white hover:text-black transition",
                                        children: "View on iNaturalist"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SpeciesModal.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SpeciesModal.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SpeciesModal.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SpeciesModal.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SpeciesModal.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(SpeciesPanel, "SKRxul2n9nhh4QWuclMy8dGh/4M=");
_c = SpeciesPanel;
var _c;
__turbopack_context__.k.register(_c, "SpeciesPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGeolocation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useGeolocation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TitleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TitleCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FiltersPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FiltersPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChatInterface.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SpeciesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SpeciesModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
// Dynamic import for map (client-side only, no SSR)
const ObservationMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/ObservationMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.ObservationMap), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/ObservationMap.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full bg-white flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-600 uppercase tracking-wide",
                children: "Loading map..."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
_c = ObservationMap;
function Home() {
    _s();
    const { coordinates } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGeolocation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGeolocation"])();
    const [species, setSpecies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [observations, setObservations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedMonth, setSelectedMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().getMonth() + 1);
    const [selectedTaxon, setSelectedTaxon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedSpecies, setSelectedSpecies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusedSpeciesId, setFocusedSpeciesId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoveredObservation, setHoveredObservation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch species when location or month changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            async function fetchData() {
                setLoading(true);
                setError(null);
                try {
                    const lat = coordinates.lat;
                    const lng = coordinates.lng;
                    const [speciesRes, obsRes] = await Promise.all([
                        fetch(`/api/species?lat=${lat}&lng=${lng}&month=${selectedMonth}&limit=100`),
                        fetch(`/api/observations?lat=${lat}&lng=${lng}&radius=5&limit=200&month=${selectedMonth}`)
                    ]);
                    if (!speciesRes.ok) throw new Error('Failed to fetch species');
                    if (!obsRes.ok) throw new Error('Failed to fetch observations');
                    const speciesData = await speciesRes.json();
                    const obsData = await obsRes.json();
                    setSpecies(speciesData.species || []);
                    setObservations(obsData.observations || []);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Something went wrong');
                } finally{
                    setLoading(false);
                }
            }
            fetchData();
        }
    }["Home.useEffect"], [
        coordinates,
        selectedMonth
    ]);
    // Count species by taxon for filters
    const taxonCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[taxonCounts]": ()=>{
            const counts = {};
            species.forEach({
                "Home.useMemo[taxonCounts]": (s)=>{
                    const taxon = s.iconicTaxon || 'unknown';
                    counts[taxon] = (counts[taxon] || 0) + 1;
                }
            }["Home.useMemo[taxonCounts]"]);
            return counts;
        }
    }["Home.useMemo[taxonCounts]"], [
        species
    ]);
    // Filter observations by month and taxon
    const filteredObservations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[filteredObservations]": ()=>{
            // Create a map of species IDs to their iconic taxon for quick lookup (fallback)
            const speciesTaxonMap = new Map();
            species.forEach({
                "Home.useMemo[filteredObservations]": (s)=>{
                    speciesTaxonMap.set(s.id, s.iconicTaxon);
                }
            }["Home.useMemo[filteredObservations]"]);
            return observations.filter({
                "Home.useMemo[filteredObservations]": (obs)=>{
                    // Filter by taxon
                    if (selectedTaxon !== 'all') {
                        // First try to use the taxon from the observation itself (preferred)
                        // Fall back to looking it up in the species array if not available
                        const obsTaxon = obs.iconicTaxon || speciesTaxonMap.get(obs.speciesId);
                        // Only include observations whose taxon matches the selected taxon
                        // If taxon is unknown/undefined, exclude it when filtering
                        if (!obsTaxon || obsTaxon !== selectedTaxon) {
                            return false;
                        }
                    }
                    // Filter by month (extract month from observedOn date string)
                    if (obs.observedOn) {
                        try {
                            const obsDate = new Date(obs.observedOn);
                            const obsMonth = obsDate.getMonth() + 1; // getMonth() returns 0-11
                            if (obsMonth !== selectedMonth) {
                                return false;
                            }
                        } catch (e) {
                        // If date parsing fails, include the observation
                        }
                    }
                    return true;
                }
            }["Home.useMemo[filteredObservations]"]);
        }
    }["Home.useMemo[filteredObservations]"], [
        observations,
        species,
        selectedTaxon,
        selectedMonth
    ]);
    // Clear focused species when filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            setFocusedSpeciesId(null);
        }
    }["Home.useEffect"], [
        selectedTaxon,
        selectedMonth
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "h-screen w-screen overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ObservationMap, {
                    center: coordinates,
                    observations: filteredObservations,
                    species: species,
                    focusedSpeciesId: focusedSpeciesId,
                    onObservationClick: (obs)=>{
                        const found = species.find((s)=>s.id === obs.speciesId);
                        if (found) {
                            setSelectedSpecies(found);
                        // Don't open modal anymore - chat will show the info
                        }
                    },
                    onObservationHover: setHoveredObservation,
                    hoveredObservationId: hoveredObservation?.id || null
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TitleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TitleCard"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FiltersPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiltersPanel"], {
                selectedMonth: selectedMonth,
                selectedTaxon: selectedTaxon,
                onMonthChange: setSelectedMonth,
                onTaxonChange: setSelectedTaxon,
                taxonCounts: taxonCounts
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatInterface"], {
                selectedSpecies: selectedSpecies
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            selectedSpecies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SpeciesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpeciesPanel"], {
                species: selectedSpecies,
                coordinates: coordinates,
                onClose: ()=>{
                    setSelectedSpecies(null);
                    setFocusedSpeciesId(null);
                }
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s(Home, "MgvHlxqhJOsxO/8ufppdDvWGi+I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGeolocation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGeolocation"]
    ];
});
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "ObservationMap");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_26a7d71b._.js.map
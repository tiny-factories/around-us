(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ObservationMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ObservationMap",
    ()=>ObservationMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ObservationMap({ center, observations, species = [], focusedSpeciesId, onObservationClick, onObservationHover, hoveredObservationId }) {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mapInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const leafletRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoverCardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hoveredObservation, setHoveredObservation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoverPosition, setHoverPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Store original positions for cluster spreading
    const originalPositionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const observationMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const spreadMarkersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // Initialize map (only once)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ObservationMap.useEffect": ()=>{
            // Add Leaflet CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
            link.crossOrigin = '';
            document.head.appendChild(link);
            // Dynamic import Leaflet
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "ObservationMap.useEffect": (L)=>{
                    if (!mapRef.current || mapInstanceRef.current) return;
                    leafletRef.current = L;
                    // Create map
                    const map = L.map(mapRef.current, {
                        zoomControl: false,
                        attributionControl: false
                    }).setView([
                        center.lat,
                        center.lng
                    ], 13);
                    mapInstanceRef.current = map;
                    // Add minimal tile layer (CartoDB Positron - clean, minimal style)
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                        subdomains: 'abcd',
                        maxZoom: 19
                    }).addTo(map);
                    setIsLoaded(true);
                }
            }["ObservationMap.useEffect"]);
            return ({
                "ObservationMap.useEffect": ()=>{
                    if (mapInstanceRef.current) {
                        mapInstanceRef.current.remove();
                        mapInstanceRef.current = null;
                    }
                    markersRef.current = [];
                    const existingLink = document.querySelector('link[href*="leaflet.css"]');
                    if (existingLink) {
                        existingLink.remove();
                    }
                }
            })["ObservationMap.useEffect"];
        }
    }["ObservationMap.useEffect"], []); // Only run once on mount
    // Track previous center to detect when user location is found
    const previousCenterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Update map center when center changes (smooth pan to user location)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ObservationMap.useEffect": ()=>{
            if (mapInstanceRef.current && isLoaded) {
                // If this is the first center (map initialization), just set it
                if (!previousCenterRef.current) {
                    mapInstanceRef.current.setView([
                        center.lat,
                        center.lng
                    ], 13);
                    previousCenterRef.current = center;
                    return;
                }
                // If center changed (user location found), smoothly pan to it
                const prevCenter = previousCenterRef.current;
                const hasChanged = prevCenter.lat !== center.lat || prevCenter.lng !== center.lng;
                if (hasChanged) {
                    // Smoothly pan to the new location
                    mapInstanceRef.current.flyTo([
                        center.lat,
                        center.lng
                    ], 13, {
                        duration: 1.5,
                        easeLinearity: 0.25
                    });
                    previousCenterRef.current = center;
                }
            }
        }
    }["ObservationMap.useEffect"], [
        center.lat,
        center.lng,
        isLoaded
    ]);
    // Update markers when observations change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ObservationMap.useEffect": ()=>{
            if (!mapInstanceRef.current || !leafletRef.current || !isLoaded) return;
            const L = leafletRef.current;
            const map = mapInstanceRef.current;
            // Remove all existing markers
            markersRef.current.forEach({
                "ObservationMap.useEffect": (marker)=>{
                    map.removeLayer(marker);
                }
            }["ObservationMap.useEffect"]);
            markersRef.current = [];
            // Store observation to marker mapping
            observationMapRef.current.clear();
            originalPositionsRef.current.clear();
            // Helper function to calculate distance between two lat/lng points (in meters)
            const getDistance = {
                "ObservationMap.useEffect.getDistance": (lat1, lng1, lat2, lng2)=>{
                    const R = 6371000; // Earth radius in meters
                    const dLat = (lat2 - lat1) * Math.PI / 180;
                    const dLng = (lng2 - lng1) * Math.PI / 180;
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    return R * c;
                }
            }["ObservationMap.useEffect.getDistance"];
            // Helper function to animate marker position
            const animateMarker = {
                "ObservationMap.useEffect.animateMarker": (marker, targetLat, targetLng, duration = 300)=>{
                    const startLat = marker.getLatLng().lat;
                    const startLng = marker.getLatLng().lng;
                    const startTime = Date.now();
                    const animate = {
                        "ObservationMap.useEffect.animateMarker.animate": ()=>{
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            // Easing function (ease-out)
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const currentLat = startLat + (targetLat - startLat) * eased;
                            const currentLng = startLng + (targetLng - startLng) * eased;
                            marker.setLatLng([
                                currentLat,
                                currentLng
                            ]);
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        }
                    }["ObservationMap.useEffect.animateMarker.animate"];
                    requestAnimationFrame(animate);
                }
            }["ObservationMap.useEffect.animateMarker"];
            // Helper function to spread out nearby markers
            const spreadCluster = {
                "ObservationMap.useEffect.spreadCluster": (hoveredMarker, hoveredObs)=>{
                    const CLUSTER_DISTANCE = 50; // meters - markers within this distance will spread
                    const SPREAD_DISTANCE = 15; // meters - how far to spread them
                    const hoveredLat = hoveredObs.lat;
                    const hoveredLng = hoveredObs.lng;
                    const nearbyMarkers = [];
                    // Find all nearby markers
                    markersRef.current.forEach({
                        "ObservationMap.useEffect.spreadCluster": (marker)=>{
                            if (marker === hoveredMarker) return;
                            const obs = observationMapRef.current.get(marker);
                            if (!obs) return;
                            const distance = getDistance(hoveredLat, hoveredLng, obs.lat, obs.lng);
                            if (distance < CLUSTER_DISTANCE) {
                                nearbyMarkers.push({
                                    marker,
                                    obs,
                                    distance
                                });
                            }
                        }
                    }["ObservationMap.useEffect.spreadCluster"]);
                    // If there are nearby markers, spread them out
                    if (nearbyMarkers.length > 0) {
                        const angleStep = 2 * Math.PI / nearbyMarkers.length;
                        nearbyMarkers.forEach({
                            "ObservationMap.useEffect.spreadCluster": (item, index)=>{
                                const angle = index * angleStep;
                                // Calculate new position offset
                                const latOffset = SPREAD_DISTANCE / 111000 * Math.cos(angle); // ~111km per degree latitude
                                const lngOffset = SPREAD_DISTANCE / (111000 * Math.cos(hoveredLat * Math.PI / 180)) * Math.sin(angle);
                                const originalPos = originalPositionsRef.current.get(item.obs.id);
                                if (originalPos) {
                                    const newLat = hoveredLat + latOffset;
                                    const newLng = hoveredLng + lngOffset;
                                    // Smoothly animate to new position
                                    animateMarker(item.marker, newLat, newLng, 300);
                                    spreadMarkersRef.current.add(item.marker);
                                }
                            }
                        }["ObservationMap.useEffect.spreadCluster"]);
                    }
                }
            }["ObservationMap.useEffect.spreadCluster"];
            // Helper function to return markers to original positions
            const returnToOriginalPositions = {
                "ObservationMap.useEffect.returnToOriginalPositions": ()=>{
                    spreadMarkersRef.current.forEach({
                        "ObservationMap.useEffect.returnToOriginalPositions": (marker)=>{
                            const obs = observationMapRef.current.get(marker);
                            if (obs) {
                                const originalPos = originalPositionsRef.current.get(obs.id);
                                if (originalPos) {
                                    animateMarker(marker, originalPos.lat, originalPos.lng, 300);
                                }
                            }
                        }
                    }["ObservationMap.useEffect.returnToOriginalPositions"]);
                    spreadMarkersRef.current.clear();
                }
            }["ObservationMap.useEffect.returnToOriginalPositions"];
            // Add new markers for current observations
            observations.forEach({
                "ObservationMap.useEffect": (obs)=>{
                    const isFocusedSpecies = focusedSpeciesId !== null && focusedSpeciesId !== undefined && obs.speciesId === focusedSpeciesId;
                    const opacity = isFocusedSpecies ? 1.0 : 0.2;
                    const fillOpacity = isFocusedSpecies ? 0.7 : 0.2;
                    const originalLatLng = L.latLng(obs.lat, obs.lng);
                    originalPositionsRef.current.set(obs.id, originalLatLng);
                    const marker = L.circleMarker([
                        obs.lat,
                        obs.lng
                    ], {
                        radius: isFocusedSpecies ? 8 : 6,
                        color: '#000000',
                        fillColor: '#000000',
                        fillOpacity: fillOpacity,
                        opacity: opacity,
                        weight: isFocusedSpecies ? 2 : 1
                    }).addTo(map);
                    // Store observation reference
                    observationMapRef.current.set(marker, obs);
                    marker.bindPopup(`
        <div class="text-sm">
          <p class="font-medium">${obs.commonName}</p>
          <p class="text-gray-500 italic">${obs.speciesName}</p>
          ${obs.observedOn ? `<p class="text-xs text-gray-400 mt-1">${obs.observedOn}</p>` : ''}
        </div>
      `);
                    if (onObservationClick) {
                        marker.on('click', {
                            "ObservationMap.useEffect": ()=>onObservationClick(obs)
                        }["ObservationMap.useEffect"]);
                    }
                    // Handle hover events
                    if (onObservationHover) {
                        marker.on('mouseover', {
                            "ObservationMap.useEffect": (e)=>{
                                const latlng = marker.getLatLng();
                                const containerPoint = map.latLngToContainerPoint(latlng);
                                setHoveredObservation(obs);
                                setHoverPosition({
                                    x: containerPoint.x,
                                    y: containerPoint.y
                                });
                                onObservationHover(obs);
                                // Highlight marker
                                marker.setStyle({
                                    radius: 12,
                                    fillOpacity: 1,
                                    opacity: 1,
                                    color: '#000000',
                                    fillColor: '#000000',
                                    weight: 3
                                });
                                // Spread nearby markers
                                spreadCluster(marker, obs);
                            }
                        }["ObservationMap.useEffect"]);
                        marker.on('mouseout', {
                            "ObservationMap.useEffect": ()=>{
                                setHoveredObservation(null);
                                setHoverPosition(null);
                                onObservationHover(null);
                                // Return markers to original positions
                                returnToOriginalPositions();
                                // Reset marker style
                                const isFocused = focusedSpeciesId !== null && focusedSpeciesId !== undefined && obs.speciesId === focusedSpeciesId;
                                marker.setStyle({
                                    radius: isFocused ? 8 : 6,
                                    fillOpacity: isFocused ? 0.7 : 0.2,
                                    opacity: isFocused ? 1.0 : 0.2,
                                    color: '#000000',
                                    fillColor: '#000000',
                                    weight: isFocused ? 2 : 1
                                });
                            }
                        }["ObservationMap.useEffect"]);
                    }
                    markersRef.current.push(marker);
                }
            }["ObservationMap.useEffect"]);
        }
    }["ObservationMap.useEffect"], [
        observations,
        species,
        isLoaded,
        focusedSpeciesId,
        onObservationClick,
        onObservationHover
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full relative",
        children: [
            !isLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-white flex items-center justify-center z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-gray-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-4 h-4 border-2 border-black border-t-transparent animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ObservationMap.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs uppercase tracking-wide",
                            children: "Loading map..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ObservationMap.tsx",
                            lineNumber: 323,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ObservationMap.tsx",
                    lineNumber: 321,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ObservationMap.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapRef,
                className: "w-full h-full"
            }, void 0, false, {
                fileName: "[project]/src/components/ObservationMap.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            hoveredObservation && hoverPosition && (()=>{
                const speciesData = species.find((s)=>s.id === hoveredObservation.speciesId);
                const emoji = speciesData ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICONIC_TAXON_EMOJI"][speciesData.iconicTaxon] || '' : '';
                // Use species photo if available, otherwise fall back to observation photo
                const photoUrl = speciesData?.photoUrl || hoveredObservation.photoUrl;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: hoverCardRef,
                    className: "absolute z-50 pointer-events-none",
                    style: {
                        left: `${hoverPosition.x + 20}px`,
                        top: `${hoverPosition.y}px`,
                        transform: 'translateY(-50%)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-black p-4 min-w-[280px] max-w-[320px] shadow-lg",
                        children: [
                            photoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-32 mb-3 relative bg-gray-100 border border-black overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: photoUrl,
                                    alt: hoveredObservation.commonName,
                                    fill: true,
                                    className: "object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ObservationMap.tsx",
                                    lineNumber: 350,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ObservationMap.tsx",
                                lineNumber: 349,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-sm uppercase tracking-wide text-black",
                                                        children: hoveredObservation.commonName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ObservationMap.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-600 italic truncate mt-0.5",
                                                        children: hoveredObservation.speciesName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ObservationMap.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ObservationMap.tsx",
                                                lineNumber: 362,
                                                columnNumber: 19
                                            }, this),
                                            emoji && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl shrink-0",
                                                children: emoji
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ObservationMap.tsx",
                                                lineNumber: 371,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ObservationMap.tsx",
                                        lineNumber: 361,
                                        columnNumber: 17
                                    }, this),
                                    hoveredObservation.placeGuess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2 border-t border-black",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600 uppercase tracking-wide",
                                            children: hoveredObservation.placeGuess
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ObservationMap.tsx",
                                            lineNumber: 377,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ObservationMap.tsx",
                                        lineNumber: 376,
                                        columnNumber: 19
                                    }, this),
                                    hoveredObservation.observedOn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 uppercase tracking-wide",
                                        children: new Date(hoveredObservation.observedOn).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ObservationMap.tsx",
                                        lineNumber: 384,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ObservationMap.tsx",
                                lineNumber: 360,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ObservationMap.tsx",
                        lineNumber: 346,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ObservationMap.tsx",
                    lineNumber: 337,
                    columnNumber: 11
                }, this);
            })()
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ObservationMap.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
_s(ObservationMap, "s7lE0pCTcfr+uL5NmXn3xvUq35c=");
_c = ObservationMap;
var _c;
__turbopack_context__.k.register(_c, "ObservationMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ObservationMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/ObservationMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_ObservationMap_tsx_77a9aff1._.js.map
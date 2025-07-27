"use client";
import { useMemo, useState, useEffect } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryObject } from "topojson-specification";
import type { FeatureCollection } from "geojson";
import worldTopo from "world-atlas/countries-110m.json";

interface CountryProperties {
  name: string;
  iso_a3?: string;
}

interface WorldTopology extends Topology {
  objects: {
    countries: GeometryObject<CountryProperties>;
    land: GeometryObject;
  };
}

export default function Map() {
  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 400,
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const maxWidth = isMobile
        ? window.innerWidth - 40
        : window.innerWidth * 0.9;
      const aspectRatio = isMobile ? 2 : 3;

      const containerWidth = Math.min(
        maxWidth,
        isMobile ? window.innerWidth - 40 : 1800,
      );
      const containerHeight = containerWidth / aspectRatio;

      setDimensions({
        width: containerWidth,
        height: containerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const worldGeo = useMemo(() => {
    const topology = worldTopo as unknown as WorldTopology;
    return feature(topology, topology.objects.countries) as FeatureCollection;
  }, []);

  const { pathGenerator, projection } = useMemo(() => {
    const centerLon = (8.4689 + 8.2275 + 69.3451) / 3;
    const centerLat = (60.472 + 46.8182 + 30.3753) / 3;

    const scale = dimensions.width / 3.2;

    const proj = geoMercator()
      .scale(scale)
      .translate([dimensions.width / 2, dimensions.height / 2])
      .center([centerLon, centerLat]);

    const path = geoPath().projection(proj);
    return { projection: proj, pathGenerator: path };
  }, [dimensions]);

  const markerLocations = [
    { country: "Norway", coords: [8.4689, 60.472] },
    { country: "Switzerland", coords: [8.2275, 46.8182] },
    { country: "Pakistan", coords: [69.3451, 30.3753] },
  ];

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="mapClip">
            <rect
              x="0"
              y="0"
              width={dimensions.width}
              height={dimensions.height}
            />
          </clipPath>
          <g id="location-pin">
            <path
              d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
              fill="#c9a227"
            />
            <path
              d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
          </g>
        </defs>

        <g clipPath="url(#mapClip)">
          {worldGeo.features.map((feature) => (
            <path
              key={feature.id || `${feature.properties?.name}-${Math.random()}`}
              d={pathGenerator(feature) || ""}
              fill="#EEE"
              stroke="grey"
              strokeWidth={0.5}
            />
          ))}

          {markerLocations.map((location) => {
            const [x, y] = projection(location.coords as [number, number]) || [
              0, 0,
            ];
            const isMobile = dimensions.width < 768;

            const pinScale = isMobile ? 0.7 : 2;
            const basePinSize = 24;
            const textOffsetY = 15 * pinScale;
            const textSize =
              Math.max(12, dimensions.width / 60) * (isMobile ? 0.9 : 1);

            return (
              <g key={location.country} transform={`translate(${x}, ${y})`}>
                <g transform={`scale(${pinScale})`}>
                  <path
                    d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                    fill="#c9a227"
                    transform={`translate(${-basePinSize / 2}, ${-basePinSize})`}
                  />
                </g>

                <text
                  x="0"
                  y={textOffsetY}
                  fontSize={textSize}
                  fill="#c9a227"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {location.country}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

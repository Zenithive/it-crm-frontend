import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import { IN, US, GB, AU, JP, CA, DE, FR, BR, CN, ZA, RU } from "country-flag-icons/react/3x2";

type FlagComponent = typeof IN;

interface TimeZone {
  name: string;
  zone: string;
}

interface FlagOption {
  id: string;
  code: string;
  component: FlagComponent;
  label: string;
  timeZones: TimeZone[];
}

const HeaderFlag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoneOpen, setIsZoneOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState("in");
  const [selectedZone, setSelectedZone] = useState("Asia/Kolkata");
  const [currentTime, setCurrentTime] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  const flagOptions: FlagOption[] = [
    { id: "india", code: "in", component: IN, label: "India", timeZones: [{ name: "IST", zone: "Asia/Kolkata" }] },
    {
      id: "usa",
      code: "us",
      component: US,
      label: "USA",
      timeZones: [
        { name: "Eastern", zone: "America/New_York" },
        { name: "Central", zone: "America/Chicago" },
        { name: "Mountain", zone: "America/Denver" },
        { name: "Pacific", zone: "America/Los_Angeles" },
      ],
    },
    { id: "uk", code: "gb", component: GB, label: "UK", timeZones: [{ name: "GMT/BST", zone: "Europe/London" }] },
    {
      id: "australia",
      code: "au",
      component: AU,
      label: "Australia",
      timeZones: [
        { name: "AEST/AEDT", zone: "Australia/Sydney" },
        { name: "ACST/ACDT", zone: "Australia/Adelaide" },
        { name: "AWST", zone: "Australia/Perth" },
      ],
    },
    { id: "japan", code: "jp", component: JP, label: "Japan", timeZones: [{ name: "JST", zone: "Asia/Tokyo" }] },
    {
      id: "canada",
      code: "ca",
      component: CA,
      label: "Canada",
      timeZones: [
        { name: "Eastern", zone: "America/Toronto" },
        { name: "Central", zone: "America/Winnipeg" },
        { name: "Mountain", zone: "America/Edmonton" },
        { name: "Pacific", zone: "America/Vancouver" },
      ],
    },
    { id: "germany", code: "de", component: DE, label: "Germany", timeZones: [{ name: "CET/CEST", zone: "Europe/Berlin" }] },
    { id: "france", code: "fr", component: FR, label: "France", timeZones: [{ name: "CET/CEST", zone: "Europe/Paris" }] },
    { id: "brazil", code: "br", component: BR, label: "Brazil", timeZones: [{ name: "BRT", zone: "America/Sao_Paulo" }] },
    { id: "china", code: "cn", component: CN, label: "China", timeZones: [{ name: "CST", zone: "Asia/Shanghai" }] },
    {
      id: "south_africa",
      code: "za",
      component: ZA,
      label: "South Africa",
      timeZones: [{ name: "SAST", zone: "Africa/Johannesburg" }],
    },
    {
      id: "russia",
      code: "ru",
      component: RU,
      label: "Russia",
      timeZones: [
        { name: "Moscow", zone: "Europe/Moscow" },
        { name: "Yekaterinburg", zone: "Asia/Yekaterinburg" },
        { name: "Vladivostok", zone: "Asia/Vladivostok" },
      ],
    },
  ];

  useEffect(() => {
    const updateTime = () => {
      const time = moment().tz(selectedZone).format("hh:mm A");
      setCurrentTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedZone]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        zoneRef.current &&
        !zoneRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsZoneOpen(false);
      }
    };

    if (isOpen || isZoneOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isZoneOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsZoneOpen(false); // Close sub-menu when toggling main dropdown
  };

  const handleFlagSelect = (code: string) => {
    const country = flagOptions.find((flag) => flag.code === code);
    if (country) {
      if (country.timeZones.length > 1) {
        setHoveredCountry(code);
        setIsZoneOpen(true);
      } else {
        setSelectedFlag(code);
        setSelectedZone(country.timeZones[0].zone);
        setIsOpen(false);
        setIsZoneOpen(false);
      }
    }
  };

  const handleZoneSelect = (zone: string) => {
    setSelectedZone(zone);
    if (hoveredCountry) setSelectedFlag(hoveredCountry);
    setIsZoneOpen(false);
    setIsOpen(false);
  };

  const handleFlagHover = (code: string) => {
    const country = flagOptions.find((flag) => flag.code === code);
    if (country && isOpen) {
      if (country.timeZones.length > 1) {
        setHoveredCountry(code);
        setIsZoneOpen(true);
      } else {
        setIsZoneOpen(false); // Close sub-menu if hovering over a single-zone country
        setHoveredCountry(null);
      }
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (
        !dropdownRef.current?.matches(":hover") &&
        !zoneRef.current?.matches(":hover")
      ) {
        setIsZoneOpen(false);
        setHoveredCountry(null);
      }
    }, 100); // Delay to allow mouse to move to sub-menu
  };

  const handleZoneHover = () => {
    setIsZoneOpen(true); // Keep sub-menu open while hovering over it
  };

  const handleScroll = () => {
    setIsZoneOpen(false);
    setHoveredCountry(null);
  };

  const SelectedFlagComponent = flagOptions.find((flag) => flag.code === selectedFlag)?.component;

  return (
    <div>
      <div className="bg-white flex p-4 rounded-xl h-12 space-x-4 shadow-custom relative z-100">
        <button className="flex items-center" onClick={toggleDropdown}>
          {SelectedFlagComponent && <SelectedFlagComponent className="mr-1 h-10 w-10" />}
          <img src="/vector(1).svg" alt="dropdown" className="h-4 w-4 text-gray-500 ml-3" />
          <div className="h-6 w-px bg-bg-blue-11 ml-3"></div>
        </button>

        <div className="text-gray-600 flex justify-center items-center">
          {currentTime} ({flagOptions.find(f => f.code === selectedFlag)?.timeZones.find(tz => tz.zone === selectedZone)?.name})
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-[50px] left-0 bg-white rounded-lg shadow-lg py-2 px-2 w-44 z-10"
          >
            <div
              className="max-h-[200px] overflow-y-auto scroll scrollbar-custom"
              onScroll={handleScroll}
            >
              {flagOptions.map((flag) => (
                <div
                  key={flag.id}
                  onMouseEnter={() => handleFlagHover(flag.code)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleFlagSelect(flag.code)}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded pr-4 relative"
                >
                  <flag.component className="h-8 w-8 mr-2" />
                  <span className="text-sm text-gray-700">{flag.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isZoneOpen && hoveredCountry && (
          <div
            ref={zoneRef}
            className="absolute top-[50px] left-44 bg-white rounded-lg shadow-lg py-2 px-2 w-44 z-10"
            onMouseEnter={handleZoneHover}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-h-[200px] overflow-y-auto scroll scrollbar-custom">
              {flagOptions
                .find((flag) => flag.code === hoveredCountry)
                ?.timeZones.map((tz) => (
                  <div
                    key={tz.zone}
                    onClick={() => handleZoneSelect(tz.zone)}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <span className="text-sm text-gray-700">{tz.name}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderFlag;
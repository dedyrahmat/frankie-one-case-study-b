import { useState, useRef, useEffect, useCallback } from "react";
import CountrySelect from "./country-select";
import { API_URL, getCountryConfig } from "../lib/constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { toast } from "sonner";

export default function AddressForm({ onSuccess }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const config = selectedCountry ? getCountryConfig(selectedCountry) : null;
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["all"],
      componentRestrictions: { country: ["us", "au", "id"] },
      strictBounds: true,
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      setSelectedPlace(placeAutocomplete.getPlace());
    });
  }, [setSelectedPlace, placeAutocomplete]);

  useEffect(() => {
    if (!selectedPlace) return;

    const components = selectedPlace?.address_components;
    const getComponent = (type, useShort = false) => {
      const comp = components?.find((c) => c.types.includes(type));
      if (!comp) return null;
      return useShort ? comp.short_name : comp.long_name;
    };

    const country = getComponent("country", true);
    if (country === "US") setSelectedCountry("USA");
    else if (country === "AU") setSelectedCountry("AUS");
    else setSelectedCountry("IDN");
    // console.log(selectedPlace?.address_components);

    for (const [key, value] of Object.entries(parseGooglePlace(components))) {
      handleInputChange(key, value);
    }
  }, [selectedPlace]);

  const clearAddressAutocompleteInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setFormData({});
    setSelectedPlace(null);
    clearAddressAutocompleteInput();
  };

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!selectedCountry) return;

    setIsLoading(true);
    try {
      const body = {
        countryCode: selectedCountry,
        ...formData,
      };
      console.log(body);
      const response = await fetch(`${API_URL}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        // const errors = result.errors || []
        toast.error("Failed to create address");
        return;
      }

      toast.success("Address saved successfully");

      setSelectedCountry("");
      setFormData({});
      clearAddressAutocompleteInput();
      onSuccess();
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Extracts specific address components from Google Place API response.
   * @param {Array} components - The address_components array from Google.
   */
  function parseGooglePlace(components) {
    // Helper to find a component by type and return long or short name
    const getComponent = (type, useShort = false) => {
      const comp = components?.find((c) => c.types.includes(type));
      if (!comp) return null;
      return useShort ? comp.short_name : comp.long_name;
    };

    // 1. Get Universal Fields
    const countryCode = getComponent("country", true); // e.g., "ID", "US", "AU"
    let postalCode = getComponent("postal_code", true);

    // Construct Address Line 1 (Street Name + Street Number)
    const street = getComponent("route") || "";
    const number = getComponent("street_number") || "";
    const addressLine1 = `${street} ${number}`.trim();

    // 2. Initialize variables
    let city = null;
    let region = null;
    let district = null;
    let village = null;
    let suburb = null;
    let addressLine2 = null;

    // 3. Country-Specific Logic
    switch (countryCode) {
      case "ID": // INDONESIA
        region = getComponent("administrative_area_level_1"); // Province
        city = getComponent("administrative_area_level_2"); // City/Regency
        district = getComponent("administrative_area_level_3"); // Kecamatan
        village = getComponent("administrative_area_level_4"); // Kelurahan/Desa
        // RT/RW often comes in level 6 or neighborhood
        addressLine2 =
          getComponent("administrative_area_level_6") ||
          getComponent("neighborhood");
        break;

      case "AU": // AUSTRALIA
        region = getComponent("administrative_area_level_1", true); // State (NSW, VIC, etc)
        suburb = getComponent("locality"); // In Australia, locality = suburb
        postalCode = getComponent("postal_code");
        addressLine2 = getComponent("subpremise"); // Unit/Level
        break;

      case "US": // USA
        region = getComponent("administrative_area_level_1", true); // State (CA, NY, etc)
        city = getComponent("locality"); // City
        addressLine2 = getComponent("subpremise"); // Apt/Suite
        break;

      default:
        // Generic Fallback
        region = getComponent("administrative_area_level_1");
        city = getComponent("locality");
        break;
    }

    return {
      // countryCode,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      region,
      suburb,
      district,
      village,
    };
  }

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <CountrySelect value={selectedCountry} onChange={handleCountryChange} />
        <Input
          ref={inputRef}
          disabled={selectedCountry === ""}
          placeholder={
            selectedCountry === "" ? "Select a country first" : "Your Address"
          }
        />
        {config && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {config.fields.map((field, index) => (
                <div
                  key={`${field.key}-${index}`}
                  className={
                    field.type === "select" && field.name === "postal_code"
                      ? "md:col-span-1"
                      : ""
                  }
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-destructive">*</span>
                    )}
                  </label>

                  {field.type === "select" ? (
                    <Select
                      value={formData[field.name] || ""}
                      onValueChange={(value) => {
                        handleInputChange(field.name, value);
                      }}
                    >
                      <SelectTrigger id={field.name} className="w-full">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option, index) => (
                          <SelectItem
                            key={`${option.value}-${index}`}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Saving..." : "Save Address"}
            </Button>
          </>
        )}
      </form>
    </div>
  );
}

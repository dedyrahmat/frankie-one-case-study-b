import { countries } from "../lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function CountrySelect({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-foreground"
      >
        Country
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="country" className="w-full">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.id} value={country.id}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

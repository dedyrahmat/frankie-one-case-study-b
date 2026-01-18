import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { countries } from "../lib/constants";
import { Trash2 } from "lucide-react";
import { API_URL } from "../lib/constants";

export default function SavedAddress({ refreshTrigger }) {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, [refreshTrigger]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${API_URL}/addresses`);
      const { data } = await response.json();
      setAddresses(data);
    } catch (error) {
      toast.error("Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  const getCountryName = (countryId) => {
    return countries.find((c) => c.id === countryId)?.name || countryId;
  };

  const formatAddress = (address) => {
    const lines = [address.addressLine1];
    if (address.addressLine2) {
      lines.push(address.addressLine2);
    }
    if (address.countryCode === "USA") {
      lines.push(`${address.city}, ${address.region} ${address.postalCode}`);
    } else if (address.countryCode === "AUS") {
      lines.push(`${address.suburb} ${address.region} ${address.postalCode}`);
    } else if (address.countryCode === "IDN") {
      lines.push(address.village || "");
      lines.push(`${address.district}`);
      lines.push(`${address.region} ${address.postalCode}`);
    }

    return lines.filter((l) => l.trim());
  };

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground">
        Loading addresses...
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No addresses saved yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <Card key={address.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {getCountryName(address.countryCode)}
                </CardTitle>
                <CardDescription>
                  {new Date(address.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(address.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              {formatAddress(address).map((line, i) => (
                <p key={i} className="text-foreground">
                  {line}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

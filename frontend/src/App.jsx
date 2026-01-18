import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import AddressForm from "./components/address-form";
import { useState } from "react";
import SavedAddress from "./components/saved-address";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddressSuccess = () => {
    console.log("Is Success");
    setRefreshTrigger((prev) => prev + 1);
  };
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Dynamic Address Onboarding
          </h1>
          <p className="text-muted-foreground text-lg">
            Add and manage addresses for multiple countries with localized
          </p>
        </div>
        <Tabs defaultValue="add" className="w-full">
          <TabsList>
            <TabsTrigger value="add">Add Address</TabsTrigger>
            <TabsTrigger value="saved">Saved Address</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Address</CardTitle>
                <CardDescription>
                  Select your country and fill in the required fileds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddressForm onSuccess={handleAddressSuccess} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>
                  View and manage your saved addresses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SavedAddress refreshTrigger={refreshTrigger} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default App;

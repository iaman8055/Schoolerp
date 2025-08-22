import { useState } from "react";
import { Bus, MapPin, User, Route, Plus, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Transport() {
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const { toast } = useToast();

  const routes = [
    { id: '1', name: 'Route A - North', driver: 'John Driver', vehicle: 'Bus 001', students: 45, capacity: 50, status: 'Active' },
    { id: '2', name: 'Route B - South', driver: 'Mary Wilson', vehicle: 'Bus 002', students: 38, capacity: 45, status: 'Active' },
    { id: '3', name: 'Route C - East', driver: 'Bob Johnson', vehicle: 'Bus 003', students: 42, capacity: 50, status: 'Maintenance' },
  ];

  const drivers = [
    { id: '1', name: 'John Driver', license: 'DL12345', phone: '+1234567890', experience: 15, status: 'Active' },
    { id: '2', name: 'Mary Wilson', license: 'DL23456', phone: '+1234567891', experience: 12, status: 'Active' },
    { id: '3', name: 'Bob Johnson', license: 'DL34567', phone: '+1234567892', experience: 8, status: 'On Leave' },
  ];

  const vehicles = [
    { id: '1', number: 'Bus 001', capacity: 50, year: 2020, lastMaintenance: '2024-02-15', status: 'Active' },
    { id: '2', number: 'Bus 002', capacity: 45, year: 2019, lastMaintenance: '2024-02-10', status: 'Active' },
    { id: '3', number: 'Bus 003', capacity: 50, year: 2021, lastMaintenance: '2024-03-01', status: 'Maintenance' },
  ];

  const studentAllocations = [
    { id: '1', student: 'John Smith', route: 'Route A - North', stop: 'Main Street', fee: 150, status: 'Active' },
    { id: '2', student: 'Emma Johnson', route: 'Route B - South', stop: 'Park Avenue', fee: 150, status: 'Active' },
    { id: '3', student: 'Michael Brown', route: 'Route A - North', stop: 'School Gate', fee: 150, status: 'Pending' },
  ];

  const totalStudents = studentAllocations.length;
  const activeRoutes = routes.filter(r => r.status === 'Active').length;
  const totalCapacity = routes.reduce((acc, route) => acc + route.capacity, 0);
  const totalRevenue = studentAllocations.reduce((acc, allocation) => acc + allocation.fee, 0);

  const handleAddRoute = () => {
    toast({
      title: "Route Added",
      description: "New transport route has been successfully created.",
    });
    setIsAddRouteOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transport Management</h1>
          <p className="text-muted-foreground">Manage bus routes, drivers, and student transport</p>
        </div>
        <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Route</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="routeName">Route Name</Label>
                <Input id="routeName" placeholder="Enter route name" />
              </div>
              <div>
                <Label htmlFor="driver">Assign Driver</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.filter(d => d.status === 'Active').map(driver => (
                      <SelectItem key={driver.id} value={driver.id}>{driver.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="vehicle">Assign Vehicle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.filter(v => v.status === 'Active').map(vehicle => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>{vehicle.number}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddRouteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRoute}>Add Route</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeRoutes}</div>
            <p className="text-xs text-muted-foreground">Out of {routes.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Using transport</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalCapacity}</div>
            <p className="text-xs text-muted-foreground">Student seats</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground">Transport fees</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="students">Student Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle>Transport Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>{route.driver}</TableCell>
                      <TableCell>{route.vehicle}</TableCell>
                      <TableCell>{route.students}/{route.capacity}</TableCell>
                      <TableCell>{route.capacity}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={route.status === 'Active' ? 'default' : 'secondary'}
                        >
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MapPin className="w-3 h-3 mr-1" />
                            Track
                          </Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>Driver Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.license}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.experience} years</TableCell>
                      <TableCell>
                        <Badge 
                          variant={driver.status === 'Active' ? 'default' : 'secondary'}
                        >
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Contact</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.number}</TableCell>
                      <TableCell>{vehicle.capacity}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>{vehicle.lastMaintenance}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={vehicle.status === 'Active' ? 'default' : 'secondary'}
                        >
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Maintenance</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Transport Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Stop</TableHead>
                    <TableHead>Monthly Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentAllocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell className="font-medium">{allocation.student}</TableCell>
                      <TableCell>{allocation.route}</TableCell>
                      <TableCell>{allocation.stop}</TableCell>
                      <TableCell>${allocation.fee}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={allocation.status === 'Active' ? 'default' : 'secondary'}
                        >
                          {allocation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
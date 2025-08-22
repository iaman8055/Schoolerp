import { useState } from "react";
import { Home, Users, DollarSign, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Hostel() {
  const rooms = [
    { id: '1', number: 'H101', capacity: 4, occupied: 3, type: 'Shared', floor: 1, status: 'Available' },
    { id: '2', number: 'H102', capacity: 2, occupied: 2, type: 'Twin', floor: 1, status: 'Full' },
    { id: '3', number: 'H201', capacity: 1, occupied: 1, type: 'Single', floor: 2, status: 'Full' },
  ];

  const students = [
    { id: '1', name: 'John Smith', room: 'H101', checkIn: '2024-01-15', fee: 500, status: 'Active' },
    { id: '2', name: 'Emma Johnson', room: 'H102', checkIn: '2024-01-20', fee: 600, status: 'Active' },
    { id: '3', name: 'Michael Brown', room: 'H201', checkIn: '2024-02-01', fee: 800, status: 'Active' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hostel Management</h1>
          <p className="text-muted-foreground">Manage hostel rooms and student accommodation</p>
        </div>
        <Button>Add New Room</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{rooms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {rooms.reduce((acc, room) => acc + (room.capacity - room.occupied), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${students.reduce((acc, student) => acc + student.fee, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rooms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms">
          <Card>
            <CardHeader>
              <CardTitle>Room Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Occupied</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.number}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.capacity}</TableCell>
                      <TableCell>{room.occupied}</TableCell>
                      <TableCell>{room.floor}</TableCell>
                      <TableCell>
                        <Badge variant={room.status === 'Available' ? 'default' : 'secondary'}>
                          {room.status}
                        </Badge>
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
              <CardTitle>Hostel Students</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in Date</TableHead>
                    <TableHead>Monthly Fee</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.room}</TableCell>
                      <TableCell>{student.checkIn}</TableCell>
                      <TableCell>${student.fee}</TableCell>
                      <TableCell>
                        <Badge variant="default">{student.status}</Badge>
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
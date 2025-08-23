import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Users, Clock, Calendar, MapPin, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Classes = () => {
  const { toast } = useToast();

  const classes = [
    {
      id: 1,
      name: "Grade 9 - Section A",
      grade: "9th Grade",
      section: "A",
      students: 35,
      capacity: 40,
      classTeacher: "Ms. Sarah Johnson",
      room: "Room 101",
      subjects: ["Mathematics", "Science", "English", "History", "Geography"],
      timetable: "Mon-Fri 8:00 AM - 3:00 PM"
    },
    {
      id: 2,
      name: "Grade 10 - Section B",
      grade: "10th Grade", 
      section: "B",
      students: 38,
      capacity: 40,
      classTeacher: "Dr. Jane Wilson",
      room: "Room 205",
      subjects: ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"],
      timetable: "Mon-Fri 8:30 AM - 3:30 PM"
    },
    {
      id: 3,
      name: "Grade 11 - Section A",
      grade: "11th Grade",
      section: "A", 
      students: 32,
      capacity: 35,
      classTeacher: "Prof. David Anderson",
      room: "Room 301",
      subjects: ["Advanced Math", "Physics", "Chemistry", "English", "Biology"],
      timetable: "Mon-Fri 9:00 AM - 4:00 PM"
    }
  ];

  const timetableData = {
    "Grade 9 - Section A": [
      { day: "Monday", periods: [
        { time: "8:00-8:45", subject: "Mathematics", teacher: "Dr. Jane Wilson" },
        { time: "8:45-9:30", subject: "English", teacher: "Ms. Lisa Martinez" },
        { time: "9:30-10:15", subject: "Science", teacher: "Prof. David Anderson" },
        { time: "10:15-10:30", subject: "Break", teacher: "-" },
        { time: "10:30-11:15", subject: "History", teacher: "Mr. Robert Davis" },
        { time: "11:15-12:00", subject: "Geography", teacher: "Ms. Emily Chen" }
      ]},
      { day: "Tuesday", periods: [
        { time: "8:00-8:45", subject: "Science", teacher: "Prof. David Anderson" },
        { time: "8:45-9:30", subject: "Mathematics", teacher: "Dr. Jane Wilson" },
        { time: "9:30-10:15", subject: "English", teacher: "Ms. Lisa Martinez" },
        { time: "10:15-10:30", subject: "Break", teacher: "-" },
        { time: "10:30-11:15", subject: "Geography", teacher: "Ms. Emily Chen" },
        { time: "11:15-12:00", subject: "History", teacher: "Mr. Robert Davis" }
      ]}
    ]
  };

  const rooms = [
    { id: 1, name: "Room 101", capacity: 40, equipment: ["Projector", "Whiteboard", "AC"], occupied: true, class: "Grade 9-A" },
    { id: 2, name: "Room 102", capacity: 35, equipment: ["Smart Board", "AC"], occupied: false, class: "-" },
    { id: 3, name: "Room 201", capacity: 40, equipment: ["Projector", "Whiteboard"], occupied: true, class: "Grade 10-A" },
    { id: 4, name: "Room 205", capacity: 40, equipment: ["Smart Board", "Projector", "AC"], occupied: true, class: "Grade 10-B" },
    { id: 5, name: "Lab 301", capacity: 30, equipment: ["Computers", "Projector", "AC"], occupied: false, class: "-" }
  ];

  const getOccupancyPercentage = (students: number, capacity: number) => {
    return Math.round((students / capacity) * 100);
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 80) return "text-orange-600";
    return "text-green-600";
  };

  const handleCreateClass = () => {
    toast({
      title: "Class Created",
      description: "New class has been created successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Class Management</h1>
          <p className="text-muted-foreground">Manage classes, timetables, and room assignments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription>Set up a new class with students and teachers</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">9th Grade</SelectItem>
                    <SelectItem value="10">10th Grade</SelectItem>
                    <SelectItem value="11">11th Grade</SelectItem>
                    <SelectItem value="12">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Classroom</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room-101">Room 101</SelectItem>
                    <SelectItem value="room-102">Room 102</SelectItem>
                    <SelectItem value="room-201">Room 201</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="class-teacher">Class Teacher</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Ms. Sarah Johnson</SelectItem>
                    <SelectItem value="jane">Dr. Jane Wilson</SelectItem>
                    <SelectItem value="david">Prof. David Anderson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleCreateClass}>Create Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classes.reduce((sum, cls) => sum + cls.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.filter(room => !room.occupied).length}
            </div>
            <p className="text-xs text-muted-foreground">Unassigned rooms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Occupancy</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(classes.reduce((sum, cls) => sum + getOccupancyPercentage(cls.students, cls.capacity), 0) / classes.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Class utilization</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="classes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Overview</CardTitle>
              <CardDescription>Manage all classes and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search classes..." className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="9">9th Grade</SelectItem>
                      <SelectItem value="10">10th Grade</SelectItem>
                      <SelectItem value="11">11th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classes.map((classItem) => (
                    <Card key={classItem.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{classItem.name}</CardTitle>
                          <Badge variant="outline">{classItem.section}</Badge>
                        </div>
                        <CardDescription>{classItem.classTeacher}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Students</span>
                            </div>
                            <span className={`font-semibold ${getOccupancyColor(getOccupancyPercentage(classItem.students, classItem.capacity))}`}>
                              {classItem.students}/{classItem.capacity}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Room</span>
                            </div>
                            <span className="text-sm font-medium">{classItem.room}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Schedule</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {classItem.timetable}
                            </Badge>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Subjects:</p>
                            <div className="flex flex-wrap gap-1">
                              {classItem.subjects.slice(0, 3).map((subject, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {subject}
                                </Badge>
                              ))}
                              {classItem.subjects.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{classItem.subjects.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Class Timetables
              </CardTitle>
              <CardDescription>View and manage weekly class schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select defaultValue="Grade 9 - Section A">
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">Time</TableHead>
                        <TableHead>Monday</TableHead>
                        <TableHead>Tuesday</TableHead>
                        <TableHead>Wednesday</TableHead>
                        <TableHead>Thursday</TableHead>
                        <TableHead>Friday</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timetableData["Grade 9 - Section A"][0].periods.map((period, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{period.time}</TableCell>
                          <TableCell>
                            {period.subject !== "Break" ? (
                              <div>
                                <div className="font-medium">{period.subject}</div>
                                <div className="text-xs text-muted-foreground">{period.teacher}</div>
                              </div>
                            ) : (
                              <Badge variant="secondary">Break</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {timetableData["Grade 9 - Section A"][1]?.periods[index] ? (
                              <div>
                                <div className="font-medium">{timetableData["Grade 9 - Section A"][1].periods[index].subject}</div>
                                <div className="text-xs text-muted-foreground">{timetableData["Grade 9 - Section A"][1].periods[index].teacher}</div>
                              </div>
                            ) : period.subject === "Break" ? (
                              <Badge variant="secondary">Break</Badge>
                            ) : (
                              <div className="text-muted-foreground">-</div>
                            )}
                          </TableCell>
                          <TableCell>
                            {period.subject !== "Break" ? (
                              <div className="text-muted-foreground">Schedule TBD</div>
                            ) : (
                              <Badge variant="secondary">Break</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {period.subject !== "Break" ? (
                              <div className="text-muted-foreground">Schedule TBD</div>
                            ) : (
                              <Badge variant="secondary">Break</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {period.subject !== "Break" ? (
                              <div className="text-muted-foreground">Schedule TBD</div>
                            ) : (
                              <Badge variant="secondary">Break</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Management</CardTitle>
              <CardDescription>Manage classroom assignments and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Class</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.name}</TableCell>
                        <TableCell>{room.capacity} students</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {room.equipment.map((eq, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {eq}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={room.occupied ? "destructive" : "default"}>
                            {room.occupied ? "Occupied" : "Available"}
                          </Badge>
                        </TableCell>
                        <TableCell>{room.class}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            {room.occupied ? "Reassign" : "Assign"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Management</CardTitle>
              <CardDescription>Create and manage class schedules and periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold mb-2">Schedule Builder</h3>
                <p>Advanced schedule management tools will be available here.</p>
                <Button className="mt-4">Create New Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Classes;